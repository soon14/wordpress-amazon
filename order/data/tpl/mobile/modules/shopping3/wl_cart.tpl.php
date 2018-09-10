<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html>
<html lang="zh-CN">
<head>
<link rel="stylesheet" type="text/css" href="<?php echo RES;?>css/wei_canyin.css" media="all" />
<link rel="stylesheet" type="text/css" href="<?php echo RES;?>css/wei_dialog.css" media="all" />
<link rel="stylesheet" type="text/css" href="<?php echo RES;?>css/datepicker_canyin.css" media="all" />
<script type="text/javascript" src="<?php echo RES;?>js/jQuery.js"></script>
<script type="text/javascript" src="<?php echo RES;?>js/wei_webapp_v2_common.js"></script>
<script type="text/javascript" src="<?php echo RES;?>js/bootstrap-datepicker_canyin.js"></script>
<title>我的订单</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <meta name="format-detection" content="telephone=no" />
</head>
<body id="page_intelOrder" class="myOrderCon">
    <style>
    .btn_common{
        font-size:12px;
        padding: 5px 8px;
        border: 0;
        border-radius: 2px;
        cursor: pointer;
        background-color: #2ec366;
        color: #fff;
    }
    .dish_item textarea{
        padding: 8px;
        background: #eaeaea;
        border-radius: 12px;
        border: 1px solid #dedede;
        outline: none;
        resize: none;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-shadow: none;
        display:none;
    }
    .dish_item{
        height:45px!important;
    }
    .dish_item.on{
        height:97px!important;
    } .dish_item.on textarea{
        margin-top:3px;
        display:block;
    }
</style>



<header  style="padding-top:20px;">
    <span class="pCount" style="">已点<l style="color:red" id="countnums" nums="<?php  echo $totalnum;?>"><?php  echo $totalnum;?></l>个</span>
    <label><i>共计：</i><b class="duiqi" id="total"></b><b class="duiqi">元</b></label>
</header>

<section style="margin-bottom:10px;">
    <article>
        <h2>我的订单
            <button class="btn_add emptyIt" id="clearBtn" onclick="clearAll();">清空</button>
            <button class="btn_add" onClick="location.href = '<?php  echo  $this->createMobileUrl('wlindex')?>'">+添加</button>
        </h2>
        <ul id="myorder" class="myorder">
            <!---->
        </ul>
    </article>
</section>
<section style="margin-bottom:40px;">
    <article>
        <form id="form_dish" action="<?php  echo  $this->createMobileUrl('wlorder',array('d'=>'checkout'))?>" method="post" target="hide">
            <input type="hidden" name="id" value="14511" />
            <table class="table_book">
                <tr>
                    <td width="80px" style="width:80px;">手机号码：</td>
                    <td colspan="2"><input type="tel" id="tel" name="tel" value="<?php  echo $fans['mobile'];?>" maxlength="20" placeholder="(必填*)请输入您的手机号码" style="width:200px;" class="input_text"/></td>
                </tr>
                <tr>
                    <td style="width:80px;">用户姓名：</td>
                    <td style="width:50%;">
                        <input type="text" name="guest_name" id="guest_name" value="<?php  echo $fans['nickname'];?>" placeholder="(必填*)请输入您的真是姓名" maxlength="10" style="width:100px;" class="input_text"/>
                    </td>
                    <td>
                        <div class="group_checkbox" style="width:70px;display:inline;">
                            <input type="checkbox" value="1" name="sex" <?php  if($fans['gender']==1) { ?>checked="checked"<?php  } ?> />
                        </div>
                    </td>
                </tr>
                <tr>
					<?php  $hour=date('H');?>
                    <td style="width:80px;">预约时间：</td>
                    <td colspan="2">
                        <input id="dpd1" type="text" name="time_day" readonly="readonly" style="width:80px;"/>
                        <select name="time_hour">
                                                            <option value="01" <?php  if($hour=='01') { ?>selected<?php  } ?>>01时</option>
                                                            <option value="02" <?php  if($hour=='02') { ?>selected<?php  } ?>>02时</option>
                                                            <option value="03" <?php  if($hour=='03') { ?>selected<?php  } ?>>03时</option>
                                                            <option value="04" <?php  if($hour=='04') { ?>selected<?php  } ?>>04时</option>
                                                            <option value="05" <?php  if($hour=='05') { ?>selected<?php  } ?>>05时</option>
                                                            <option value="06" <?php  if($hour=='06') { ?>selected<?php  } ?>>06时</option>
                                                            <option value="07" <?php  if($hour=='07') { ?>selected<?php  } ?>>07时</option>
                                                            <option value="08" <?php  if($hour=='08') { ?>selected<?php  } ?>>08时</option>
                                                            <option value="09" <?php  if($hour=='09') { ?>selected<?php  } ?>>09时</option>
                                                            <option value="10" <?php  if($hour=='10') { ?>selected<?php  } ?>>10时</option>
                                                            <option value="11" <?php  if($hour=='11') { ?>selected<?php  } ?>>11时</option>
                                                            <option value="12" <?php  if($hour=='12') { ?>selected<?php  } ?>>12时</option>
                                                            <option value="13" <?php  if($hour=='13') { ?>selected<?php  } ?>>13时</option>
                                                            <option value="14" <?php  if($hour=='14') { ?>selected<?php  } ?>>14时</option>
                                                            <option value="15" <?php  if($hour=='15') { ?>selected<?php  } ?>>15时</option>
                                                            <option value="16" <?php  if($hour=='16') { ?>selected<?php  } ?>>16时</option>
                                                            <option value="17" <?php  if($hour=='17') { ?>selected<?php  } ?>>17时</option>
                                                            <option value="18" <?php  if($hour=='18') { ?>selected<?php  } ?>>18时</option>
                                                            <option value="19" <?php  if($hour=='19') { ?>selected<?php  } ?>>19时</option>
                                                            <option value="20" <?php  if($hour=='20') { ?>selected<?php  } ?>>20时</option>
                                                            <option value="21" <?php  if($hour=='21') { ?>selected<?php  } ?>>21时</option>
                                                            <option value="22" <?php  if($hour=='22') { ?>selected<?php  } ?>>22时</option>
                                                            <option value="23" <?php  if($hour=='23') { ?>selected<?php  } ?>>23时</option>
                                                            <option value="24" <?php  if($hour=='24') { ?>selected<?php  } ?>>24时</option>
                                                    </select>
                        <select name="time_second">
                                                            <option value="00">00分</option>
                                                            <option value="10">10分</option>
                                                            <option value="20">20分</option>
                                                            <option value="30">30分</option>
                                                            <option value="40">40分</option>
                                                            <option value="50">50分</option>
                                                            <option value="60">60分</option>
                                                    </select>
                    </td>
                 </tr>
				<?php  if($mycoupons) { ?>
                <tr>
                    <td style="width:80px;">优惠券：</td>
                    <td colspan='2'>
                        <select name="coupon_id">
							<option value="">选择优惠券</option>
							<?php  if(is_array($mycoupons)) { foreach($mycoupons as $coupon) { ?>
                            <option value="<?php  echo $coupon['coupon_id'];?>"><?php  echo $coupon['coupon_name'];?>(满<?php  echo $coupon['total_money'];?>抵<?php  echo $coupon['discount_money'];?>元)</option>
							<?php  } } ?>
                        </select>
                    </td>
                 </tr>
				<?php  } ?>
                <tr>
                    <td style="width:80px;">类型：</td>
                    <td colspan="2">
                        <div class="group_radio">
							<?php  $isordertype=1?>
							<?php  if($set['ordretype2']==1) { ?>
							<span >
                                <input type="radio" name="order_type" value="2" <?php  if($isordertype==1) { ?>checked="checked"<?php  } ?> />
                                <label>店内</label>
                            </span>
							<?php  $isordertype=0?>
							<?php  } ?>
							<?php  if($set['ordretype1']==1) { ?>							
							<span>
                                <input type="radio" name="order_type" value="1" <?php  if($isordertype==1) { ?>checked="checked"<?php  } ?> />
                                <label>外卖</label>
                            </span>
							<?php  $isordertype=0?>
							<?php  } ?>
							<?php  if($set['ordretype3']==1) { ?>	
							<span>
                                <input type="radio" name="order_type" value="3" <?php  if($isordertype==1) { ?>checked="checked"<?php  } ?> />
                                <label>自提</label>
                            </span>
							<?php  $isordertype=0?>
							<?php  } ?>
						</div>
                    </td>
                </tr>
				<tbody id="out" style="display:none">
				<?php  if(empty($set['address_list'])) { ?>
				<tr>
                    <td width="80px" style="width:80px;">送货地址：</td>
                    <td colspan="2">
						<input type="text" id="text" name="address" value="<?php  echo $fans['address'];?>" placeholder="请输入您的详细收货地址" class="input_text" style="desplay:inline"/></td>
                </tr>
				<?php  } else { ?>
					<?php  $arr=explode(PHP_EOL,$set['address_list']);?>
                <tr>
                    <td width="80px" style="width:80px;">送货地址：</td>
                    <td colspan="2">
						<select name="pre_address" style="width:120px">
							<?php  if(is_array($arr)) { foreach($arr as $v) { ?>
							<option value="<?php  echo $v;?>"><?php  echo $v;?></option>
							<?php  } } ?>
						</select>
					</td>
                </tr>
				<tr>
                    <td width="80px" style="width:80px;"></td>
                    <td colspan="2">
					<input type="text" id="text" name="address" value="<?php  echo $fans['address'];?>" placeholder="请输入您的详细收货地址" class="input_text" style="desplay:inline"/></td>
                </tr>
				<?php  } ?>
				</tbody>
				<tbody id="in">
                <tr>
                    <td style="width:80px;">预定人数：</td>
                    <td colspan="2">
                        <input type="number" name="nums" id="nums" value="1" min="1" maxlength="3" style="width:100px;" class="input_text"/>
                    </td>
                </tr>
                <tr>
                    <td style="width:80px;">就餐形式：</td>
                    <td colspan="2">
                        <div class="group_radio">
							<span >
                                <input type="radio" name="seat_type" value="2" checked="checked" />
                                <label>包间</label>
                            </span>
							<span>
                                <input type="radio" name="seat_type" value="1" />
                                <label>大厅</label>
                            </span>
						</div>
                    </td>
                </tr>
				<tr id="t_room">
                    <td style="width:80px;">包间：</td>
                    <td colspan="2">
						<?php  if(empty($set['room_list'])) { ?>
							<input type="text" name="room_t" id="room_t" value="" maxlength="5" placeholder="请填写您的包间，不清楚可以联系店员" style="width:120px;" class="input_text"/>
						<?php  } else { ?>
						<?php  $arr=explode(PHP_EOL,$set['room_list']);?>
						<select name="room_t" style="width:120px">
							<?php  if(is_array($arr)) { foreach($arr as $v) { ?>
							<option value="<?php  echo $v;?>"><?php  echo $v;?></option>
							<?php  } } ?>
						</select>
						<?php  } ?>
					</td>
				</tr>
				<tr id="t_desk" style="display:none">
                    <td style="width:80px;">桌号：</td>
                    <td colspan="2">
						<?php  if(empty($set['desk_list'])) { ?>
							<input type="text" name="desk_t" id="desk_t" value="" maxlength="5" placeholder="请填写您的桌号，不清楚可以联系店员" style="width:120px;" class="input_text"/>
						<?php  } else { ?>
							<?php  $arr=explode(PHP_EOL,$set['desk_list']);?>
							<select name="desk_t" style="width:120px">
								<?php  if(is_array($arr)) { foreach($arr as $v) { ?>
								<option value="<?php  echo $v;?>"><?php  echo $v;?></option>
								<?php  } } ?>
							</select>
						<?php  } ?>
						
					</td>
				</tr>		
				</tbody>
            <tr>
                    <td style="width:80px;vertical-align:top;line-height:25px;">备注说明：</td>
                    <td colspan="2">
                        <textarea name="remark" style="height:60px;" maxlength="100" placeholder="如有附加需求，请备注，店小二会尽量安排" class="input_text"></textarea>
                    </td>
                </tr>
            </table>
            <footer>
				<input type="hidden" name="totalnum" id="totalnum" value="<?php  echo $totalnum;?>">
				<input type="hidden" name="totalprice" id="totalprice">
				<input type="hidden" name="params" id="params">
				<?php  if(!empty($shopping_fans)&&$shopping_fans['status']==0) { ?>
                <input type="button" value="系统正忙,请稍后" class="btn_2"/>
				<?php  } else { ?>
					<?php  if($status) { ?>
                <input type="button" value="下一步" class="btn_2" id="submit_form" />
					<?php  } else { ?>
                <input type="button" value="下一步" class="btn_2" id="submit"/>
					<?php  } ?>
				<?php  } ?>
			</footer>
        </form>
    </article>
</section>

</div>
<?php  include $this->template(wl_footer, TEMPLATE_INCLUDEPATH);?> 
<script>var pageName = 'menuFilled';</script>
<script>
    window.addEventListener("DOMContentLoaded", function() {
        getAllMenu();
        //
        var now = new Date();
        var nowArr = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
        $("#dpd1").each(function(k, v) {
            var ndate = $(v).datepicker({
                format: "yyyy/mm/dd",
                onRender: function(date) {
                    var t1 = new Date(date.valueOf());
                    var t2 = new Date(now.valueOf());
                    t1 = t1.getFullYear() + "/" + (t1.getMonth() + 1) + "/" + t1.getDate();
                    t2 = t2.getFullYear() + "/" + (t2.getMonth() + 1) + "/" + t2.getDate();
                    return (t1 != t2 && (date.valueOf() < now.valueOf())) ? 'disabled' : '';
                }
            }).on("changeDate", function(date) {
                if ('days' == date.viewMode) {
                    ndate.datepicker('hide');
                }
            });
            v.value = nowArr.join("/");
        });
        //
    }, false);
    window.addEventListener("DOMContentLoaded", function() {
        getAllMenu();
    }, false);
    //
    function getAllMenu() {
        MLoading.show('加载中');
        var params = {}
        _doAjax('<?php  echo  $this->createMobileUrl('wldishlist',array('subcp'=>'cart'))?>', 'POST', params, function(res) {
            MLoading.hide();
            window.res = {
                data: res
            }
            switchMenu();
        });
    }
    function addToMenu(){
            var params = '[';
            for(var key in window.selected.dishes){
                params += '{"dishes_id":'+ key + ",",
                params += '"price":'+ window.selected.dishes[key].price + ",",
                params += '"nums":'+ window.selected.dishes[key].num + "},"
            }
            params = params.replace(/,$/, "");
            params += ']';

            $.ajax({
                'url':'<?php  echo  $this->createMobileUrl('wldishlist')?>',
                'data':{'order':params},
                'type':'POST',
                'async':'false',
                'success':function(db){
                   // location.href='';
                }
            });
        }
    function switchMenu() {
        var TPL = '<li class="dish_item">\
                    <span class="dishName">{name}</span>\
                    <i>{price}元/{unit}</i>\
                    <div><textarea name="description" onblur="changeDescription(this, event, {dishes_id});">{description}</textarea></div>\
                    <section class="bbox" dishname="{name}" onclick="changeCount(this, event, {dishes_id});">\
                        <input class="btn-reduce" type="button" value="-">\
                        <input class="numBox" name="numBox" type="text" value="{selected_count}" price="{price}" readonly="readonly">\
                        <input type="button" class="btn-plus" value="+">\
                    </section>\
                    </li>';
        var myorder = document.getElementById("myorder");
        var totalPrice = 0;
        myorder.innerHTML = iTemplate.makeList(TPL, window.res.data, function(k, v) {
            if (v.discount_price) {

                v.price = v.discount_price;
            }
            totalPrice += parseFloat(v.price) * parseInt(v.selected_count);
            return {
                description: v.description || ""
            }
        });
		$("#totalprice").val(totalPrice);
        document.getElementById("total").innerHTML = (totalPrice).toFixed(2);
    }



    function changeCount(thi, evt, dishes_id) {
        if ("button" == evt.target.type) {
            var counter = thi.querySelectorAll("input[name='numBox']")[0];
            var val = parseInt(counter.value);
            var countnums = parseInt($("#countnums").attr("nums"));
            if ("btn-reduce" == evt.target.className) {
                val--;
            } else {
                val++;
            }
			
			if(val >= 0){
                if ("btn-reduce" == evt.target.className) {
                    var num = countnums - 1;
					var action=1;
                } else {
                    var num = countnums + 1;
					var action=0;
                }

				$.post("<?php  echo $this->createMobileUrl('wlupdatecart');?>", {"dishes_id":dishes_id,"total": val,"action":action},function(data){
					if(data.message.status==1){
						//数据成功
						counter.value = Math.max(0, val);

						document.getElementById("countnums").innerHTML = num;
						document.getElementById("num").innerHTML = num;
						
						$("#countnums").attr("nums",num);
						$("#totalnum").val(num);
						var totalPrice = 0;
						for (var i = 0, ci; ci = window.res.data[i]; i++) {
							if (dishes_id == ci.dishes_id) {
								ci.selected_count = counter.value;
								//break;
							}
							totalPrice += parseFloat(ci.price) * parseInt(ci.selected_count);
						}
						$("#totalprice").val(totalPrice);
						document.getElementById("total").innerHTML = (totalPrice).toFixed(2);
					}else{
						//数据失败
						alert(data.message.message);
						//alert('error');
						
					}
				}, "json");
			}else{
				alert('数量已经小于0');
			
			}
           
          
            //switchMenu();
        }
    }



    function changeDescription(thi, evt, dishes_id) {
        for (var i = 0, ci; ci = window.res.data[i]; i++) {
            if (dishes_id == ci.dishes_id) {
                ci.description = thi.value;
                break;
            }
        }
    }
    //
    function clearAll() {
        MDialog.confirm(
                '', '是否清空菜单？', null,
                '确定', function() {
                    $.ajax({
                        'url': '<?php  echo  $this->createMobileUrl('wldishlist',array('subcp'=>'clear'))?>',
                        'success': function(db) {
                            $('#myorder').empty();
                            $('#total').text('0');
							$('#num').text('0');
							
                        }
                    });

                }, null,
                '取消', null, null,
                null, true, true
                );
    }
    //

    function slideOn(thi, evt) {
        var li = $(thi).closest("li");
        li["toggleClass"]("on");
    }
	
	$(':radio[name="seat_type"]').click(function () {
		seat_type=$(':radio[name="seat_type"]:checked').val();
 		if(seat_type==2){
			$("#t_room").show();
			$("#t_desk").hide();
		}else{
			$("#t_room").hide();
			$("#t_desk").show();
		}
	});
	$(':radio[name="order_type"]').click(function () {
		order_type=$(':radio[name="order_type"]:checked').val();
		if(order_type==3){
			$("#out").hide();
			$("#in").hide();
		}else if(order_type==2){
			$("#in").show();
			$("#out").hide();
		}else{
			$("#in").hide();
			$("#out").show();		
		}
     });

</script>

<script type="text/javascript">
    $(function() {
		$('#submit').click(function() {
			alert("请在<?php  echo $set['yy_start_time'];?>~<?php  echo $set['yy_end_time'];?>下单");
		});
        $('#submit_form').click(function() {
            if($("#tel").val() == ''){
                alert("请输入手机号码");return false;
//                MDialog.alert(null, "请输入手机号码", null, "确定");
//                return false;
            }
            
            if($("#guest_name").val() == ''){
                alert("请输入用户姓名");return false;
//                MDialog.alert(null, "请输入用户姓名", null, "确定");
//                return false;
            }
           
            if (null == $('#nums').val().match(/^[0-9]*[1-9][0-9]*$/)) {
                alert("请输入正确的预定人数");return false;
                MDialog.alert(null, "请输入正确的预定人数", null, "确定");
                return false;
            }
			order_type=$(':radio[name="order_type"]:checked').val();
			if(order_type==1){
				//外卖的时候验证地址
				$address=$('#text').val();
				if($address==''){
					alert("请输入送货地址");
					return false;
				}
			}
	 
            var price = 0;
            for (var i = 0, ci; ci = window.res.data[i]; i++) {
                price += parseFloat(ci.price);
            }
            if(price  <= 0){
                alert("订单价格有误，请重新下单");return false;
            }
            var params = '[';
			for (var i = 0, ci; ci = window.res.data[i]; i++) {
				params += '{"dishes_id":' + ci.dishes_id + ','
				params += '"price":' + ci.price + ','
				params += '"description":"' + (ci.description || '') + '",'
				params += '"nums":' + ci.selected_count + '},'
			}
			params = params.replace(/,$/, "");
			params += ']';
			$("#params").val(params);
			MLoading.show('加载中');
            $.ajax({
                'url': $('#form_dish').attr('action'),
                'data': $('#form_dish').serialize(),
                'type': 'post',
				'dataType': 'json',
                'success': function(data) {
				    MLoading.hide();
					if(data.status==1){
						window.location = data.url;
					}else{
						alert(data.msg);
						return false;
					}
                }
            });
        });
    });

</script>
<script>
    $(document).ready(function(){
        $('#my_menu').click(function(){
            $("#mLoading").hide();
		});
		order_type=$(':radio[name="order_type"]:checked').val();
		if(order_type==3){
			$("#out").hide();
			$("#in").hide();
		}else if(order_type==2){
			$("#in").show();
			$("#out").hide();
		}else{
			$("#in").hide();
			$("#out").show();		
		}
    });
     $('.input_text').focus(function() {
        $("#footer_menu").css("display","none");
      });
    $('.input_text').blur(function() {
        $("#footer_menu").css("display","");
     });
</script>
 
</html>