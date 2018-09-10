<?php
	$from_user = $_W['fans']['from_user'];
	if(empty($from_user)){
		message('关注后才能注册',$rule['gzurl'],'error');
	}
	$info = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$from_user."'");
	//已存不让提交	
	if(!empty($info)){
		message('你已注册过啦！',$this->createMobileUrl('home'),'sucess');
		exit;
	}
	
	if($op=='add'){
		$data=array(
			'weid'=>$weid,
			'from_user'=>$from_user,
			'title'=>$_GPC['title'],
			'mobile'=>$_GPC['mobile'],
			'cover'=>$_GPC['cover'],
			'voting'=>$rule['voting'],
			'status'=>1,
			'ischeck'=>0,
			'jointime'=>strtotime($_GPC['jointime']),
			'createtime'=>TIMESTAMP,
			'updatevotetime'=>TIMESTAMP
		);
		require_once dirname(__FILE__).'/../phpthumb/ThumbLib.inc.php';
		try { 
			$thumb = PhpThumbFactory::create($_W['attachurl'].$_GPC['cover']);
		} catch (Exception $e) { 
			// handle error here however you'd like 
		} 
		$name = time();
		$realpath = substr($_GPC['cover'], 0, strrpos($_GPC['cover'], '/')+1);
		$thumb->adaptiveResize(180, 240);
		$thumb->save("resource/attachment/$realpath"."thumb".$name.".jpg");
		$data['thumb'] = $realpath."thumb".$name.".jpg";
		
		$profile = pdo_fetch('SELECT mobile, id FROM '.tablename('hcweivote_member')." WHERE `weid` = :weid AND mobile=:mobile ",array(':weid' => $_W['weid'],':mobile' => $_GPC['mobile']));
		
		if($data['mobile']==$profile['mobile']){
			echo '-2';
			exit;
		}
		pdo_insert('hcweivote_member',$data);
		echo 1;
		exit;
	}
	
	include $this->template('register');
?>