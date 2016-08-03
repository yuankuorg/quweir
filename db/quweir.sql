/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/8/2 17:03:04                            */
/*==============================================================*/
create database quweir default charset utf8;
use quweir;

drop table if exists admin;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   aid                  int not null auto_increment,
   email                varchar(100),
   pwd                  varchar(100),
   issuper              int,
   primary key (aid)
);

insert into admin values(default,'quweir@qq.com','admin',0);