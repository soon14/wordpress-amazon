<?php
/**
 * 微汽车模块定义
 *
 * @author 微服务
 * @url
 */
defined('IN_IA') or exit('Access Denied');

class Cgt_ywqModuleSite extends WeModuleSite {
	
	public function doWebYwqset(){
		global $_GPC, $_W;
		$id = intval($_GPC['id']);
	    if (checksubmit('delete')) {		
			pdo_delete('qimoqian', " id IN ('".implode("','", $_GPC['select'])."')");			
			message('删除成功！', $this->createWebUrl('ywqset', array('id' => $id, 'page' => $_GPC['page'])));		
		}
		
		  if ($_GPC['op']=="delete") {		
			pdo_delete('qimoqian',  array('id' => $id));			
			message('删除成功！', $this->createWebUrl('ywqset'));		
		}
		
		$pindex = max(1, intval($_GPC['page']));		
		$psize = 15;
		$sql="SELECT *  FROM ".tablename('qimoqian')." WHERE weid= :weid ";
		$qimoqianlist = pdo_fetchall($sql.' order by `id` desc LIMIT ' . ($pindex - 1) * $psize . ',' . $psize, array(':weid' => $_W['weid']) );	
		$total = pdo_fetchcolumn('SELECT count(1) as totle FROM '.tablename('qimoqian').' WHERE weid= :weid ', array(':weid' => $_W['weid']) );
		$pager = pagination($total, $pindex, $psize);
	
		include $this->template('display');

	}
	
	public function doWebYwqadd(){
		global $_GPC, $_W;
		$id =$_GPC['id'];
		
       	if(checksubmit('submit')) {
			$title = !empty($_GPC['title']) ? trim($_GPC['title']) : message('填写标题');
			$url = !empty($_GPC['url']) ? $_GPC['url'] : message('请填写url');
			$pic = !empty($_GPC['pic']) ? trim($_GPC['pic']) : message('请填写图片');
			$desc = !empty($_GPC['desc']) ? trim($_GPC['desc']) : message('请填写描述');
          
			$data = array(
				'weid' => $_W['weid'],
				'title' => $title,
				'desc' => $desc,
				'url' => $url,
				'pic' => $pic,
				'createtime'=>time()
			);
		
			if(!empty($id)) {
				$temp = pdo_update('qimoqian',$data,array('weid' => $_W['weid'],'id' =>$id));
			} else {
				$temp = pdo_insert('qimoqian',$data);
			}
			if($temp === false) {
				message('更新失败！',$this->createWebUrl('ywqset'), 'error');
			} else {
				message('更新成功！',$this->createWebUrl('ywqset'), 'success');
			}
		} 
		 if (!empty($id)){
			$sql="SELECT *  FROM ".tablename('qimoqian')." WHERE weid={$_W['weid']} and id=$id";
			 
			$item=pdo_fetch($sql);
		 }
		  
		include $this->template('form');

	}
		

}