<?php
	
	$user = fans_search($_W['fans']['from_user'], array('credit1'));
	$info = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."'");
	
	
	$starttime = strtotime(date('Y-m-d 00:00:00'));
	$endtime = strtotime(date('Y-m-d 23:59:59'));
	$credit = pdo_fetchcolumn("select credit from ".tablename('hcweivote_credit')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."' and createtime >= ".$starttime." and createtime <= ".$endtime);
	$credit = empty($credit)?-1:$credit;
	if($op=='complete'){
		
		
		if($_GPC['opp']=='post'){
			$info = array(
				'title'=>$_GPC['title'],
				'mobile'=>$_GPC['mobile'],
				'address'=>trim($_GPC['address'])
			);
			pdo_update('hcweivote_member', $info, array('weid'=>$_W['weid'], 'from_user'=>$_W['fans']['from_user']));
			echo 1;
			exit;
		}
		include $this->template('complete');
		exit;
	}
	
	if($op=='creditlog'){
		$member = pdo_fetch("select title, thumb from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."'");
		$creditlogs = pdo_fetchall("select * from ".tablename('hcweivote_credit')." where weid = ".$_W['weid']." and from_user = '".$_W['fans']['from_user']."' order by createtime desc");
		include $this->template('creditlog');
		exit;
	}
	
	if($op=='mymessage'){
		
		
		
	//	$mid = $_GPC['id'];
	//	$member = pdo_fetch("select title, thumb from ".tablename('hcweivote_member')." where id = ".$mid);
		$messages = pdo_fetchall("select * from ".tablename('hcweivote_message')." where isopen = 1 and weid = ".$_W['weid']." order by createtime desc");
		include $this->template('message');
		exit;
	}
	
	if($op=='report'){
		$creditrule = explode(",", $rule['credit']);
		$low = $creditrule[0];
		$high = $creditrule[1];
		$credit1 = mt_rand($low,$high);
		$credits = array(
			'weid'=>$_W['weid'],
			'from_user'=>$_W['fans']['from_user'],
			'credit'=>$credit1,
			'flag'=>0,
			'createtime'=>time(),
		);
		if($credit == -1){
			pdo_insert('hcweivote_credit', $credits);
			$fcredit = fans_search($_W['fans']['from_user'], array('credit1'));
			pdo_update('fans', array('credit1'=>$fcredit['credit1']+$credit1), array('weid'=>$weid, 'from_user'=>$_W['fans']['from_user'], 'weid'=>$_W['weid']));
			echo $credit1;
			exit;
		} else {
			echo 0;
			exit;
		}
	}
	
	include $this->template('home');
?>