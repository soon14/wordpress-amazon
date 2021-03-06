<?php
/**
 * 微小店辅助工具
 *
 * @author 大树桩(QQ:345435142)
 * @url http://www.microb.cn
 */
defined('IN_IA') or exit('Access Denied');

class MicrobCore {
    private $account = null;

    public function __construct($account) {
        $this->account = $account;
    }

    public function submitNotify($openid, $trade) {
        global $_W;

        $sql = "SELECT * FROM " . tablename('mb_store_notifies') . ' WHERE `type`=:type AND `uniacid`=:uniacid';
        $pars = array();
        $pars[':type'] = 'submit';
        $pars[':uniacid'] = $_W['weid'];
        $setting = pdo_fetch($sql, $pars);
        if(empty($setting)) {
            return;
        }

        $caption = str_replace(array('{nickname}'), array($trade['buyer']), $setting['caption']);
        $remark = str_replace(array('{nickname}'), array($trade['buyer']), $setting['remark']);

        $params = array();
        $params['touser'] = $openid;
        $params['template_id'] = $setting['template'];
        $params['url'] = '';
        $params['topcolor'] = '#ff0000';
        $params['data']['first']            = array('value' => $caption, `color` => '#173177');
        $params['data']['orderMoneySum']    = array('value' => sprintf('%.2f', $trade['details'][0]['price']), `color` => '#173177');
        $params['data']['orderProductName'] = array('value' => $trade['details'][0]['title'] . "\n", `color` => '#173177');
        $params['data']['Remark']           = array('value' => $remark, `color` => '#173177');
        return $content = $this->notify($params);
    }

    private function notify($params) {
        $access = $this->fetchAccess();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' . $access;
        $params = json_encode($params);
        $content = ihttp_post($url, $params);
        if(is_error($content)) {
            return $content;
        } else {
            return @json_decode($content['content'], true);
        }
    }

    private function convertTrade($trade) {
        $t = array();
        $t['buyer'] = $trade['buyer_nick'];
        $t['details'] = array();
        $t['details'][] = array(
            'title'		=> $trade['product_name'],
            'price'		=> $trade['product_price'] / 100
        );
        return $t;
    }

    public function fetchUserInfo($openid) {
        $token = $this->fetchAccess();
        $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token={$token}&openid={$openid}&lang=zh_CN";
        $response = ihttp_get($url);
        if(is_error($response)) {
            return error(-1, "访问公众平台接口失败, 错误: {$response['message']}");
        }
        $info = @json_decode($response['content'], true);
        if(empty($info)) {
            return error(-2, "接口调用失败, 错误信息: {$response['content']}");
        } elseif (!empty($info['errcode'])) {
            return error(-3, "访问微信接口错误, 错误代码: {$info['errcode']}, 错误信息: {$info['errmsg']}");
        }
        $user = array();
        $user['openid']          = $info['openid'];
        $user['unionid']         = $info['unionid'];
        $user['nickname']        = $info['nickname'];
        $user['gender']          = $info['sex'];
        $user['city']            = $info['city'];
        $user['state']           = $info['province'];
        $user['avatar']          = $info['headimgurl'];
        $user['country']         = $info['country'];
        if(!empty($user['avatar'])) {
            $user['avatar'] = rtrim($user['avatar'], '0');
            $user['avatar'] .= '132';
        }
        $user['original'] = $info;
        return $user;
    }

    public function fetchAccess($force = false) {
        $sql = "SELECT * FROM " . tablename('redpacket_token') . ' WHERE `weid`=:weid';
        $pars = array();
        $pars[':weid'] = $this->account['weid'];
        $row = pdo_fetch($sql, $pars);
        if(!$force && !empty($row) && is_array($row) && !empty($row['access_token']) && !empty($row['expire_in']) && $row['expire_in'] + $row['createtime'] > TIMESTAMP) {
            return $row['access_token'];
        } else {
            $sql = "SELECT * FROM " . tablename('redpacket_setting') . ' WHERE `weid`=:weid';
            $pars = array();
            $pars[':weid'] = $this->account['weid'];
            $setting = pdo_fetch($sql, $pars);
            
            if(empty($setting['appid']) || empty($setting['secret'])) {
                return error(-1, '请填写公众号的appid及appsecret, (需要你的号码为微信服务号)！');
            }
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$setting['appid']}&secret={$setting['secret']}";
            $content = ihttp_get($url);
            if(is_error($content)) {
                return error(-2, '获取微信公众号授权失败, 请稍后重试！错误详情: ' . $content['message']);
            }
            $token = @json_decode($content['content'], true);
            if(empty($token) || !is_array($token) || empty($token['access_token']) || empty($token['expires_in'])) {
                return error(-3, '获取微信公众号授权失败, 请稍后重试！ 公众平台返回原始数据为: <br />' . $content['meta']);
            }
            $record = array();
            $record['access_token'] = $token['access_token'];
            $record['expires_in'] = $token['expires_in'];
            $record['createtime'] = TIMESTAMP;
            if(empty($row)) {
                $record['weid'] = $this->account['weid'];
                pdo_insert('redpacket_token', $record);
            } else {
                pdo_update('redpacket_token', $record, array('weid' => $this->account['weid']));
            }
            return $record['access_token'];
        }
    }
    
    public function fetchJSAPITicket($force = false) {
        $sql = "SELECT * FROM " . tablename('redpacket_token') . ' WHERE `weid`=:weid';
        $pars = array();
        $pars[':weid'] = $this->account['weid'];
        $row = pdo_fetch($sql, $pars);
        if(!empty($row)) {
            $row['jsticket'] = unserialize($row['jsticket']);
        }
        if(!$force && !empty($row) && is_array($row['jsticket']) && !empty($row['jsticket']['ticket']) && !empty($row['jsticket']['expire']) && $row['jsticket']['expire'] > TIMESTAMP) {
            return $row['jsticket']['ticket'];
        } else {
            $access = $this->fetchAccess($force);
            if(is_error($access)) {
                return $access;
            }
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$access}&type=jsapi";
            $content = ihttp_get($url);
            if(is_error($content)) {
                return error(-2, '获取微信公众号JSAPI票据失败, 请稍后重试！错误详情: ' . $content['message']);
            }
            $ticket = @json_decode($content['content'], true);
            if(empty($ticket) || !is_array($ticket) || empty($ticket['ticket']) || empty($ticket['expires_in'])) {
                return error(-3, '获取微信公众号JSAPI票据失败, 请稍后重试！ 公众平台返回原始数据为: <br />' . $content['meta']);
            }
            $record = array();
            $record['ticket'] = $ticket['ticket'];
            $record['expire'] = TIMESTAMP + $ticket['expires_in'];
            $row = array();
            $row['jsticket'] = serialize($record);
            pdo_update('redpacket_token', $row, array('weid' => $this->account['weid']));
            return $record['ticket'];
        }
    }
    
    public function buildJSAPIParams() {
        global $_W;
        
        $sql = "SELECT * FROM " . tablename('redpacket_setting') . ' WHERE `weid`=:weid';
        $pars = array();
        $pars[':weid'] = $this->account['weid'];
        $setting = pdo_fetch($sql, $pars);
        if(empty($setting['appid']) || empty($setting['secret'])) {
            return error(-1, '请填写公众号的appid及appsecret, (需要你的号码为微信服务号)！');
        }
        
        $ticket = $this->fetchJSAPITicket();
        if(is_error($ticket)) {
            return $ticket;
        }
        $pars = array();
        $pars['jsapi_ticket'] = $ticket;
        $pars['noncestr'] = random(16);
        $pars['timestamp'] = TIMESTAMP;
        $pars['url'] = $_W['siteroot'] . ltrim($_W['script_name'], '/') . '?' . $_SERVER['QUERY_STRING'];
        
        $string1 = '';
        foreach($pars as $k => $v) {
            $string1 .= "{$k}={$v}&";
        }
        $string1 = substr($string1, 0, -1);
        $sign = sha1($string1);
        $ret = array();
        $ret['appid'] = $setting['appid'];
        $ret['timestamp'] = $pars['timestamp'];
        $ret['noncestr'] = $pars['noncestr'];
        $ret['signature'] = $sign;
        return $ret;
    }
}
