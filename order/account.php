<?php
/**
 * 公众号管理
 * 
 * WFW.COM
 */
define('IN_SYS', true);
require 'source/bootstrap.inc.php';
checklogin();

$actions = array('display', 'post', 'payment', 'switch', 'delete', 'sync', 'fansync');
$action = in_array($_GPC['act'], $actions) ? $_GPC['act'] : 'display';

$controller = 'account';
require router($controller, $action);