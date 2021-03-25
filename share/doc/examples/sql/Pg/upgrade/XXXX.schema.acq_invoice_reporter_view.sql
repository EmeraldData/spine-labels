BEGIN;

CREATE OR REPLACE VIEW reporter.acq_invoice_total_cost_billed AS
WITH acq_cost_billed (invoice, total_cost_billed) AS
  (SELECT acqie.invoice,
    COALESCE(SUM(acqie.cost_billed), '0.00') AS total_cost_billed
       FROM acq.invoice_entry acqie
      GROUP BY acqie.invoice
  UNION ALL
  SELECT acqii.invoice,
    COALESCE(SUM(acqii.cost_billed), '0.00') AS total_cost_billed
    FROM acq.invoice_item acqii
    GROUP BY acqii.invoice)
  SELECT invoice, COALESCE(SUM(total_cost_billed), '0.00') AS total_cost_billed
    FROM acq_cost_billed
    GROUP BY invoice;

CREATE OR REPLACE VIEW reporter.acq_invoice_total_actual_cost AS
WITH acq_actual_cost (invoice, total_actual_cost) AS
  (SELECT acqie.invoice,
    COALESCE(SUM(acqie.actual_cost), '0.00') AS total_actual_cost
       FROM acq.invoice_entry acqie
      GROUP BY acqie.invoice
  UNION ALL
  SELECT acqii.invoice,
    COALESCE(SUM(acqii.actual_cost), '0.00') AS total_actual_cost
    FROM acq.invoice_item acqii
    GROUP BY acqii.invoice)
  SELECT invoice, COALESCE(SUM(total_actual_cost), '0.00') AS total_actual_cost
    FROM acq_actual_cost
    GROUP BY invoice;

CREATE OR REPLACE VIEW reporter.acq_invoice_total_amount_paid AS
WITH acq_amount_paid (invoice, total_amount_paid) AS
  (SELECT acqie.invoice,
    COALESCE(SUM(acqie.amount_paid), '0.00') AS total_amount_paid
       FROM acq.invoice_entry acqie
      GROUP BY acqie.invoice
  UNION ALL
  SELECT acqii.invoice,
    COALESCE(SUM(acqii.amount_paid), '0.00') AS total_amount_paid
    FROM acq.invoice_item acqii
    GROUP BY acqii.invoice)
  SELECT invoice, COALESCE(SUM(total_amount_paid), '0.00') AS total_amount_paid
    FROM acq_amount_paid
    GROUP BY invoice;

CREATE OR REPLACE VIEW reporter.acq_invoice_summary_view AS
   SELECT  invoice.id AS inv_id,
           invoice.inv_ident AS inv_vendor_ident,
           invoice.recv_date,
           provider.id AS provider_id,
           provider.name AS provider_name,
           provider.code AS provider_code,
           shipper.id AS shipper_id,
           shipper.name AS shipper_name,
           shipper.code AS shipper_code,
           receiver.id AS receiver_id,
           receiver.shortname AS receiver_shortname,
           receiver.name AS receiver_name,
           invoice.payment_auth,
           invoice.payment_method,
           raitcb.total_cost_billed AS total_cost_billed,
           raitac.total_actual_cost AS total_actual_cost,
           raitap.total_amount_paid AS total_amount_paid
   FROM    acq.invoice invoice
           JOIN reporter.acq_invoice_total_cost_billed raitcb ON (raitcb.invoice = invoice.id)
           JOIN reporter.acq_invoice_total_actual_cost raitac ON (raitac.invoice = invoice.id)
           JOIN reporter.acq_invoice_total_amount_paid raitap ON (raitap.invoice = invoice.id)
           JOIN acq.provider provider ON (invoice.provider = provider.id)
           LEFT OUTER JOIN acq.provider shipper ON (invoice.shipper = shipper.id)
           LEFT OUTER JOIN actor.org_unit receiver ON (invoice.receiver = receiver.id);

CREATE VIEW reporter.acq_purchase_order_summary_view AS
SELECT  po.id,
    po.owner,
    po.creator,
    po.editor,
    po.ordering_agency,
    po.create_time,
    po.edit_time,
    po.provider,
    po.state,
    po.order_date,
    po.name,
    po.cancel_reason,
    po.prepayment_required,
    -- lineitem_count
    (SELECT COALESCE(COUNT(*), 0)
        FROM acq.lineitem li
        WHERE li.purchase_order = po.id) AS lineitem_count,
    -- amount_encumbered
    (SELECT COALESCE(SUM(amount), '0.00')
        FROM acq.fund_debit afd
        WHERE afd.encumbrance = TRUE
        AND (afd.id IN (
            SELECT fund_debit
            FROM acq.lineitem_detail lid
            WHERE lineitem IN (
                SELECT id
                FROM acq.lineitem
                WHERE purchase_order = po.id)
        ) OR afd.id IN (
            SELECT fund_debit
            FROM acq.po_item
            WHERE purchase_order = po.id
        ) OR afd.id IN (
            SELECT fund_debit
            FROM acq.invoice_item
            WHERE purchase_order = po.id
        ))) AS amount_encumbered,
    -- amount_spent
        (SELECT COALESCE(SUM(amount), '0.00')
                FROM acq.fund_debit afd
                WHERE afd.encumbrance = FALSE
                AND afd.id IN (
                        SELECT fund_debit
                        FROM acq.lineitem_detail lid
                        WHERE lineitem IN (
                                SELECT id
                                FROM acq.lineitem
                                WHERE purchase_order = po.id)
                ) OR afd.id IN (
                        SELECT fund_debit
                        FROM acq.po_item
                        WHERE purchase_order = po.id
                ) OR afd.id IN (
                        SELECT fund_debit
                        FROM acq.invoice_item
                        WHERE purchase_order = po.id
                )) AS amount_spent,
    -- amount_estimated
        CASE
            WHEN (
                SELECT id
                FROM acq.fund_debit
                WHERE id IN (
                    SELECT fund_debit
                    FROM acq.lineitem_detail
                    WHERE lineitem IN (
                        SELECT id
                            FROM acq.lineitem
                        WHERE purchase_order = po.id
                    )
                ) OR id IN (
                SELECT fund_debit
                FROM acq.po_item
                WHERE purchase_order = po.id
                ) OR id IN (
                SELECT fund_debit
                FROM acq.invoice_item
                WHERE purchase_order = po.id
                ) limit 1
            ) IS NOT NULL THEN (
                SELECT COALESCE(SUM(amount), '0.00')
                                        FROM acq.fund_debit
                            WHERE id IN (
                                    SELECT fund_debit
                                    FROM acq.lineitem_detail
                                    WHERE lineitem IN (
                                            SELECT id
                                            FROM acq.lineitem
                                            WHERE purchase_order = po.id
                                    )
                            ) OR id IN (
                            SELECT fund_debit
                            FROM acq.po_item
                            WHERE purchase_order = po.id
                            ) OR id IN (
                            SELECT fund_debit
                            FROM acq.invoice_item
                            WHERE purchase_order = po.id
                            )
            ) ELSE (
                SELECT (
                    COALESCE(SUM(li.estimated_unit_price), '0.00') +
                    COALESCE(SUM(poi.estimated_cost), '0.00')
                ) FROM acq.lineitem li
                LEFT OUTER JOIN acq.lineitem_detail lid ON (li.id = lid.lineitem)
                LEFT OUTER JOIN acq.po_item poi ON (poi.purchase_order = po.id)
                WHERE li.purchase_order = po.id
            ) END AS amount_estimated
FROM    acq.purchase_order po;

COMMIT;
