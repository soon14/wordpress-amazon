<?php defined('IN_IA') or exit('Access Denied');?><?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
	<div class="main">
		<form action="" method="post" class="form-horizontal form">
			<h4>注册设置</h4>
			<table class="tb">
				<tr>
					<th><label for="">是否开启用户注册</label></th>
					<td>
						<label for="isshow1" class="radio inline"><input type="radio" name="open" value="1" id="isshow1" <?php  if(!empty($settings['open'])) { ?> checked<?php  } ?>> 是</label>&nbsp;&nbsp;&nbsp;<label for="isshow2" class="radio inline"><input type="radio" name="open" value="0" id="isshow2" <?php  if(empty($settings['open'])) { ?> checked<?php  } ?>> 否</label>
						<div class="help-block"></div>
					</td>
				</tr>
				<tr>
					<th><label for="">是否审核新用户</label></th>
					<td>
						<label for="isshow3" class="radio inline"><input type="radio" name="verify" value="1" id="isshow3"<?php  if(!empty($settings['verify'])) { ?> checked<?php  } ?>> 是</label>&nbsp;&nbsp;&nbsp;<label for="isshow4" class="radio inline"><input type="radio" name="verify" value="0" id="isshow4"<?php  if(empty($settings['verify'])) { ?> checked<?php  } ?>> 否</label>
						<div class="help-block"></div>
					</td>
				</tr>
				<tr>
					<th><label for="">启用注册验证码</label></th>
					<td>
						<label for="isshow3" class="radio inline"><input type="radio" name="code" value="1" id="isshow3"<?php  if(!empty($settings['code'])) { ?> checked<?php  } ?>> 是</label>&nbsp;&nbsp;&nbsp;<label for="isshow4" class="radio inline"><input type="radio" name="code" value="0" id="isshow4"<?php  if(empty($settings['code'])) { ?> checked<?php  } ?>> 否</label>
						<div class="help-block"></div>
					</td>
				</tr>
				<tr>
					<th>默认所属用户组</th>
					<td>
						<select name="groupid">
							<option value="0">请选择所属用户组</option>
							<?php  if(is_array($groups)) { foreach($groups as $row) { ?>
							<option value="<?php  echo $row['id'];?>" <?php  if($settings['groupid'] == $row['id']) { ?>selected<?php  } ?>><?php  echo $row['name'];?></option>
							<?php  } } ?>
						</select>
						<span class="help-block">当开启用户注册后，新注册用户将会分配到该用户组里，并直接拥有该组的模块操作权限。</span>
					</td>
				</tr>
				<tr>
					<th></th>
					<td>
						<input name="submit" type="submit" value="提交" class="btn btn-primary span3" />
						<input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
					</td>
				</tr>
			</table>
		</form>
	</div>
<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>
