<?php
/**
 * 一战到底模块定义
 *
 * @author 珊瑚海 zombieszy
 * @url http://mamani.cn
 */
defined('IN_IA') or exit('Access Denied');

class FightingModule extends WeModule {

	public $tablename = 'fighting_setting';

	public function fieldsFormDisplay($rid = 0) {
		global $_W;
      	if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));		
 		}else{
 			$reply['status_fighting']   = '0';
 			$reply['is_shared']   = '1';
 		}
		include $this->template('form');
	}
  	public function fieldsFormValidate($rid = 0) {
		
        return true;
	}
  
  	public function fieldsFormSubmit($rid = 0) {
		global $_GPC, $_W;
 
        $id = intval($_GPC['reply_id']);
		$insert = array(
			'rid' => $rid,
			'title' => $_GPC['title'],
			'description' => htmlspecialchars_decode($_GPC['description']),
			'qnum' => $_GPC['qnum'],
			'picture' => $_GPC['picture'],
			'weid' => $_W ['weid'], 
			'shareurl' =>$_GPC['shareurl'],
			'status_fighting' =>$_GPC['status_fighting'],
			'answertime' =>$_GPC['answertime'],
			'is_shared' =>$_GPC['is_shared'],
			'start' =>strtotime($_GPC['start']),
			'end' =>strtotime($_GPC['end']),
		);
		
		if (empty($id)) {
			pdo_insert($this->tablename, $insert);
		} else {
			if (!empty($_GPC['picture'])) {
				file_delete($_GPC['picture-old']);
			} else {
				unset($insert['picture']);
			}
			pdo_update($this->tablename, $insert, array('id' => $id));
		}
      	return true;
	}
	
	
   	public function ruleDeleted($rid = 0) {
		global $_W;
		$replies = pdo_fetchall("SELECT id,rid FROM ".tablename($this->tablename)." WHERE rid = '$rid'");
		$deleteid = array();
		if (!empty($replies)) {
          	foreach ($replies as $index => $row) {
				$deleteid[] = $row['id'];
			}     
		}
		pdo_delete($this->tablename, "id IN ('".implode("','", $deleteid)."')");
		return true;
	}
	
	
	public function settingsDisplay($settings) {
		global $_GPC, $_W;
		if(checksubmit()) {
			if(!isset($_W['isfounder'])){
				unset($_GPC['add']['copyright']);
			}
			$dat=$_GPC['add'];
			$dat['thumb']=$_GPC['thumb'];
			$dat['thumb2']=$_GPC['thumb2'];
			if($this->saveSettings($dat)) {
				message('保存成功', 'refresh');
			}
		}
		
		if(!isset($settings['copyright'])) {
			$settings['copyright']['name'] = $_W['setting']['copyright']['sitename'];
			$settings['copyright']['link'] = $_W['setting']['copyright']['url'];
		}
		//这里来展示设置项表单
		include $this->template('setting');
	}
	
	//导出
	public function doExport() {
		error_reporting(E_ALL);
		ini_set('display_errors', TRUE);
		ini_set('display_startup_errors', TRUE);
		date_default_timezone_set('Europe/London');

		if (PHP_SAPI == 'cli')
			die('This example should only be run from a Web Browser');

		/** Include PHPExcel */
		//require_once dirname(__FILE__) . '/template/mobile/classes/PHPExcel.php';
		require_once IA_ROOT . '/source/library/phpexcel/PHPExcel.php';
		// Create new PHPExcel object
		$objPHPExcel = new PHPExcel();
		// Set document properties
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
			 ->setLastModifiedBy("Maarten Balliauw")
			 ->setTitle("Office 2007 XLSX Test Document")
			 ->setSubject("Office 2007 XLSX Test Document")
			 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
			 ->setKeywords("office 2007 openxml php")
			 ->setCategory("Test result file");

        
        global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		
		$list = pdo_fetchall("SELECT * FROM " . tablename('fighting') . " WHERE `fid` = " . $id . " ORDER BY `lastcredit` DESC LIMIT 50000");
		$fighting_setting = pdo_fetch("SELECT * FROM ".tablename('fighting_setting')." WHERE id = '$id'");

		if (!empty($list)) {
			$objPHPExcel->setActiveSheetIndex(0)
			            ->setCellValue('A1','编号')
			            ->setCellValue('B1','昵称')
			            ->setCellValue('C1','最后答题时间')
			            ->setCellValue('D1','最后得分');
			
			$i=2;
			foreach($list as $k=>$v){
				$objPHPExcel->setActiveSheetIndex(0)
				            ->setCellValue('A'.$i,$v['id'])
				            ->setCellValue('B'.$i,$v['nickname'])
				            ->setCellValue('C'.$i,date('Y-m-d H:i:s', $v['lasttime']))
				            ->setCellValue('D'.$i,$v['lastcredit']);
				$i++;
			}

		}
		// Rename worksheet
		$objPHPExcel->getActiveSheet()->setTitle($fighting_setting['title'].'一战到底排名结果');
		// 设置自动宽度
		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true); 
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true); 
		$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true); 
		$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true); 


		// Set active sheet index to the first sheet, so Excel opens this as the first sheet
		$objPHPExcel->setActiveSheetIndex(0);
		// Redirect output to a client’s web browser (Excel2007)
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="'.$fighting_setting['title'].'一战到底排名结果'.'.xlsx"');
		header('Cache-Control: max-age=0');
		// If you're serving to IE 9, then the following may be needed
		header('Cache-Control: max-age=1');

		// If you're serving to IE over SSL, then the following may be needed
		header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
		header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
		header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
		header ('Pragma: public'); // HTTP/1.0

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save('php://output');
		exit;
	}
	
	
	
}