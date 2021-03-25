BEGIN;


-- add hopeless olds fix
--SELECT evergreen.upgrade_deps_block_check('XXXX', :eg_version);

INSERT INTO config.workstation_setting_type (name, grp, datatype, label)
VALUES (
    'eg.orgselect.hopeless.wide_holds', 'gui', 'integer',
    oils_i18n_gettext(
        'eg.orgselect.hopeless.wide_holds',
        'Default org unit for hopeless holds interface',
        'cwst', 'label'
    )
);


-- add dewey range reports view
--SELECT evergreen.upgrade_deps_block_check('XXXX', :eg_version);

CREATE OR REPLACE VIEW reporter.asset_call_number_dewey AS
  SELECT id AS call_number,
    call_number_dewey(label) AS dewey,
    CASE
        WHEN call_number_dewey(label) ~ '^[0-9][0-9.]*$'::text THEN btrim(to_char(10::double precision * floor(call_number_dewey(label)::double precision / 10::double precision), '000'::text))
        ELSE NULL::text
    END AS dewey_block_tens,
    CASE
        WHEN call_number_dewey(label) ~ '^[0-9][0-9.]*$'::text THEN btrim(to_char(100::double precision * floor(call_number_dewey(label)::double precision / 100::double precision), '000'::text))
        ELSE NULL::text
    END AS dewey_block_hundreds,
    CASE
        WHEN call_number_dewey(label) ~ '^[0-9][0-9.]*$'::text THEN (btrim(to_char(10::double precision * floor(call_number_dewey(label)::double precision / 10::double precision), '000'::text)) || '-'::text) || btrim(to_char(10::double precision * floor(call_number_dewey(label)::double precision / 10::double precision) + 9::double precision, '000'::text))
        ELSE NULL::text
    END AS dewey_range_tens,
    CASE
        WHEN call_number_dewey(label) ~ '^[0-9][0-9.]*$'::text THEN (btrim(to_char(100::double precision * floor(call_number_dewey(label)::double precision / 100::double precision), '000'::text)) || '-'::text) || btrim(to_char(100::double precision * floor(call_number_dewey(label)::double precision / 100::double precision) + 99::double precision, '000'::text))
        ELSE NULL::text
    END AS dewey_range_hundreds
  FROM asset.call_number
  WHERE call_number_dewey(label) ~ '^[0-9]'::text;


--SELECT evergreen.upgrade_deps_block_check('1238', :eg_version);

INSERT INTO permission.perm_list ( id, code, description ) VALUES
 ( 625, 'VIEW_BOOKING_RESERVATION', oils_i18n_gettext(625,
    'View booking reservations', 'ppl', 'description')),
 ( 626, 'VIEW_BOOKING_RESERVATION_ATTR_MAP', oils_i18n_gettext(626,
    'View booking reservation attribute maps', 'ppl', 'description'))
;

COMMIT;
