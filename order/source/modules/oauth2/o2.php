
<?php
defined ( 'IN_IA' ) or exit ( 'Access Denied' );
require_once 'emoji.php';
class O2 {
	public static function blurStr($str, $o) {
		$length = strlen ( $str );
		for($i = $o; $i < $length - $o; $i ++) {
			$str = substr_replace ( $str, '*', $i, 1 );
		}
		return $str;
	}
	public static function getOauther($weid) {
		global $_W, $_GPC;
		$weid = ! empty ( $weid ) ? $weid : $_W ['weid'];
		return pdo_fetch ( 'SELECT * FROM' . tablename ( 'oauther' ) . " WHERE weid = :weid", array (
				':weid' => $weid 
		) );
	}
	public static function getHost() {
		return pdo_fetch ( 'SELECT * FROM' . tablename ( 'ohost' ) );
	}
	public static function getUserInfo($uid) {
		return pdo_fetch ( 'SELECT * FROM' . tablename ( 'members' ) . " AS t1 JOIN " . tablename ( 'members_group' ) . " AS t2 ON t1.groupid = t2.id WHERE t1.uid = :uid", array (
				':uid' => $uid 
		) );
	}
	public static function logError($content) {
		global $_W, $_GPC;
		if (empty ( $content )) {
			$content = '未知错误';
		}
		pdo_insert ( 'oerrorlog', array (
				'weid' => $_W ['weid'],
				'content' => $content,
				'createtime' => TIMESTAMP 
		) );
	}
	public static function checkOauth() {
		global $_W, $_GPC;
		$host = self::getHost ();
		$settings = pdo_fetch ( 'SELECT * FROM' . tablename ( 'oconfig' ) . " WHERE weid = :weid", array (
				':weid' => $_W ['weid'] 
		) );
		$config = empty ( $settings ['ising'] ) ? 1 : $settings ['ising'];
		if ($config != 1) {
			$key = $_W ['account'] ['key'];
			$secret = $_W ['account'] ['secret'];
			return array (
					'key' => $key,
					'secret' => $secret 
			);
		}
		if (empty ( $host )) {
			$key = $_W ['account'] ['key'];
			$secret = $_W ['account'] ['secret'];
			if (empty ( $key ) || empty ( $secret )) {
				self::logError ( '管理员未设置可供借用的APPID和APPSECRET' );
				message ( '管理员未开启此功能..如需使用请致电平台商' );
			}
			return array (
					'key' => $key,
					'secret' => $secret 
			);
		} else {
			$oauther = self::getOauther ();
			if (empty ( $oauther )) {
				$key = $_W ['account'] ['key'];
				$secret = $_W ['account'] ['secret'];
				if (empty ( $key ) || empty ( $secret )) {
					self::logError ( '用户缺失APPID或APPSECRET' );
					message ( '您的APPID或APPSECRET为空...' );
				}
			} else {
				$type = $oauther ['type'];
				if ($type == 1) {
					$key = $oauther ['key'];
					$secret = $oauther ['secret'];
				} elseif ($type == 2) {
					$oweid = $host ['host'];
					$item = pdo_fetch ( 'SELECT * FROM' . tablename ( 'wechats' ) . " WHERE weid = :weid", array (
							':weid' => $oweid 
					) );
					$key = $item ['key'];
					$secret = $item ['secret'];
				} else {
					self::logError ( '缺失重要的分类参数' );
					message ( '缺失重要的分类参数', '', 'error' );
				}
				if (empty ( $key ) || empty ( $secret )) {
					self::logError ( '装载之后APPID或APPSECRET为空' );
					message ( '未知错误' );
				}
			}
			return array (
					'key' => $key,
					'secret' => $secret 
			);
		}
	}
	public static function createOuath() {
		global $_W, $_GPC;
		$o2 = self::checkOauth ();
		$state = base64_encode ( 'on3' );
		$url = $_W ['siteroot'] . $_SERVER ['REQUEST_URI'];
		$forward = urlencode ( $url );
		$key = $o2 ['key'];
		$url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $key . '&redirect_uri=' . $forward . '&response_type=code&scope=snsapi_userinfo&state=' . $state . '#wechat_redirect';
		header ( 'location:' . $url );
		exit ();
	}
	public static function getOuser() {
		global $_W, $_GPC;
		$code = $_GPC ["code"];
		if (empty ( $code )) {
			self::createOuath ();
		}
		$data = $_GPC ['profileInfo'];
		if (empty ( $data )) {
			$o2 = self::checkOauth ();
			$key = $o2 ['key'];
			$secret = $o2 ['secret'];
			$url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $key . '&secret=' . $secret . '&code=' . $code . '&grant_type=authorization_code';
			$data = ihttp_get ( $url );
			$temp = @json_decode ( $data ['content'], true );
			$access_token = $temp ['access_token'];
			$openid = $temp ['openid'];
			isetcookie ( 'profileInfo', base64_encode ( json_encode ( array (
					'openid' => $openid,
					'access_token' => $access_token 
			) ) ), 6600 );
		} else {
			$profile = json_decode ( base64_decode ( $data ), true );
			$access_token = $profile ['access_token'];
			$openid = $profile ['openid'];
		}
		$user_url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $access_token . '&openid=' . $openid;
		$user_temp = ihttp_get ( $user_url );
		$user = @json_decode ( $user_temp ['content'], true );
		if ($user ['errcode'] == '40001') {
			isetcookie ( 'profileInfo', '', - 86400 );
			self::getOuser ();
		} elseif ($user ['errcode'] != 0 && $user ['errcode'] != '40001') {
			self::logError ( account_weixin_code ( $user ['errcode'] ) );
			isetcookie ( 'profileInfo', '', - 86400 );
			message ( account_weixin_code ( $user ['errcode'] ), '', 'error' );
			exit ();
		}
		$oauther = self::getOauther ();
		$config = empty ( $settings ['ising'] ) ? 1 : $settings ['ising'];
		if (! empty ( $oauther ) && $oauther ['type'] && $config != 1) {
			pdo_update ( 'oauther', array (
					'sum' => $oauther ['sum'] + 1 
			), array (
					'weid' => $_W ['weid'] 
			) );
		}
		$user ['nickname'] = emoji_unified_to_html ( $user ['nickname'] );
		return $user;
	}
}
?>