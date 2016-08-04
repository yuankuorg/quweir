/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/8/2 17:03:04                            */
/*==============================================================*/
create database quweir default charset utf8;
use quweir;

drop table if exists admin;

drop table if exists cardtype;

drop table if exists member;

drop table if exists qudouinfo;

drop table if exists signcard;

drop table if exists sysconfig;
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

/*==============================================================*/
/* Table: cardtype                                              */
/*==============================================================*/
create table cardtype
(
   cid                  int not null auto_increment,
   cname                varchar(100),
   target               int,
   timearea             int,
   signcount            int,
   signtime             int,
   cardimg              varchar(100),
   status               int,
   primary key (cid)
);

/*==============================================================*/
/* Table: member                                                */
/*==============================================================*/
create table member
(
   openid               varchar(100) not null,
   nickname             varchar(100),
   registtime           datetime,
   qudou                int,
   changecount          int,
   paymoney             numeric(10,2),
   source               varchar(50),
   status               int,
   headimg              varchar(100),
   firopenid            varchar(100),
   secopenid            varchar(100),
   primary key (openid)
);

/*==============================================================*/
/* Table: qudouinfo                                             */
/*==============================================================*/
create table qudouinfo
(
   id                   int not null auto_increment,
   type                 int,
   count                int,
   opendate             datetime,
   openid               varchar(100),
   primary key (id)
);

/*==============================================================*/
/* Table: signcard                                              */
/*==============================================================*/
create table signcard
(
   signid               int not null auto_increment,
   openid               varchar(100),
   cid                  int,
   signtime             datetime,
   primary key (signid)
);

/*==============================================================*/
/* Table: sysconfig                                             */
/*==============================================================*/
create table sysconfig
(
   id                   int not null auto_increment,
   name                 varchar(100),
   value                text,
   updatetime           datetime,
   aid                  int,
   primary key (id)
);

alter table qudouinfo add constraint FK_qudouopenid_memberopenid foreign key (openid)
      references member (openid) on delete restrict on update restrict;

alter table signcard add constraint FK_signcid_cardcid foreign key (cid)
      references cardtype (cid) on delete restrict on update restrict;

alter table signcard add constraint FK_signopenid_memberopenid foreign key (openid)
      references member (openid) on delete restrict on update restrict;

alter table sysconfig add constraint FK_sysaid_adminaid foreign key (aid)
      references admin (aid) on delete restrict on update restrict;
