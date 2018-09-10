<?php
	$info = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."'");
	$mobile="";
	if(empty($info)){
	$mobile="";
	//	message('请先注册！', $this->createMobileUrl('register'), 'error');
	} else {
	  $mobile=$info['mobile'];
	}
	//if($info['status']==0){
	//	message('您已被禁用，不能留言！');
	//}
	if($op=='message'){
		
		$mid = intval($_GPC['mid']);
		if($mid > 0){
			$message = array(
				'weid'=>$weid,
				'mid'=>$mid,
				'mobile'=> $mobile,
				'message'=>trim($_GPC['message']),
				'isopen'=>1,
				'createtime'=>time(),
			);
			pdo_insert('hcweivote_message', $message);
			echo 1;
			exit;
		}
	}
	
?>