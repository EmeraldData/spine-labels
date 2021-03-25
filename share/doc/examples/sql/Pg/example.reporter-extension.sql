/*
 * Copyright (C) 2004-2017  Georgia Public Library Service
 * Copyright (C) 2007-2008  Equinox Software, Inc.
 * Mike Rylander <miker@esilibrary.com> 
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

BEGIN;

CREATE OR REPLACE VIEW reporter.classic_current_circ AS
SELECT	cl.shortname AS circ_lib,
	cl.id AS circ_lib_id,
	circ.xact_start AS xact_start,
	circ_type.type AS circ_type,
	cp.id AS copy_id,
	cp.circ_modifier,
	ol.shortname AS owning_lib_name,
	lm.value AS language,
	lfm.value AS lit_form,
	ifm.value AS item_form,
	itm.value AS item_type,
	sl.name AS shelving_location,
	p.id AS patron_id,
	g.name AS profile_group,
	dem.general_division AS demographic_general_division,
	circ.id AS id,
	cn.id AS call_number,
	cn.label AS call_number_label,
	call_number_dewey(cn.label) AS dewey,
	CASE
		WHEN call_number_dewey(cn.label) ~  E'^[0-9.]+$'
			THEN
				btrim(
					to_char(
						10 * floor((call_number_dewey(cn.label)::float) / 10), '000'
					)
				)
		ELSE NULL
	END AS dewey_block_tens,
	CASE
		WHEN call_number_dewey(cn.label) ~  E'^[0-9.]+$'
			THEN
				btrim(
					to_char(
						100 * floor((call_number_dewey(cn.label)::float) / 100), '000'
					)
				)
		ELSE NULL
	END AS dewey_block_hundreds,
	CASE
		WHEN call_number_dewey(cn.label) ~  E'^[0-9.]+$'
			THEN
				btrim(
					to_char(
						10 * floor((call_number_dewey(cn.label)::float) / 10), '000'
					)
				)
				|| '-' ||
				btrim(
					to_char(
						10 * floor((call_number_dewey(cn.label)::float) / 10) + 9, '000'
					)
				)
		ELSE NULL
	END AS dewey_range_tens,
	CASE
		WHEN call_number_dewey(cn.label) ~  E'^[0-9.]+$'
			THEN
				btrim(
					to_char(
						100 * floor((call_number_dewey(cn.label)::float) / 100), '000'
					)
				)
				|| '-' ||
				btrim(
					to_char(
						100 * floor((call_number_dewey(cn.label)::float) / 100) + 99, '000'
					)
				)
		ELSE NULL
	END AS dewey_range_hundreds,
	hl.id AS patron_home_lib,
	hl.shortname AS patron_home_lib_shortname,
	paddr.county AS patron_county,
	paddr.city AS patron_city,
	paddr.post_code AS patron_zip,
	sc1.stat_cat_entry AS stat_cat_1,
	sc2.stat_cat_entry AS stat_cat_2,
	sce1.value AS stat_cat_1_value,
	sce2.value AS stat_cat_2_value
  FROM	action.circulation circ
	JOIN reporter.circ_type circ_type ON (circ.id = circ_type.id)
	JOIN asset.copy cp ON (cp.id = circ.target_copy)
	JOIN asset.copy_location sl ON (cp.location = sl.id)
	JOIN asset.call_number cn ON (cp.call_number = cn.id)
	JOIN actor.org_unit ol ON (cn.owning_lib = ol.id)
	JOIN metabib.rec_descriptor rd ON (rd.record = cn.record)
	JOIN actor.org_unit cl ON (circ.circ_lib = cl.id)
	JOIN actor.usr p ON (p.id = circ.usr)
	JOIN actor.org_unit hl ON (p.home_ou = hl.id)
	JOIN permission.grp_tree g ON (p.profile = g.id)
	JOIN reporter.demographic dem ON (dem.id = p.id)
	LEFT JOIN actor.usr_address paddr ON (paddr.id = p.billing_address)
	LEFT JOIN config.language_map lm ON (rd.item_lang = lm.code)
	LEFT JOIN config.lit_form_map lfm ON (rd.lit_form = lfm.code)
	LEFT JOIN config.item_form_map ifm ON (rd.item_form = ifm.code)
	LEFT JOIN config.item_type_map itm ON (rd.item_type = itm.code)
	LEFT JOIN asset.stat_cat_entry_copy_map sc1 ON (sc1.owning_copy = cp.id AND sc1.stat_cat = 1)
	LEFT JOIN asset.stat_cat_entry sce1 ON (sce1.id = sc1.stat_cat_entry)
	LEFT JOIN asset.stat_cat_entry_copy_map sc2 ON (sc2.owning_copy = cp.id AND sc2.stat_cat = 2)
	LEFT JOIN asset.stat_cat_entry sce2 ON (sce2.id = sc2.stat_cat_entry);

CREATE OR REPLACE VIEW reporter.legacy_cat1 AS
SELECT	id,
	owner,
	value
  FROM	asset.stat_cat_entry
  WHERE	stat_cat = 1;

CREATE OR REPLACE VIEW reporter.legacy_cat2 AS
SELECT	id,
	owner,
	value
  FROM	asset.stat_cat_entry
  WHERE	stat_cat = 2;


CREATE OR REPLACE VIEW reporter.classic_current_billing_summary AS
SELECT	x.id AS id,
	x.usr AS usr,
	bl.shortname AS billing_location_shortname,
	bl.name AS billing_location_name,
	x.billing_location AS billing_location,
	c.barcode AS barcode,
	u.home_ou AS usr_home_ou,
	ul.shortname AS usr_home_ou_shortname,
	ul.name AS usr_home_ou_name,
	x.xact_start AS xact_start,
	x.xact_finish AS xact_finish,
	x.xact_type AS xact_type,
	x.total_paid AS total_paid,
	x.total_owed AS total_owed,
	x.balance_owed AS balance_owed,
	x.last_payment_ts AS last_payment_ts,
	x.last_payment_note AS last_payment_note,
	x.last_payment_type AS last_payment_type,
	x.last_billing_ts AS last_billing_ts,
	x.last_billing_note AS last_billing_note,
	x.last_billing_type AS last_billing_type,
	paddr.county AS patron_county,
	paddr.city AS patron_city,
	paddr.post_code AS patron_zip,
	g.name AS profile_group,
	dem.general_division AS demographic_general_division
  FROM	money.open_billable_xact_summary x
	JOIN actor.org_unit bl ON (x.billing_location = bl.id)
	JOIN actor.usr u ON (u.id = x.usr)
	JOIN actor.org_unit ul ON (u.home_ou = ul.id)
	JOIN actor.card c ON (u.card = c.id)
	JOIN permission.grp_tree g ON (u.profile = g.id)
	JOIN reporter.demographic dem ON (dem.id = u.id)
	JOIN actor.usr_address paddr ON (paddr.id = u.billing_address);

CREATE OR REPLACE VIEW reporter.classic_item_list AS
SELECT rmsr.title,
    rmsr.author,
    rmsr.pubdate,
    cp.id,
    cp.price,
    cp.barcode,
    cn.label as call_number_label,
    CASE
        WHEN call_number_dewey(cn.label) ~  E'^[0-9.]+$'
            THEN
                btrim(
                    to_char(
                        10 * floor((call_number_dewey(cn.label)::float) / 10), '000'
                    )
                )
        ELSE NULL
    END AS dewey_block_tens,
    CASE
        WHEN call_number_dewey(cn.label) ~  E'^[0-9.]+$'
            THEN
                btrim(
                    to_char(
                        100 * floor((call_number_dewey(cn.label)::float) / 100), '000'
                    )
                )
        ELSE NULL
    END AS dewey_block_hundreds,
    erfcc.circ_count as use_count,
    cp.circ_modifier,
    sl.name AS shelving_location,
    sc1.stat_cat_entry AS stat_cat_1,
    sc2.stat_cat_entry AS stat_cat_2,
    sce1.value AS stat_cat_1_value,
    sce2.value AS stat_cat_2_value,
    cp.edit_date,
    cp.create_date,
    ol.shortname AS owning_lib_name,
    cn.owning_lib,
    cl.shortname AS circ_lib_name,
    cl.id AS circ_lib,
    cp.creator,
    cp.age_protect,
    cp.opac_visible,
    cp.ref,
    cp.deposit_amount,
    cp.deleted,
    rmsr.tcn_value,
    cp.status,
    circ.stop_fines,
    circ.due_date,
    circ_card.barcode as patron_barcode,
    circ_u.first_given_name || ' ' || circ_u.family_name as patron_name
  FROM  asset.copy cp
    JOIN extend_reporter.full_circ_count erfcc ON (cp.id = erfcc.id)
    JOIN asset.copy_location sl ON (cp.location = sl.id)
    JOIN asset.call_number cn ON (cp.call_number = cn.id)
    JOIN actor.org_unit ol ON (cn.owning_lib = ol.id)
    JOIN actor.org_unit cl ON (cp.circ_lib = cl.id)
    JOIN reporter.materialized_simple_record rmsr ON (cn.record = rmsr.id)
    LEFT JOIN action.circulation circ ON (circ.target_copy = cp .id AND circ.checkin_time IS NULL)
    LEFT JOIN actor.usr circ_u ON (circ_u.id = circ.usr)
    LEFT JOIN actor.card circ_card ON (circ_u.card = circ_card.id)
    LEFT JOIN asset.stat_cat_entry_copy_map sc1 ON (sc1.owning_copy = cp.id AND sc1.stat_cat = 1)
    LEFT JOIN asset.stat_cat_entry sce1 ON (sce1.id = sc1.stat_cat_entry)
    LEFT JOIN asset.stat_cat_entry_copy_map sc2 ON (sc2.owning_copy = cp.id AND sc2.stat_cat = 2)
    LEFT JOIN asset.stat_cat_entry sce2 ON (sce2.id = sc2.stat_cat_entry);


CREATE OR REPLACE VIEW money.open_circ_balance_by_owning_lib AS
	SELECT	circ.id,
		cn.owning_lib,
		bill.billing_type,
		SUM(bill.amount) AS billed
	  FROM	action.circulation circ
		JOIN money.billing bill ON (circ.id = bill.xact) 
		JOIN asset.copy cp ON (circ.target_copy = cp.id) 
		JOIN asset.call_number cn ON (cn.id = cp.call_number) 
	  WHERE	circ.xact_finish IS NULL
		AND NOT bill.voided
	  GROUP BY 1,2,3
	  ORDER BY 1,2,3;

CREATE OR REPLACE VIEW money.open_balance_by_owning_lib AS
	SELECT	owning_lib,
		STRING_AGG(DISTINCT billing_type, ', ') AS billing_types,
		SUM(billed) - SUM( COALESCE((SELECT SUM(amount) AS paid FROM money.payment WHERE NOT voided AND xact = x.id), 0::NUMERIC) ) AS balance
	  FROM	money.open_circ_balance_by_owning_lib x
	  GROUP BY 1;





CREATE OR REPLACE VIEW money.open_circ_balance_by_circ_and_owning_lib AS
	SELECT	circ.id,
		circ.circ_lib,
		cn.owning_lib,
		bill.billing_type,
		SUM(bill.amount) AS billed
	  FROM	action.circulation circ
		JOIN money.billing bill ON (circ.id = bill.xact) 
		JOIN asset.copy cp ON (circ.target_copy = cp.id) 
		JOIN asset.call_number cn ON (cn.id = cp.call_number) 
	  WHERE	circ.xact_finish IS NULL
		AND NOT bill.voided
	  GROUP BY 1,2,3,4
	  ORDER BY 1,2,3,4;

CREATE OR REPLACE VIEW money.open_balance_by_circ_and_owning_lib AS
	SELECT	circ_lib,
		owning_lib,
		STRING_AGG(DISTINCT billing_type, ', ') AS billing_types,
		SUM(billed) - SUM( COALESCE((SELECT SUM(amount) AS paid FROM money.payment WHERE NOT voided AND xact = x.id), 0::NUMERIC) ) AS balance
	  FROM	money.open_circ_balance_by_circ_and_owning_lib x
	  GROUP BY 1,2;





CREATE OR REPLACE VIEW money.open_circ_balance_by_usr_home_and_owning_lib AS
	SELECT	circ.id,
		usr.home_ou,
		cn.owning_lib,
		bill.billing_type,
		SUM(bill.amount) AS billed
	  FROM	action.circulation circ
		JOIN money.billing bill ON (circ.id = bill.xact) 
		JOIN asset.copy cp ON (circ.target_copy = cp.id) 
		JOIN asset.call_number cn ON (cn.id = cp.call_number) 
		JOIN actor.usr usr ON (circ.usr = usr.id) 
	  WHERE	circ.xact_finish IS NULL
		AND NOT bill.voided
	  GROUP BY 1,2,3,4
	  ORDER BY 1,2,3,4;

CREATE OR REPLACE VIEW money.open_balance_by_usr_home_and_owning_lib AS
	SELECT	home_ou,
		owning_lib,
		STRING_AGG(DISTINCT billing_type, ', ') AS billing_types,
		SUM(billed) - SUM( COALESCE((SELECT SUM(amount) AS paid FROM money.payment WHERE NOT voided AND xact = x.id), 0::NUMERIC) ) AS balance
	  FROM	money.open_circ_balance_by_usr_home_and_owning_lib x
	  GROUP BY 1,2;
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
           raitap.total_amount_paid AS total_amount_paid,
           invoice.close_date,
           invoice.closed_by,
           closer.usrname AS closed_by_usrname
   FROM    acq.invoice invoice
           JOIN reporter.acq_invoice_total_cost_billed raitcb ON (raitcb.invoice = invoice.id)
           JOIN reporter.acq_invoice_total_actual_cost raitac ON (raitac.invoice = invoice.id)
           JOIN reporter.acq_invoice_total_amount_paid raitap ON (raitap.invoice = invoice.id)
           JOIN acq.provider provider ON (invoice.provider = provider.id)
           LEFT OUTER JOIN acq.provider shipper ON (invoice.shipper = shipper.id)
           LEFT OUTER JOIN actor.org_unit receiver ON (invoice.receiver = receiver.id)
           LEFT OUTER JOIN actor.usr closer ON (invoice.closed_by = closer.id);

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
        )) AS amount_encumbered,
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

CREATE OR REPLACE VIEW reporter.copy_statistics_view AS
SELECT    acp.id as copy_id,
	owning_lib.id as owning_lib_id,
    -- last circulation date in corsortium
    (SELECT COALESCE(MAX(xact_start), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
    ) AS consortium_last_circ_date,
    -- last circulation date in system
    (SELECT COALESCE(MAX(xact_start), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib in (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_last_circ_date,
    -- last circulation date in branch
    (SELECT COALESCE(MAX(xact_start), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib = owning_lib.id
    ) AS branch_last_circ_date,
    -- last checkin date in corsortium
    (SELECT COALESCE(MAX(checkin_time), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
    ) AS consortium_last_checkin_date,
    -- last checkin date in system
    (SELECT COALESCE(MAX(checkin_time), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib in (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_last_checkin_date,
    -- last checkin date in branch
    (SELECT COALESCE(MAX(checkin_time), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib = owning_lib.id
    ) AS branch_last_checkin_date,
    -- last due date in consortium
    (SELECT COALESCE(MAX(due_date), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
    ) AS consortium_last_due_date,
    -- last due date in system
    (SELECT COALESCE(MAX(due_date), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib in (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_last_due_date,
    -- last due date in branch
    (SELECT COALESCE(MAX(due_date), NULL)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib = owning_lib.id
    ) AS branch_last_due_date,
    -- month-to-date circ in corsortium
    (SELECT count(*)
     FROM action.all_circulation
     WHERE EXTRACT(YEAR FROM xact_start) = EXTRACT(YEAR FROM now())
     AND EXTRACT(MONTH FROM xact_start) = EXTRACT(MONTH FROM now())
     AND target_copy = acp.id
    ) AS consortium_month_to_date_circ,
    -- month-to-date circ in system
    (SELECT count(*)
     FROM action.all_circulation
     WHERE EXTRACT(YEAR FROM xact_start) = EXTRACT(YEAR FROM now())
     AND EXTRACT(MONTH FROM xact_start) = EXTRACT(MONTH FROM now())
     AND target_copy = acp.id
     AND circ_lib in (
       SELECT id
       FROM actor.org_unit
       WHERE parent_ou = owning_lib.parent_ou
       )
    ) AS system_month_to_date_circ,
    -- month-to-date circ in branch
    (SELECT count(*)
     FROM action.all_circulation
     WHERE EXTRACT(YEAR FROM xact_start) = EXTRACT(YEAR FROM now())
     AND EXTRACT(MONTH FROM xact_start) = EXTRACT(MONTH FROM now())
     AND target_copy = acp.id
     AND circ_lib = owning_lib.id
    ) AS branch_month_to_date_circ,
    -- year-to-date circ in consortium
    (SELECT count(*)
     FROM action.all_circulation
     WHERE EXTRACT(YEAR FROM xact_start) = EXTRACT(YEAR FROM now())
     AND target_copy = acp.id
    ) AS consortium_year_to_date_circ,
    -- year-to-date circ in system
    (SELECT count(*)
     FROM action.all_circulation
     WHERE EXTRACT(YEAR FROM xact_start) = EXTRACT(YEAR FROM now())
     AND target_copy = acp.id
     AND circ_lib in (
       SELECT id
       FROM actor.org_unit
       WHERE parent_ou = owning_lib.parent_ou
       )
    ) AS system_year_to_date_circ,
    -- year-to-date circ in branch
    (SELECT count(*)
     FROM action.all_circulation
     WHERE EXTRACT(YEAR FROM xact_start) = EXTRACT(YEAR FROM now())
     AND target_copy = acp.id
     AND circ_lib = owning_lib.id
    ) AS branch_year_to_date_circ,
    -- lifetime circ in consortium
    erfcc.circ_count AS consortium_lifetime_circ,
    -- lifetime circ in system
    (SELECT count(*)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib in (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_lifetime_circ,
    -- lifetime circ in branch
    (SELECT count(*)
     FROM action.all_circulation
     WHERE target_copy = acp.id
     AND circ_lib = owning_lib.id
    ) AS branch_lifetime_circ,
    -- current title hold count in consortium
    (SELECT count(*)
     FROM action.hold_request ahr
     WHERE cancel_time IS NULL
     AND expire_time > now()
     AND fulfillment_time IS NULL
     AND target = bre.id
     AND hold_type = 'T'
    ) AS consortium_current_title_hold_count,
    -- current title hold count in system
    (SELECT count(*)
     FROM action.hold_request ahr
     WHERE cancel_time IS NULL
     AND expire_time > now()
     AND fulfillment_time IS NULL
     AND target = bre.id
     AND hold_type = 'T'
     AND pickup_lib IN (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_current_title_hold_count,
    -- current title hold count in branch
    (SELECT count(*)
     FROM action.hold_request ahr
     WHERE cancel_time IS NULL
     AND expire_time > now()
     AND fulfillment_time IS NULL
     AND target = bre.id
     AND hold_type = 'T'
     AND pickup_lib = owning_lib.parent_ou
    ) AS branch_current_title_hold_count,
    -- consortium lifetime holds
    (SELECT count(*)
     FROM action.all_hold_request
     WHERE current_copy = acp.id) AS consortium_lifetime_holds,
    -- system lifetime holds
    (SELECT count(*)
     FROM action.all_hold_request
     WHERE current_copy = acp.id
     AND pickup_lib IN (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_lifetime_holds,
    -- branch lifetime holds
    (SELECT count(*)
     FROM action.all_hold_request
     WHERE current_copy = acp.id
     AND pickup_lib = owning_lib.parent_ou
    ) AS branch_lifetime_holds,
    -- consortium lifetime transits
    (SELECT count(*)
     FROM action.transit_copy
     WHERE target_copy = acp.id
    ) AS consortium_lifetime_transits,
    -- system lifetime transits
    (SELECT count(*)
     FROM action.transit_copy
     WHERE target_copy = acp.id
     AND source IN (
        SELECT id
        FROM actor.org_unit
        WHERE parent_ou = owning_lib.parent_ou
        )
    ) AS system_lifetime_transits,
    -- branch lifetime transits
    (SELECT count(*)
     FROM action.transit_copy
     WHERE target_copy = acp.id
     AND source = owning_lib.id
    ) AS branch_lifetime_transits
FROM    asset.copy acp
    INNER JOIN asset.call_number acn ON (acp.call_number = acn.id)
    INNER JOIN biblio.record_entry bre ON (acn.record = bre.id)
    INNER JOIN actor.org_unit owning_lib ON (acn.owning_lib = owning_lib.id)
    LEFT OUTER JOIN extend_reporter.full_circ_count erfcc ON (erfcc.id = acp.id);

COMMIT;
