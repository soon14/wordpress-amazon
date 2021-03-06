<?php
/**
 * 微商城模块定义
 *
 * @author WeEngine Team
 * @url
 */
defined('IN_IA') or exit('Access Denied');

class ShoppingModule extends WeModule {

	public function fieldsFormDisplay($rid = 0) {
		global $_W;
		$setting = $_W['account']['modules'][$this->_saveing_params['mid']]['config'];
		include $this->template('rule');
	}

	public function fieldsFormSubmit($rid = 0) {
		global $_GPC, $_W;
		if (!empty($_GPC['title'])) {
			$data = array(
				'title' => $_GPC['title'],
				'description' => $_GPC['description'],
				'picurl' => $_GPC['thumb-old'],
				'url' => create_url('mobile/module/list', array('name' => 'shopping', 'weid' => $_W['weid'])),
			);
			if (!empty($_GPC['thumb'])) {
				$data['picurl'] = $_GPC['thumb'];
				file_delete($_GPC['thumb-old']);
			}
			$this->saveSettings($data);
		}
		return true;
	}
	
	public function settingsDisplay($settings) {
		global $_GPC, $_W;
		if(checksubmit()) {
			$cfg = array(
				'noticeemail' => $_GPC['noticeemail'],
				'template' => $_GPC['template'],
			);
			if($this->saveSettings($cfg)) {
				message('保存成功', 'refresh');
			}
		}
		$path = IA_ROOT . '/source/modules/shopping/template/mobile/';
		if(is_dir($path)) {
			if ($handle = opendir($path)) {
				while (false !== ($templatepath = readdir($handle))) {
					if ($templatepath != '.' && $templatepath != '..' && !strexists($templatepath, '.html')) {
						$template[] = $templatepath;
					}
				}
			}
		}
		include $this->template('setting');
	}
}
