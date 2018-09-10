<?php defined('IN_IA') or exit('Access Denied');?><?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
<style type="text/css">
body{background:#f9f9f9;}
.login{width:598px; overflow:hidden; margin:0 auto;padding-top:30px;background:#EEE;border:1px #ccc solid;border-top:0;}
.login .table{width:500px;margin:0 auto;}
.login .table td{border:0;}
.login .table label{font-size:16px;}
.login-hd{width:600px;margin:0 auto;overflow:hidden;margin-top:35px;font-size:20px;font-weight:600;height:40px;}
.login-hd div{float:left;width:200px; height:35px; line-height:40px;cursor:pointer;}
.login-hd div a{color:#FFF; display:block; text-decoration:none; text-align:center;}
.login-hd-bottom{width:600px;margin:0 auto;height:5px;background:#CCC;margin-top:-5px;}
</style>
<script>
$(function() {
	$('.login-hd div').each(function() {
		$(this).css({'border-bottom': '5px '+$(this).css("background-color")+' solid', 'background': 'none'});
		$(this).find('a').hide();
	});
	$('.login-hd').delegate("div", "mouseover", function(){
		$('.login-hd div').each(function() {
			$(this).css({'border-bottom': '5px '+$(this).css("border-bottom-color")+' solid', 'background': 'none'});
			$(this).find('a').hide();
		});
		$(this).css('background-color', $(this).css("border-bottom-color"));
		$(this).find('a').show();
	});
	$('.login-hd').mouseleave(function() {
		$('.login-hd div').each(function() {
			$(this).css({'border-bottom': '5px '+$(this).css("border-bottom-color")+' solid', 'background': 'none'});
			$(this).find('a').hide();
		});
	});
});
function check(form) {
	if($.trim($(':text[name="username"]').val()) == '') {
		message('没有输入用户名.', '', 'error');
		return false;
	}
	if($('#password').val() == '') {
		message('没有输入密码.', '', 'error');
		return false;
	}
	if($('#password').val() != $('#repassword').val()) {
		message('两次输入的密码不一致.', '', 'error');
		return false;
	}
	<?php  if(is_array($extendfields)) { foreach($extendfields as $item) { ?>
	<?php  if($item['required']) { ?>
		if (!form['<?php  echo $item['field'];?>'].value) {
			message('<?php  echo $item['title'];?>为必填项，请返回修改！', '', 'error');
			return false;
		}
	<?php  } ?>
	<?php  } } ?>
	<?php  if($setting['register']['code']) { ?>
	if($.trim($(':text[name="code"]').val()) == '') {
		message('没有输入验证码.', '', 'error');
		return false;
	}
	<?php  } ?>
	return true;
}
</script>
<div class="login-hd">
	<div class="badge-success"><a href="<?php  echo create_url('index');?>" target="_blank">首页</a></div>
	<div class="badge-important"><a href="<?php  echo create_url('member/login');?>" target="_blank">登录</a></div>
	<div class="badge-info"><a href="<?php  echo create_url('member/register');?>" target="_blank">注册</a></div>
</div>
<div class="login-hd-bottom"></div>
<form action="" method="post" onsubmit="return check(this); return false;">
<div class="login">
	<table class="table">
		<tr>
			<td style="width:120px;"><label>用户名：<span style="color:red">*</span></label></td>
			<td><input type="text" class="span4" autocomplete="off" name="username"></td>
		</tr>
		<tr>
			<td><label>密码：<span style="color:red">*</span></label></td>
			<td><input type="password" class="span4" autocomplete="off" name="password" id="password"></td>
		</tr>
		<tr>
			<td><label>确认密码：<span style="color:red">*</span></label></td>
			<td><input type="password" class="span4" autocomplete="off" name="password" id="repassword"></td>
		</tr>
		<?php  if($extendfields) { ?>
			<?php  if(is_array($extendfields)) { foreach($extendfields as $item) { ?>
			<tr>
				<td><label><?php  echo $item['title'];?>：<?php  if($item['required']) { ?><span style="color:red">*</span><?php  } ?></label></td>
				<td><?php  echo tpl_fans_form($item['field'])?></td>
			</tr>
			<?php  } } ?>
		<?php  } ?>
		<?php  if($setting['register']['code']) { ?>
		<tr>
			<td><label>验证码：<span style="color:red">*</span></label></td>
			<td>
				<input type="text" class="span1" autocomplete="off" name="code">
				<img src="<?php  echo create_url('member/code');?>" class="img-rounded" style="cursor:pointer;" onclick="this.src='<?php  echo create_url('member/code');?>' + Math.random();" />
			</td>
		</tr>
		<?php  } ?>
		<tr>
			<td></td>
			<td><input type="submit" name="submit" class="btn span2" value="注册"/><input type="hidden" name="token" value="<?php  echo $_W['token'];?>" /><label class="checkbox inline"><a href="<?php  echo create_url('member/login')?>">已有帐号？马上登录</a></label></td>
		</tr>
	</table>
</div>
</form>
<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>
