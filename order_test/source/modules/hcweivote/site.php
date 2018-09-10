<?php
/**
 * 微投票模块定义
 *
 */
defined('IN_IA') or exit('Access Denied');
session_start();
class HcWeiVoteModuleSite extends WeModuleSite {
	
	//微投票首页
	public function doMobileIndex(){
		// $useragent = addslashes($_SERVER['HTTP_USER_AGENT']);
		
		// if(strpos($useragent, 'MicroMessenger') === false && strpos($useragent, 'Windows Phone') === false ){
			// echo " 404";
			// exit;
		// }
		
		
			  
		$this->__mobile(__FUNCTION__);
	}	
	
	//注册
	public function doMobileRegister(){
		$this->__mobile(__FUNCTION__);
	}
	
	//照片集
	public function doMobilePhotos(){
		$this->__mobile(__FUNCTION__);
	}
	
	//我要参赛
	public function doMobileJoin(){
		$this->__mobile(__FUNCTION__);
	}
	
	//留言
	public function doMobileMessage(){
		$this->__mobile(__FUNCTION__);
	}
	
	//活动规则
	public function doMobileRule(){
		global $_W;
		$weid = $_W['weid'];
		$rule = pdo_fetch("select rule from ".tablename('hcweivote_rule')." where weid = ".$weid);
		include $this->template('rule');
		exit;
	}
	
	//个人中心
	public function doMobileHome(){
		$this->__mobile(__FUNCTION__);
	}
	
//以下为后台管理＝＝＝＝＝＝＝＝＝＝＝＝＝＝
	
	//作品管理
	public function doWebProduct() {
		$this->__web(__FUNCTION__);
	}
	
	//留言管理
	public function doWebMessage() {
		$this->__web(__FUNCTION__);
	}
	
	//规则管理
	public function doWebRule() {
		$this->__web(__FUNCTION__);
	}
	
	//幻灯片管理
	public function doWebSlide() {
		$this->__web(__FUNCTION__);
	}
	
	public function __mobile($f_name){
		global $_W,$_GPC;
		$weid = $_W['weid'];
		$op = $_GPC['op']?$_GPC['op']:'display';
		$oauth_openid="weivote_openid".$_W['weid'];
		if (empty($_COOKIE[$oauth_openid])) {
			$this->CheckCookie();
		}
		$rule = pdo_fetch("select * from ".tablename('hcweivote_rule')." where weid = ".$weid);
		$cfg = $this->module['config'];
		include_once  'mobile/'.strtolower(substr($f_name,8)).'.php';
	}
	
	public function __web($f_name){
		global $_W,$_GPC;
		checklogin();
		$weid = $_W['weid'];
		$op = $operation = $_GPC['op']?$_GPC['op']:'display';
		
		include_once  'web/'.strtolower(substr($f_name,5)).'.php';
	}
	
	public function doMobileAjaxdelete() {
        global $_GPC;
        $delurl = $_GPC['pic'];
        if (file_delete($delurl)) {
			if($_GPC['id'] > 0){
				pdo_delete('hcweivote_photo', array('id'=>$_GPC['id']));
			}
            echo 1;
        } else {
            echo 0;
        }
    }
	
	private function fileUpload($file, $type) {
		global $_W;
		set_time_limit(0);
		$_W['uploadsetting'] = array();
		$_W['uploadsetting']['images']['folder'] = 'images';
		$_W['uploadsetting']['images']['extentions'] = array('jpg', 'png', 'gif');
		$_W['uploadsetting']['images']['limit'] = 50000;
		$result = array();
		$upload = file_upload($file, 'images');
		if (is_error($upload)) {
			message($upload['message'], '', 'ajax');
		}
		$result['url'] = $upload['url'];
		$result['error'] = 0;
		$result['filename'] = $upload['path'];
		return $result;
	}
	
	public function doMobileUploadImage() {
		global $_W;
		if (empty($_FILES['file']['name'])) {
			$result['message'] = '请选择要上传的文件！';
			exit(json_encode($result));
		}

		if ($file = $this->fileUpload($_FILES['file'], 'images')) {
			if ($file['error']) {
				exit('0');
				//exit(json_encode($file));
			}
			$result['url'] = $_W['config']['upload']['attachdir'] . $file['filename'];
			$result['error'] = 0;
			$result['filename'] = $file['filename'];
			exit(json_encode($result));
		}
	}
	
	public function doMobileUserinfo() {
		global $_GPC,$_W;
		$weid = $_W['weid'];//当前公众号ID
		
		//用户不授权返回提示说明
		if ($_GPC['code']=="authdeny"){
		    $url = $_W['siteroot'].$this->createMobileUrl('index', array());
			header("location:$url");
			exit('authdeny');
		}
		//高级接口取未关注用户Openid
		if (isset($_GPC['code'])){
		    //第二步：获得到了OpenID
		    $appid = $_W['account']['key'];
		    $secret = $_W['account']['secret'];
			$serverapp = $_W['account']['level'];
			if ($serverapp!=2) {
				//不给设置
			    $cfg = $this->module['config'];
			    $appid = $cfg['appid'];
			    $secret = $cfg['secret'];
			}//借用的
			$state = $_GPC['state'];
			//1为关注用户, 0为未关注用户
			
			//查询活动时间
			$code = $_GPC['code'];
		    $oauth2_code = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$secret."&code=".$code."&grant_type=authorization_code";
		    $content = ihttp_get($oauth2_code);
		    $token = @json_decode($content['content'], true);
			if(empty($token) || !is_array($token) || empty($token['access_token']) || empty($token['openid'])) {
				echo '<h1>获取微信公众号授权'.$code.'失败[无法取得token以及openid], 请稍后重试！ 公众平台返回原始数据为: <br />' . $content['meta'].'<h1>';
				exit;
			}
		    $from_user = $token['openid'];
			//再次查询是否为关注用户
			$profile  = fans_search($from_user, array('follow'));	
			
			//关注用户直接获取信息	
			if ($profile['follow']==1){
			    $state = 1;
			}else{
				//未关注用户跳转到授权页
				$url = $_W['siteroot'].$this->createMobileUrl('userinfo', array());
				$oauth2_code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($url)."&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";				
				header("location:$oauth2_code");
			}
			//未关注用户和关注用户取全局access_token值的方式不一样
			if ($state==1){
			    $oauth2_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$secret."";
			    $content = ihttp_get($oauth2_url);
			    $token_all = @json_decode($content['content'], true);
			    if(empty($token_all) || !is_array($token_all) || empty($token_all['access_token'])) {
				    echo '<h1>获取微信公众号授权失败[无法取得access_token], 请稍后重试！ 公众平台返回原始数据为: <br />' . $content['meta'].'<h1>';
				    exit;
			    }
				$access_token = $token_all['access_token'];
				$oauth2_url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=".$access_token."&openid=".$from_user."&lang=zh_CN";
			}else{
			    $access_token = $token['access_token'];
				$oauth2_url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$from_user."&lang=zh_CN";
			}
			
			//使用全局ACCESS_TOKEN获取OpenID的详细信息			
			$content = ihttp_get($oauth2_url);
			$info = @json_decode($content['content'], true);
			if(empty($info) || !is_array($info) || empty($info['openid'])  || empty($info['nickname']) ) {
				echo '<h1>获取微信公众号授权失败[无法取得info], 请稍后重试！<h1>';
				exit;
			}

			if (!empty($info["headimgurl"])) {
				$info['avatar'] = $info['headimgurl'];
				//$filedata=GrabImage($info['headimgurl']);
				//file_write($info['avatar'], $filedata);
			}else{
				$info['headimgurl']='avatar_11.jpg';
			}
			
			if ($serverapp == 2) {//高级号
				$row = array(
					'weid' => $_W['weid'],
					'nickname'=>$info["nickname"],
					'realname'=>$info["nickname"],
					'gender' => $info['sex'],
					'from_user' => $info['openid']
				);
				
				fans_update($_W['fans']['from_user'], $row);
				pdo_update('fans', array('avatar'=>$info["headimgurl"]), array('from_user' => $_W['fans']['from_user']));	
			}
			
			if($serverapp != 2  && !(empty($_W['fans']['from_user']))) {//普通号
				$row = array(
					'nickname'=> $info["nickname"],
					'realname'=> $info["nickname"]
				);

				fans_update($_W['fans']['from_user'], $row);
				pdo_update('fans', array('avatar'=>$info["headimgurl"]), array('from_user' => $_W['fans']['from_user']));	
			}
			
			setcookie("weivote_openid".$_W['weid'], $info['openid'], time()+3600*240);
			$url=$this->createMobileUrl('index');
			//die('<script>location.href = "'.$url.'";</script>');
			header("location:$url");
			exit;
			
		}else{
			echo '<h1>网页授权域名设置出错!</h1>';
			exit;		
		}
	
	}
	
	private function CheckCookie() {
		global $_W;
		//return ;
		$oauth_openid="weivote_openid".$_W['weid'];
		if (empty($_COOKIE[$oauth_openid])) {
			$appid = $_W['account']['key'];
			$secret = $_W['account']['secret'];
			//是否为高级号
			$serverapp = $_W['account']['level'];	
			if ($serverapp!=2) {
				$cfg = $this->module['config'];
			    $appid = $cfg['appid'];
			    $secret = $cfg['secret'];
				if(empty($appid) || empty($secret)){
					return ;
				}
			}
			
			//借用的
			$url = $_W['siteroot'].$this->createMobileUrl('userinfo', array());
			$oauth2_code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($url)."&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";				
			//exit($oauth2_code);
			header("location:$oauth2_code");
			
			exit;
		}
	}
}
/*
$url=$this->createMobileUrl('index');
			die('<script>location.href = "'.$url.'";</script>');
			header("location:$url");
			exit;
		*/
/**
 * 生成分页数据
 * @param int $currentPage 当前页码
 * @param int $totalCount 总记录数
 * @param string $url 要生成的 url 格式，页码占位符请使用 *，如果未写占位符，系统将自动生成
 * @param int $pageSize 分页大小
 * @return string 分页HTML
 */
function pagination1($tcount, $pindex, $psize = 15, $url = '', $context = array('before' => 5, 'after' => 4, 'ajaxcallback' => '')) {
	global $_W;
	$pdata = array(
		'tcount' => 0,
		'tpage' => 0,
		'cindex' => 0,
		'findex' => 0,
		'pindex' => 0,
		'nindex' => 0,
		'lindex' => 0,
		'options' => ''
	);
	if($context['ajaxcallback']) {
		$context['isajax'] = true;
	}

	$pdata['tcount'] = $tcount;
	$pdata['tpage'] = ceil($tcount / $psize);
	if($pdata['tpage'] <= 1) {
		return '';
	}
	$cindex = $pindex;
	$cindex = min($cindex, $pdata['tpage']);
	$cindex = max($cindex, 1);
	$pdata['cindex'] = $cindex;
	$pdata['findex'] = 1;
	$pdata['pindex'] = $cindex > 1 ? $cindex - 1 : 1;
	$pdata['nindex'] = $cindex < $pdata['tpage'] ? $cindex + 1 : $pdata['tpage'];
	$pdata['lindex'] = $pdata['tpage'];

	if($context['isajax']) {
		if(!$url) {
			$url = $_W['script_name'] . '?' . http_build_query($_GET);
		}
		$pdata['faa'] = 'href="javascript:;" onclick="p(\'' . $_W['script_name'] . $url . '\', \'' . $pdata['findex'] . '\', ' . $context['ajaxcallback'] . ')"';
		$pdata['paa'] = 'href="javascript:;" onclick="p(\'' . $_W['script_name'] . $url . '\', \'' . $pdata['pindex'] . '\', ' . $context['ajaxcallback'] . ')"';
		$pdata['naa'] = 'href="javascript:;" onclick="p(\'' . $_W['script_name'] . $url . '\', \'' . $pdata['nindex'] . '\', ' . $context['ajaxcallback'] . ')"';
		$pdata['laa'] = 'href="javascript:;" onclick="p(\'' . $_W['script_name'] . $url . '\', \'' . $pdata['lindex'] . '\', ' . $context['ajaxcallback'] . ')"';
	} else {
		if($url) {
			$pdata['faa'] = 'href="?' . str_replace('*', $pdata['findex'], $url) . '"';
			$pdata['paa'] = 'href="?' . str_replace('*', $pdata['pindex'], $url) . '"';
			$pdata['naa'] = 'href="?' . str_replace('*', $pdata['nindex'], $url) . '"';
			$pdata['laa'] = 'href="?' . str_replace('*', $pdata['lindex'], $url) . '"';
		} else {
			$_GET['page'] = $pdata['findex'];
			$pdata['faa'] = 'href="' . $_W['script_name'] . '?' . http_build_query($_GET) . '"';
			$_GET['page'] = $pdata['pindex'];
			$pdata['paa'] = 'href="' . $_W['script_name'] . '?' . http_build_query($_GET) . '"';
			$_GET['page'] = $pdata['nindex'];
			$pdata['naa'] = 'href="' . $_W['script_name'] . '?' . http_build_query($_GET) . '"';
			$_GET['page'] = $pdata['lindex'];
			$pdata['laa'] = 'href="' . $_W['script_name'] . '?' . http_build_query($_GET) . '"';
		}
	}

	$html = '<div class="pagination pagination-centered"><ul>';
	if($pdata['cindex'] > 1) {
		$html .= "<li><a {$pdata['faa']} class=\"pager-nav\">首页</a></li>";
		$html .= "<li><a {$pdata['paa']} class=\"pager-nav\">&laquo;上一页</a></li>";
	}
	//页码算法：前5后4，不足10位补齐
	if(!$context['before'] && $context['before'] != 0) {
		$context['before'] = 5;
	}
	if(!$context['after'] && $context['after'] != 0) {
		$context['after'] = 4;
	}

	if($context['after'] != 0 && $context['before'] != 0) {
		$range = array();
		$range['start'] = max(1, $pdata['cindex'] - $context['before']);
		$range['end'] = min($pdata['tpage'], $pdata['cindex'] + $context['after']);
		if ($range['end'] - $range['start'] < $context['before'] + $context['after']) {
			$range['end'] = min($pdata['tpage'], $range['start'] + $context['before'] + $context['after']);
			$range['start'] = max(1, $range['end'] - $context['before'] - $context['after']);
		}
		for ($i = $range['start']; $i <= $range['end']; $i++) {
			if($context['isajax']) {
				$aa = 'href="javascript:;" onclick="p(\'' . $_W['script_name'] . $url . '\', \'' . $i . '\', ' . $context['ajaxcallback'] . ')"';
			} else {
				if($url) {
					$aa = 'href="?' . str_replace('*', $i, $url) . '"';
				} else {
					$_GET['page'] = $i;
					$aa = 'href="?' . http_build_query($_GET) . '"';
				}
			}
			//$html .= ($i == $pdata['cindex'] ? '<li class="active"><a href="javascript:;">' . $i . '</a></li>' : "<li><a {$aa}>" . $i . '</a></li>');
		}
	}

	if($pdata['cindex'] < $pdata['tpage']) {
		$html .= "<li><a {$pdata['naa']} class=\"pager-nav\">下一页&raquo;</a></li>";
		$html .= "<li><a {$pdata['laa']} class=\"pager-nav\">尾页</a></li>";
	}
	$html .= '</ul></div>';
	return $html;
}

function haha($hehe){
	$phone = $hehe;
	$mphone = substr($phone,3,4);
	$lphone = str_replace($mphone,"****",$phone);
	return $lphone;
}
