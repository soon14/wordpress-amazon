<?php
defined('IN_IA') or exit ('Access Denied');

class FightingModuleSite extends WeModuleSite {
	public $tablename = 'fighting_setting';
	
	//
	 public function doMobileUrl() {
        global $_GPC, $_W;
      
        $id = intval($_GPC['id']);
      
        $flight_setting = pdo_fetch("SELECT * FROM " . tablename('fighting_setting') . " WHERE rid = '$id' LIMIT 1");
        if (empty($flight_setting)) {
            message('非法访问，请重新发送消息进入一战到底页面！');
        }
        
        // 是需要高级权限 去取 fighting_openid
		/**if (empty($_GPC['fighting_openid']) && $this->module['config']['issecret']==1) {
			$account = $this->getAccount();		
			$callback = urlencode($_W['siteroot'].$this->createMobileUrl('oauth'));
			$state = base64_encode($_SERVER['QUERY_STRING']);
			$forward = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$account['key']}&redirect_uri={$callback}&response_type=code&scope=snsapi_base&state={$state}#wechat_redirect";
			header('location: ' . $forward);
			exit();
		}**/
        
        $fromuser = $_W['fans']['from_user'];
        $member = fans_search($fromuser);
       	if (empty($member)) {
            $shareurl = $flight_setting['shareurl'];//分享URL
            header("location:$shareurl");
       	}
        $user = fans_search($_W['fans']['from_user'],array('nickname','mobile'));
		if(empty($user['nickname']) || empty($user['mobile'])) {
			//注册
			$userinfo = 0;
		} 
		//演示TODO
		$fighting = pdo_fetch("SELECT * FROM " . tablename('fighting') . " WHERE `from_user`=:from_user AND `fid`=" . $flight_setting['id'] . " ORDER BY id DESC LIMIT 1", array (':from_user' => $fromuser ));
		$updateData = array (
			'answerNum' => 0,
		);
		pdo_update('fighting', $updateData, array ( 'id' => $fighting['id'] ));
		
		$setting = $this->module['config'];
		$setting['thumb'] = toimage($setting['thumb']);
		$setting['thumb2'] = toimage($setting['thumb2']);
		include $this->template('start');
    }
    
     
    //开始答题
    public function doMobileStart() {
    	 global $_GPC, $_W;
       
		$year = ((int) date('Y', time())); //取得年份
		$month = ((int) date('m', time())); //取得月份
		$day = ((int) date('d', time())); //取得几号

		$start = ((int) mktime(0, 0, 0, $month, $day, $year));
      
        $id = intval($_GPC['id']);
        $flight_setting = pdo_fetch("SELECT * FROM " . tablename('fighting_setting') . " WHERE rid = '$id' LIMIT 1");
        if (empty($flight_setting)) {
            message('非法访问，请重新发送消息进入一战到底页面！');
        }
        
        $fromuser = $_W['fans']['from_user'];
        $member = fans_search($fromuser);
      	if (empty($member)) {
            $shareurl = $flight_setting['shareurl'];//分享URL
            header("location:$shareurl");
        }
            
		$user = fans_search($fromuser,array('nickname','mobile'));
		if( empty($user['nickname']) || empty($user['mobile'])) {
			//注册
			$userinfo = 0;
			include $this->template('start');
			exit ;
		}
		 
        $fighting = pdo_fetch("SELECT * FROM " . tablename('fighting') . " WHERE `from_user`=:from_user AND `fid`=" . $flight_setting['id'] . " ORDER BY id DESC LIMIT 1", array (':from_user' => $fromuser ));
	   //演示TODO
		/*$updateData = array (
			'answerNum' => 0,
		);
		pdo_update('fighting', $updateData, array ( 'id' => $fighting['id'] ));*/
      	//$sql_question = "SELECT * FROM `ims_fighting_question_bank` WHERE id >= (SELECT floor( RAND() * ((SELECT MAX(id) FROM `ims_fighting_question_bank`)-(SELECT MIN(id) FROM `ims_fighting_question_bank`)) + (SELECT MIN(id) FROM `ims_fighting_question_bank`))) ORDER BY id LIMIT 1";
		
	$sql_question =	"SELECT *  FROM `ims_fighting_question_bank` AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `ims_fighting_question_bank`)-(SELECT MIN(id) FROM `ims_fighting_question_bank`))+(SELECT MIN(id) FROM `ims_fighting_question_bank`)) AS id) AS t2 WHERE t1.id >= t2.id  ORDER BY t1.id LIMIT 0,1 " ;
		//$sql_question="SELECT * FROM `ims_fighting_question_bank` ORDER BY RAND() LIMIT 0,1" ;
		$question = pdo_fetch($sql_question);
		
		$an_arr = $question[answer];//正确答案
		
		$setting = $this->module['config'];
		$setting['thumb'] = toimage($setting['thumb']);
		$setting['thumb2'] = toimage($setting['thumb2']);
		
		//是否已经答题
		$ds = pdo_fetchall ( "SELECT B.nickname,B.from_user, B.lastcredit , ( SELECT COUNT( 1 ) +1 FROM " . tablename ( 'fighting' ) . " A WHERE A.lastcredit > B.lastcredit )PM FROM" . tablename ( 'fighting' ) . " B  WHERE  B.fid ='$flight_setting[id]'  ORDER BY PM ,B.nickname,B.from_user LIMIT 10" );
		$sql_fighting = "SELECT  B.lastcredit , ( SELECT COUNT( 1 ) +1 FROM `ims_fighting` A WHERE A.lastcredit > B.lastcredit )PM FROM `ims_fighting` B WHERE  B.fid ='$flight_setting[id]'  AND B.from_user='{$fromuser}' ORDER BY PM ,B.lastcredit "; 
		$theone = pdo_fetch($sql_fighting);
		$total = pdo_fetchcolumn('SELECT count(id) as total FROM '.tablename('fighting').' WHERE fid= :fid group by `fid` desc ', array(':fid' => $flight_setting['id']) );
		
		if($theone['PM']==1&&$total==1){
			$percent = round((($theone['PM']) / $total ) * 100, 2);
		}else{
			$percent = round((($total  - $theone['PM']) / $total ) * 100, 2);
		}
		
		if ((time() > $flight_setting['end']) || ($flight_setting['status'] == 2)) {//活动已结束时回复语
			include $this->template('ranking');
			exit ;
		} 
		if($fighting['answerNum'] == $flight_setting['qnum']){
			if($flight_setting['is_shared']=='1'){//是否开启分享 如果已经分享了 则直接到 排名页面
				include $this->template('shareing');
				exit ;
			}else{ //0 不需要直接到 排名
				include $this->template('ranking');
				exit ;
			}
		}
		
		/*if($fighting['lasttime']>=$start){
			if($flight_setting['is_shared']=='1'){//是否开启分享 如果已经分享了 则直接到 排名页面
				include $this->template('shareing');
				exit ;
			}else{ //0 不需要直接到 排名
				include $this->template('ranking');
				exit ;
			}
       	}*/
       	include $this->template('exam');
		exit ;
    }
    
    //获取
    public function doMobileGetAnswer() {
    	global $_GPC, $_W;
       
        $fid = intval($_GPC['fid']);
        
        $flight_setting = pdo_fetch("SELECT * FROM " . tablename('fighting_setting') . " WHERE id = '$fid' LIMIT 1");
        if (empty($flight_setting)) {
            message('非法访问，请重新发送消息进入一战到底页面！');
        }
        
        $fromuser = $_W['fans']['from_user'];
        
        $member = fans_search($fromuser);
        if (empty($member)) {
            $shareurl = $flight_setting['shareurl'];//分享URL
            header("location:$shareurl");
        }
        
        $sql_info = "SELECT * FROM " . tablename('fans') . " WHERE `from_user`=:from_user LIMIT 1";
		$info = pdo_fetch($sql_info, array(':from_user' => $fromuser));
		if (!empty($info)) {
			$credit=$info['credit1'];
		}	
		
		$qid = intval($_GPC['qestionid']);
		$answer = $_GPC['answer'];
		
		$sql = "SELECT * FROM " . tablename('fighting') . " WHERE `from_user`=:from_user AND `fid`=:fid ORDER BY id DESC LIMIT 1";
		$sql_fighting = pdo_fetch($sql, array(':from_user' => $fromuser,':fid'=>$fid));
		
		$question = pdo_fetch("SELECT * FROM " . tablename('fighting_question_bank') . " WHERE id = '$qid' LIMIT 1");
		
		$answerNum = intval($_GPC['answerNum']);
		$isupdate = pdo_fetch("SELECT * FROM " . tablename('fighting') . " WHERE fid = " . $fid . " and from_user='" . $fromuser . "'");
	 
		if ($answer == $question[answer]) {//正确答案
			$figure =  $question['figure'];
			//不存在false的情况，如果是false，则表明是非法
			if ($isupdate==false) {
				
				$insert1 = array (
					'weid' => $_W['weid'],
					'fid' => $fid,
					'answerNum' => $answerNum,
					'from_user' => $fromuser,
					'nickname' => $member['nickname'],
					'lastcredit' => $figure,
				);
				
				$add = pdo_insert('fighting', $insert1);
				
				$flightid = pdo_insertid ();
				
				if($answerNum >= $flight_setting['qnum']){
					$updateData = array (
						'lasttime' => time(),
						'answerNum' => 0,
					);
					pdo_update('fighting', $updateData, array ( 'id' => $flightid ));
					return	$this->fightJson(3, '');
					exit;
				}
			} else {
				$updateData = array (
					'answerNum' => $isupdate['answerNum']+1,
					'lastcredit' => $isupdate['lastcredit'] + $figure,
				);
				pdo_update('fighting', $updateData, array ( 'id' => $isupdate['id'] ));
				
				if($answerNum >= $flight_setting['qnum']){
					$updateData = array (
						'lasttime' => time(),
						'answerNum' => 0,
					);
					pdo_update('fighting', $updateData, array ( 'id' => $isupdate['id'] ));
					return	$this->fightJson(3, '');
					exit;
				}
			}
			
			$insert2 = array (
				'from_user' => $fromuser,
				'credit1' => $credit + $figure,
			);
			$addjf = pdo_update('fans', $insert2, array ( 'from_user' => $fromuser ));
			
			return	$this->fightJson( 1, '');
			exit;
		}else{
			if ($isupdate==false) {
				$insert1 = array (
					'weid' => $_W['weid'],
					'fid' => $fid,
					'answerNum' => $answerNum,
					'from_user' => $fromuser,
					'nickname' => $member['nickname'],
					'lastcredit' => 0,
				);
				$addworng = pdo_insert('fighting', $insert1);
				$flightid = pdo_insertid ();
				if($answerNum >= $flight_setting['qnum']){
					$updateData = array (
						'lasttime' => time(),
						'answerNum' => 0,
					);
					pdo_update('fighting', $updateData, array ( 'id' => $flightid ));
					return	$this->fightJson(3, '答题满了');
					exit;
				}
			}else{
				$updateData = array (
					'answerNum' => $isupdate['answerNum']+1,
				);
					
				pdo_update('fighting', $updateData, array ( 'id' => $isupdate['id'] ));
				
				if($answerNum >= $flight_setting['qnum']){
					$updateData2 = array (
						'lasttime' => time(),
						'answerNum' => 0,
					);
					pdo_update('fighting', $updateData2, array ( 'id' => $isupdate['id'] ));
					return	$this->fightJson(3, '答题满了');
					exit;
				}	
			}
			
			//错误答案 回看答错的题目 $answer fighting_question_worng
			$insertworng = array (
				'weid' => $_W['weid'],
				'fightingid' => $isupdate['id'],
				'wornganswer' => $answer ? $answer :'超时没选择答案',
				'qname' => $question['question'],
				'answer' => $question['answer'],
				'optionA' => $question['optionA'],
				'optionB' => $question['optionB'],
				'optionC' => $question['optionC'],
				'optionD' => $question['optionD'],
				'optionE' => $question['optionE'],
				'optionF' => $question['optionF'],
			);
			pdo_insert('fighting_question_worng', $insertworng);
			
			return	$this->fightJson(2, '答案错误');
			exit;
		}
    }
    
    
      //排行页面
    public function doMobileRank() {
        global $_GPC, $_W;
        $id = intval($_GPC['id']);
        $year = ((int) date('Y', time())); //取得年份
		$month = ((int) date('m', time())); //取得月份
		$day = ((int) date('d', time())); //取得几号

		$start = ((int) mktime(0, 0, 0, $month, $day, $year));
		
        $flight_setting = pdo_fetch("SELECT * FROM " . tablename('fighting_setting') . " WHERE id = '$id' LIMIT 1");
        if (empty($flight_setting)) {
            message('非法访问，请重新发送消息进入一战到底页面！');
        }
        
        $fromuser = $_W['fans']['from_user'];
        $member = fans_search($fromuser);
      	if (empty($member)) {
            $shareurl = $flight_setting['shareurl'];//分享URL
            header("location:$shareurl");
        }
        
        $setting = $this->module['config'];
		$setting['thumb'] = toimage($setting['thumb']);
		
        $fighting = pdo_fetch("SELECT * FROM " . tablename('fighting') . " WHERE `from_user`=:from_user AND `fid`=" . $flight_setting['id'] . " ORDER BY id DESC LIMIT 1", array (':from_user' => $fromuser ));
		
		$ds = pdo_fetchall ( "SELECT B.nickname,B.from_user, B.lastcredit , ( SELECT COUNT( 1 ) +1 FROM " . tablename ( 'fighting' ) . " A WHERE A.lastcredit > B.lastcredit )PM FROM" . tablename ( 'fighting' ) . " B  WHERE  B.fid ='$flight_setting[id]'  ORDER BY PM ,B.nickname,B.from_user LIMIT 10" );
				
		$sql_fighting = "SELECT  B.lastcredit , ( SELECT COUNT( 1 ) +1 FROM `ims_fighting` A WHERE A.lastcredit > B.lastcredit )PM FROM `ims_fighting` B WHERE  B.fid ='$flight_setting[id]'  AND B.from_user='{$fromuser}' ORDER BY PM ,B.lastcredit "; 
		$theone = pdo_fetch($sql_fighting);
		
		$total = pdo_fetchcolumn('SELECT count(id) as total FROM '.tablename('fighting').' WHERE fid= :fid group by `fid` desc ', array(':fid' => $flight_setting['id']) );
		if($theone['PM']==1&&$total==1){
			$percent = round((($theone['PM']) / $total ) * 100, 2);
		}else{
			$percent = round((($total  - $theone['PM']) / $total ) * 100, 2);
		}
		
		if ((time() > $flight_setting['end']) || ($flight_setting['status'] == 2)) {//活动已结束时回复语
			include $this->template('ranking');
			exit ;
		} 
        
		if($fighting['answerNum'] == $flight_setting['qnum']){
			if($flight_setting['is_shared']=='1'){//是否开启分享 如果已经分享了 则直接到 排名页面
				include $this->template('shareing');
				exit ;
			}else{ //0 不需要直接到 排名
				include $this->template('ranking');
				exit ;
			}
		}
		
        if($fighting['lasttime']>=$start){
			if($flight_setting['is_shared']=='1'){//是否开启分享 如果已经分享了 则直接到 排名页面
				include $this->template('shareing');
				exit ;
			}else{ //0 不需要直接到 排名
				include $this->template('ranking');
				exit ;
			}
       	}
    }
   
   //错误答题
   public function doMobileWorng() {
        global $_GPC, $_W;
        $id = intval($_GPC['id']);
        $flight_setting = pdo_fetch("SELECT * FROM " . tablename('fighting_setting') . " WHERE rid = '$id' LIMIT 1");
        if (empty($flight_setting)) {
            message('非法访问，请重新发送消息进入一战到底页面！');
        }
        
        $fromuser = $_W['fans']['from_user'];
        $member = fans_search($fromuser);
      	if (empty($member)) {
            $shareurl = $flight_setting['shareurl'];//分享URL
            header("location:$shareurl");
        }
	 
		$sql = "SELECT  * FROM " .tablename('fighting_question_worng')." AS a LEFT JOIN " .tablename('fighting')." AS b ON b.id = a.fightingid "  ;
		$list= pdo_fetchAll($sql);
		include $this->template('worng');
		exit ;
    }
    	
    //注册
    public function doMobileRegister() {
		global $_GPC, $_W;
		
		$id = intval($_GPC['id']);
		$flight_setting = pdo_fetch("SELECT * FROM " . tablename('fighting_setting') . " WHERE rid = '$id' LIMIT 1");
		if (empty($flight_setting)) {
            message('非法访问，请重新发送消息进入页面！');
        }
        
        $fromuser = $_W['fans']['from_user'];
        $member = fans_search($fromuser);
        if (empty($member)) {
            $shareurl = $flight_setting['shareurl'];//分享URL
            header("location:$shareurl");
        }

		$data = array (
			'nickname' => $_GPC['nickname'],
			'mobile' => $_GPC['mobile'],
		);
        
		if (empty($data['nickname'])) {
            return $this->fightJson(-1, '请填写您的昵称！');
            exit;
        }
        if (empty($data['mobile'])) {
            return $this->fightJson(-1, '请填写您的手机号码！');
            exit;
        }

		fans_update($_W['fans']['from_user'], $data);
		return $this->fightJson(1, '');
        exit;
	}
	
	 public function fightJson($resultCode, $resultMsg) {
        $jsonArray = array(
            'resultCode' => $resultCode,
            'resultMsg' => $resultMsg
        );
        $jsonStr = json_encode($jsonArray);
        return $jsonStr;
    }
    

	public function doWeblist() {
		global $_GPC;
		$from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
		$user = pdo_fetch("SELECT * FROM " . tablename('fans') . " WHERE from_user = '" . $from_user . "' and weid=" . $_GET['weid'] . " limit 1");
		if ($_GPC['action'] == 'setinfo') {
			$insert = array (
				'nickname' => $_GPC['nickname'],
				'realname' => $_GPC['realname'],
				'mobile' => $_GPC['mobile'],
				'qq' => $_GPC['qq'],
				'from_user' => $from_user,
				'weid' => $_GET['weid'],
				'createtime' => time(),
				'avatar' => ' ',
			);
			if ($user == false) {
				$id = pdo_insert('fans', $insert);
			} else {
				pdo_update('fans', $insert, array (
					'from_user' => $from_user,
					'weid' => $_GET['weid']
				));
			}
			die(true);
		}
		$title = '会员资料';
		$loclurl = create_url('site/module', array (
			'do' => 'list',
			'name' => 'fighting',
			'weid' => $_GET['weid'],
			'from_user' => $_GPC['from_user']
		));
		include $this->template('index');
	}

	 public function doWebDetail() {
		global $_GPC, $_W;
		//checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('delete') && !empty ($_GPC['select'])) {
			pdo_delete('fighting_question_bank', " id  IN  ('" . implode("','", $_GPC['select']) . "')");
			message('删除成功！',  referer(), 'success');	
		}
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;
		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting_question_bank') . " ORDER BY id desc LIMIT " . ($pindex -1) * $psize . ",{$psize}");
		if (!empty ($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('fighting_question_bank') . "");
			$pager = pagination($total, $pindex, $psize);
			 
		}
		include $this->template('detail');
	}
	

	public function doShowPlay() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('delete') && !empty ($_GPC['select'])) {
			pdo_delete('fighting_setting', " id  IN  ('" . implode("','", $_GPC['select']) . "')");
			message('删除成功！', create_url('index/module', array (
				'do' => 'detail',
				'name' => 'fighting'
			)));
		}
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;
		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting_setting') . " WHERE weid = '{$_W['weid']}' ORDER BY id ASC LIMIT " . ($pindex -1) * $psize . ",{$psize}");
		if (!empty ($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('fighting_setting') . " WHERE weid = '{$_W['weid']}' ");
			$pager = pagination($total, $pindex, $psize);
		}
		include $this->template('plays');
	}
	
	
	public function doWebUserlist() {
		global $_GPC, $_W;
		$id = intval($_GPC['id']);
		 
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;
		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting') . " WHERE `rid` = " . $id . " AND weid = '{$_W['weid']}' ORDER BY `id` ASC LIMIT " . ($pindex -1) * $psize . ",{$psize}");
		if (!empty ($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('fighting') . "WHERE `rid` = " . $id . " AND weid = '{$_W['weid']}'");
			$pager = pagination($total, $pindex, $psize);
		}
		include $this->template('plays');
	}
	

	public function doWebedit() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		$list = pdo_fetch("SELECT * FROM " . tablename('fighting_question_bank') . " WHERE id = {$id}");
		 
		include $this->template('edit');
	}
	
	
	
	public function doWebeditok() {
		global $_GPC, $_W;
		//checklogin();
		$id = intval($_GPC['id']);
			 
			$insert = array (
				'figure' => $_GPC['figure'],
				'question' => $_GPC['question'],
				'optionA' => $_GPC['optionA'],
				'optionB' => $_GPC['optionB'],
				'optionC' => $_GPC['optionC'],
				'optionD' => $_GPC['optionD'],
				'optionE' => $_GPC['optionE'],
				'optionF' => $_GPC['optionF'],
				'answer' =>   $_GPC['answer'] ,
			);
			pdo_update('fighting_question_bank', $insert, array (
				'id' => $id
			));
			message('修改成功！', create_url('site/module', array (
				'do' => 'detail',
				'name' => 'fighting'
			)));
	}
	
	public function doWebaddquestion() {
		include $this->template('add');
	}
	
	public function doWebdelquestion() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		pdo_delete('fighting_question_bank', " id=$id");
		message('删除成功！', create_url('site/module', array (
			'do' => 'detail',
			'name' => 'fighting'
		)));
	}

	public function doWebaddok() {
		global $_GPC, $_W;
		checklogin();
		if ($_GPC['action'] = 'add') {
			$answer = $_GPC['answer'] ; 
			$insert = array (
				'figure' => $_GPC['figure'],
				'question' => $_GPC['question'],
				'optionA' => $_GPC['optionA'],
				'optionB' => $_GPC['optionB'],
				'optionC' => $_GPC['optionC'],
				'optionD' => $_GPC['optionD'],
				'optionE' => $_GPC['optionE'],
				'optionF' => $_GPC['optionF'],
				'answer' => $answer,
			);
			$id = pdo_insert('fighting_question_bank', $insert);
			message('增加成功！', create_url('site/module', array (
				'do' => 'detail',
				'name' => 'fighting'
			)));

		}
	}

	public function doWebShowPlay() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('delete') && !empty ($_GPC['select'])) {
			pdo_delete('fighting_setting', " id  IN  ('" . implode("','", $_GPC['select']) . "')");
			message('删除成功！', create_url('site/module', array (
				'do' => 'detail',
				'name' => 'fighting'
			)));
		}
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;
		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting_setting') . " WHERE weid = '{$_W['weid']}' ORDER BY id ASC LIMIT " . ($pindex -1) * $psize . ",{$psize}");
		if (!empty ($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('fighting_setting') . " WHERE weid = '{$_W['weid']}' ");
			$pager = pagination($total, $pindex, $psize);
		}
		include $this->template('plays');
	}

	public function doWebPlayEdit() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('edit') && !empty ($_GPC['id'])) {
			$insert = array (
				'title' => $_GPC['title'],
				'qnum' => $_GPC['qnum'],
				'answertime' => $_GPC['answertime'],
				'status_fighting' => $_GPC['status_fighting'],
				'is_shared' => $_GPC['is_shared'],
				'start' => strtotime($_GPC['start']),
				'end' => strtotime($_GPC['end']),
				'description' => $_GPC['description'],
				'shareurl' => $_GPC['shareurl'],
				'weid' => $_W['weid'] ,
			);
			pdo_update($this->tablename, $insert, array (
				'id' => $id
			));
			message('修改成功！', 'refresh');
		}
		if (!empty ($id)) {
			$reply = pdo_fetch("SELECT * FROM " . tablename($this->tablename) . " WHERE id = :id ORDER BY `id` DESC", array (
				':id' => $id
			));
		}
		include $this->template('playedit');
	}
 
	public function doWebPlayers() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('delete') && !empty ($_GPC['select'])) {
			pdo_delete('fighting', " id  IN  ('" . implode("','", $_GPC['select']) . "')");
			message('删除成功！', create_url('site/module', array (
				'do' => 'Players',
				'name' => 'fighting'
			)));
		}
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;

		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting') . " WHERE `fid` = " . $id . " ORDER BY `lastcredit` DESC LIMIT " . ($pindex -1) * $psize . ",{$psize}");
		$series = pdo_fetchall("SELECT * FROM " . tablename('fighting_setting') . " WHERE `id` = :id ", array (
			':id' => $id
		));
		$seriesArr = array ();
		foreach ($series as $v) {
			$seriesArr[$v['id']] = $v['title'];
		}
		if (!empty ($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('fighting') . "");
			$pager = pagination($total, $pindex, $psize);
		}
		include $this->template('players');
	}

	public function doWebEditPlayer() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('edit') && !empty ($_GPC['id'])) {
			$insert = array (
				'nickname' => $_GPC['nickname'],
				'lastcredit' => $_GPC['lastcredit'],
			);
			pdo_update('fighting', $insert, array ( 'id' => $id ));
			message('修改成功！', 'refresh');
		}
		$list = pdo_fetch("SELECT * FROM " . tablename('fighting') . " WHERE id = :id ORDER BY `id` DESC", array (
			':id' => $id
		));
		include $this->template('editplayer');
	}
	 
	
	//错误题目
	 public function doWebWorngquestion() {
        global $_GPC, $_W;
		if (checksubmit('delete') && !empty ($_GPC['select'])) {
			$fid=intval($_GPC['fid']);
			pdo_delete('fighting_question_worng', " id  IN  ('" . implode("','", $_GPC['select']) . "')");
			message('删除成功！', create_url('site/module', array (
				'do' => 'Players', 'name' => 'fighting','id'=>$fid
			)));
		}
		$pindex = max(1, intval($_GPC['page']));
		$fightingid=$_GPC['id'];
		$psize = 20;
		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting_question_worng') . " WHERE weid = '{$_W['weid']}' and fightingid= '{$_GPC['id']}' ORDER BY id ASC LIMIT " . ($pindex -1) * $psize . ",{$psize}");
	 	$fid = pdo_fetchcolumn("SELECT fid FROM " . tablename('fighting') . " WHERE id = :id ORDER BY `id` DESC", array (
			':id' => $fightingid ));
		if (!empty ($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('fighting_question_worng') . " WHERE weid = '{$_W['weid']}' and fightingid= '{$_GPC['id']}' ");
			$pager = pagination($total, $pindex, $psize);
		}
        
		include $this->template('worngquestion');
    }
	 
	 
	public function doWebdelworngquestion() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		$fid=intval($_GPC['fid']);
		pdo_delete('fighting_question_worng', " id=$id");
		message('删除成功！', create_url('site/module', array ( 'do' => 'Players', 'name' => 'fighting','id'=>$fid
		)));
	}
	
	
	
	public function geturl($type = 1) {
		switch ($type) {
			case 0 :
				$img_url = './source/modules/fighting/template/style/images/brand.png';
				break;
			case 1 :
				$img_url = './source/modules/fighting/template/style/images/d-01.png';
				break;
			default :
				$img_url = './source/modules/fighting/template/style/images/brand.png';
		}
		return $img_url;
	}
	
	
	//高级接口开发者凭证
	public function getAccount(){
		global $_W;
		$account = $_W['account'];
		// 普通账号
		if($account['level'] != 2) {
			// 借用账号信息
			$account['key'] = $this->module['config']['account']['key'];
			$account['secret'] =  $this->module['config']['account']['secret'];
			// 使用默认
			if(empty($account['key']) || empty($account['secret'])){
				$account['key'] = $_W['config']['we']['appkey'];
				$account['secret'] = $_W['config']['we']['secret'];
			}
		}
		if($account['key'] && $account['secret']){
			return $account;
		}
	}

	//高级接口授权
	public function doMobileoauth(){
		global $_W, $_GPC;
		// 高级权限
		$account = $this->getAccount();
		$code = $_GPC['code'];
		if(!empty($code)) {
			$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$account['key']}&secret={$account['secret']}&code={$code}&grant_type=authorization_code";
			$ret = ihttp_get($url);
			if(!is_error($ret)) {
				$auth = @json_decode($ret['content'], true);
				if(is_array($auth) && !empty($auth['openid'])) {
					$id = pdo_fetchcolumn("SELECT id FROM ".tablename('fighting')." WHERE from_user = '{$auth['openid']}'");
					$row = array();
					$row['weid'] = $_W['weid'];
				//	$row['openid'] = $auth['openid'];
					$row['from_user'] = $_W['fans']['from_user'];
					// 获取粉丝信息
					if($auth['scope']=='snsapi_userinfo'){
						$user = $this->getFansInfo($auth['access_token'],$auth['openid']);
						$row['nickname'] = $user['nickname'];
						//$row['avatar'] = $user['headimgurl'];
					}
					if(empty($id)){
						pdo_insert('fighting', $row);
					}
					else{
						unset($row['from_user']);
						pdo_update('fighting', $row, array('from_user'=>$auth['openid']));
					}
					isetcookie('fighting_openid', $auth['openid'], 86400*7);
					// 返回
					$forward = base64_decode($_GPC['state']);
					header('location: ' . $_W['siteroot'] . 'mobile.php?' . $forward . '&wxref=mp.weixin.qq.com#wechat_redirect');
					exit;
				}
			}
		}
		message('微信授权失败!');
	}

	// 获取粉丝信息
	public function getFansInfo($access_token,$openid){
		$userinfo_url = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$openid}&lang=zh_CN";
		$user = ihttp_get($userinfo_url);
		$user = @json_decode($user['content'], true);
		if($user['errcode']){
			$filename = IA_ROOT . '/data/logs/getfansinfo.log';
			mkdirs(dirname($filename));
			$content = date('Y-m-d H:i:s') . "-------------------\n";
			$content .="errcode:".$user['errcode']."\n";
			$content .="errmsg:".$user['errmsg']."\n";
			$content .= "\n";
			$fp = fopen($filename, 'a+');
			fwrite($fp, $content);
			fclose($fp);
			echo '<h2>'.$user['errmsg'].'</h2>';
			exit();
		}
		return $user;
	}


	public function doMobileexit(){
		isetcookie('fighting_openid', '',-100);
		message('退出成功!');
	}
	
}