<?php
	if (checksubmit('submit')) {
		$credit1 = intval($_GPC['credit1']);
		$credit2 = intval($_GPC['credit2']);
		$voting = trim($_GPC['voting']);
		$visit = trim($_GPC['visit']);
		$share = trim($_GPC['share']);
		if(empty($credit1)){
			$credit1 = 0;
		} else {
			$credit1 = is_numeric($credit1) ? $credit1 : message('请输入合法的积分数');
		}
		if(empty($credit2)){
			$credit2 = 0;
		} else {
			$credit2 = is_numeric($credit2) ? $credit2 : message('请输入合法的积分数');
		}
		if(empty($voting)){
			$voting = 0;
		} else {
			$voting = is_numeric($voting) ? $voting : message('请输入合法的投票数');
		}
		if(empty($visit)){
			$visit = 0;
		} else {
			$visit = is_numeric($visit) ? $visit : message('请输入合法的浏览数');
		}
		if(empty($share)){
			$share = 0;
		} else {
			$share = is_numeric($share) ? $share : message('请输入合法的转发数');
		}
		if($credit1<$credit2){
			$credit = $credit1.','.$credit2;
		} else {
			$credit = $credit2.','.$credit1;
		}
		$data = array(
			'weid' => $_W['weid'],
			'title' => $_GPC['title'],
			'rule' => htmlspecialchars_decode(trim($_GPC['rule'])),
			'gzurl' => trim($_GPC['gzurl']),
			'sharecontent' => trim($_GPC['sharecontent']),
			'voting' => $voting,
			'credit' => $credit,
			'visit' => $visit,
			'share' => $share,
			'createtime' => TIMESTAMP
		);
		if (empty($_GPC['id'])) {
			pdo_insert('hcweivote_rule', $data);
		} else {
			unset($data['createtime']);
			pdo_update('hcweivote_rule', $data, array('id' => $_GPC['id']));
		}
		message('操作成功', $this->createWebUrl('rule'), 'success');
	}
	$theone = pdo_fetch("SELECT * FROM " . tablename('hcweivote_rule') . " WHERE weid = :weid ", array(':weid' => $_W['weid']));
	$credit = explode(",", $theone['credit']);
	$theone['credit1'] = $credit[0];
	$theone['credit2'] = $credit[1];
	include $this->template('web/rule');
?>