<?php
	

	
	
	$info = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."'");
	
	$cfg = $this->module['config'];
	if($op=='display'){
		if(empty($info)){
	      message('请先注册！', $this->createMobileUrl('register'), 'error');
	    }
		$mid = $_GPC['id'];

		$starttime = strtotime(date('Y-m-d 00:00:00'));
		$endtime = strtotime(date('Y-m-d 23:59:59'));
		$isupdatevote = pdo_fetch("select id from ".tablename('hcweivote_member')." where weid = ".$_W['weid']." and from_user = '".$_W['fans']['from_user']."' and updatevotetime > ".$starttime." and updatevotetime < ".$endtime);
		if(empty($isupdatevote)){
			$updatevotetime = array(
				'voting'=>$rule['voting'],
				'updatevotetime'=>time()
			);
			pdo_update('hcweivote_member', $updatevotetime, array('weid'=>$weid, 'from_user'=>$_W['fans']['from_user']));
		}
	
		$member = pdo_fetch("select * from ".tablename('hcweivote_member')." where ischeck = 1 and status = 1 and jointime <= ".time()." and weid = ".$_W['weid']." and id = ".$mid);
		if($member['from_user'] == $_W['fans']['from_user'] && $member['weid'] == $weid){
			$op = 'myproducts';
			$photos = pdo_fetchall("select * from ".tablename('hcweivote_photo')." where weid = ".$_W['weid']." and mid = ".$mid);
		} else {
			$mem = pdo_fetch("select * from ".tablename('hcweivote_member')." where id = ".$mid);
			if($mem['ischeck'] == 0) {
				message('请耐心等待审核。。。');
			}
			if ($mem['status'] == 0) {
				message('您的账户已被禁用！！！');
			}
			if ($mem['jointime'] > time()) {
				message('未到参赛时间。。。');
			}
			$photos = pdo_fetchall("select * from ".tablename('hcweivote_photo')." where weid = ".$_W['weid']." and mid = ".$mid);
		}
	 
		if($_GPC['opp']=='visit'){
			
			if($_W['fans']['from_user']!=$member['from_user']){
				pdo_update('hcweivote_member', array('visit'=>$member['visit']+1), array('id'=>$mid));
			}
			echo 1;
			exit;
		}
		if($_GPC['opp']=='share'){
			if($_W['fans']['from_user']!=$member['from_user']){
				pdo_update('hcweivote_member', array('share'=>$member['share']+1), array('id'=>$mid));
				$share = $member['share'] + 1;
			} else {
				$share = $member['share'];
			}
			echo $share;
			exit;
		}
		
	}
	
	// if($op=='myproducts'){
		// $mid = $_GPC['id'];
		// $member = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$_W['weid']." and id = ".$mid);
		// $photos = pdo_fetchall("select * from ".tablename('hcweivote_photo')." where weid = ".$_W['weid']." and mid = ".$mid);
	// }
	
	if($op=='post'){
		$mid = $_GPC['id'];
		$member = pdo_fetch("select title, thumb from ".tablename('hcweivote_member')." where id = ".$mid);
		if(checksubmit('submit')){
			$photo = !empty($_GPC['photo']) ? $_GPC['photo'] : message('请上传作品！');
			$title = !empty($_GPC['title']) ? $_GPC['title'] : message('请填写作品说明！');
			$photo = array(
				'weid'=>$weid,
				'mid'=>$mid,
				'title'=>$title,
				'photo'=>$photo,
				'createtime'=>time()
			);
			pdo_insert('hcweivote_photo', $photo);
			message('上传成功', $this->createMobileUrl('photos', array('op'=>'post', 'id'=>$mid)), 'success');
		}
		$pnum = pdo_fetchcolumn("select count(id) from ".tablename('hcweivote_photo')." where weid = ".$_W['weid']." and mid = ".$mid);
		include $this->template('photos_post');
		exit;
	}
	
	if($op=='voting'){
		$mid = $_GPC['mid'];
	//	$info = pdo_fetch("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."'");
		if(empty($info)){
		//	message('请先注册！', $this->createMobileUrl('register'), 'error');
		}
		if($info['status']==0){
		//	message('您已被禁用，不能投票！');
		}
		$starttime = strtotime(date('Y-m-d 00:00:00'));
		$endtime = strtotime(date('Y-m-d 23:59:59'));
		
		$tpqk = pdo_fetch("select votes,id from ".tablename('hcweivote_tpqk').
               " where weid = ".$weid." and from_user = '".$_W['fans']['from_user']."' and "
              .$starttime."<createtime and ".$endtime.">createtime");
        
     
              
		$votings=$tpqk['votes'];
		
		$votings=empty($votings)?0:$votings;
		
		
		//$myvotes = pdo_fetch("select id, voting from ".tablename('hcweivote_member')." where weid = ".$_W['weid']." and from_user = '".$_W['fans']['from_user']."'");
		if($rule['voting'] <= $votings){
			echo -1;
			exit;
		} else {
			$member = pdo_fetch("select id, vote from ".tablename('hcweivote_member')." where ischeck = 1 and status = 1 and jointime <= ".time()." and weid = ".$_W['weid']." and id = ".$mid);
			if(empty($member)){
				echo -2;
				exit;
			} else {
				$voting = array(
					'vote'=>$member['vote']+1
				);
				
				pdo_update('hcweivote_member', $voting, array('id'=>$mid));
				
				$my = array(
					'from_user'=>$_W['fans']['from_user'],
					'weid'=>$_W['weid'],
					'mid'=>$mid,
					'createtime'=>time(),
					'ipaddr'=>getip()
				);
				
				if (empty($tpqk['id'])){
					$my['votes']=1;
					pdo_insert('hcweivote_tpqk', $my);
					
				} else {
				    $my['votes']=$votings+1;
					pdo_update('hcweivote_tpqk', $my);
				}
				
				$json['myvotes'] = $rule['voting']-$votings-1;
				$json['vote'] = $votings+1;
				echo json_encode($json);
				exit;
			}
		}
	}
	
	include $this->template('photos');
?>