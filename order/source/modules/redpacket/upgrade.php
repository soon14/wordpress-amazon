<?php
 if(!pdo_fieldexists('redpacket_token', 'jsticket')) {
	pdo_query("ALTER TABLE ".tablename('redpacket_token')." ADD `jsticket` varchar(1000) NOT NULL DEFAULT '';");
}
