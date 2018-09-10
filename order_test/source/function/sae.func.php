<?php 
/**
 * SAE¼æÈÝº¯Êý
 * [WeEngine System] Copyright (c) 2013 cgt
 */

/**
 * ¼æÈÝ file_upload º¯Êý
 */
function file_uploadSAE($file, $type) {
	global $_W;
	$sae= new SaeStorage();  
	$settings = $_W['uploadsetting'];
	$result = array('error' => 1, 'message' => '');
    $extention = pathinfo($file['name'], PATHINFO_EXTENSION);
	$result = array();
	$result['path'] = "/{$settings[$type]['folder']}/" . date('Y/m/');
    $filename = random(30) . ".{$extention}";
    $result['path'] .= $filename;
    $sae->upload ($_W['config']['sae']['storage'],$result['path'], $file['tmp_name']);  
   $result['url'] =$sae->getUrl($_W['config']['sae']['storage'] ,$result['path']);
	if ($sae->fileExists($_W['config']['sae']['storage'],  $result['path'])) {
        $result['success'] = true;
	}
	return $result;
}

function file_deleteSAE($file) {
	global $_W;
	$sae= new SaeStorage();  
	$sae->delete($_W['config']['sae']['storage'],$file);
    return TRUE;
}

function file_writeSAE($file, $data) {
	global $_W;
	$sae= new SaeStorage();  
	$file = str_replace(IA_ROOT.'/', '', $file);
	$file = $file[0] == '/' ? $file : '/'.$file;
	$pathinfo = pathinfo($file);
	$sae->write($_W['config']['sae']['storage'], $file, $data);
	if ($sae->fileExists($_W['config']['sae']['storage'], $file)) {
		$result['success'] = true;
	}
}
