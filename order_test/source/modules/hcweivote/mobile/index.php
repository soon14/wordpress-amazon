<?php
	if($op=='display'){
		$pindex = max(1, intval($_GPC['page']));
		$psize = 15;
		$products = pdo_fetchall("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time()." order by listorder desc,id desc limit " . ($pindex - 1) * $psize . ',' . $psize);
		$total = pdo_fetchcolumn("select count(id) from ".tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 and status = 1  and jointime <= ".time());
		$pager = pagination1($total, $pindex, $psize);
	}
	
	if($op=='sort'){
		$sort = trim($_GPC['sort']);
		if(is_numeric($sort)){
			$products = pdo_fetchall("select * from ".tablename('hcweivote_member')." where id = ".$sort." and weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time()." order by listorder desc,id desc");
		} else {
			$products = pdo_fetchall("select * from ".tablename('hcweivote_member')." where title like '%".$sort."%' and weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time()." order by listorder desc,id desc");
		}
	}
	
	if($op=='log'){
		$data = pdo_fetch("select share, visit from ".tablename('hcweivote_rule')." where weid = ".$weid);
		if($_GPC['opp']=='visit'){
			pdo_update('hcweivote_rule', array('visit'=>$data['visit']+1), array('weid'=>$weid));
			echo 1;
			exit;
		}
		if($_GPC['opp']=='share'){
			pdo_update('hcweivote_rule', array('share'=>$data['share']+1), array('weid'=>$weid));
			$share = $data['share']+1;
			echo $share;
			exit;
		}
	}
	
	if($op=='phb'){
		$pindex = max(1, intval($_GPC['page']));
		$psize = 15;
		$products = pdo_fetchall("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time()." order by vote desc,id desc limit " . ($pindex - 1) * $psize . ',' . $psize);
		$total = pdo_fetchcolumn("select count(id) from ".tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time());
		$pager = pagination1($total, $pindex, $psize);
	}
	
		if($op=='lll'){
		$pindex = max(1, intval($_GPC['page']));
		$psize = 15;
		$products = pdo_fetchall("select * from ".tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time()." order by visit desc,id desc limit " . ($pindex - 1) * $psize . ',' . $psize);
		$total = pdo_fetchcolumn("select count(id) from ".tablename('hcweivote_member')." where weid = ".$weid." and ischeck = 1 and status = 1 and jointime <= ".time());
		$pager = pagination1($total, $pindex, $psize);
	}

	$slides = pdo_fetchall("select * from ".tablename('hcweivote_slide')." where weid = ".$weid." and isshow = 1 order by listorder desc");
	
	include $this->template('index');
?>