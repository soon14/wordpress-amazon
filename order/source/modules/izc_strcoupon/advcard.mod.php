<?php
/*
	添加优惠券
*/
function coupon_add($_insert,$coupon_type=1){
	global $_W,$_GPC;
	if(empty($_insert)){
		return false;
	}
	//对模块标识校验,查询表
	if(empty($_GPC['name'])){
		return false;
	}
	$_insert['module_name'] = $_GPC['name'];//模块名称
	//现金券分类(貌似不需要)
	$type = array(
		1=>'现金券',
		2=>'兑换券',
		3=>'礼品券',
	);
	$_insert['type'] = $_insert['type']?$_insert['type']:$coupon_type;
	if(empty($type[$_insert['type']])){
		return false;
	}
	$_insert['weid'] = $_insert['weid']?$_insert['weid']:$_W['weid'];
	$res = pdo_insert('strcoupon',$_insert);
	return $res;
}
/*
	删优惠券
*/
function coupon_delete($coupon_id){
	
	if($coupon_id){
		$res = pdo_delete('strcoupon',array('id'=>$coupon_id));
		//TODO是否删除
		pdo_delete('strcoupon_fans',array('coupon_id'=>$coupon_id));
	}
	return $res;
}
/*
	更新优惠券
*/
function coupon_update($data,$coupon_id){
	if(!empty($data)&&$coupon_id){
		$res = pdo_update('strcoupon',$data,array('id'=>$coupon_id));
	}
	return $res;
}
/*
	查优惠券
*/
function coupon_fetch($coupon_id){
	if($coupon_id){
		$res = pdo_fetch("SELECT * FROM ".tablename('strcoupon')." WHERE id = $coupon_id",array());
	}
	return $res;
}
/*
	所有优惠券
	对有有效期进行判断
*/
function coupon_fetchall(){
	global $_W;
	return pdo_fetchall("SELECT * FROM ".tablename('strcoupon')." where weid = :weid order by displayorder asc ",array('weid'=>$_W['weid']));
}

/*
	查询我的优惠券
*/
function coupon_fans_fetch($coupon_id){
	global $_W;
	$from_user = $_W['fans']['from_user'];
	if(empty($from_user)){
		return 0;
	}
	$coupon_fans = pdo_fetch("SELECT * FROM ".tablename('strcoupon_fans')." WHERE coupon_id = '$coupon_id' and from_user = '$from_user'",array());
	return $coupon_fans;
}
/*
	我的所有优惠券
*/
//TODO 这里要优化一下(判断下有效期和数量) 已优化
function coupon_fans_fetchall(){
	global $_W;
	
	if(check_module()){

		$from_user = $_W['fans']['from_user'];
		
		$res = pdo_fetchall("SELECT * FROM ".tablename('strcoupon_fans')." where weid = :weid and from_user = '$from_user' and num-inuse_num-used_num>0 and start_time < ".TIMESTAMP." and end_time> ".(TIMESTAMP-86400)." order by create_time asc ",array('weid'=>$_W['weid']));
	}
	return $res;
}
/*
	更新我的优惠券
*/
function coupon_fans_update($coupon_id,$data){
	if(!empty($data)&&$coupon_id){
		$res = pdo_update('strcoupon_fans',$data,array('coupon_id'=>$coupon_id));
	}
	return $res;
}
/*
	使用我的优惠券
	$coupon_id优惠券id
	$total_price 商品价格
	$order_id 订单id
*/
function coupon_fans_use($coupon_id,$total_price){
	global $_W;
	$return=array();
	$return['status'] = 1; 
	$from_user = $_W['fans']['from_user'];
	if(!$from_user){
		$return['status'] = 0; 
		$return['msg'] = 'from_user不存在';
	}
	if($return['status']){
		if(!$coupon_id||!$total_price){
			$return['status'] = 0; 
			$return['msg'] = '传入的参数有误';
		}
	}
	if($return['status']){
		//TODO 有时间看下 要不要改成id
		$mycoupon = coupon_fans_fetch($coupon_id);
		if(empty($mycoupon)){
			$return['status'] = 0; 
			$return['msg'] = '优惠券不存在';
			return $return;
		}
		if($mycoupon['total_money']>$total_price){//抵用券存在,并且大于领取金额
			$return['status'] = 0; 
			$return['msg'] = '没达到优惠券使用要求';
			return $return;	
		}
		//判断优惠券的数量是否大于零
		if(($mycoupon['num']-$mycoupon['using_num']-$mycoupon['inuse_num'])<1){
			$return['status'] = 0; 
			$return['msg'] = '优惠券数量不足';
			return $return;				
		}
		if(($mycoupon['num']-$mycoupon['used_num']-$mycoupon['inuse_num'])>0){//抵用券数量
			$res = pdo_query("update ".tablename('strcoupon_fans')." set inuse_num=inuse_num+1 where coupon_id=".$coupon_id." and from_user = '$from_user' and weid = :weid",array('weid'=>$_W['weid']));
			if($res){
				//在coupon_fans_log表中添加记录

				$total_price -= $mycoupon['discount_money'];
				$return['msg'] = '优惠券使用成功';
				$return['total_price'] = $total_price;
			}else{
				$return['status'] = 0; 
				$return['msg'] = '优惠券使用失败';			
			}
		}
	}
	return $return;
}
/*
	创建优惠券使用记录
*/
function coupon_fans_log_add($coupon_fans_id,$order_id,$order_sn){
	global $_W,$_GPC;
	$return = array();
	$return['status'] = 1;
	if(!$coupon_fans_id){
		return return_error_msg('fans优惠券id不能为空');
	}
	if(empty($order_id)){
		return return_error_msg('订单id不能为空');
	}
	//获取fans使用的优惠券
	$coupon_fans = common_fetch('strcoupon_fans',$coupon_fans_id);
	if(empty($coupon_fans)){
		return return_error_msg('fans优惠券不存在');
	}
	$data = array(
		'weid'=>$_W['weid'],
		'create_time'=>TIMESTAMP,
		'discount_money'=>$coupon_fans['discount_money'],
		'coupon_fans_id'=>$coupon_fans_id,
		'order_id'=>$order_id,
		'module_name'=>$_GPC['name'],
		'from_user'=>$coupon_fans['from_user'],
		'coupon_name'=>$coupon_fans['coupon_name'],
		'order_sn'=>$order_sn,
	);
	$res =  common_add('strcoupon_fans_log',$data);
	if($res){
		return return_success_msg('成功');
	}else{
		return return_error_msg('添加失败');
	}
}

/*
	使用的优惠券确认,$status:1已使用,2未使用 优惠券的状态只能改变一次,后面根据情况再改
	这里的$_GPC['name']必须是当前模块名
*/
function coupon_fans_used($order_id,$status){
	global $_GPC;
	if(!$_GPC['name']){
		return return_error_msg('模块名不存在');
	}
	if($status!=1&&$status!=2){
		return return_error_msg('请输入正确的状态');
	}
	if(!$order_id){
		return return_error_msg('订单号不能为空');
	}
	$coupon_fans_log = pdo_fetch("SELECT * FROM ".tablename('strcoupon_fans_log')." WHERE order_id='$order_id' and module_name=:module_name",array('module_name'=>$_GPC['name']));
	if($coupon_fans_log['status']!=0){
		return return_error_msg('优惠券已使用');
	}
	if(!$coupon_fans_log){
		return return_error_msg('没有使用优惠券');
	}
	$coupon_fans = common_fetch('strcoupon_fans',$coupon_fans_log['coupon_fans_id']);
	//这里更新优惠券状态 使用了 或未使用
	$res = pdo_update('strcoupon_fans_log',array('isused'=>$status),array('order_id'=>$order_id,'module_name'=>$_GPC['name']));
	if(!$res){
		return return_error_msg('修改失败');
	}
	if($coupon_fans['inuse_num']>0&&$status==1){//确认使用了
		$res = pdo_query("update ".tablename('strcoupon_fans')." set inuse_num=inuse_num-1,used_num = used_num+1 where id = :id ",array('id'=>$coupon_fans['id']));
	}elseif($coupon_fans['inuse_num']>0&&$status==2){//确认未使用
		$res = pdo_query("update ".tablename('strcoupon_fans')." set inuse_num=inuse_num-1 where id = :id ",array('id'=>$coupon_fans['id']));
	}else{
		return return_error_msg('没有正在使用的优惠券');
	}
	if(!$res){
		return return_error_msg('修改失败1');
	}
	return return_success_msg('success');
}

/*
	添加我领取的优惠券
*/
function coupon_fans_receive($from_user,$_insert,$coupon_id){
	global $_W;
	$return = array();
	$return['status'] = 0;
	//获取from_user
	$from_user = $from_user?$from_user:$_W['fans']['from_user'];
	//校验from_user
 	if(empty($from_user)){
		$return['msg'] = 'fron_user不存在';
		return $return;
	}
	//校验添加的数据
 	if(empty($_insert)){
		$return['msg'] = '要添加的数据不能为空';
		return $return;
	}
	//校验优惠券的id
 	if(empty($coupon_id)){
		$return['msg'] = '请填写优惠券的id';
		return $return;
	}
	$fans=fans_search($from_user,array('id'));
	//对粉丝进行校验
 	if(empty($fans)){
		$return['msg'] = '请先关注';
		return $return;
	}

	$_insert['weid']		= $_insert['weid']?$_insert['weid']:$_W['weid'];
	$_insert['from_user']	= $_insert['from_user']?$_insert['from_user']:$from_user;

	//
	$coupon = pdo_fetch("SELECT * FROM ".tablename('strcoupon')." where id = $coupon_id",array());
	$coupon_fans = pdo_fetch("SELECT * FROM ".tablename('strcoupon_fans')." WHERE coupon_id = $coupon_id and from_user = '$from_user' ",array());
	if(empty($coupon)){
		$return['msg'] = '要领取的优惠券不存在';
		return $return;
	}
	//对fans的优惠券进行校验
	if($coupon_fans){
		//看下能不能写到入口处
		$today = mktime(0,0,0);
		//每天更新次数
		if(intval($coupon_fans['last_time'])<$today){
			$res = pdo_query("update ".tablename('strcoupon_fans')." set day_surplus_num=".$coupon['user_day_sum']." where coupon_id=".$coupon_id."");
			$res = pdo_query("update ".tablename('strcoupon')." set day_surplus_num=".$coupon['day_sum']." where id=".$coupon_id."");
			$coupon_fans['day_surplus_num'] = $coupon['user_day_sum'];
			$coupon['day_surplus_num'] = $coupon['day_sum'];
		}
		//用户领取数
		if($coupon_fans['surplus_num']<1){
			$return['msg'] = '你的优惠券已经领完';
			return $return;
		}
		//总每天领取判断
		if($coupon['day_surplus_num']<1){
			$return['msg'] = '当天的本优惠券已经领完';
			return $return;
		}
		//总领取数
		if($coupon['surplus_num']<1){
			$return['msg'] = '本优惠券已经领完';
			return $return;
		}
		//用户当天领取数
		if($coupon_fans['day_surplus_num']<1){
			$return['msg'] = '你当天的优惠券已经领完';
			return $return;
		}
	}
	//添加优惠券
	if(!$coupon_fans){
		$res = pdo_insert('strcoupon_fans',$_insert);
	}else{
		$_insert = array('last_time'=>TIMESTAMP);
		//不要更新
		//pdo_update('strcoupon_fans',$_insert,array('coupon_id'=>$coupon_id,'from_user' => $from_user));
		$res = pdo_query("update ".tablename('strcoupon_fans')." set num=num+1,surplus_num=surplus_num-1,day_surplus_num=day_surplus_num-1 where coupon_id=".$coupon_id." and from_user = '$from_user'");
	}
	if($res){
		pdo_query("update ".tablename('strcoupon')." set surplus_num=surplus_num-1,day_surplus_num=day_surplus_num-1 where id=".$coupon_id."");
		$return['msg'] = '领取成功';
		$return['status'] = 0;
		return $return;
	}
	return false;
}
function check_module(){
	$module = pdo_fetch("SELECT name FROM ".tablename('modules')." where name = 'izc_strcoupon' ");
	if($module){
		return true;
	}else{
		return false;
	}
}
/*
	公共方法
*/
//增公共
function common_add($table_name,$data){
	if($data){
		$res = pdo_insert($table_name,$data);
	}
	return $res;
}
/*
	删公共
*/
function common_delete($table_name,$id){
	if($id){
		$res = pdo_delete($table_name,array('id'=>$id));
	}
	return $res;
}
/*
	改公共
*/
function common_update($table_name,$data,$id){
	if(!empty($data)&&$id){
		$res = pdo_update($table_name,$data,array('id'=>$id));
	}
	return $res;
}
/*
	查公共
*/
function common_fetch($table_name,$id){
	if($id){
		$res = pdo_fetch("SELECT * FROM ".tablename($table_name)." WHERE id = $id",array());
	}
	return $res;
}
/*
	所有公共
*/
function common_fetchall($table_name){
	global $_W;
	return pdo_fetchall("SELECT * FROM ".tablename($table_name)." where weid = :weid order by displayorder asc ",array('weid'=>$_W['weid']));
}

//错误返回msg
function return_error_msg($msg){
	$return['status'] = 0;
	$return['msg'] = $msg;
	return $return;	
}
//成功返回msg
function return_success_msg($msg){
	$return['status'] = 1;
	$return['msg'] = $msg;
	return $return;	
}
