<?php
/**
 * 公众号管理
 * 
 * WFW.COM
 */
define('IN_SYS', true);
require 'source/bootstrap.inc.php';

if(empty($_W['isfounder'])) {
	$actions = array('touch', 'dock', 'download');
} else {
	$actions = array('upgrade', 'profile', 'callback', 'promotion', 'recommend', 'diagnose', 'download');
}
$action = in_array($action, $actions) ? $action : 'touch';
if(in_array($action, array('profile', 'callback', 'promotion', 'recommend'))) {
	$do = $action;
	$action = 'redirect';
}
if($action == 'touch') {
	exit('success');
}

$controller = 'cloud';
require router($controller, $action);
