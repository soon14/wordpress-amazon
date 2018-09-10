<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template(wl_header, TEMPLATE_INCLUDEPATH);?>
<link href='<?php echo RES;?>css/member.css' rel='stylesheet' type='text/css' />
<div id="shop_page_contents">
<div id="cover_layer"></div>
	<?php  include $this->template(wl_menu, TEMPLATE_INCLUDEPATH);?>
 	<ul id="member_nav">
		<li <?php  if($_GPC['status']==0) { ?>class="cur"<?php  } ?>><a href="<?php  echo $this->createMobileUrl('wlmember',array('d'=>'list','status'=>0));?>">待下单</a></li>
		<li <?php  if($_GPC['status']==1) { ?>class="cur"<?php  } ?>><a href="<?php  echo $this->createMobileUrl('wlmember',array('d'=>'list','status'=>1));?>">待确认</a></li>
		<li <?php  if($_GPC['status']==2) { ?>class="cur"<?php  } ?>><a href="<?php  echo $this->createMobileUrl('wlmember',array('d'=>'list','status'=>2));?>">已确认</a></li>
		<li <?php  if($_GPC['status']==3) { ?>class="cur"<?php  } ?>><a href="<?php  echo $this->createMobileUrl('wlmember',array('d'=>'list','status'=>3));?>">已完成</a></li>		
	</ul>
	<?php  if($_GPC['d']=='list'||empty($_GPC['d'])) { ?>
	<div id="order_list">
		<?php  if(is_array($list)) { foreach($list as $row) { ?>
		<div class="item">
			<h1>
				订单号：<a href="<?php  echo $this->createMobileUrl('wlmember',array('d'=>'detail','status'=>$row['status'],'orderid'=>$row['id']));?>"><?php  echo $row['ordersn'];?></a>
				（<strong class="fc_red">￥<?php  echo $row['totalprice'];?></strong>）
			</h1>
			<?php  if(is_array($row['goods'])) { foreach($row['goods'] as $row2) { ?>
			<div class="pro">
				<div class="img">
				<img src="<?php  echo $row2['thumb'];?>"></div>
				<dl class="info">
					<dd class="name"><a><?php  echo $row2['title'];?></a></dd>
					<dd>价格:￥<?php  echo $row2['marketprice'];?></dd>
					<dd>数量:<?php  echo $row2['total'];?></dd>
 				</dl>
				<div class="clear"></div>
			</div>
			<?php  } } ?>
		</div>
		<?php  } } ?>
		<?php  if(count($list)>4) { ?>
		 <a class="more"  href="javascript:;" readonly>加载更多</a>
		<?php  } ?>
	</div>
	<script type="text/javascript">
	
	</script>
	<?php  } ?>
	<?php  if($_GPC['d']=='detail') { ?>	
	<div id="order_detail">
			<div class="item">
			<ul>
				<li>订单号：<?php  echo $order['ordersn'];?></li>
				<li>订单时间: <?php  echo date('Y-m-d H:i:s',$order['createtime'])?></li>
				<li>订单状态: <?php  if($order['status']==0) { ?>待确认<?php  } else if($order['status']==1) { ?>已确认<?php  } else if($order['status']==3) { ?>已完成<?php  } else if($order['status']==-1) { ?>订单失效<?php  } ?></li>
				<li>订单数量:<strong class="fc_red"><?php  echo $order['totalnum'];?></strong></li>
				<li>订单总价:<strong class="fc_red">￥<?php  echo $order['totalprice'];?></strong></li>
				<li>付款方式: <?php  if($order['paytype']==1) { ?>余额支付<?php  } else if($order['paytype']==2) { ?>在线支付<?php  } else if($order['paytype']==3) { ?>现金支付<?php  } else { ?>未知方式<?php  } ?><?php  if($order['ispay']==1) { ?><strong class="fc_red">【已付款】</strong><?php  } else { ?>【未支付】<?php  } ?></li>				
				<li>订单类型: <?php  if($order['order_type']==3) { ?>自提<?php  } else if($order['order_type']==2) { ?>店内就餐【桌号:<?php  echo $order['desk'];?>】<?php  } else { ?>外卖外送<?php  } ?></li>
				<?php  if($order['order_type']==1) { ?><li>配送状态: <?php  if($order['sendstatus']==1) { ?><strong class="fc_red">已经配送</strong><?php  } else { ?>未配送<?php  } ?> </li><?php  } ?>
 				<?php  if(!empty($order['remark'])) { ?><li>订单备注: <?php  echo $order['remark'];?></li><?php  } ?>
			</ul>
		</div>
		<div class="item">
			<ul>
				<li>姓名: <?php  echo $order['guest_name'];?></li>
				<li>手机：<?php  echo $order['tel'];?></li>
				<?php  if(!empty($order['guest_address'])) { ?><li>地址：<?php  echo $order['guest_address'];?></li><?php  } ?>
			</ul>
		</div>

		<div class="item">
			<?php  if(is_array($row)) { foreach($row as $row2) { ?>
			<div class="pro">
				<div class="img">
				<img src="<?php  echo $row2['thumb'];?>"></div>
				<dl class="info">
					<dd class="name"><a><?php  echo $row2['title'];?></a></dd>
					<dd>价格:￥<?php  echo $row2['marketprice'];?></dd>
					<dd>数量:<?php  echo $row2['total'];?></dd>
 				</dl>
				<div class="clear"></div>
			</div>
			<?php  } } ?>
			<div class="total_price">产品总价:<span>￥<?php  echo $order['totalprice'];?></span></div>			
		</div>
		<?php  if($status==0&&$order['paytype']!=3) { ?><div class="payment"><a href="<?php  echo $this->createMobileUrl('wlorder', array('d' => payment,'OrderId'=>$order['id']));?>">付款</a></div><?php  } ?>
	</div>
	<?php  } ?>
	
</div>
<link rel="stylesheet" type="text/css" href="<?php echo RES;?>css/wei_canyin.css?2014-02-26-2" media="all" />
<div class="center">
 <div id="footer_menu" class="footer footer_menu">
		<ul class="clear">
			<li><a href="<?php  echo  $this->createMobileUrl('wlhome')?>" ><span class="icons icons_4"></span><label>店铺首页</label></a></li>
			<li><a href="<?php  echo  $this->createMobileUrl('wlindex')?>"><span class="icons icons_2"></span><label>开始选购</label></a></li>
			<li><a href="<?php  echo  $this->createMobileUrl('wlgenius')?>" <?php  if($_GPC['do']=='wlgenius') { ?>class="onactive"<?php  } ?>><span class="icons icons_1"></span><label>掌柜推荐</label></a></li>		
			<?php  if($_GPC['do']=='wlmember') { ?>
			<li><a href="javascript:;" class="onactive" ><span class="icons icons_3"></span><label>我的订单</label></a></li>
			<?php  } else { ?>
			<li><a href="<?php  echo  $this->createMobileUrl('wlmember')?>" ><span class="icons icons_3"></span><label>我的订单</label></a></li>
			<?php  } ?>
				
			<li><a href="<?php  echo  $this->createMobileUrl('wlcart')?>" id="my_menu"><span class="icons icons_5"><label id="num" class="num"><?php  echo intval($totalnum)?></label></span></a></li>
		</ul>
        </div>
        <script>
            var footer = document.getElementById("footer_menu");
            var evtObj = {
                handleEvent: function(evt){
                    if("A" == evt.target.tagName){
                        evt.target.classList.toggle("on");
                    }
                }
            }
            footer.addEventListener("touchstart", evtObj, false);
            footer.addEventListener("touchend", evtObj, false);
        </script>
    </div>

