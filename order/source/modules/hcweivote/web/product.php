<?php
	
	if($op == 'display') {
		if($_GPC['opp']=='sort'){
			$sort = array(
				'title'=>trim($_GPC['title']),
				'mobile'=>trim($_GPC['mobile'])
			);
			$list = pdo_fetchall('select * from '.tablename('hcweivote_member')." where weid =".$weid." and ischeck = 1 and title like '%".$sort['title']."%' and mobile like '%".$sort['mobile']."%' order by listorder desc");
		} else {
			$pindex = max(1, intval($_GPC['page']));
			$psize = 15;
			$list = pdo_fetchall('select * from '.tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 order by listorder desc limit ".($pindex - 1) * $psize . ',' . $psize);
			$total = pdo_fetchcolumn('select count(id) from '.tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1");
			$pager = pagination1($total, $pindex, $psize);
		}
		$messages = pdo_fetchall("select mid, count(mid) as mnum from ".tablename('hcweivote_message')." where weid = ".$weid." group by mid");
		$message = array();
		foreach($list as $l){
			foreach($messages as $m){
				if($l['id'] == $m['mid']){
					$message[$l['id']] = $m['mnum'];
					break;
				} else{
					$message[$l['id']] = 0;
				}
			}
		}
		if(checksubmit('submit')) {
			foreach ($_GPC['listorder'] as $key => $val) {
				pdo_update('hcweivote_member', array('listorder' => intval($val)),array('id' => intval($key)));
			}
			message('更新作品排序成功！', $this->createWebUrl('product', array('op'=>'display')), 'success');
		}
	}

	if($op == 'post') {
		$id = intval($_GPC['id']);
		$rule = pdo_fetch("select * from ".tablename('hcweivote_rule')." where weid = ".$weid);
		if(empty($rule)){
			message('请先添加规则！', $this->createWeburl('rule'), 'error');
		}
		if($id > 0) {
			$theone = pdo_fetch('select * from '.tablename('hcweivote_member')." where  weid = :weid and id = :id" , array(':weid' => $_W['weid'],':id' => $id));
			$photos = pdo_fetchall("select * from ".tablename('hcweivote_photo')." where weid = ".$weid." and mid = ".$id);
		} else {
			$theone = array('status' => 1,'listorder' => 0);
		}
		
		if (checksubmit('submit')) {
			$vote = trim($_GPC['vote']);
			$share = trim($_GPC['share']);
			$visit = trim($_GPC['visit']);
			if(empty($vote)){
				$vote = 0;
			} else {
				$vote = is_numeric($vote) ? $vote : message('请输入合法的投票数');
			}
			if(empty($share)){
				$share = 0;
			} else {
				$share = is_numeric($share) ? $share : message('请输入合法的转发数');
			}
			if(empty($visit)){
				$visit = 0;
			} else {
				$visit = is_numeric($visit) ? $visit : message('请输入合法的浏览数');
			}
			
			$insert = array(
				'weid' => $_W['weid'],
				'title' => $_GPC['title'],
				'mobile' => $_GPC['mobile'],
				'cover' => $_GPC['cover'],
				'content' => trim($_GPC['content']),
				'status' => $_GPC['status'],
				'listorder' => $_GPC['listorder'],
				'voting' => $rule['voting'],
				'vote' => $vote,
				'share' => $share,
				'visit' => $visit,
				'ischeck' => 1,
				'jointime' => strtotime($_GPC['jointime']),
				'createtime' => TIMESTAMP,
				'updatevotetime' => TIMESTAMP
			);
			
			if(!empty($_GPC['cover'])){
				if(empty($_GPC['cover1']) || $_GPC['cover']!=$_GPC['cover1']){
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
					$insert['thumb'] = $realpath."thumb".$name.".jpg";
				}
			}
			
			if(empty($id)) {
				pdo_insert('hcweivote_member', $insert);
				if(pdo_insertid()){
					$photos = $_GPC['photos'];
					$mid = pdo_insertid();
					if(!empty($photos)){
						$createtime = time();
						foreach($photos as $p){
							$photo = array(
								'weid'=>$weid,
								'mid'=>$mid,
								'photo'=>$p,
								'createtime'=>$createtime,
							);
							pdo_insert('hcweivote_photo', $photo);
						}
					}
				}
			} else {
				unset($insert['createtime']);
				pdo_update('hcweivote_member', $insert,array('id' => $id));
				
				$photos = $_GPC['photos'];
				if(!empty($photos)){
					pdo_delete('hcweivote_photo', array('mid'=>$id, 'weid'=>$weid));
					$createtime = time();
					foreach($photos as $p){
						$photo = array(
							'weid'=>$weid,
							'mid'=>$id,
							'photo'=>$p,
							'createtime'=>$createtime,
						);
						pdo_insert('hcweivote_photo', $photo);
					}
				}
			}
			message('提交作品数据成功！', $this->createWebUrl('product'), 'success');
		}
		include $this->template('web/product_post');
		exit;
	}

	if($op == 'delete') {
		$temp = pdo_delete('hcweivote_member',array('id'=>$_GPC['id']));
		pdo_delete('hcweivote_photo',array('mid'=>$_GPC['id'], "weid"=>$weid));
		pdo_delete('hcweivote_message',array('mid'=>$_GPC['id'], "weid"=>$weid));
		if(empty($temp)){
			message('删除数据失败！', $this->createWebUrl('product'), 'error');
		}else{
			message('删除数据成功！', $this->createWebUrl('product'), 'success');
		}
	}
	
	if($op=='checklist'){
		if($_GPC['opp']=='sort'){
			$sort = array(
				'title'=>trim($_GPC['title']),
				'mobile'=>trim($_GPC['mobile'])
			);
			$list = pdo_fetchall('select * from '.tablename('hcweivote_member')." where weid =".$weid." and ischeck = 0 and title like '%".$sort['title']."%' and mobile like '%".$sort['mobile']."%' order by listorder desc");
		} else {
			$pindex = max(1, intval($_GPC['page']));
			$psize = 15;
			$list = pdo_fetchall('select * from '.tablename('hcweivote_member')." where weid =".$weid." and ischeck = 0 order by listorder desc limit ".($pindex - 1) * $psize . ',' . $psize);
			$total = pdo_fetchcolumn('select count(id) from '.tablename('hcweivote_member')." where weid =".$weid." and ischeck = 0");
			$pager = pagination1($total, $pindex, $psize);
		}
		include $this->template('web/product_check_list');
		exit;
	}
	
	if($op=='checkpost'){
		$id = intval($_GPC['id']);
		if(checksubmit('submit')){
			$check = array(
				'ischeck'=>$_GPC['ischeck'],
				'content'=>trim($_GPC['content']),
				'checktime'=>time()
			);
			pdo_update('hcweivote_member', $check, array('id'=>$id));
			message('提交成功！', $this->createWebUrl('product', array('op'=>'checklist')), 'success');
		}
		$theone = pdo_fetch('SELECT * FROM '.tablename('hcweivote_member')." WHERE  weid = :weid  AND id = :id and ischeck = 0" , array(':weid' => $_W['weid'],':id' => $id));
		$photos = pdo_fetchall("select * from ".tablename('hcweivote_photo')." where weid = ".$weid." and mid = ".$id);
		include $this->template('web/product_check_post');
		exit;
	}
	
	if($op == 'checkdelete') {
		$temp = pdo_delete('hcweivote_member',array('id'=>$_GPC['id']));
		pdo_delete('hcweivote_photo',array('mid'=>$_GPC['id'], "weid"=>$weid));
		if(empty($temp)){
			message('删除数据失败！', $this->createWebUrl('product', array('op'=>'checklist')), 'error');
		}else{
			message('删除数据成功！', $this->createWebUrl('product', array('op'=>'checklist')), 'success');
		}
	}
	
	$photos = pdo_fetchall("select mid, count(mid) as num from ".tablename('hcweivote_photo')." where weid = ".$weid." group by mid order by mid asc");
	$photo = array();
	foreach($photos as $p){
		$photo[$p['mid']] = $p['num'];
	}
	
	include $this->template('web/product_list');
?>