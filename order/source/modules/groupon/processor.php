<?php
/**
 * 微团购模块处理程序
 *
 * @author 
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class GrouponModuleProcessor extends WeModuleProcessor {
	public function respond() {
		$content = $this->message['content'];
		//这里定义此模块进行消息处理时的具体过程, 请查看微服务文档来编写你的代码
	}
}