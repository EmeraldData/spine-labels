begin;


-- SELECT COUNT(*), workstation, name FROM actor.workstation_setting 
--     GROUP BY 2, 3 HAVING COUNT(*) > 1;  

-- we need to dedupe our workstation settings to prepare for the new index
create table actor.workstation_setting_temp (like actor.workstation_setting);
insert into actor.workstation_setting_temp select * from actor.workstation_setting;
truncate actor.workstation_setting;
insert into actor.workstation_setting (select distinct on (workstation, name) id, workstation, name, value from actor.workstation_setting_temp);
drop table actor.workstation_setting_temp;

-- change the id number for ADMIN_OPENATHENS
delete from permission.grp_perm_map where perm = 620;
delete from permission.perm_list where id = 620;
insert into permission.perm_list (code, description) values ('ADMIN_OPENATHENS', 'Allow a user to administer OpenAthens authentication service');
insert into permission.grp_perm_map (grp, perm, depth, grantable) values (32, (select id from permission.perm_list where code = 'ADMIN_OPENATHENS'), 0, false);

commit;
