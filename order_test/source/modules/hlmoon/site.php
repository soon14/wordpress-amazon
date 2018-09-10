<?php
/**
 * 抢月饼模块定义
 * [皓蓝] www.weixiamen.cn 5517286
 */
defined('IN_IA') or exit('Access Denied');

class hlmoonModuleSite extends WeModuleSite {	
	
	public $table_reply = 'hlmoon_reply';
	public $table_list   = 'hlmoon_list';	
	public $table_data   = 'hlmoon_data';
	public $table_log   = 'hlmoon_log';
	public $table_request   = 'hlmoon_request';
	public $table_award   = 'hlmoon_award';
	public function doMobilelisthome() {
		//这个操作被定义用来呈现 微站首页导航图标
		$this->doMobileindex();	
	}
	
	public function getProfileTiles() {
		
	}

	public function getmoontiles() {
		global $_W;
		$time = time();
		$moons = pdo_fetchall("SELECT rid, title FROM ".tablename($this->table_reply)." WHERE status = 1 and start_time<".$time."  and end_time>".$time." and weid = '{$_W['weid']}'");
		if (!empty($moons)) {
			foreach ($moons as $row) {
				$urls[] = array('title' => $row['title'], 'url' => $this->createMobileUrl('hlmoon', array('rid' => $row['rid'])));
			}
			return $urls;
		}
	}
	
	public function getHomeTiles($keyword = '') {
		$urls = array();
		$list = pdo_fetchall("SELECT name, id FROM ".tablename('rule')." WHERE module = 'hlmoon'".(!empty($keyword) ? " AND name LIKE '%{$keyword}%'" : ''));
		if (!empty($list)) {
			foreach ($list as $row) {
				$urls[] = array('title'=>$row['name'], 'url'=> $this->createMobileUrl('moon', array('id' => $row['id'])));
			}
		}
		return $urls;
	}
    //入口列表
	public function doMobileindex() {
		global $_GPC,$_W;
		$weid = $_W['weid'];
		$time = time();
		$from_user = $_W['fans']['from_user'];
		$staturl=$_W['siteroot'].$this->createMobileUrl('index', array());
		
		
		
		
		$reply = pdo_fetchall("SELECT * FROM ".tablename($this->table_reply)." WHERE weid = :weid and status = 1 and start_time<".$time."  and end_time>".$time." ORDER BY `rid` DESC", array(':weid' => $weid));
		$hasselect=0;
		foreach ($reply as $mid => $replys) {
			$reply[$mid]['num'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename($this->table_list)." WHERE weid = :weid and rid = :rid", array(':weid' => $_W['weid'], ':rid' => $replys['rid']));
			$reply[$mid]['is'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename($this->table_list)." WHERE weid = :weid and rid = :rid and from_user = :from_user", array(':weid' => $_W['weid'], ':rid' => $replys['rid'], ':from_user' => $from_user));
			
			if ($reply[$mid]['start_time']> TIMESTAMP){
				$reply[$mid]['over']=0;
				
			}
			if ($reply[$mid]['end_time']< TIMESTAMP){
				$reply[$mid]['over']=2;
			}
			if($reply[$mid]['is']){
				$hasselect=1;
				$hasname=$replys['title'];
			}
			$reply[$mid]['lpurl']= $this->createMobileUrl('moon', array('rid' => $replys['rid']));
		}
		if($hasselect==1){
			foreach ($reply as $mid => $replys){
				if(!$reply[$mid]['is']){
					$bnxians = "javascript:tusi('您已选择了".$hasname.",不能再选啦!')";
					$reply[$mid]['lpurl']= $bnxians;
			
				}
			}
		}
		//查询参与情况
		$usernum = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename($this->table_list)." WHERE weid = :weid and from_user = :from_user", array(':weid' => $_W['weid'], ':from_user' => $from_user));
		
	

	    $user_agent = $_SERVER['HTTP_USER_AGENT'];
	    if (strpos($user_agent, 'MicroMessenger') === false) {
			echo "本页面仅支持微信访问!非微信浏览器禁止浏览!";
			exit;
	    } 
			include $this->template('index');
			
	}
	
	public function doMobilemoon() {
		//抢月饼分享页面显示。
		global $_GPC,$_W;
		$weid = $_W['weid'];//当前公众号ID
		$s = 0;
		$profile_s = 0;
		if (empty($_GPC['rid'])) {
			$rid = $_GPC['id'];
		}else{
			$rid = $_GPC['rid'];
		}
		
		$foo = !empty($_GPC['foo']) ? $_GPC['foo'] : '';
      	if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->table_reply)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));			
			$moon_show = $reply['moon_show'];
			$moon_rankshow = $reply['moon_rankshow'];
			$moon_shownum = $reply['moon_shownum'];
			$moon_ranknum = $reply['moon_ranknum'];
			$moonnum = $reply['moonnum'];
			$dingpic = $reply['dingpic'];
			$shangjiapic = $reply['shangjiapic'];
			if (substr($dingpic,0,6)=='images'){
			   $dingpic = $_W['attachurl'] . $dingpic;
			}
			if (substr($shangjiapic,0,6)=='images'){
			   $shangjiapic = $_W['attachurl'] . $shangjiapic;
			}
			if($reply['shangjiamap']!=''){
		       list($reply['lng'],$reply['lat'])=explode(',',$reply['shangjiamap']);
		    }
			if ($reply['status']==0) {
				$statmoontitle = '<h1>活动暂停！请稍候再试！</h1>';
			}
			if (time()<$reply['start_time']) {//判断活动是否已经开始
				$statmoontitle = '<h1>活动未开始！</h1>';
			}elseif (time()>$reply['end_time']) {//判断活动是否已经结束
				$statmoontitle = '<h1>活动已结束！</h1>';
			}
 		}
		
		
		

		$fromuser = $_W['fans']['from_user'];
		if(empty($fromuser)){
			$moonurl = $reply['moonurl'];
			header("location:$moonurl");	
		}
		fans_require($fromuser,'realname','mobile');
		//取得分享人的数据
		$ztotal = 0;
		if(empty($fromuser)) {
		    if (isset($_COOKIE["user_oauth2_openid"])){
			    $fromuser = $_COOKIE["user_oauth2_openid"];
			}else{
				$sql='SELECT content FROM '.tablename('rule_keyword')." WHERE  rid = '".$rid."' ";
			    $rpkeyword=pdo_fetchcolumn($sql);
		         $weiguanzhu =  "亲！请先关注公众号：".$_W['account']['name']." 微信号: ".$_W['account']['account']."发送关键字:".$rpkeyword." 收到回复后，再进入登记信息参与本活动！";			
		    }
			$profile  = fans_search($fromuser, array('follow'));
			if ($profile['follow']==0){
				$sql='SELECT content FROM '.tablename('rule_keyword')." WHERE  rid = '".$rid."' ";
			    $rpkeyword=pdo_fetchcolumn($sql);
		        $weiguanzhu =  "亲！请先关注公众号：".$_W['account']['name']." 微信号: ".$_W['account']['account']."发送关键字:".$rpkeyword." 收到回复后，再进入登记信息参与本活动！";
			}
		}
		//计算内定排名开始
		if ($reply['ndrankstatus']==1){			
			//取真实排名第一的助抢数
			$moonnum = 0;
			$listshare = pdo_fetch('SELECT moonnum,from_user FROM '.tablename($this->table_list).'  WHERE weid= :weid AND rid = :rid and ndrank = 0 order by `moonnum` desc LIMIT 1', array(':weid' => $weid,':rid' => $rid));
			if (!empty($listshare)){
			    $moonnum = $listshare['moonnum'];
			    //取内定排名人员
			    $lists = pdo_fetchall("SELECT id,ndranknums,moonnum FROM ".tablename($this->table_list)." WHERE weid = '".$weid."' and rid= '".$rid."' and ndrank > 0 order by `ndrank` desc limit ".$reply['ndrankstatusnum']."" );
			    foreach ($lists as $list) {
				    if($list['moonnum']<=$moonnum){
					    $moonnum = intval($moonnum+mt_rand(1,$list['ndranknums']));
						$updata = array(
			               'moonnum' => $moonnum,
		                );
						pdo_update($this->table_list, $updata, array('id' => $list['id']));				
				    }
				}	
			}
		}		
		//计算内定排名结束
		if(!empty($fromuser)) {
			$lists = pdo_fetch("SELECT id,status,moonnum,zhongjiang,moontime FROM ".tablename($this->table_list)." WHERE from_user = '".$fromuser."' and weid = '".$weid."' and rid= '".$rid."' limit 1" );	
			if(!empty($lists)){
			   $uid= $lists['id'];
			   $zj = $lists['zhongjiang'];
			   $ztotal = $lists['moonnum'];
			   $moontime = $lists['moontime'];
			   if ($lists['status']==0){
				   $statmoontitle = '<h1>因作弊行为被管理员屏蔽，请您联系 '.$_W['account']['name'].' 管理员!</h1>'; 
			   }
			}
		}
		//取得所有分享排名100
		$listshare = pdo_fetchall('SELECT a.*,b.realname,b.mobile FROM '.tablename($this->table_list).' as a left join '.tablename('fans').' as b on a.from_user=b.from_user  WHERE a.weid= :weid AND a.rid = :rid order by `moonnum` desc,`moontime` asc LIMIT '.$moon_ranknum.'', array(':weid' => $weid,':rid' => $rid));
		
		$count= pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." and rid= ".$rid." and moonnum >= ".$ztotal."");
		$sharepms=$count['dd'];//排名
		//查询同助抢排名数
		if ($moontime!='') {
		    $countt= pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." and rid= ".$rid." and moonnum = ".$ztotal." and moontime>".$moontime."");
		    $sharepmt=$countt['dd'];//同助抢排名数
		}else{
		    $sharepmt=0;
		}

		$sharepm=$sharepms-$sharepmt;//排名

		$count = pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." AND rid= ".$rid."");
		$listtotal = $count['dd'];//总参与人数
		//取得抢月饼数据
		
		if(!empty($uid)) {
		    $list = pdo_fetchall('SELECT * FROM '.tablename($this->table_data).'  WHERE weid= :weid and uid = :uid and rid = :rid order by `moontime` desc LIMIT '.$moon_shownum.'', array(':weid' => $_W['weid'], ':uid' => $uid, ':rid' => $rid) );		
		}	
		//判断是否中奖
		if ($zj==1) {
			$zhongjiang = $reply['zhongjiang'];
			$zhongjiang_s = 1;			
		}
		//判断是否中奖
		//整理数据进行页面显示
		//判断是否绑定
		$profile = fans_search($fromuser, array('follow', 'realname', 'mobile'));
		if (!empty($profile['realname']) AND !empty($profile['mobile']) AND $profile['follow']==1) {
			$profile_s=1;
		}
		//判断是否绑定
		if (strpos($reply['picture'], 'http') === false) {
			$imgurl=$_W['attachurl'] . $reply['picture'];
		}else{
			$imgurl=$reply['picture'];
		}
      	$title = $reply['title'];
		//$loclurl=$_W['siteroot'].$this->createMobileUrl('moon', array('rid' => $rid, 'from_user' => $_GPC['from_user']));		
		$regurl=$this->createMobileUrl('reg', array('fromuser' => $fromuser));
		$staturl=$_W['siteroot'].$this->createMobileUrl('statmoon', array('rid' => $rid,'fromuser' => $fromuser));

		
		$user_agent = $_SERVER['HTTP_USER_AGENT'];
		
		if (strpos($user_agent, 'MicroMessenger') === false) {
			echo "本页面仅支持微信访问!非微信浏览器禁止浏览!";
			exit;
			
		}  
		
			include $this->template('show');
		

	}

	public function doMobileReg() {
		//抢月饼分享页面显示。
		global $_GPC,$_W;
		$weid = $_W['weid'];//当前公众号ID
		$rid  = $_GPC['rid'];//当前规则ID		
		$fromuser = $_GPC['fromuser'];
		//查询用户是否为关注用户
		if(!empty($fromuser)) {
		    $profile  = fans_search($fromuser, array('follow'));
		}else{
		    $result = "您访问的分享异常,请联系公众号技术人员！";
			echo $result;
			exit;
		}
		if ($profile['follow']==0){
		
		    //没有关注时提示用户
			$sql='SELECT content FROM '.tablename('rule_keyword')." WHERE  rid = '".$rid."' ";
			$rpkeyword=pdo_fetchcolumn($sql)	;

			if(!empty($rpkeyword)){
				$result = "亲！请先关注公众号：{$_W['account']['name']} ID: {$_W['account']['account']} 发送关键字:'{$rpkeyword}'收到回复后，再进入登记信息参与活动！";
			}else{
				$result = "您访问的分享异常,请联系公众号技术人员！";
			}
			echo $result;
			exit;		
		}

		//取得抢月饼数据
		if(!empty($fromuser)) {
			//关注用户　注册转发
			$rs = pdo_fetch("SELECT id FROM ".tablename($this->table_list)." WHERE from_user = '".$fromuser."' and weid = '".$weid."' and rid = '".$rid."' limit 1" );			

			if(empty($rs['id'])){			
					fans_update($fromuser, array(
					'realname' => $_GPC['realname'],
					'mobile' => $_GPC['mobile'],
				    ));
					$result='注册信息提交成功，立即分享吧！';
			}else{
					$result='您已注册过信息，可直接分享！';
			}			
		}
		echo $result;	
	}
	
	public function doMobilestatupdata() {
		//抢月饼分享页面显示。
		global $_GPC,$_W;
		$weid = $_W['weid'];//当前公众号ID
		$dataid = $_GPC['dataid'];
		$realname = $_GPC['realname'];

		//取得抢月饼数据
		if(!empty($dataid)) {
			pdo_update($this->table_data,array('realname' => $realname),array('id' => $dataid));
			$result='你的朋友已收到你的助抢!';						
		}else{
			$result = "您访问的分享".$dataid."异常,请联系公众号技术人员！";
		}
		echo $result;	
	}
	
	public function doMobileoauth(){
		global $_GPC,$_W;
		$weid      = $_W['weid'];//当前公众号ID
		$fromuser  = $_GPC['fromuser'];
		$rid       = $_GPC['rid'];//当前规则ID


		if(empty($rid)){
		    echo '<h1>分享rid出错，请联系管理员!</h1>';
			exit;
		}
		if(empty($fromuser)){
		    echo '<h1>分享人出错，请联系管理员!</h1>';
			exit;
		}
		
		//查询分享活动规则	查询是否开始或暂停
      	if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->table_reply)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			$moon_show = $reply['moon_show'];
			$moon_imgtext = $reply['moon_imgtext'];
			$moon_rankshow = $reply['moon_rankshow'];
			$moon_shownum = $reply['moon_shownum'];
			$moon_ranknum = $reply['moon_ranknum'];
			$moon_type = $reply['moon_type'];
			$dingpic = $reply['dingpic'];
			$zanpic = $reply['zanpic'];
			$shangjiapic = $reply['shangjiapic'];
			if (substr($dingpic,0,6)=='images'){
			   $dingpic = $_W['attachurl'] . $dingpic;
			}
			if (substr($zanpic,0,6)=='images'){
			   $zanpic = $_W['attachurl'] . $zanpic;
			}
			if (substr($shangjiapic,0,6)=='images'){
			   $shangjiapic = $_W['attachurl'] . $shangjiapic;
			}
			if($reply['shangjiamap']!=''){
		       list($reply['lng'],$reply['lat'])=explode(',',$reply['shangjiamap']);
		    }
			if ($reply['status']==0) {
				$statmoontitle = '<h1>活动暂停！请稍候再试！</h1>';
			}
			if (time()<$reply['start_time']) {//判断活动是否已经开始
				$statmoontitle = '<h1>活动未开始！</h1>';
			}elseif (time()>$reply['end_time']) {//判断活动是否已经结束
				$statmoontitle = '<h1>活动已结束！</h1>';
			}
			
 		}
		//计算内定排名开始
		if ($reply['ndrankstatus']==1){			
			//取真实排名第一的助抢数
			$moonnum = 0;
			$listshare = pdo_fetch('SELECT moonnum,from_user FROM '.tablename($this->table_list).'  WHERE weid= :weid AND rid = :rid and ndrank = 0 order by `moonnum` desc LIMIT 1', array(':weid' => $weid,':rid' => $rid));
			if (!empty($listshare)){
			    $moonnum = $listshare['moonnum'];
			    //取内定排名人员
			    $lists = pdo_fetchall("SELECT id,ndranknums,moonnum FROM ".tablename($this->table_list)." WHERE weid = '".$weid."' and rid= '".$rid."' and ndrank > 0 order by `ndrank` desc limit ".$reply['ndrankstatusnum']."" );
			    foreach ($lists as $list) {
				    if($list['moonnum']<=$moonnum){
					    $moonnum = intval($moonnum+mt_rand(1,$list['ndranknums']));
						$updata = array(
			               'moonnum' => $moonnum,
		                );
						pdo_update($this->table_list, $updata, array('id' => $list['id']));				
				    }
				}	
			}
		}		
		//计算内定排名结束
		//取得分享人的数据查询是否屏蔽
		if(!empty($fromuser)) {
			$lists = pdo_fetch('SELECT id,status,moonnum,moontime FROM '.tablename($this->table_list).' WHERE from_user = :fromuser and weid = :weid and rid = :rid limit 1', array(':fromuser' => $fromuser,':weid' => $weid,':rid' => $rid));
			if(!empty($lists)){
			   $uid= $lists['id'];
			   $ztotal = $lists['moonnum'];
			   $moontime = $lists['moontime'];
			   if ($lists['status']==0){
				   $statmoontitle = '<h1>因作弊行为被管理员屏蔽，请告知您的朋友联系 '.$_W['account']['name'].' 管理员!</h1>'; 
			   }			
			}
		}
		//取得所有分享排名100
		$listshare = pdo_fetchall('SELECT a.*,b.realname,b.mobile FROM '.tablename($this->table_list).' as a left join '.tablename('fans').' as b on a.from_user=b.from_user  WHERE a.weid= :weid AND a.rid = :rid order by `moonnum` desc,`moontime` asc LIMIT '.$moon_ranknum.'', array(':weid' => $weid,':rid' => $rid));

		$count= pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." and rid= ".$rid." and moonnum >= ".$ztotal."");
		$sharepms=$count['dd'];//排名
		//查询同助抢排名数
		if ($moontime!='') {
		    $countt= pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." and rid= ".$rid." and moonnum = ".$ztotal." and moontime>".$moontime."");
		    $sharepmt=$countt['dd'];//同助抢排名数
		}else{
		    $sharepmt=0;
		}

		$sharepm=$sharepms-$sharepmt;//排名


		$count = pdo_fetch('SELECT count(id) as dd FROM '.tablename($this->table_list).' WHERE weid=:weid and rid= :rid', array(':weid' => $weid,':rid' => $rid));
		$listtotal = $count['dd'];//总参与人数
		//取得抢月饼数据
		if(!empty($uid)) {
		    $list = pdo_fetchall('SELECT * FROM '.tablename($this->table_data).'  WHERE weid= :weid and uid = :uid and rid = :rid order by `moontime` desc LIMIT '.$moon_shownum.'', array(':weid' => $_W['weid'], ':uid' => $uid, ':rid' => $rid) );			
		}		
		//整理数据进行页面显示
		$profiles = fans_search($fromuser, array('realname', 'mobile'));
		if (strpos($reply['picture'], 'http') === false) {
			$imgurl=$_W['attachurl'] . $reply['picture'];
		}else{
			$imgurl=$reply['picture'];
		}
      	$title = $reply['title'];
		$staturl=$_W['siteroot'].$this->createMobileUrl('statmoon', array('rid' => $rid,'fromuser' => $fromuser));
		$jumpurl = $reply['moonurl'];
	
	    
		$user_agent = $_SERVER['HTTP_USER_AGENT'];
	     if (strpos($user_agent, 'MicroMessenger') === false) {
			echo "本页面仅支持微信访问!非微信浏览器禁止浏览!";
			exit;
	    } 
		
			include $this->template('oauth2');
	    
	}
	
	public function doMobileoauth2() {
		global $_GPC,$_W;
		$weid = $_W['weid'];//当前公众号ID
		//用户不授权返回提示说明
		if ($_GPC['code']=="authdeny"){
		    $url = $_W['siteroot'].$this->createMobileUrl('oauth', array('rid' => $_GPC['rid'],'fromuser' => $_GPC['fromuser']));
			header("location:$url");
		}
		//高级接口取未关注用户Openid
		if (isset($_GPC['code'])){
		    //第二步：获得到了OpenID
		    $appid = $_W['account']['key'];
		    $secret = $_W['account']['secret'];
			$serverapp = $_W['account']['level'];	//是否为高级号
			if ($serverapp!=2) {//普通号
				$cfg = $this->module['config'];
			    $appid = $cfg['appid'];
			    $secret = $cfg['secret'];
			}//借用的
			$state = $_GPC['state'];//1为关注用户, 0为未关注用户
			
		    $rid = $_GPC['rid'];
			//查询活动时间
			$reply = pdo_fetch("SELECT end_time FROM ".tablename($this->table_reply)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			$end_time = $reply['end_time'];
			$day_cookies = round(($reply['end_time']-time())/3600/24);
			//还有多少天活动结束
		    $fromuser =  $_GPC['fromuser'];
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
			if ($profile['follow']==1){//关注用户直接获取信息	
			    $state = 1;
			}else{//未关注用户跳转到授权页
				$url = $_W['siteroot'].$this->createMobileUrl('oauth2', array('rid' => $rid,'fromuser' => $fromuser));
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
				echo '<h1>获取微信公众号授权失败[无法取得info], 请稍后重试！ 公众平台返回原始数据为: <br />' . $content['meta'].'<h1>';
				exit;
			}
		    $headimgurl = $info['headimgurl'];
			$nickname = $info['nickname'];
			//设置cookie信息
			setcookie("user_oauth2_headimgurl", $headimgurl, time()+3600*24*$day_cookies);
			setcookie("user_oauth2_nickname", $nickname, time()+3600*24*$day_cookies);
			setcookie("user_oauth2_openid", $from_user, time()+3600*24*$day_cookies);
			//取用户信息直接跳转
	    	$url = $_W['siteroot'].$this->createMobileUrl('statdo', array('rid' => $rid,'fromuser' => $fromuser,'from_user' => $from_user,'nickname' => $nickname,'headimgurl' => $headimgurl));
	        header("location:$url");
		}else{
			echo '<h1>不是高级认证号或网页授权域名设置出错!</h1>';
			exit;		
		}
	
	}
	
	public function doMobilestatmoon() {
	    //抢月饼分享页面显示。
		global $_GPC,$_W;
		$weid = $_W['weid'];//当前公众号ID
		$fromuser =  $_GPC['fromuser'];
		$from_user = $_W['fans']['from_user'];
		$rid  = $_GPC['rid'];//当前规则ID
		$appid = $_W['account']['key'];
		$secret = $_W['account']['secret'];
		$serverapp = $_W['account']['level'];	//是否为高级号
		if ($serverapp!=2) {//普通号
			//查询是否有借用接口
			$cfg = $this->module['config'];
			$appid = $cfg['appid'];
			$secret = $cfg['secret'];
			if(!empty($secret)){
				//查询是否已授权过 授权过直接显示助抢
		        if (isset($_COOKIE["user_oauth2_openid"])){
		    	    $urlcookie = $_W['siteroot'].$this->createMobileUrl('statdo', array('rid' => $rid,'fromuser' => $fromuser,'from_user' => $_COOKIE["user_oauth2_openid"],'nickname' => $_COOKIE["user_oauth2_nickname"],'headimgurl' => $_COOKIE["user_oauth2_headimgurl"]));
	                header("location:$urlcookie");
		        }else{
		            $url = $_W['siteroot'].$this->createMobileUrl('oauth2', array('rid' => $rid,'fromuser' => $fromuser));
		            //需要授权跳转到授权页
			        $oauth2_code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($url)."&response_type=code&scope=snsapi_base&state=0#wechat_redirect";
		            header("location:$oauth2_code");
		        }			
			}else{
                if (isset($_COOKIE["user_nooauth2no_openid"])){
		    	    $urlcookie = $_W['siteroot'].$this->createMobileUrl('statdo', array('rid' => $rid,'fromuser' => $fromuser,'from_user' => $_COOKIE["user_nooauth2no_openid"]));
	                header("location:$urlcookie");
		        }else{
				    $now = time();
				    //查询活动时间
			        $reply = pdo_fetch("SELECT end_time FROM ".tablename($this->table_reply)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			        $end_time = $reply['end_time'];
			        $day_cookies = round(($reply['end_time']-time())/3600/24);
			        //还有多少天活动结束
				    setcookie("user_nooauth2no_openid", $now, time()+($day_cookies*24*3600), '/');
				    $urlnocookie = $_W['siteroot'].$this->createMobileUrl('statdo', array('rid' => $rid,'fromuser' => $fromuser,'from_user' => $now));
	                header("location:$urlnocookie");
			    }
			}
		
		}else{//高级号
		    //查询是否已授权过 授权过直接显示助抢
		    if (isset($_COOKIE["user_oauth2_openid"])){
		    	$urlcookie = $_W['siteroot'].$this->createMobileUrl('statdo', array('rid' => $rid,'fromuser' => $fromuser,'from_user' => $_COOKIE["user_oauth2_openid"],'nickname' => $_COOKIE["user_oauth2_nickname"],'headimgurl' => $_COOKIE["user_oauth2_headimgurl"]));
	            header("location:$urlcookie");
		    }else{
		    //查询是否关注用户
		        $profile  = fans_search($from_user, array('follow'));
		        $url = $_W['siteroot'].$this->createMobileUrl('oauth2', array('rid' => $rid,'fromuser' => $fromuser));
		        if ($profile['follow']==1){//关注用户不需要授权直接获取用户信息		
		        	 $oauth2_code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($url)."&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
		        }else{//未关注用户需要授权跳转到授权页
			         $oauth2_code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($url)."&response_type=code&scope=snsapi_base&state=0#wechat_redirect";
		        }
		        header("location:$oauth2_code");
		    }
	    }

	}

	public function doMobilestatdo() {
	    //抢月饼分享页面显示。
		global $_GPC,$_W;
		$weid      = $_W['weid'];//当前公众号ID
		$fromuser  = $_GPC['fromuser'];
		$from_user = $_GPC['from_user'];
		$rid       = $_GPC['rid'];//当前规则ID
		$headimgurl= $_GPC['headimgurl'];//用户头像
		$nickname  = $_GPC['nickname'];//用户昵称
		$serverapp = $_W['account']['level'];	//是否为高级号
		
		//2014-09-28新增部分开头
		 if (!isset($_COOKIE["user_oauth2_openid"])){
			$staturl=$_W['siteroot'].$this->createMobileUrl('statmoon', array('rid' => $rid,'fromuser' => $fromuser));
			
			header("location:$staturl");
		}
		//2014-09-28新增部分结尾
		
		
		if ($serverapp!=2) {//普通号
			//查询是否有借用接口
			$cfg = $this->module['config'];
			$appid = $cfg['appid'];
			$secret = $cfg['secret'];
			if (!empty($appid)) {
				$serverappjie = 2;			
			}
		}

		if(empty($rid)){
		    echo '<h1>分享rid出错，请联系管理员!</h1>';
			exit;
		}
		if(empty($fromuser)){
		    echo '<h1>分享人出错，请联系管理员!</h1>';
			exit;
		}
		if(empty($from_user)){
		    echo '<h1>助抢人出错，请联系管理员!</h1>';
			exit;
		}
		//查询分享活动规则	查询是否开始或暂停
      	if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->table_reply)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			$moon_show = $reply['moon_show'];
			$moon_imgtext = $reply['moon_imgtext'];
			$moon_rankshow = $reply['moon_rankshow'];
			$moon_shownum = $reply['moon_shownum'];
			$moon_ranknum = $reply['moon_ranknum'];
			$moon_type = $reply['moon_type'];
			$dingpic = $reply['dingpic'];
			$zanpic = $reply['zanpic'];
			$shangjiapic = $reply['shangjiapic'];
			if (substr($dingpic,0,6)=='images'){
			   $dingpic = $_W['attachurl'] . $dingpic;
			}
			if (substr($zanpic,0,6)=='images'){
			   $zanpic = $_W['attachurl'] . $zanpic;
			}
			if (substr($shangjiapic,0,6)=='images'){
			   $shangjiapic = $_W['attachurl'] . $shangjiapic;
			}
			if($reply['shangjiamap']!=''){
		       list($reply['lng'],$reply['lat'])=explode(',',$reply['shangjiamap']);
		    }
			if ($reply['status']==0) {
				$statmoontitle = '<h1>活动暂停！请稍候再试！</h1>';
			}
			if (time()<$reply['start_time']) {//判断活动是否已经开始
				$statmoontitle = '<h1>活动未开始！</h1>';
			}elseif (time()>$reply['end_time']) {//判断活动是否已经结束
				$statmoontitle = '<h1>活动已结束！</h1>';
			}
			
 		}
		//计算内定排名开始
		if ($reply['ndrankstatus']==1){			
			//取真实排名第一的助抢数
			$moonnum = 0;
			$listshare = pdo_fetch('SELECT moonnum,from_user FROM '.tablename($this->table_list).'  WHERE weid= :weid AND rid = :rid and ndrank = 0 order by `moonnum` desc LIMIT 1', array(':weid' => $weid,':rid' => $rid));
			if (!empty($listshare)){
			    $moonnum = $listshare['moonnum'];
			    //取内定排名人员
			    $lists = pdo_fetchall("SELECT id,ndranknums,moonnum FROM ".tablename($this->table_list)." WHERE weid = '".$weid."' and rid= '".$rid."' and ndrank > 0 order by `ndrank` desc limit ".$reply['ndrankstatusnum']."" );
			    foreach ($lists as $list) {
				    if($list['moonnum']<=$moonnum){
					    $moonnum = intval($moonnum+mt_rand(1,$list['ndranknums']));
						$updata = array(
			               'moonnum' => $moonnum,
		                );
						pdo_update($this->table_list, $updata, array('id' => $list['id']));				
				    }
				}	
			}
		}		
		//计算内定排名结束
		//查询是否为分享，如果是则直接跳转开始
		if($reply['type']==0){
			$profiles = fans_search($fromuser, array('realname', 'mobile'));
		    if (empty($profiles['realname'])){
			    $statmoontitle="没有此用户!";
		    }
			if($from_user!=$fromuser And $statmoontitle==''){
			    $moonip = getip();
		        $now = time();
		        //分享人积分
		        $profile1 = fans_search($fromuser, array('realname','credit1'));
		        $credit1=$profile1['credit1'];
		        $realname1=$profile1['realname'];
		        //分享人积分
		        $credit = rand($reply['credit'],$reply['creditx']);
		        $insertcredit = array(
				   'credit1' => $credit+$credit1
		        );
		        //积分记录相关
		        $creditlog = array(
			       'weid'       => $weid,
			       'from_user'  => $fromuser,
			       'type'       => '1',
			       'credit'     => $credit,
			       'name'       => '抢月饼',
			       'nametype'   => 'hlmoon',
			       'content'    => $reply['title'],
			       'ip'         => $moonip,
			       'createtime' => $now
		        );
		        //积分记录相关
				//取得抢月饼数据
		 	      $list = pdo_fetch("SELECT * FROM ".tablename($this->table_list)." WHERE from_user = '".$fromuser."' and weid = '".$weid."' and rid = '".$rid."' limit 1" );		       
			    	if(!empty($list)){
						if($reply['moon_numtype']==0){//只限一次直接跳转
						    $moonurl = $reply['moonurl'];
			                header("location:$moonurl");					
					    }
			    		$moonid = $list['id'];
				    	//取得分享详细数据，判断浏览者是否是同一人24小时内同一IP访问
				    	if($reply['moon_type']==0){//IP限制
				    		$moon_data = pdo_fetch("SELECT * FROM ".tablename($this->table_data)." WHERE uid = '".$moonid."' and rid = '".$rid."' and from_user = '".$from_user."' and weid = '".$weid."' and moonip= '".$moonip."' limit 1" );					
				    	}else{//真实限制
				    		$moon_data = pdo_fetch("SELECT * FROM ".tablename($this->table_data)." WHERE uid = '".$moonid."' and rid = '".$rid."' and from_user = '".$from_user."' and weid = '".$weid."'  limit 1" );					
					    }
					
					    if(!empty($moon_data)){
					    	$sid		=	$moon_data['id'];
					    	$moontime	=	$moon_data['moontime'];
					    	$updatetime	=	$now-$moontime;
					    	//访问如果是在24小时后，更新分享数据，更新分享数
					    	if($updatetime >= ($reply['moon_num']*24*3600)){
						    	$zannum = $list['moonnum']+1;
						    	$updatedata = array(
							    	'viewnum'   => $moon_data['viewnum']+1,
							    	'moontime' => $now								
							    	);	
							    $updatelist = array(
							    	'moonnum' => $list['moonnum']+1,
							    	'moontime' => $now
							    	);							
							    pdo_update($this->table_data,$updatedata,array('id' => $sid));
							    pdo_update($this->table_list,$updatelist,array('id' => $moonid));
								if($credit>0){//增送积分多于0时才添加记录
									pdo_update('fans', $insertcredit, array('from_user' => $fromuser));
							        pdo_insert($this->table_log, $creditlog);//积分记录								
								}							    
							    //判断是否中奖
							    if($list['zhongjiang']==0 and ($list['moonnum']+1)>=$reply['moonnum']){
							    	$updatezj = array(
							    	'zhongjiang' => 1
							    	);							
							        pdo_update($this->table_list,$updatezj,array('from_user' => $fromuser));
							    	//发送邮件提醒$reply['email']
							    	//邮件提醒 下单提醒
								       ihttp_email($reply['email'], '抢月饼', '您的粉丝[ '.$realname1.' ]在'.$reply['title'].'活动中，集够 '.$reply['moonnum'].' 个助抢，赢取了您设定的奖励，请您及时联系客户！');
								    //邮件提醒 下单提醒
							    }//判断是否中奖完成
						    }
					    }else{
						    	$zannum = $list['moonnum']+1;							
						    	$insertdata = array(
						    		'weid'      => $weid,
							    	'from_user' => $from_user,
							    	'avatar'    => $headimgurl,
							    	'realname'  => $nickname,
							    	'rid'       => $rid,
							    	'uid'       => $moonid,
							    	'moonip'	=> $moonip,
							    	'moontime'=> $now
							    	);	
							    $updatelist = array(
							    	'moonnum' => $list['moonnum']+1,
							    	'moontime' => $now
							    	);	
							    pdo_insert($this->table_data, $insertdata);
							    pdo_update($this->table_list,$updatelist,array('id' => $moonid));
								if($credit>0){//增送积分多于0时才添加记录
									pdo_update('fans', $insertcredit, array('from_user' => $fromuser));
							        pdo_insert($this->table_log, $creditlog);//积分记录								
								}
							    //判断是否中奖
							    if($list['zhongjiang']==0 and ($list['moonnum']+1)>=$reply['moonnum']){
							    	$updatezj = array(
							    	'zhongjiang' => 1
							    	);							
							        pdo_update($this->table_list,$updatezj,array('from_user' => $fromuser));
							    	//邮件提醒 下单提醒
								       ihttp_email($reply['email'], '抢月饼', '您的粉丝[ '.$realname1.' ]在'.$reply['title'].'活动中，集够 '.$reply['moonnum'].' 个助抢，赢取了您设定的奖励，请您及时联系客户！');
								    //邮件提醒 下单提醒
							    }//判断是否中奖完成
					    }
				    }else{					
				    	//添加抢月饼记录
				    	$zannum = 1;
				    	$insertlistdata = array(
					    	'weid'      => $weid,
					    	'from_user' => $fromuser,
					    	'rid'       => $rid,
					    	'moonnum'  => 1,
					    	'moontime' => $now
				    	);
					    pdo_insert($this->table_list, $insertlistdata);
					    $uid = pdo_insertid();//取抢月饼记录id号
					    //添加抢月饼记录
					    //添加分享记录
					    $insertdata = array(
					    	'weid'      => $weid,
						    'from_user' => $from_user,
						    'avatar'    => $headimgurl,
						    'realname'  => $nickname,
						    'rid'       => $rid,
						    'uid'       => $uid,
						    'moonip'	=> $moonip,
						    'moontime' => $now
					    );
					    pdo_insert($this->table_data, $insertdata);
					    $dataid = pdo_insertid();//取分享助抢人的id
					    //添加分享记录
						if($credit>0){//增送积分多于0时才添加记录
							pdo_update('fans', $insertcredit, array('from_user' => $fromuser));
							pdo_insert($this->table_log, $creditlog);//积分记录								
					    }
				    }		
		            
			}
			 $moonurl = $reply['moonurl'];
			 header("location:$moonurl");		       
		}
		//查询是否为分享，如果是则直接跳转结束
		//取得分享人的数据查询是否屏蔽
		if(!empty($fromuser)) {
			$lists = pdo_fetch('SELECT id,status,moonnum,moontime FROM '.tablename($this->table_list).' WHERE from_user = :fromuser and weid = :weid and rid = :rid limit 1', array(':fromuser' => $fromuser,':weid' => $weid,':rid' => $rid));
			if(!empty($lists)){
			   $uid= $lists['id'];
			   $ztotal = $lists['moonnum'];
			   $moontime = $lists['moontime'];
			   if ($lists['status']==0){
				   $statmoontitle = '<h1>因作弊行为被管理员屏蔽，请告知您的朋友联系 '.$_W['account']['name'].' 管理员!</h1>'; 
			   }
			}else{
			   $uid= 0;
			   $ztotal = 0;
			}
		}
		//取得所有分享排名100
		$listshare = pdo_fetchall('SELECT a.*,b.realname,b.mobile FROM '.tablename($this->table_list).' as a left join '.tablename('fans').' as b on a.from_user=b.from_user  WHERE a.weid= :weid AND a.rid = :rid order by `moonnum` desc,`moontime` asc LIMIT '.$moon_ranknum.'', array(':weid' => $weid,':rid' => $rid));
		$count= pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." and rid= ".$rid." and moonnum >= ".$ztotal."");
		$sharepms=$count['dd'];//排名
		//查询同助抢排名数
		if ($moontime!='') {
		    $countt= pdo_fetch("SELECT count(id) as dd FROM ".tablename($this->table_list)." WHERE weid=".$weid." and rid= ".$rid." and moonnum = ".$ztotal." and moontime>".$moontime."");
		    $sharepmt=$countt['dd'];//同助抢排名数
		}else{
		    $sharepmt=0;
		}

		$sharepm=$sharepms-$sharepmt;//排名
		$count = pdo_fetch('SELECT count(id) as dd FROM '.tablename($this->table_list).' WHERE weid=:weid and rid= :rid', array(':weid' => $weid,':rid' => $rid));
		$listtotal = $count['dd'];//总参与人数
		//取得抢月饼数据
		if(!empty($uid)) {
		    $list = pdo_fetchall('SELECT * FROM '.tablename($this->table_data).'  WHERE weid= :weid and uid = :uid and rid = :rid order by `moontime` desc LIMIT '.$moon_shownum.'', array(':weid' => $_W['weid'], ':uid' => $uid, ':rid' => $rid) );			
		}		
		//整理数据进行页面显示
		//判断是否为关注用户
		$profiles = fans_search($fromuser, array('realname', 'mobile'));
		if (empty($profiles['realname'])){
			$statmoontitle="没有此用户!";
		
		}
		$profile  = fans_search($from_user, array('realname', 'mobile'));
		//判断是否为关注用户
		if (strpos($reply['picture'], 'http') === false) {
			$imgurl=$_W['attachurl'] . $reply['picture'];
			
		}else{
			$imgurl=$reply['picture'];
		}
      	$title = $reply['title'];
		$regurl=$this->createMobileUrl('statupdata');
		$staturl=$_W['siteroot'].$this->createMobileUrl('statmoon', array('rid' => $rid,'fromuser' => $fromuser));
		$jumpurl = $reply['moonurl'];
		
	    $user_agent = $_SERVER['HTTP_USER_AGENT'];
	    if (strpos($user_agent, 'MicroMessenger') === false) {
			echo "本页面仅支持微信访问!非微信浏览器禁止浏览!";
			exit;
	    } 
		
		$moonurl = $reply['moonurl'];
		
			include $this->template('do');
	    

	}

	//签到积分
	
	public function doMobileStat() {
		//抢月饼分享页面显示。
		global $_GPC,$_W;
        $result = array('status' => 0, 'message' => '', 'total' => 0, 'dataid' => 0);
		$operation = $_GPC['op'];
		$rid = intval($_GPC['rid']);
		$fromuser =  $_GPC['fromuser'];
		$from_user = $_GPC['from_user'];
		$headimgurl= $_GPC['headimgurl'];//用户头像
		$nickname  = $_GPC['nickname'];//用户昵称
		$weid = $_W['weid'];//当前公众号ID	
		//分享人积分
		$profile1 = fans_search($fromuser, array('realname','credit1'));
		$credit1=$profile1['credit1'];
		$realname1=$profile1['realname'];
		//分享人积分
		$moonip = getip();
		$now = time();		
		if(!empty($rid)) {
		  $reply = pdo_fetch("SELECT * FROM ".tablename($this->table_reply)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
		  $jumpurl = $reply['moonurl'];
		  $staturl=$_W['siteroot'].$this->createMobileUrl('stat', array('rid' => $rid,'fromuser' => $fromuser));
		  $credit = rand($reply['credit'],$reply['creditx']);
		  $insertcredit = array(
				   'credit1' => $credit+$credit1
		    );
		  //积分记录相关
		  $creditlog = array(
			'weid'       => $weid,
			'from_user'  => $fromuser,
			'type'       => '1',
			'credit'     => $credit,
			'name'       => '抢月饼',
			'nametype'   => 'hlmoon',
			'content'    => $reply['title'],
			'ip'         => $moonip,
			'createtime' => $now
			);
		  //积分记录相关
		}
		//未关注用户用cookie作为唯一值		
		if(empty($from_user)) {			
			$result['message'] = '没有取得openid无法助抢';
            message($result, '', 'ajax');
		}
		//分享人和查看人为同一人时，不参与加分直接跳转
		if($from_user==$fromuser){
		$result['message'] = '自己不能帮自己抢呀！';
        message($result, '', 'ajax');
		}else{
		    //取得抢月饼数据
		    if(!empty($fromuser)) {
		 	  $list = pdo_fetch("SELECT * FROM ".tablename($this->table_list)." WHERE from_user = '".$fromuser."' and weid = '".$weid."' and rid = '".$rid."' limit 1" );		
		    }else{
		       $result['message'] = '系统出错，求助抢人未知';
               message($result, '', 'ajax');
		    }
				
				if(!empty($list)){
					if($reply['moon_numtype']==0){
						$zannum = $list['moonnum'];
						$result['status'] = 0;
						$result['message'] = '您已助过抢了，此活动每个用户只限一次助抢!';
						$result['total'] = $zannum;
						message($result, '', 'ajax');					
					}else{
					$moonid = $list['id'];
					//取得分享详细数据，判断浏览者是否是同一人24小时内同一IP访问
					if($reply['moon_type']==0){//IP限制
						$moon_data = pdo_fetch("SELECT * FROM ".tablename($this->table_data)." WHERE uid = '".$moonid."' and rid = '".$rid."' and from_user = '".$from_user."' and weid = '".$weid."' and moonip= '".$moonip."' limit 1" );					
					}else{//真实限制
						$moon_data = pdo_fetch("SELECT * FROM ".tablename($this->table_data)." WHERE uid = '".$moonid."' and rid = '".$rid."' and from_user = '".$from_user."' and weid = '".$weid."'  limit 1" );					
					}
					
					if(!empty($moon_data)){
						$sid		=	$moon_data['id'];
						$moontime	=	$moon_data['moontime'];
						$updatetime	=	$now-$moontime;
						//访问如果是在24小时后，更新分享数据，更新分享数
						if($updatetime >= ($reply['moon_num']*24*3600)){
							$zannum = $list['moonnum']+1;
							$updatedata = array(
								'viewnum'   => $moon_data['viewnum']+1,
								'moontime' => $now								
								);	
							$updatelist = array(
								'moonnum' => $list['moonnum']+1,
								'moontime' => $now
								);							
							pdo_update($this->table_data,$updatedata,array('id' => $sid));
							$dataid = $sid;//取分享助抢人的id
							pdo_update($this->table_list,$updatelist,array('id' => $moonid));
							if($credit>0){//增送积分多于0时才添加记录
								pdo_update('fans', $insertcredit, array('from_user' => $fromuser));
							    pdo_insert($this->table_log, $creditlog);//积分记录								
							}
							//判断是否中奖
							if($list['zhongjiang']==0 and ($list['moonnum']+1)>=$reply['moonnum']){
								$updatezj = array(
								'zhongjiang' => 1
								);							
							    pdo_update($this->table_list,$updatezj,array('from_user' => $fromuser));
								//发送邮件提醒$reply['email']
								//邮件提醒 下单提醒
								   ihttp_email($reply['email'], '抢月饼', '您的粉丝[ '.$realname1.' ]在'.$reply['title'].'活动中，集够 '.$reply['moonnum'].' 个助抢，赢取了您设定的奖励，请您及时联系客户！');
								//邮件提醒 下单提醒
							}//判断是否中奖完成
						}else{
							//转化为时间
							$num = (($reply['moon_num']*24*3600)-$updatetime);
							$hour = floor($num/3600);
  							$minute = floor(($num-3600*$hour)/60);
  							$second = floor((($num-3600*$hour)-60*$minute)%60);
  							$num = $hour.'小时'.$minute.'分'.$second.'秒';

						    $zannum = $list['moonnum'];
							$result['status'] = 0;
							$result['message'] = '您已助过抢了，请于'.$num.'后再来助抢吧!';
							$result['total'] = $zannum;
							message($result, '', 'ajax');
						}
					}else{
							$zannum = $list['moonnum']+1;							
							$insertdata = array(
								'weid'      => $weid,
								'from_user' => $from_user,
								'avatar'    => $headimgurl,
								'realname'  => $nickname,
								'rid'       => $rid,
								'uid'       => $moonid,
								'moonip'	=> $moonip,
								'moontime'=> $now
								);	
							$updatelist = array(
								'moonnum' => $list['moonnum']+1,
								'moontime' => $now
								);	
							pdo_insert($this->table_data, $insertdata);
							$dataid = pdo_insertid();//取分享助抢人的id
							pdo_update($this->table_list,$updatelist,array('id' => $moonid));							
					        if($credit>0){//增送积分多于0时才添加记录
								pdo_update('fans', $insertcredit, array('from_user' => $fromuser));
							    pdo_insert($this->table_log, $creditlog);//积分记录								
							}
							//判断是否中奖
							if($list['zhongjiang']==0 and ($list['moonnum']+1)>=$reply['moonnum']){
								$updatezj = array(
								'zhongjiang' => 1
								);							
							    pdo_update($this->table_list,$updatezj,array('from_user' => $fromuser));
								//邮件提醒 下单提醒
								   ihttp_email($reply['email'], '抢月饼', '您的粉丝[ '.$realname1.' ]在'.$reply['title'].'活动中，集够 '.$reply['moonnum'].' 个助抢，赢取了您设定的奖励，请您及时联系客户！');
								//邮件提醒 下单提醒
							}//判断是否中奖完成
					}
					}
				}else{					
					//添加抢月饼记录
					$zannum = 1;
					$insertlistdata = array(
						'weid'      => $weid,
						'from_user' => $fromuser,
						'rid'       => $rid,
						'moonnum'  => 1,
						'moontime' => $now
					);
					pdo_insert($this->table_list, $insertlistdata);
					$uid = pdo_insertid();//取抢月饼记录id号
					//添加抢月饼记录
					//添加分享记录
					$insertdata = array(
						'weid'      => $weid,
						'from_user' => $from_user,
						'avatar'    => $headimgurl,
						'realname'  => $nickname,
						'rid'       => $rid,
						'uid'       => $uid,
						'moonip'	=> $moonip,
						'moontime' => $now
					);
					pdo_insert($this->table_data, $insertdata);
					$dataid = pdo_insertid();//取分享助抢人的id
					//添加分享记录
					if($credit>0){//增送积分多于0时才添加记录
						pdo_update('fans', $insertcredit, array('from_user' => $fromuser));
					    pdo_insert($this->table_log, $creditlog);//积分记录								
					}
				}			
		        $result['status'] = 1;
		        $result['message'] = '助抢成功！';
		        $result['total'] = $zannum;
				$result['dataid'] = $dataid;
		        message($result, '', 'ajax');
		}
	}
	
	
//积分兑换功能



	public function doMobileMycredit() {
		global $_W, $_GPC;
		checkauth();
		$award_list = pdo_fetchall("SELECT * FROM ".tablename($this->table_award)." as t1,".tablename($this->table_request)."as t2 WHERE t1.award_id=t2.award_id AND from_user='{$_W['fans']['from_user']}' AND t1.weid = '{$_W['weid']}' ORDER BY t2.createtime DESC");
		$profile = fans_search($_W['fans']['from_user']);
		include $this->template('mycredit');
	}



	public function doWebCredit() {
		// 1. display reservation
		// 2. add credit
		// 3. delete credit
		// 4. update credit
		global $_W;
		global $_GPC; // 获取query string中的参数
		$operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
		if ($operation == 'delete') { //删除兑换请求
			$id = intval($_GPC['id']);
			$row = pdo_fetch("SELECT id FROM ".tablename($this->table_request)." WHERE id = :id", array(':id' => $id));
			if (empty($row)) {
				message('抱歉，编号为'.$id.'的兑换请求不存在或是已经被删除！');
			}
			pdo_delete($this->table_request, array('id' => $id));
			message('删除成功！', referer(), 'success');
		} else if ($operation == 'display') {
			$condition = '';
			$sql = "SELECT * FROM ".tablename($this->table_award)." as t1,".tablename($this->table_request)."as t2 WHERE t1.award_id=t2.award_id AND t1.weid = '{$_W['weid']}' ORDER BY t2.createtime DESC";
			$list = pdo_fetchall($sql);
			$ar = pdo_fetchall($sql, array(), 'from_user');
			$fans = fans_search(array_keys($ar), array('realname', 'mobile', 'credit1', 'residedist'));
		}
		include $this->template("request");
	}
	
}