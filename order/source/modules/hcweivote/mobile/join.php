<?php
	$info = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."'");
	if(empty($info)){
		message('请先注册！', $this->createMobileUrl('register'), 'error');
	} else {
		$url = $this->createMobileUrl('photos', array('id'=>$info['id'], 'op'=>'post'));
		header("location:$url");
	}
?>