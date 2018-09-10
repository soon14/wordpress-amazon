<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html>
<html>
    <head>
	
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <link rel="stylesheet" type="text/css" href="./resource/mstyle/css/app.css?v=2014-05-21" media="all" />
<link rel="stylesheet" type="text/css" href="./resource/mstyle/css/bootstrap_min.css?v=2014-05-21" media="all" />
<link rel="stylesheet" type="text/css" href="./resource/mstyle/css/bootstrap_responsive_min.css?v=2014-05-21" media="all" />
<link rel="stylesheet" type="text/css" href="./resource/mstyle/css/style.css?v=2014-05-21" media="all" />
<link rel="stylesheet" type="text/css" href="./resource/mstyle/css/themes.css?v=2014-05-21" media="all" />
<link rel="stylesheet" type="text/css" href="./resource/mstyle/css/todc_bootstrap.css?v=2014-05-21" media="all" />
<script type="text/javascript" src="./resource/mstyle/src/jQuery.js?v=2014-05-21"></script>
<script type="text/javascript" src="./resource/mstyle/src/applicationnew.js?v=2014-05-21"></script>
<script type="text/javascript" src="./resource/mstyle/src/bootstrap_min.js?v=2014-05-21"></script>
<script type="text/javascript" src="./resource/mstyle/src/plugins/bootbox/jquery_bootbox.js?v=2014-05-21"></script>
<script type="text/javascript" src="./resource/mstyle/src/plugins/contextmenu/bootstrap_contextmenu.js?v=2014-05-21"></script>
<title><?php  if(empty($_W['setting']['copyright']['sitename'])) { ?>微盒微信 - 微信公众平台营销管理平台 -  Powered by wxbox.cn<?php  } else { ?><?php  echo $_W['setting']['copyright']['sitename'];?><?php  } ?></title>
        <!--[if IE 7]>
			<link rel="stylesheet" href="./resource/style/font-awesome-ie7.min.css">
        <![endif]-->
        <!--[if lte IE 8]>
            <script src="./resource/mstyle/js/excanvas_min.js?v=2014-05-21"></script>
        <![endif]-->
        <!--[if lte IE 9]>
            <script src="./resource/mstyle/js/watermark.js?v=2014-05-21"></script>
        <![endif]-->
	<style>
	#navigation #brand {
		background: url("../img/logo.png") no-repeat;
	}
	</style>
    </head>
     <body class="body">
    
    <div id="navigation">
        <div class="container-fluid">
            <div>
                <a href="javascript:void(0);" id="brand" target="mainFrame"></a>
                <a href="javascript:void(0);" class="toggle-nav" rel="tooltip" data-placement="bottom" title="Toggle navigation"><i class="icon-reorder"></i></a>
            </div>
            <ul class='main-nav'>
                <li <?php  if($do=='profile') { ?>class='active'<?php  } ?>>
                    <a href="./index.php">
                        <span>管理平台</span>
                    </a>
                </li>
				<li <?php  if($do=='global') { ?>class='active'<?php  } ?>><a href="./index.php?do=global" target="_self">公众帐号管理</a></li>
				<li>
					<a href="javascript:void(0)" data-toggle="dropdown" class='dropdown-toggle' data-hover="dropdown">
						<span>客服中心</span>
						<span class="caret"></span>
					</a>
                    <ul class="dropdown-menu">
						<li><a href="http://kf.qq.com/faq/120911VrYVrA131025QniAfu.html" target="_blank">基础功能</a></li>
						<li><a href="http://kf.qq.com/faq/120322fu63YV131029YZfURJ.html" target="_blank">微信认证</a></li>
						<li><a href="http://kf.qq.com/faq/120911VrYVrA140228V7JbEj.html" target="_blank">微信支付</a></li>
						<li><a href="http://kf.qq.com/product/weixinmp.html" target="_blank">腾讯客服</a></li>
						<li><a href="http://mp.weixin.qq.com/s?__biz=MzA5NjE1MjAyMA==&mid=200597834&idx=1&sn=b10d8252f54924d0fb07a8b36b74af85#rd" target="_blank">使用必读</a></li>
						<li><a href="http://mp.weixin.qq.com/s?__biz=MzA5NjE1MjAyMA==&mid=201075856&idx=1&sn=e1fe1360d10e9d1db567ca629b16f501#rd" target="_blank">微站使用</a></li>
						<li><a href="http://mp.weixin.qq.com/s?__biz=MzA5NjE1MjAyMA==&mid=200694579&idx=1&sn=27eb8c4da7241040b9b910abd2d597d1#rd" target="_blank">打印设置</a></li>
                    </ul>
                </li>
				<li>
					<a href="javascript:void(0)" data-toggle="dropdown" class='dropdown-toggle' data-hover="dropdown">
						<span>调试工具</span>
						<span class="caret"></span>
					</a>
                    <ul class="dropdown-menu">
						<li><a href="test.php"  target="mainFrame">调试工具</a></li>
						<li><a href="<?php  echo create_url('setting/updatecache')?>"  target="mainFrame">更新缓存</a></li>
                    </ul>
                </li>
								
				

            </ul>

            <div class="user">
                <ul class="icon-nav">
                    <li>
                        <a href="" target="_blank" title="打开首页"><i class="icon-home"></i></a></li>
                    <!--                 <li>
                        <a href="javascript:;" title="全屏" data-toggle="fullscreen"><i class="icon-fullscreen"></i></a></li>-->
                    <li class='dropdown colo'>
                        <a href="#" class='dropdown-toggle' data-toggle="dropdown" title="选择颜色"><i class="icon-tint"></i></a>
                        <ul class="dropdown-menu pull-right theme-colors">
                            <li class="subtitle">Predefined colors
                            </li>
                            <li>
                                <span class='red'></span>
                                <span class='orange'></span>
                                <span class='green'></span>
                                <span class="brown"></span>
                                <span class="blue"></span>
                                <span class='lime'></span>
                                <span class="teal"></span>
                                <span class="purple"></span>
                                <span class="pink"></span>
                                <span class="magenta"></span>
                                <span class="grey"></span>
                                <span class="darkblue"></span>
                                <span class="lightred"></span>
                                <span class="lightgrey"></span>
                                <span class="satblue"></span>
                                <span class="satgreen"></span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="dropdown ">
                    <a href="#" class='dropdown-toggle' data-toggle="dropdown" style="width: 127px;">
                        <nobr><span style="overflow:hidden; width:50px;"><?php  if($_W['account']) { ?><?php  echo $_W['account']['name'];?><?php  } else { ?>请切换公众号<?php  } ?> </span>
						<?php  if(file_exists(IA_ROOT . '/resource/attachment/headimg_'.$_W['weid'].'.jpg')) { ?>
						<img src="<?php  echo $_W['attachurl'];?>/headimg_<?php  echo $_W['weid'];?>.jpg?time=<?php  echo time()?>" style="width: 27px; height: 27px" alt="" > 
						<?php  } else { ?>
						<img src="" style="width: 27px; height: 27px" alt="" > 
						<?php  } ?>
						<span class="caret" ></span></nobr>
                    </a>
                    <ul class="dropdown-menu pull-right">
						<li>
                            <a href="./account.php?act=post&id=current" target="mainFrame">管理帐号</a>
                        </li>
						<li>
                            <a href="./setting.php?act=profile&" target="mainFrame">账户信息</a>
                        </li>
                        <li>
                            <a href="<?php  echo create_url('member/logout')?>" target="_self">退出</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    <div class="container-fluid" id="content">
        
		 
        <div id="left" style="top:2px;">
			<?php  if(is_array($mset)) { foreach($mset as $k => $g) { ?>
						<?php 
						switch ($k) {
							case 'basic':
							  $snav_icon = 'wm-basis';
							  break;
							case 'business':
							  $snav_icon = 'wm-industry';
							  break;
							case 'customer':
							  $snav_icon = 'wm-user';
							  break;
							case 'activity':
							  $snav_icon = 'wm-marketing';
							  break;
							case 'services':
							  $snav_icon = 'wm-customer';
							  break;
							case 'car':
							  $snav_icon = 'wm-marketing';
							  break;
							default:
							  $snav_icon = 'wm-hardware';
						}
					
						?>
			<div class="subnav">
                <div class="subnav-title first-subnav">
                    <a href="javascript:void(0)" class='toggle-subnav'>
						<em>
							<strong class="icon-menu"><i class="wmfontset wmfont <?php  echo $snav_icon;?>"></i></strong>
							<b class="bg-icon-color">&nbsp;</b>
						</em>
						<span><?php  echo $g['title'];?></span>
						<i class="icon-angle-down"></i>
					</a>
                </div>
				<?php  if($g['menus']) { ?>
					<ul class="subnav-menu" >
					<?php  if(is_array($g['menus'])) { foreach($g['menus'] as $menu) { ?>
						<?php  if(is_array($menu['title'])) { ?>
						<li>
						<div class="subnav-title second-subnav isurl">
							<a href="<?php  echo $menu['title']['1'];?>" class="toggle-subnav " target="mainFrame">
								<i class="icon-angle-down icon-space"></i><span><?php  echo $menu['title']['0'];?></span>
							</a>
						</div>
						</li>
						<?php  } else { ?>
							<?php  if(count($menu['items'])==1) { ?>
													
							<li>
								<div class="subnav-title second-subnav isurl">
									<a href="<?php  echo $menu['items']['0']['1'];?>" class="toggle-subnav" target="mainFrame">
										<i class="icon-angle-down icon-space"></i><span><?php  echo $menu['items']['0']['0'];?></span>
									</a>
								</div>
							</li>
							<?php  } else { ?>
							<?php 
								 
								if($menu['title']=='微文章(CMS)'){
									if($k=='car'){
										$menu['title']='文章资讯';
									}
								}
							?>
							<li>
								<div class="subnav-title second-subnav active">
									<a href="javascript:void(0)" class="toggle-subnav "><i class="icon-angle-down"></i><span><?php  echo $menu['title'];?></span></a>
								</div>
								<ul class="subnav-menu third-subnav" style="display:none;">
								<?php  if(!empty($menu['items'])) { ?>
									<?php  if(is_array($menu['items'])) { foreach($menu['items'] as $item) { ?>
									<li>
										<a href="<?php  echo $item['1'];?>" target="mainFrame"><?php  echo $item['0'];?></a>
									</li>
									<?php  } } ?>
								<?php  } ?>
								</ul>
							</li>
							<?php  } ?>
						<?php  } ?>
					<?php  } } ?>
					</ul>
				<?php  } ?>
			</div>
			<?php  } } ?>
			
			
 	
			<div id="footer_code">
 				 
				<div class="contact-service">
					<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=123456&amp;site=qq&amp;menu=yes" target="_blank" class="" title="在线客服">
						<i class="index-icon-comments-alt"></i>在线客服
					</a>
				</div>
				<div class="contact-phone"><i class="index-icon-phone"></i>1888888888888</div>
				<img src="http://demo.wxbox.cn/erweima.jpg">
				<p class="text-center imgtext">扫描微信二维码查看功能演示</p>
			</div>
        </div>
        <div class="right">
            <div class="main">
                <iframe frameborder="0" id="mainFrame" name="mainFrame" src="<?php  echo $iframe;?>" height="100%" width="100%" style="background: url('./resource/mstyle/img/loading.gif?2014-05-21') center no-repeat"></iframe>
            </div>
        </div>
    </div>
    <script>P.skn();</script>

	 
  
</body>
 	<div style="width:100%;text-align:center;font-size:14px;color:#ff0000;display:none;">微盒微信 - 微盒 2.0</div>
	</body>
	<script>
		window.document.onkeydown = function(e) {
			if ('BODY' == event.target.tagName.toUpperCase()) {
				var e=e || event;
　 				var currKey=e.keyCode || e.which || e.charCode;
				if (8 == currKey) {
					return false;
				}
			}
		};
	</script> 
</html>