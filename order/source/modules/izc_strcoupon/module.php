<?php
/**
 * 礼券模块定义
 *
 * @author 智策&strai
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class Izc_strcouponModule extends WeModule {
	public $table_name = 'strcoupons';
	public $table_customer = 'strcoupons_customer';
	public $table_reply = 'strcoupons_reply';
	public function fieldsFormDisplay($rid = 0) {
		global $_W,$_GPC;
		if ($rid) {
			$reply = pdo_fetch("SELECT * FROM " . tablename($this->table_reply) . " WHERE rid = :rid", array(':rid' => $rid));		
			$coupons = pdo_fetch("SELECT * FROM " . tablename($this->table_name) ." WHERE `weid` = :weid AND `id` = :id", array(':weid'=>$_W['weid'], ':id'=>$reply['coupons_id']));
		}
		include $this->template('form');
	}

	public function fieldsFormValidate($rid = 0) {
		global $_W,$_GPC;
		if (isset($_GPC['coupons_id'])) {
			$id = intval($_GPC['coupons_id']);
			if (!empty($id)) {
				$paper = pdo_fetch("SELECT * FROM ".tablename($this->table_name)." WHERE `id` = :id", array(':id' => $id));
				if (!empty($paper)) {
					return;
				}
			}
		}
		return '1';
	}

	public function fieldsFormSubmit($rid) {
		global $_GPC;
		if (isset($_GPC['coupons_id'])) {
			$data = array('coupons_id' => intval($_GPC['coupons_id']), 'rid' => $rid);
			$reply = pdo_fetch("SELECT * FROM " .tablename($this->table_reply) . " WHERE `rid` = :rid", array(':rid' => $rid));
			if ($reply) {
				pdo_update($this->table_reply, $data, array('id' => $reply['id']));	
			} else {
				pdo_insert($this->table_reply, $data);	
			}
		}

	}

	public function ruleDeleted($rid) {
		pdo_delete($this->table_reply, array('rid' => $rid));
	}

	public function settingsDisplay($settings) {
		global $_GPC, $_W;
		if(checksubmit()) {
			$cfg = array();
			$cfg['appid'] = $_GPC['appid'];
			$cfg['secret'] = $_GPC['secret'];
			if($this->saveSettings($cfg)) {
				message('保存成功', 'refresh');
			}
		}
		include $this->template('setting');
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