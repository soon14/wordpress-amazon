<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('common/header', TEMPLATE_INCLUDEPATH);?>
<ul class="nav nav-tabs">
	<li <?php  if($op == 'display') { ?>class="active"<?php  } ?>>
		<a href="<?php  echo $this->createWebUrl('display',array('op' => 'display'))?>">工具管理</a>
	</li>
	<li <?php  if($op == 'post') { ?>class="active"<?php  } ?>>
		<a href="<?php  echo $this->createWebUrl('display',array('op' => 'post'))?>">添加工具</a>
	</li>
</ul>

<?php  if($op == 'display') { ?>
<div class="main">
	<div class="search">
		<table class="table table-bordered tb">
			<tbody>
				<tr>
					<th>引用地址</th>
					<td>
						<input class="span6"   type="text" value="
<?php  echo create_url('mobile/module/detail', array('name'=>'chaxun','weid'=>$_W['weid']))?>
						">
					</td>
				</tr>
			</tbody>
		</table>

	</div>
	<div style="padding:15px;">
		<table class="table table-hover">
			<thead class="navbar-inner">
				<tr>
					<th class="span1">服务名称</th>
					<th class="span2">状态</th>
					<th class="span2">操作</th>
				</tr>
			</thead>
			<tbody>
				<?php  if(is_array($row)) { foreach($row as $val) { ?>
				<tr>
					<td><p><?php  echo $val['title'];?></p></td>
		            <td>
		            	<a class="btn btn-primary" href="<?php  echo $this->createWebUrl('display',array('op' => 'edit', 'id' => $val['id'],'status' => $val['status']))?>"><?php  if($val['status'] == 1) { ?>启用<?php  } else { ?>禁用<?php  } ?></a>
		            </td>
		            <td>
		            	<a href="<?php  echo $this->createWebUrl('display',array('op' => 'delete','id' => $val['id']))?>" >删除</a>&nbsp;|
		            	<a href="<?php  echo $this->createWebUrl('display',array('op' => 'post','id' => $val['id']))?>">编辑</a>
		            </td>
				</tr>
				<?php  } } ?>
			</tbody>
	
		            
		
		</table>
	</div>

</div>
<?php  } else if($op == 'post') { ?>
 <form class="form-horizontal form" action="" method="post" enctype="multipart/form-data">
 	<div class="main">
 		<input type="hidden" name="id" value="<?php  echo $item['id'];?>" /> 
 			<br><br>

 		<table class="tb">
 			
 			<tr>
 				<th>
 					<label for="">名称</label>
 				</th>
 				<td>
 					<input type="text" class="span4" name="title" id="name" value="<?php  echo $item['title'];?>" /> 
 				</td>
 			</tr>
 			<!-- <tr>
 				<th>描述</th>
 				<td>
 					<textarea style="height:100px;" class="span4" name="description" cols="70"><?php  echo $item['description'];?></textarea>
 				</td>
 			</tr> -->
 			<tr>
 				<th>
 					<label for="">链接</label>
 				</th>
 				<td>
 					<input class="span5" type="text" name="url" id="url" value="<?php  echo $item['url'];?>" /> 
 					<span class="help-block">指定这个工具的链接目标</span>
 				</div>
 			</td>
 		</tr>
 		 <tr> 
 		<th>
 			<label for="">状态</label>
 		</th>
 		<td>
 			<label for="status_1" class="radio inline">
 				<input autocomplete="off" type="radio" name="status" id="status_1" value="1" <?php  if($item['status'] == 1 || empty($item)) { ?> checked="checked"<?php  } ?> /> 
 				显示
 			</label>
 			<label for="status_0" class="radio inline">
 				<input autocomplete="off" type="radio" name="status" id="status_0" value="0" <?php  if(!empty($item) && $item['status'] == 0) { ?> checked="checked"<?php  } ?> /> 
 				隐藏
 			</label>
 			<span class="help-block">设置工具菜单的显示状态</span>
 		</td>
 	</tr>
 	
 	<tr>
 		<th>
 			<label for="">排序</label>
 		</th>
 		<td>
 			<input type="text" class="span2" name="displayorder" value="<?php  echo $item['displayorder'];?>" /> 
 			<span class="help-block">工具排序，越大越靠前</span>
 		</td>
 	</tr>

 	<tr>
 		<th>
 			<label for="">上传图标</label>
 		</th>
 		<td>
 			<div class="fileupload fileupload-new" data-provides="fileupload">
 				<div class="fileupload-preview thumbnail" style="width: 50px; height: 50px;">
 					<?php  if($item['fileicon']) { ?>
 					<input  type="hidden" name="fileicon-old" value="<?php  echo $item['fileicon'];?>"  />
 					<img src="<?php  echo $_W['attachurl'];?><?php  echo $item['fileicon'];?>" width="50" /> 
 					<?php  } ?>
 				</div>
 				<div>
 					<span class="btn btn-file">
 						<span class="fileupload-new">选择图片</span>
 						<span class="fileupload-exists">更改</span>
 						<input name="fileicon" type="file" /> 
 					</span>
 					<?php  if($item['fileicon']) { ?>
 					<button type="submit" name="fileupload-delete" value="<?php  echo $item['fileicon'];?>" class="btn fileupload-new">删除</button>
 					<?php  } ?>
 					<a href="#" class="btn fileupload-exists" data-dismiss="fileupload">移除</a>
 				</div>
 			</div>

 		</td>
 	</tr>
 	<tr>
 		<th></th>
 		<td>
 			<input name="token" type="hidden" value="<?php  echo $_W['token'];?>" /> 
 			<input type="submit" class="btn btn-primary" name="submit" value="提交" /> 
 		</td>
 	</tr>
 </table>
 </form>
<?php  } ?>
<?php  include $this->template('common/footer', TEMPLATE_INCLUDEPATH);?>