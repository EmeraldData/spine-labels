BEGIN;

-- Thank you, berick :-)
-- Start at 100 to avoid barcodes with long stretches of zeros early on.
-- eCard barcodes have 7 auto-generated digits.
CREATE SEQUENCE actor.auto_barcode_ecard_seq START 100 MAXVALUE 9999999;
                                                                               
CREATE OR REPLACE FUNCTION actor.generate_barcode
    (prefix TEXT, numchars INTEGER, seqname TEXT) RETURNS TEXT AS
$$
/*
Generate a barcode starting with 'prefix' and followed by 'numchars'
numbers.  The auto portion numbers are generated from the provided
sequence, guaranteeing uniquness across all barcodes generated with
the same sequence.  The number is left-padded with zeros to meet the
numchars size requirement.  Returns NULL if the sequnce value is
higher than numchars can accommodate .*/
    SELECT NEXTVAL($3); -- bump the sequence up 1
    SELECT CASE
        WHEN LENGTH(CURRVAL($3)::TEXT) > $2 THEN NULL
        ELSE $1 || LPAD(CURRVAL($3)::TEXT, $2, '0')
    END;
$$ LANGUAGE SQL;

INSERT INTO actor.passwd_type
    (code, name, login, crypt_algo, iter_count)
    VALUES ('ecard_vendor', 'eCard Vendor Password', TRUE, 'bf', 10);

INSERT into config.org_unit_setting_type
( name, grp, label, description, datatype, fm_class ) VALUES

( 'lib.ecard_barcode_prefix', 'lib',
    oils_i18n_gettext('lib.ecard_barcode_prefix',
        'Barcode prefix for Quipu eCard feature',
        'coust', 'label'),
    oils_i18n_gettext('lib.ecard_barcode_prefix',
        'Set the barcode prefix for new Quipu eCard users',
        'coust', 'description'),
    'string', null)

,( 'lib.ecard_patron_profile', 'lib',
    oils_i18n_gettext('lib.ecard_patron_profile',
        'Patron permission profile for Quipu eCard feature',
        'coust', 'label'),
    oils_i18n_gettext('lib.ecard_barcode_prefix',
        'Patron permission profile for Quipu eCard feature',
        'coust', 'description'),
    'link', 'pgt')
;

COMMIT;
