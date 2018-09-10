<?php
	$mid = $_GPC['mid'];
	
	if($op=='display'){
		$pindex = max(1, intval($_GPC['page']));
		$psize = 30;
		$list = pdo_fetchall("select * from ".tablename('hcweivote_message')." where weid = ".$_W['weid']." and mid = ".$mid. " order by createtime desc LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
		$total = pdo_fetchcolumn("select count(id) from ".tablename('hcweivote_message')." where weid = ".$_W['weid']." and mid = ".$mid);
		$pager = pagination1($total, $pindex, $psize);
	}
	if($op=='sort'){
		$op = 'display';
		$sort = array(
			'mobile'=>$_GPC['mobile']
		);
		$list = pdo_fetchall("select * from ".tablename('hcweivote_message')." where weid = ".$_W['weid']." and mid = ".$mid. " and mobile like '%".$sort['mobile']."%' order by createtime desc");
	}
	if($op=='post'){
		$id = $_GPC['id'];
		if(intval($id)){
			$item = pdo_fetch("select * from ".tablename('hcweivote_message')." where id = ".$id);
		}
		if(checksubmit('submit')){
			$message = array(
				'weid'=>$_W['weid'],
				'mid'=>$mid,
				'mobile'=>$_GPC['mobile'],
				'message'=>trim($_GPC['message']),
				'createtime'=>strtotime($_GPC['createtime']),
				'isopen'=>$_GPC['isopen']
			);
			
			if(intval($id)){
				$temp = pdo_update('hcweivote_message', $message, array('id'=>$id));
				if($temp){
					message('提交成功！', $this->createWebUrl('message', array('op'=>'display', 'mid'=>$mid)), 'success');
				} else {
					message('提交失败！', $this->createWebUrl('message', array('op'=>'post', 'mid'=>$mid, 'id'=>$id)), 'error');
				}
			} else {
				$temp = pdo_insert('hcweivote_message', $message);
				if($temp){
					message('提交成功！', $this->createWebUrl('message', array('op'=>'display', 'mid'=>$mid)), 'success');
				} else {
					message('提交失败！', $this->createWebUrl('message', array('op'=>'post', 'mid'=>$mid, 'id'=>$id)), 'error');
				}
			}
		}
	}
	
	if($op=='delete'){
		$temp = pdo_delete('hcweivote_message', array('id'=>$_GPC['id']));
		if($temp){
			message('删除成功！', $this->createWebUrl('message', array('op'=>'display', 'mid'=>$mid)), 'success');
		} else {
			message('删除失败！', $this->createWebUrl('message', array('op'=>'post', 'mid'=>$mid, 'id'=>$id)), 'error');
		}
	}
	
	include $this->template('web/message');
?>