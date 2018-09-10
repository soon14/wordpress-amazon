<?php
/**
 * 一味签模块处理程序
 *
 * @author 幸福晚点名 qq:1302789105
 * @url www.weixfu.cn
 */
defined('IN_IA') or exit('Access Denied');

class Cgt_ywqModuleProcessor extends WeModuleProcessor {
	public function respond() {
		global $_W;		
	   $item=pdo_fetch("SELECT * FROM ".tablename('qimoqian')." order by rand()");
			
		 $news[] = array(
						'title' => $item['title'],
						'description' =>trim($item['desc']),
						'picurl' =>$_W['attachurl'].$item["pic"],
						
						'url' => $item['url']
				);
		
					return $this->respNews($news);
		
		//这里定义此模块进行消息处理时的具体过程, 请查看微服务文档来编写你的代码
	}
}