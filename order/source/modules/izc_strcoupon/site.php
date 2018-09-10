<?php
/**
 * 礼券模块微站定义
 *
 * @author 智策&strai
 * @url 
 */
defined('IN_IA') or exit('Access Denied');
require_once 'advcard.mod.php';
class Izc_strcouponModuleSite extends WeModuleSite {
	public $table_name = 'strcoupon';
	public $table_fans = 'strcoupon_fans';
	public function doWebManage() {
		global $_W,$_GPC;
		$op = $_GPC['op']?$_GPC['op']:'display';
		$id = intval($_GPC['id']);
		if($op == 'display'){
			if (!empty($_GPC['displayorder'])) {
				foreach ($_GPC['displayorder'] as $id => $displayorder) {
					pdo_update($this->table_name, array('displayorder' => $displayorder), array('id' => $id));
				}
				message('分类排序更新成功！', 'refresh', 'success');
			}
			$coupons = coupon_fetchall();
			//查出每个优惠券的使用情况,并写进数组中
			foreach($coupons as &$c){
				$data = pdo_fetch("select * from ".tablename('strcoupon_fans')."where coupon_id=:coupon_id and weid =:weid limit 1",array('weid'=>$_W['weid'],'coupon_id'=>$c['id']));
				if(!empty($data)){
					$c['isuse'] = 1;
				}else{
					$c['isuse'] = 0;
				}
			}
		}elseif($op == 'post'){
			if(checksubmit('submit')){
				$data = array(
					'weid' =>$_W['weid'],
					'create_time' =>time(),
					'displayorder' =>intval($_GPC['displayorder']),
					'name' =>$_GPC['coupon_name'],
					'start_time' =>strtotime($_GPC['datelimit-start']),
					'end_time' =>strtotime($_GPC['datelimit-end']),
					'total_num' =>intval($_GPC['total_num']),
					'day_sum' =>intval($_GPC['day_sum']),
					'user_sum' =>intval($_GPC['user_sum']),
					'user_day_sum' =>intval($_GPC['user_day_sum']),
					'total_money' =>$_GPC['total_money'],
					'discount_money' =>$_GPC['discount_money'],
					'day_surplus_num' => intval($_GPC['day_sum']),
					'surplus_num' => intval($_GPC['total_num']),
				);
				if($id){
					//更新的时候,优惠券的数量和限领数 如果有数据就不应该给修改
					$res = coupon_update($data,$id);
					if($res){
						message('更新成功',$this->createWebUrl('Manage'),'success');
					}else{
						message('更新失败',$this->createWebUrl('Manage'),'error');
					}
				}else{
					//只有第一次是直接相等
					$res = coupon_add($data,1,$this->module['name']);
					if($res){
						message('添加成功',$this->createWebUrl('Manage'),'success');
					}else{
						message('添加成功',$this->createWebUrl('Manage'),'error');
					}
				}
			}
			//优惠券类型
			$types = array(
				1=>'现金券',
				2=>'兑换券',
			);
			if($id){//更新
				$coupon =coupon_fetch($id);
				//查出优惠券是否被使用
				//如果已使用,数量不让修改
				$data = pdo_fetch("select * from ".tablename('strcoupon_fans')."where coupon_id={$id} and weid =:weid limit 1",array('weid'=>$_W['weid']));
				if(empty($data)){
					$isuse = 0;//未被使用
				}else{
					$isuse = 1;//已被使用
				}
			}else{//创建
				$coupon = array(
					'start_time' =>TIMESTAMP,
					'end_time' =>TIMESTAMP+518400,
				);			
			}

		}elseif($op == 'delete'){
			if($id){
				if(coupon_delete($id)){
					message('删除成功',$this->createWebUrl('Manage'),'success');
				}else{
					message('删除失败',$this->createWebUrl('Manage'),'error');
				}
			}else{
				message('要删除的优惠券不存在',$this->createWebUrl('Manage'),'error');
			}
		}
		include $this->template('manage');
	}

	public function doWebReceive(){
		global $_GPC,$_W;
		$op = $_GPC['op']?$_GPC['op']:'display';
		if($op=='display'){
			$pindex = intval($_GPC['page'])?intval($_GPC['page']):1;
			$psize = 10;
			$params['weid'] = $_W['weid'];
			$limit = " limit ".($pindex-1)*$psize.",".$psize;
			if (isset($_GPC['keywords'])) {
				$sql = ' AND `coupon_name` LIKE :keywords';
				$params['keywords'] = "%{$_GPC['keywords']}%";
			}
			if (isset($_GPC['keywords1'])) {
				$sql .= ' AND `from_user` LIKE :keywords1';
				$params['keywords1'] = "%{$_GPC['keywords1']}%";
			}
			//1 可用 2 全部 3 失效
			$_GPC['status'] = $_GPC['status']?$_GPC['status']:2;
			//可用
			if($_GPC['status']==1){
				$sql .= ' AND `start_time` <'.TIMESTAMP.' AND `end_time` > '.(TIMESTAMP-86400).' AND num>used_num + inuse_num';	
			}
			//失效
			if($_GPC['status']==3){
				$sql .= ' AND `start_time` >'.TIMESTAMP.' or `end_time` < '.(TIMESTAMP-86400).' or num<=used_num + inuse_num';	
			}
			$total = pdo_fetchcolumn("SELECT count(*) FROM ".tablename('strcoupon_fans')." where weid = :weid ".$sql,$params);
			$list = pdo_fetchall("select * from ".tablename('strcoupon_fans')." where weid=:weid ".$sql." order by create_time desc".$limit,$params);
			//对优惠券可领取状态判断
			foreach($list as $key=>&$val){
				//判断有效期
				$status = 1;
				if($val['start_time']>TIMESTAMP||($val['end_time']+86400)<TIMESTAMP){
					$status = 0;
				}
				//可用剩余数量
				if(($val['num']-$val['used_num']-$val['inuse_num'])<1){
					$status = 0;
				}
				$val['status'] = $status;
			}
			$pager = pagination($total, $pindex, $psize);
		}elseif($op=='post'){
		
		}
		include $this->template('receive');
	}
	
	public function doWebRecord(){
		global $_GPC,$_W;
		$op = $_GPC['op']?$_GPC['op']:'display';
		if($op == 'display'){
			$pindex = intval($_GPC['page'])?intval($_GPC['page']):1;
			$psize = 20;
			$params['weid'] = $_W['weid'];
			$limit = " limit ".($pindex-1)*$psize.",".$psize;
			if (isset($_GPC['keywords'])) {
				$sql = ' AND `module_name` LIKE :keywords';
				$params['keywords'] = "%{$_GPC['keywords']}%";
			}
			if (isset($_GPC['keywords1'])) {
				$sql .= ' AND `order_sn` LIKE :keywords1';
				$params['keywords1'] = "%{$_GPC['keywords1']}%";
			}
			$total = pdo_fetchcolumn("SELECT count(*) FROM ".tablename('strcoupon_fans_log')."where weid = :weid ".$sql,$params);
			$list = pdo_fetchall("SELECT * FROM ".tablename('strcoupon_fans_log')." where weid = :weid ".$sql.$limit,$params);
			$pager = pagination($total, $pindex, $psize);
		}
		include $this->template('record');
	}
	public function doWebManage_shop(){
		global $_GPC,$_W;
		$op = $_GPC['op']?$_GPC['op']:'display';
		if($op =='display'){

		}elseif($op=='post'){
			if(checksubmit('submit')){
				die_dump($_GPC);
				$data = array(
					'weid' =>$_W['weid'],
					'create_time' =>time(),
					'displayorder' =>intval($_GPC['displayorder']),
					'name' =>$_GPC['coupon_name'],
					'money' =>$_GPC['money'],
					'type' =>intval($_GPC['type']),
					'logo' =>$_GPC['logo'],
					'title' =>$_GPC['title'],
					'description' =>$_GPC['description'],
					'cp_dst' =>$_GPC['cp_dst'],
					'start_time' =>strtotime($_GPC['datelimit-start']),
					'end_time' =>strtotime($_GPC['datelimit-end']),
					'total_num' =>intval($_GPC['total_num']),
					'surplus_num' =>intval($_GPC['total_num']),
					'day_sum' =>intval($_GPC['day_sum']),
					'user_sum' =>intval($_GPC['user_sum']),
					'user_day_sum' =>intval($_GPC['user_day_sum']),
					'total_money' =>$_GPC['total_money'],
					'discount_money' =>$_GPC['discount_money'],
				);
				if($id){
					$res = coupon_update($data,$id);
					if($res){
						message('更新成功',$this->createWebUrl('Manage'),'success');
					}else{
						message('更新失败',$this->createWebUrl('Manage'),'error');
					}
				}else{
					$res = coupon_add($data,1,$this->module['name']);
					if($res){
						message('添加成功',$this->createWebUrl('Manage'),'success');
					}else{
						message('添加成功',$this->createWebUrl('Manage'),'error');
					}
				}
			}
		}
		include $this->template('manage_shop');
	}
 
	/*
		1.查出所有礼券
		2.用户所有 礼券
		3.循环判断礼券状态
		4.循环用户礼券状态
		5.改变礼券状态()
	*/
	public function doMobileIndex() {
		global $_W,$_GPC;
		$from_user = $_W['fans']['from_user'];
		if(empty($from_user)){
			message('非法进入~');
		}
		$coupons = coupon_fetchall();
		//这里对优惠券状态进行处理
		//status 0 过期 -1 领完 -2 -3
		foreach($coupons as $key=>&$val){
			//过期end_time 必须大于现在时间,不然过期,去除
			if($val['end_time']<(TIMESTAMP-86400)){
				$val['status'] = 0;
				continue;	
			}
			//优惠券是否领完
			if($val['surplus_num']<1){
				$val['status'] = -1;
				continue;
			}
			//今日优惠券是否领完
			if($val['day_surplus_num']<1){
				$val['status'] = -2;
				continue;
			}
			//我的优惠券是否领过
			//根据from_user和coupon_id查询用户的本优惠券领取的数量
			$mycoupon = pdo_fetch("select * from ".tablename('strcoupon_fans')." where from_user=:from_user and weid =:weid and coupon_id=:coupon_id limit 1",array('weid'=>$_W['weid'],'coupon_id'=>$val[id],'from_user'=>$from_user));
			//条件 surplus_num和day_surplus_num
			if($mycoupon){
				if($mycoupon['surplus_num']<1){
					$val['status'] = -3;
					continue;	
				}
				if($mycoupon['day_surplus_num']<1){
					$val['status'] = -4;
					continue;	
				}
			}
			$val['status'] = 1;
		}
		//对优惠券排序(将可领的优惠券放到前面)
		$list = array();
		foreach($coupons as $k=>$v){
			if($v['status']==1){
				$list[] = $v;
			}
		}
		foreach($coupons as $k1=>$v1){
			if($v1['status']!=1){
				$list[] = $v1;
			}
		}
		//每天更新次数
		if(empty($coupons)){
			message("活动已经结束");
		}
		include $this->template('index');
	}
	//用户领取现金券
	public function doMobileFans() {
		global $_W,$_GPC;
		$id = intval($_GPC['coupon_id']);
		$from_user = $_GPC['from_user'];
		$return = array();
		$return['status'] = 1;
		if(!$id){
			$return['status'] = 0;
			$return['msg'] = '领取的礼券不存在';
			return json_encode($return);
		}
		if(!$from_user){
			$return['status'] = 0;
			$return['msg'] = '请从公众号进入';
			return json_encode($return);
		}
		$coupon =coupon_fetch($id);
		$data = array(
			'weid'=>$_W['weid'],
			'coupon_name'=>$coupon['name'],
			'coupon_id'=>$coupon['id'],
			'num'=>1,
			'from_user'=>$from_user,
			'last_time'=>TIMESTAMP,
			'money' =>$coupon['money'],
			'cp_dst' =>$coupon['cp_dst'],
			'start_time' =>$coupon['start_time'],
			'end_time' =>$coupon['end_time'],
			'total_sum' =>$coupon['user_sum'],
			'surplus_num' =>$coupon['user_sum']-1,
			'day_surplus_num' =>$coupon['user_day_sum']-1,
			'day_sum' =>$coupon['user_day_sum'],
			'create_time' =>TIMESTAMP,
			'fansid' =>$fans['id'],
			'title'=>$coupon['title'],
			'content'=>$coupon['description'],
			'coupon_type'=>$coupon['type'],
			'total_money' =>$coupon['total_money'],
			'discount_money' =>$coupon['discount_money'],
		);
		$return = coupon_fans_receive($from_user,$data,$id);
		return json_encode($return);
	}
	//我的优惠券
	public function doMobileMyCoupon() {
		global $_W,$_GPC;
		$from_user = $_W['fans']['from_user'];
		if($from_user){
			$data = coupon_fans_fetchall();
			//这里对优惠券状态进行处理
			//status 0 过期 -1 领完
			foreach($data as $key=>&$val){
				//过期end_time 必须大于现在时间,不然过期,去除
				if($val['end_time']<(TIMESTAMP-86400)){
					$val['status'] = 0;
					continue;	
				}
				//用完
				if($val['num']<=$val['used_num']){
					$val['status'] = -1;
					continue;
				}
				$val['status'] = 1;
			}
			//对我的优惠券进行排序, 将可用的放在前面
			$list = array();
			//先将可用的优惠券放在前面
			foreach($data as $k=>$v){
				if($v['status']==1){
					$list[] = $v;
				}
			}
			//再将其他的优惠券放在后面
			foreach($data as $k1=>$v1){
				if($v1['status']!=1){
					$list[] = $v1;
				}
			}
		}else{
			message("请从公众号进入");
		}
		include $this->template('mycoupon');
	}
	//用户领取现金券
	public function doMobileDetail() {
		global $_GPC;
		$op = $_GPC['op']?$_GPC['op']:'display';
		include $this->template('manage_shop');
	}
	private function getPicUrl($url) {
		global $_W;
		if (empty($url)) {
			$r = $_W['siteroot'] . "/source/modules/Survay1/images/default_cover.jpg";
		} else {
			$r = $_W['attachurl'] . $url;
		}
		return $r;
	}
}