<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('common/header', TEMPLATE_INCLUDEPATH);?>
 <ul class="nav nav-tabs">
	<li><a href="<?php  echo $this->createWebUrl('shopset')?>">基本设置</a></li>
	<li class="active"><a href="<?php  echo $this->createWebUrl('mailset')?>">邮件设置</a></li>	
	<li><a href="<?php  echo $this->createWebUrl('printset')?>">打印机设置</a></li>	
	<li><a href="<?php  echo $this->createWebUrl('smsset')?>">短信设置</a></li>		
	<li><a href="<?php  echo $this->createWebUrl('orderset')?>">订单限制</a></li>
	<li><a href="<?php  echo $this->createWebUrl('ordertype')?>">店铺类型</a></li>		
</ul>

<div class="main">
	<form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
	<input type="hidden" name="parentid" value="<?php  echo $set['id'];?>" />
		<h4>邮件基本设置 <small><?php  if(($set['mail_user']!='' && $set['mail_psw']!='')) { ?>(<a href="<?php  echo $this->createWebUrl('Mailset',array('action'=>'test'))?>">测试邮件发送</a>)<?php  } ?></small></h4>
		<table class="tb">
			<tr>
				<th><label for="">是否开启</label></th>
				<td>
					<label for="isshow1" class="radio inline"><input type="radio" name="mail_status" value="1" id="isshow1" <?php  if($set['mail_status']==1) { ?>checked="true"<?php  } ?> /> 是</label>
					&nbsp;&nbsp;&nbsp;
					<label for="isshow2" class="radio inline"><input type="radio" name="mail_status" value="0" id="isshow2"  <?php  if($set['mail_status']==0) { ?>checked="true"<?php  } ?> /> 否</label>
					<span class="help-block"></span>
				</td>
			</tr>

			<tr>
				<th><label for="">SMTP服务器</label></th>
				<td>
					<input type="text" name="mail_smtp" class="span6" value="<?php  echo $set['mail_smtp'];?>" />
					<p class="help-block">首先要在邮箱后台开启这个服务，然后一般地址都是smtp.qq.com,smtp.163.com</p>
				</td>
			</tr>
			<tr>
				<th><label for="">收件账户</label></th>
				<td>
					<input type="text" name="mail_to" class="span6" value="<?php  echo $set['mail_to'];?>" />
					<p class="help-block">目前暂时支持1个用户，最好将收件账户加发件账户为好友,建议手机绑定邮件，可以同步</p>					
				</td>
			</tr>
			<tr>
				<th><label for="">邮件发件账户</label></th>
				<td>
					<input type="text" name="mail_user" class="span6" value="<?php  echo $set['mail_user'];?>" />
					<p class="help-block">发送邮件的账号,记得收件账户加发件账户为重要联系人，否则有可能收不到邮件.</p>					
				</td>
			</tr>
 			<tr>
				<th><label for="">发件账户密码</label></th>
				<td>
					<input type="password" name="mail_psw" class="span6" value="<?php  echo $set['mail_psw'];?>" />
					<p class="help-block">发送邮件的密码</p>					
				</td>
			</tr>
  
			<tr>
				<th></th>
				<td>
					<input name="submit" type="submit" value="提交" class="btn btn-primary span3">
					<input type="hidden" name="id" value="<?php  echo $set['id'];?>" />
					<input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
 
				</td>
			</tr>
		</table>
	</form>
</div>	
<?php  include $this->template('common/footer', TEMPLATE_INCLUDEPATH);?>