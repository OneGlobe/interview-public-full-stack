create user service_user password 'service_password';
create schema service authorization service_user;
ALTER ROLE service_user
SET search_path = service;