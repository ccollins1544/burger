### Burger Model Schema

-- drop database if exists wu1k8mg3gksws414;
create database if not exists wu1k8mg3gksws414;
use wu1k8mg3gksws414;

create table burgers
(
  id int not null auto_increment
  , burger_name varchar (255) default null
  , devoured boolean default false 
  , primary key (id)  
);