<?php 

 $sql="CREATE TABLE IF NOT EXISTS ".tablename('hcweivote_tpqk')." (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`weid` int(10) unsigned NOT NULL,
	`from_user` varchar(200) NOT NULL DEFAULT '',
	`nums` varchar(200) NOT NULL DEFAULT '',
	`mid` varchar(200) NOT NULL DEFAULT '',
	`ipaddr` varchar(200) NOT NULL DEFAULT '',
	`createtime` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;";


 $sql1="CREATE TABLE IF NOT EXISTS ".tablename('ims_hcweivote_read')."(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`weid` int(10) unsigned NOT NULL,
	`from_user` varchar(200) NOT NULL DEFAULT '',
	`mid` varchar(200) NOT NULL DEFAULT '',
	`ipaddr` varchar(200) NOT NULL DEFAULT '',
	`createtime` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;";


pdo_query($sql);
pdo_query($sql1);




