<?php
/**
 * 列表
 *
 * @author 超级无聊
 * @url
 */
	$set = pdo_fetch("SELECT * FROM ".tablename('shopping3_set')." WHERE weid = :weid", array(':weid' => $weid));
 	if(!empty($set['thumb'])){
		$set['thumbArr']=explode('|',$set['thumb']);	
	}	
	include $this->template('wl_home');
 