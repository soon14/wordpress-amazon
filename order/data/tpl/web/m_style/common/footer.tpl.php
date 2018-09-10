<?php defined('IN_IA') or exit('Access Denied');?>	<div id="footer">
		<span class="pull-left">
			<p><?php  if(empty($_W['setting']['copyright']['footerleft'])) { ?>Powered by <a href=""><b></b></a> v<?php echo IMS_VERSION;?> &copy; 2014 <a href=""></a><?php  } else { ?><?php  echo $_W['setting']['copyright']['footerleft'];?><?php  } ?></p>
		</span>
		<span class="pull-right">
		</span>
	</div>
	<div class="emotions" style="display:none;"></div>
</body>
</html>