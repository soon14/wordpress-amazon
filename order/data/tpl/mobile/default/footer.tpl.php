<?php defined('IN_IA') or exit('Access Denied');?>	<?php  if(empty($footer_off)) { ?><div id="footer"><?php  if($_W['account']['siteinfo']['footer']) { ?><?php  echo htmlspecialchars_decode($_W['account']['siteinfo']['footer'])?><?php  } else { ?>&copy;<?php  if(empty($_W['account']['name'])) { ?>微服务团队<?php  } else { ?><?php  echo $_W['account']['name'];?><?php  } ?>&nbsp;&nbsp;<?php  } ?><?php  echo $_W['setting']['copyright']['statcode'];?></div><?php  } ?>
</div>
<?php  if($_W['quickmenu']['menus']) { ?>
	<?php   include_once template($_W['quickmenu']['template'], TEMPLATE_INCLUDEPATH);?>
<?php  } ?>
<script type="text/javascript">
$(function() {
	$(".user-box .box-item").each(function(i) {
		i = i +1;
		if(i%3 == 0) $(this).css("border-right", "0");
	});
	$(window).scroll(function(){
		$(".menu-button").find("i").removeClass("icon-minus-sign").addClass("icon-plus-sign");
		$(".menu-main").hide();
	});
	$(".menu-main a").click(function(){ $(".menu-main").hide(); });

	//控制tab宽度
	var profile_tab = $(".nav-tabs li");
	profile_tab.css({"width": 100/profile_tab.length+"%", "text-align": "center"});

	//手机表单处理
	$(".form-table").delegate(".checkbox input[type='checkbox']", "click", function(){
		$(this).parent().toggleClass("btn-inverse");
	});
	$(".form-table").delegate(".file input[type='file']", "change", function(){
		var a = $(this).next("button");
		a.html(a.html() +' '+  $(this).val());
	});

	//处理固定横向导航条
	var navbarFixedTop = false, navbarFixedBottom = false;
	navbarFixedTop = $(".navbar").hasClass("navbar-fixed-top");
	navbarFixedBottom = $(".navbar").hasClass("navbar-fixed-bottom");
	if(navbarFixedTop) $("body").css("padding-top", "41px");
	if(navbarFixedBottom) $("body").css("padding-bottom", "41px");
});
</script>

<script language="javascript" src="./source/modules/WeixinApi.js"></script>
<script type="text/javascript">
	<?php
		$_share = array();
		$_share['title'] = (empty($title)) ? $_W['account']['name'] : $title;
		$_share['link'] = 'http://' . $_SERVER['HTTP_HOST'] . $_W['script_name'] . '?' . $_SERVER['QUERY_STRING'] . '&wxref=mp.weixin.qq.com';
		$_share['img'] = $_W['siteroot'] . 'source/modules/' . $_GPC['name'] . '/icon.jpg';
		$_share['content'] = $_share_content;
	?>
	<?php  if(!empty($_share_img)) { ?>
	var _share_img = "<?php  echo $_share_img;?>";
	if(_share_img.indexOf("http://") == -1 && _share_img.indexOf("https://") == -1) _share_img = "<?php  echo $_W['attachurl'];?>" + _share_img;
	<?php  } else { ?>
	var _share_img = $('body img:eq(0)').attr("src");
	if(typeof(_share_img) == "undefined") _share_img = "<?php  echo $_share['img'];?>";
	if(_share_img.indexOf("http://") == -1 && _share_img.indexOf("https://") == -1 ) _share_img = "<?php  echo $_W['attachurl'];?>" + _share_img;
	<?php  } ?>
	<?php  if(empty($_share['content'])) { ?>
	var _share_content = _removeHTMLTag($('body').html()).replace("<?php  echo $_share['title'];?>",'');
	<?php  } else { ?>
	var _share_content = "<?php  echo preg_replace('/\s/i', '', str_replace('	', '', cutstr(str_replace('&nbsp;', '', ihtmlspecialchars(strip_tags($_share['content']))), 60)));?>";
	<?php  } ?>
// 需要分享的内容，请放到ready里
WeixinApi.ready(function(Api) {
    // 微信分享的数据
    var wxData = {
        "appId": "<?php  echo $shareappid;?>", // 服务号可以填写appId
        "imgUrl" : _share_img,
        "link" : '<?php  echo $_share['link'];?>',
        "desc" : _share_content,
        "title" : "<?php  echo $_share['title'];?>"
    };

    // 分享的回调
    var wxCallbacks = {
        // 收藏操作是否触发回调，默认是开启的
        favorite : false,

        // 用async模式，表示每次分享之前，都需要更新分享内容
        async:true,
    };
    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, wxCallbacks);

    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData, wxCallbacks);

    // 点击分享到腾讯微博，会执行下面这个代码
    Api.shareToWeibo(wxData, wxCallbacks);

    // iOS上，可以直接调用这个API进行分享，一句话搞定
    Api.generalShare(wxData,wxCallbacks);
	
	//显示分享链接
	Api.showOptionMenu();
});
</script>
<?php  if(empty($main_off)) { ?></div><?php  } ?>
</body>
</html>
