<?php
/**
 * 微盒消息通知模块处理程序
 *
 * @author 微盒
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class WxboxModuleProcessor extends WeModuleProcessor {
	public function respond() {
		$hash=substr($this->message['content'],1);
		$wechat=pdo_fetch('select * from '.tablename('wechats').' where hash=:hash ',array(':hash'=>$hash));
		if($wechat==false){
			return $this->respText('输入的绑定信息错误！');
		}else{
			 
			$temp=pdo_update('wechats',array('openid'=>$this->message['from']),array('weid'=>$wechat['weid']));
			if($temp===false){
				return $this->respText('网络错误，请稍后重试！');
			}else{
				$this->doWebSendTmplMsgtest($this->message['from']);
				return $this->respText('绑定成功，模拟模拟发送一条模板消息');
			}
		}
		
	}
	public function doWebSendTmplMsgtest($_from){
		global $_W;
		$token= account_weixin_token($_W['account']);
		$datas=array(
			'first'=>array('value'=>'老板，贵客来了','color'=>'#ff9900'),
			'keyword1'=> array('value'=> '商家','color'=>'#173177'),
			'keyword2'=> array('value'=>'张三','color'=>'#173177'),
			'keyword3'=> array('value'=>'江苏','color'=>'#173177'),
			'keyword4'=> array('value'=>'13813813888','color'=>'#173177'),
			'keyword5'=> array('value'=>'888','color'=>'#173177'),
 			'remark'=>array('value'=>'请速度派送','color'=>'#173177'),
		);
		//var_dump($datas);
		$data=json_encode($datas);
		$vv=$this->SendTmplMsg($_from, '1eC5DVcK4Ok6oBQWog4-yX5WSYYJgxTfa6ftZJjbwnw', '', $data, $topcolor='#FF0000',$token);
		//var_dump($vv);
	}
	public function SendTmplMsg($from_user, $template_id, $url, $data, $topcolor='#FF0000',$token) {
		global $_W;
		
		$postarr = '{"touser":"'.$from_user.'","template_id":"'.$template_id.'","url":"'.$url.'","topcolor":"'.$topcolor.'","data":'.$data.'}';
		$res = ihttp_post('https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$token,$postarr);
		$res = $res['content'];
		$res = json_decode($res, true);
		
		return $res;
		
	}
}