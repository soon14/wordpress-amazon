<?php

/**
 * 微商城模块微站定义
 *
 * @author WeEngine Team
 * @url
 */
defined('IN_IA') or exit('Access Denied');

session_start();
include 'model.php';
include 'openauth.php';

class JuyoushaModuleSite extends OpenAuth {
  public $table_iptable = 'juyousha_iptable';
  public $table_event = 'quickshare_event';
  public $table_goods = 'juyousha_goods';


  public function doWebCategory() {
    global $_GPC, $_W;
    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
    if ($operation == 'display') {
      if (!empty($_GPC['displayorder'])) {
        foreach ($_GPC['displayorder'] as $id => $displayorder) {
          pdo_update('juyousha_category', array('displayorder' => $displayorder), array('id' => $id));
        }
        message('分类排序更新成功！', $this->createWebUrl('category', array('op' => 'display')), 'success');
      }
      $children = array();
      $category = pdo_fetchall("SELECT * FROM " . tablename('juyousha_category') . " WHERE weid = '{$_W['weid']}' ORDER BY parentid ASC, displayorder DESC");
      foreach ($category as $index => $row) {
        if (!empty($row['parentid'])) {
          $children[$row['parentid']][] = $row;
          unset($category[$index]);
        }
      }
      include $this->template('category');
    } elseif ($operation == 'post') {
      $parentid = intval($_GPC['parentid']);
      $id = intval($_GPC['id']);
      if (!empty($id)) {
        $category = pdo_fetch("SELECT * FROM " . tablename('juyousha_category') . " WHERE id = '$id'");
      } else {
        $category = array(
          'displayorder' => 0,
        );
      }
      if (!empty($parentid)) {
        $parent = pdo_fetch("SELECT id, name FROM " . tablename('juyousha_category') . " WHERE id = '$parentid'");
        if (empty($parent)) {
          message('抱歉，上级分类不存在或是已经被删除！', $this->createWebUrl('post'), 'error');
        }
      }
      if (checksubmit('submit')) {
        if (empty($_GPC['catename'])) {
          message('抱歉，请输入分类名称！');
        }
        $data = array(
          'weid' => $_W['weid'],
          'name' => $_GPC['catename'],
          'enabled' => intval($_GPC['enabled']),
          'displayorder' => intval($_GPC['displayorder']),
          'isrecommand' => intval($_GPC['isrecommand']),
          'description' => $_GPC['description'],
          'parentid' => intval($parentid),
        );
        if (!empty($_FILES['thumb']['tmp_name'])) {
          file_delete($_GPC['thumb_old']);
          $upload = file_upload($_FILES['thumb']);
          if (is_error($upload)) {
            message($upload['message'], '', 'error');
          }
          $data['thumb'] = $upload['path'];
        }

        if (!empty($id)) {
          unset($data['parentid']);
          pdo_update('juyousha_category', $data, array('id' => $id));
        } else {
          pdo_insert('juyousha_category', $data);
          $id = pdo_insertid();
        }
        message('更新分类成功！', $this->createWebUrl('category', array('op' => 'display')), 'success');
      }
      include $this->template('category');
    } elseif ($operation == 'delete') {
      $id = intval($_GPC['id']);
      $category = pdo_fetch("SELECT id, parentid FROM " . tablename('juyousha_category') . " WHERE id = '$id'");
      if (empty($category)) {
        message('抱歉，分类不存在或是已经被删除！', $this->createWebUrl('category', array('op' => 'display')), 'error');
      }
      pdo_delete('juyousha_category', array('id' => $id, 'parentid' => $id), 'OR');
      message('分类删除成功！', $this->createWebUrl('category', array('op' => 'display')), 'success');
    }
  }

  public function doWebSetGoodsProperty() {

    global $_GPC, $_W;
    $id = intval($_GPC['id']);
    $type = $_GPC['type'];
    $data = intval($_GPC['data']);
    empty($data) ? ($data = 1) : $data = 0;
    if (!in_array($type, array('new', 'hot', 'recommand', 'discount'))) {
      die(json_encode(array("result" => 0)));
    }
    pdo_update("juyousha_goods", array("is" . $type => $data), array("id" => $id, "weid" => $_W['weid']));
    die(json_encode(array("result" => 1, "data" => $data)));
  }

  public function doWebGoods() {
    global $_GPC, $_W;
    $category = pdo_fetchall("SELECT * FROM " . tablename('juyousha_category') . " WHERE weid = '{$_W['weid']}' ORDER BY parentid ASC, displayorder DESC", array(), 'id');
    if (!empty($category)) {
      $children = '';
      foreach ($category as $cid => $cate) {
        if (!empty($cate['parentid'])) {
          $children[$cate['parentid']][$cate['id']] = array($cate['id'], $cate['name']);
        }
      }
    }

    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
    if ($operation == 'post') {


      $id = intval($_GPC['id']);
      if (!empty($id)) {
        $item = pdo_fetch("SELECT * FROM " . tablename('juyousha_goods') . " WHERE id = :id", array(':id' => $id));
        if (empty($item)) {
          message('抱歉，商品不存在或是已经删除！', '', 'error');
        }
        $allspecs = pdo_fetchall("select * from " . tablename('juyousha_spec')." where goodsid=:id order by displayorder asc",array(":id"=>$id));
        foreach ($allspecs as &$s) {
          $s['items'] = pdo_fetchall("select * from " . tablename('juyousha_spec_item') . " where specid=:specid order by displayorder asc", array(":specid" => $s['id']));
        }
        unset($s);

        $params = pdo_fetchall("select * from " . tablename('juyousha_goods_param') . " where goodsid=:id order by displayorder asc", array(':id' => $id));
        $piclist = unserialize($item['thumb_url']);
        //处理规格项
        $html = "";
        $options = pdo_fetchall("select * from " . tablename('juyousha_goods_option') . " where goodsid=:id order by id asc", array(':id' => $id));

        //排序好的specs
        $specs = array();
        //找出数据库存储的排列顺序
        if (count($options) > 0) {
          $specitemids = explode("_", $options[0]['specs'] );
          foreach($specitemids as $itemid){
            foreach($allspecs as $ss){
              $items=  $ss['items'];
              foreach($items as $it){
                if($it['id']==$itemid){
                  $specs[] = $ss;
                  break;
                }
              }
            }
          }

          $html = '<table  class="tb spectable" style="border:1px solid #ccc;"><thead><tr>';

          $len = count($specs);
          $newlen = 1; //多少种组合
          $h = array(); //显示表格二维数组
          $rowspans = array(); //每个列的rowspan


          for ($i = 0; $i < $len; $i++) {
            //表头
            $html.="<th>" . $specs[$i]['title'] . "</th>";

            //计算多种组合
            $itemlen = count($specs[$i]['items']);
            if ($itemlen <= 0) {
              $itemlen = 1;
            }
            $newlen*=$itemlen;

            //初始化 二维数组
            $h = array();
            for ($j = 0; $j < $newlen; $j++) {
              $h[$i][$j] = array();
            }
            //计算rowspan
            $l = count($specs[$i]['items']);
            $rowspans[$i] = 1;
            for ($j = $i + 1; $j < $len; $j++) {
              $rowspans[$i]*= count($specs[$j]['items']);
            }
          }
          //   print_r($rowspans);exit();

          $html .= '<th><div class="input-append input-prepend"><span class="add-on">库存</span><input type="text" class="span1 option_stock_all"  VALUE=""/><span class="add-on"><a href="javascript:;" class="icon-hand-down" title="批量设置" onclick="setCol(\'option_stock\');"></a></span></div></th>';
          $html.= '<th><div class="input-append input-prepend"><span class="add-on">销售价格</span><input type="text" class="span1 option_marketprice_all"  VALUE=""/><span class="add-on"><a href="javascript:;" class="icon-hand-down" title="批量设置" onclick="setCol(\'option_marketprice\');"></a></span></div><br/></th>';
          $html.='<th><div class="input-append input-prepend"><span class="add-on">市场价格</span><input type="text" class="span1 option_productprice_all"  VALUE=""/><span class="add-on"><a href="javascript:;" class="icon-hand-down" title="批量设置" onclick="setCol(\'option_productprice\');"></a></span></div></th>';
          $html.='<th><div class="input-append input-prepend"><span class="add-on">成本价格</span><input type="text" class="span1 option_costprice_all"  VALUE=""/><span class="add-on"><a href="javascript:;" class="icon-hand-down" title="批量设置" onclick="setCol(\'option_costprice\');"></a></span></div></th>';
          $html.='<th><div class="input-append input-prepend"><span class="add-on">重量(克)</span><input type="text" class="span1 option_weight_all"  VALUE=""/><span class="add-on"><a href="javascript:;" class="icon-hand-down" title="批量设置" onclick="setCol(\'option_weight\');"></a></span></div></th>';
          $html.='</tr>';
          for($m=0;$m<$len;$m++){
            $k = 0;$kid = 0;$n=0;
            for($j=0;$j<$newlen;$j++){
              $rowspan = $rowspans[$m]; //9
              if( $j % $rowspan==0){
                $h[$m][$j]=array("html"=> "<td rowspan='".$rowspan."'>".$specs[$m]['items'][$kid]['title']."</td>","id"=>$specs[$m]['items'][$kid]['id']);
                // $k++; if($k>count($specs[$m]['items'])-1) { $k=0; }
              }
              else{
                $h[$m][$j]=array("html"=> "","id"=>$specs[$m]['items'][$kid]['id']);
              }
              $n++;
              if($n==$rowspan){
                $kid++; if($kid>count($specs[$m]['items'])-1) { $kid=0; }
                  $n=0;
              }
            }
          }

          $hh = "";
          for ($i = 0; $i < $newlen; $i++) {
            $hh.="<tr>";
            $ids = array();
            for ($j = 0; $j < $len; $j++) {
              $hh.=$h[$j][$i]['html'];
              $ids[] = $h[$j][$i]['id'];
            }
            $ids = implode("_", $ids);

            $val = array("id" => "","title"=>"", "stock" => "", "costprice" => "", "productprice" => "", "marketprice" => "", "weight" => "");
            foreach ($options as $o) {
              if ($ids === $o['specs']) {
                $val = array("id" => $o['id'],
                  "title"=>$o['title'],
                  "stock" => $o['stock'],
                  "costprice" => $o['costprice'],
                  "productprice" => $o['productprice'],
                  "marketprice" => $o['marketprice'],
                  "weight" => $o['weight']);
                break;
              }
            }

            $hh .= '<td>';
            $hh .= '<input name="option_stock_' . $ids . '[]"  type="text" class="span1 option_stock option_stock_' . $ids . '" value="' . $val['stock'] . '"/></td>';
            $hh .= '<input name="option_id_' . $ids . '[]"  type="hidden" class="span1 option_id option_id_' . $ids . '" value="' . $val['id'] . '"/>';
            $hh .= '<input name="option_ids[]"  type="hidden" class="span1 option_ids option_ids_' . $ids . '" value="' . $ids . '"/>';
            $hh .= '<input name="option_title_' . $ids . '[]"  type="hidden" class="span1 option_title option_title_' . $ids . '" value="' . $val['title'] . '"/>';
            $hh .= '</td>';
            $hh .= '<td><input name="option_marketprice_' . $ids . '[]" type="text" class="span1 option_marketprice option_marketprice_' . $ids . '" value="' . $val['marketprice'] . '"/></td>';
            $hh .= '<td><input name="option_productprice_' . $ids . '[]" type="text" class="span1 option_productprice option_productprice_' . $ids . '" " value="' . $val['productprice'] . '"/></td>';
            $hh .= '<td><input name="option_costprice_' . $ids . '[]" type="text" class="span1 option_costprice option_costprice_' . $ids . '" " value="' . $val['costprice'] . '"/></td>';
            $hh .= '<td><input name="option_weight_' . $ids . '[]" type="text" class="span1 option_weight option_weight_' . $ids . '" " value="' . $val['weight'] . '"/></td>';
            $hh .="</tr>";
          }
          $html.=$hh;
          $html.="</table>";
        }
      }
      if (empty($category)) {
        message('抱歉，请您先添加商品分类！', $this->createWebUrl('category', array('op' => 'post')), 'error');
      }
      if (checksubmit('submit')) {
        if (empty($_GPC['goodsname'])) {
          message('请输入商品名称！');
        }
        if (empty($_GPC['pcate'])) {
          message('请选择商品分类！');
        }
        $data = array(
          'weid' => intval($_W['weid']),
          'displayorder' => intval($_GPC['displayorder']),
          'title' => $_GPC['goodsname'],
          'pcate' => intval($_GPC['pcate']),
          'ccate' => intval($_GPC['ccate']),
          'type' => intval($_GPC['type']),
          'isrecommand' => intval($_GPC['isrecommand']),
          'ishot' => intval($_GPC['ishot']),
          'isnew' => intval($_GPC['isnew']),
          'isdiscount' => intval($_GPC['isdiscount']),
          'istime' => intval($_GPC['istime']),
          'timestart' => strtotime($_GPC['timestart']),
          'timeend' => strtotime($_GPC['timeend']),
          'description' => $_GPC['description'],
          'content' => htmlspecialchars_decode($_GPC['content']),
          'goodssn' => $_GPC['goodssn'],
          'unit' => $_GPC['unit'],
          'createtime' => TIMESTAMP,
          'total' => intval($_GPC['total']),
          'totalcnf' => intval($_GPC['totalcnf']),
          'marketprice' => $_GPC['marketprice'],
          'weight' => $_GPC['weight'],
          'costprice' => $_GPC['costprice'],
          'productprice' => $_GPC['productprice'],
          'productsn' => $_GPC['productsn'],
          'credit' => intval($_GPC['credit']),
          'maxbuy' => intval($_GPC['maxbuy']),
          'hasoption' => intval($_GPC['hasoption']),
          'sales' => intval($_GPC['sales']),
          'status' => intval($_GPC['status']),
          'timelinetitle' => $_GPC['timelinetitle'],
          'timelinedesc' => $_GPC['timelinedesc'],
          'timelinethumb' => $_GPC['timelinethumb'],
          'killdiscount' => $_GPC['killdiscount'],
          'killmindiscount' => $_GPC['killmindiscount'],
          'killtotaldiscount' => $_GPC['killtotaldiscount'],
          'killmaxtime' => intval($_GPC['killmaxtime']),
          'killenable' => intval($_GPC['killenable']),
        );
        if (!empty($_FILES['thumb']['tmp_name'])) {
          file_delete($_GPC['thumb_old']);
          $upload = file_upload($_FILES['thumb']);
          if (is_error($upload)) {
            message($upload['message'], '', 'error');
          }
          $data['thumb'] = $upload['path'];
        }
        if (!empty($_FILES['timelinethumb']['tmp_name'])) {
          file_delete($_GPC['timelinethumb_old']);
          $upload = file_upload($_FILES['timelinethumb']);
          if (is_error($upload)) {
            message($upload['message'], '', 'error');
          }
          $data['timelinethumb'] = $upload['path'];
        }


        $cur_index = 0;
        if (!empty($_GPC['attachment-new'])) {
          foreach ($_GPC['attachment-new'] as $index => $row) {
            if (empty($row)) {
              continue;
            }
            $hsdata[$index] = array(
              'attachment' => $_GPC['attachment-new'][$index],
            );
          }
          $cur_index = $index + 1;
        }
        if (!empty($_GPC['attachment'])) {
          foreach ($_GPC['attachment'] as $index => $row) {
            if (empty($row)) {
              continue;
            }
            $hsdata[$cur_index + $index] = array(
              'attachment' => $_GPC['attachment'][$index]
            );
          }
        }
        $data['thumb_url'] = serialize($hsdata);

        if (empty($id)) {
          pdo_insert('juyousha_goods', $data);
          $id = pdo_insertid();
        } else {
          unset($data['createtime']);
          pdo_update('juyousha_goods', $data, array('id' => $id));
        }


        $totalstocks = 0;

        //处理自定义参数    

        $param_ids = $_POST['param_id'];
        $param_titles = $_POST['param_title'];
        $param_values = $_POST['param_value'];
        $param_displayorders = $_POST['param_displayorder'];
        $len = count($param_ids);
        $paramids = array();
        for ($k = 0; $k < $len; $k++) {
          $param_id = "";
          $get_param_id = $param_ids[$k];
          $a = array(
            "title" => $param_titles[$k],
            "value" => $param_values[$k],
            "displayorder" => $k,
            "goodsid" => $id,
          );
          if (!is_numeric($get_param_id)) {
            pdo_insert("juyousha_goods_param", $a);
            $param_id = pdo_insertid();
          } else {
            pdo_update("juyousha_goods_param", $a, array('id' => $get_param_id));
            $param_id = $get_param_id;
          }
          $paramids[] = $param_id;
        }
        if (count($paramids) > 0) {
          pdo_query("delete from " . tablename('juyousha_goods_param') . " where goodsid=$id and id not in ( " . implode(',', $paramids) . ")");
        }
        else{
          pdo_query("delete from " . tablename('juyousha_goods_param') . " where goodsid=$id");
        }
        //                if ($totalstocks > 0) {
        //                    pdo_update("juyousha_goods", array("total" => $totalstocks), array("id" => $id));
        //                }
        //处理商品规格
        $files = $_FILES;
        $spec_ids = $_POST['spec_id'];
        $spec_titles = $_POST['spec_title'];

        $specids = array();
        $len = count($spec_ids);
        $specids = array();
        $spec_items = array();
        for ($k = 0; $k < $len; $k++) {
          $spec_id = "";
          $get_spec_id = $spec_ids[$k];
          $a = array(
            "weid" => $_W['weid'],
            "goodsid" => $id,
            "displayorder" => $k,
            "title" => $spec_titles[$get_spec_id]
          );
          if (is_numeric($get_spec_id)) {

            pdo_update("juyousha_spec", $a, array("id" => $get_spec_id));
            $spec_id = $get_spec_id;
          } else {
            pdo_insert("juyousha_spec", $a);
            $spec_id = pdo_insertid();
          }
          //子项
          $spec_item_ids = $_POST["spec_item_id_".$get_spec_id];
          $spec_item_titles = $_POST["spec_item_title_".$get_spec_id];
          $spec_item_shows = $_POST["spec_item_show_".$get_spec_id];

          $spec_item_oldthumbs = $_POST["spec_item_oldthumb_".$get_spec_id];
          $itemlen = count($spec_item_ids);
          $itemids = array();


          for ($n = 0; $n < $itemlen; $n++) {


            $item_id = "";
            $get_item_id = $spec_item_ids[$n];
            $d = array(
              "weid" => $_W['weid'],
              "specid" => $spec_id,
              "displayorder" => $n,
              "title" => $spec_item_titles[$n],
              "show" => $spec_item_shows[$n]
            );
            $f = "spec_item_thumb_" . $get_item_id;
            $old = $spec_item_oldthumbs[$k];
            if (!empty($files[$f]['tmp_name'])) {
              $upload = file_upload($files[$f]);
              if (is_error($upload)) {
                message($upload['message'], '', 'error');
              }
              $d['thumb'] = $upload['path'];
            } else if (!empty($old)) {
              $d['thumb'] = $old;
            }


            if (is_numeric($get_item_id)) {
              pdo_update("juyousha_spec_item", $d, array("id" => $get_item_id));
              $item_id = $get_item_id;
            } else {
              pdo_insert("juyousha_spec_item", $d);
              $item_id = pdo_insertid();
            }
            $itemids[] = $item_id;

            //临时记录，用于保存规格项
            $d['get_id'] = $get_item_id;
            $d['id']= $item_id;
            $spec_items[] = $d;
          }
          //删除其他的
          if(count($itemids)>0){
            pdo_query("delete from " . tablename('juyousha_spec_item') . " where weid={$_W['weid']} and specid=$spec_id and id not in (" . implode(",", $itemids) . ")");    
          }
          else{
            pdo_query("delete from " . tablename('juyousha_spec_item') . " where weid={$_W['weid']} and specid=$spec_id");    
          }

          //更新规格项id
          pdo_update("juyousha_spec", array("content" => serialize($itemids)), array("id" => $spec_id));

          $specids[] = $spec_id;
        }

        //删除其他的
        if( count($specids)>0){
          pdo_query("delete from " . tablename('juyousha_spec') . " where weid={$_W['weid']} and goodsid=$id and id not in (" . implode(",", $specids) . ")");
        }
        else{
          pdo_query("delete from " . tablename('juyousha_spec') . " where weid={$_W['weid']} and goodsid=$id");
        }


        //保存规格

        $option_idss = $_POST['option_ids'];
        $option_productprices = $_POST['option_productprice'];
        $option_marketprices = $_POST['option_marketprice'];
        $option_costprices = $_POST['option_costprice'];
        $option_stocks = $_POST['option_stock'];
        $option_weights = $_POST['option_weight'];
        $len = count($option_idss);
        $optionids = array();
        for ($k = 0; $k < $len; $k++) {
          $option_id = "";
          $get_option_id = $_GPC['option_id_' . $ids][0];

          $ids = $option_idss[$k]; $idsarr = explode("_",$ids);
          $newids = array();
          foreach($idsarr as $key=>$ida){
            foreach($spec_items as $it){
              if($it['get_id']==$ida){
                $newids[] = $it['id'];
                break;
              }
            }
          }
          $newids = implode("_",$newids);

          $a = array(
            "title" => $_GPC['option_title_' . $ids][0],
            "thumb" => $_GPC['option_thumb_' . $ids][0],
            "productprice" => $_GPC['option_productprice_' . $ids][0],
            "costprice" => $_GPC['option_costprice_' . $ids][0],
            "marketprice" => $_GPC['option_marketprice_' . $ids][0],
            "stock" => $_GPC['option_stock_' . $ids][0],
            "weight" => $_GPC['option_weight_' . $ids][0],
            "goodsid" => $id,
            "specs" => $newids
          );

          $totalstocks+=$a['stock'];

          if (empty($get_option_id)) {
            pdo_insert("juyousha_goods_option", $a);
            $option_id = pdo_insertid();
          } else {
            pdo_update("juyousha_goods_option", $a, array('id' => $get_option_id));
            $option_id = $get_option_id;
          }
          $optionids[] = $option_id;
        }
        if (count($optionids) > 0) {
          pdo_query("delete from " . tablename('juyousha_goods_option') . " where goodsid=$id and id not in ( " . implode(',', $optionids) . ")");
        }
        else{
          pdo_query("delete from " . tablename('juyousha_goods_option') . " where goodsid=$id");
        }


        //总库存
        if ($totalstocks > 0) {
          pdo_update("juyousha_goods", array("total" => $totalstocks), array("id" => $id));
        }
        //message('商品更新成功！', $this->createWebUrl('goods', array('op' => 'display')), 'success');
        message('商品更新成功！', $this->createWebUrl('goods', array('op' => 'post', 'id' => $id)), 'success');
      }
    } elseif ($operation == 'display') {
      $pindex = max(1, intval($_GPC['page']));
      $psize = 20;
      $condition = '';
      if (!empty($_GPC['keyword'])) {
        $condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
      }

      if (!empty($_GPC['cate_2'])) {
        $cid = intval($_GPC['cate_2']);
        $condition .= " AND ccate = '{$cid}'";
      } elseif (!empty($_GPC['cate_1'])) {
        $cid = intval($_GPC['cate_1']);
        $condition .= " AND pcate = '{$cid}'";
      }

      if (isset($_GPC['status'])) {
        $condition .= " AND status = '" . intval($_GPC['status']) . "'";
      }

      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}' and deleted=0 $condition ORDER BY status DESC, displayorder DESC, id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
      $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0 $condition");
      $pager = pagination($total, $pindex, $psize);
    } elseif ($operation == 'delete') {
      $id = intval($_GPC['id']);
      $row = pdo_fetch("SELECT id, thumb FROM " . tablename('juyousha_goods') . " WHERE id = :id", array(':id' => $id));
      if (empty($row)) {
        message('抱歉，商品不存在或是已经被删除！');
      }
      //            if (!empty($row['thumb'])) {
      //                file_delete($row['thumb']);
      //            }
      //            pdo_delete('juyousha_goods', array('id' => $id));
      //修改成不直接删除，而设置deleted=1
      pdo_update("juyousha_goods", array("deleted" => 1), array('id' => $id));

      message('删除成功！', referer(), 'success');
    } elseif ($operation == 'productdelete') {
      $id = intval($_GPC['id']);
      pdo_delete('juyousha_product', array('id' => $id));
      message('删除成功！', '', 'success');
    }
    include $this->template('goods');
  }

  public function doWebOrder() {
    global $_W, $_GPC;
    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
    if ($operation == 'display') {
      $pindex = max(1, intval($_GPC['page']));
      $psize = 20;
      $status = !isset($_GPC['status']) ? 1 : $_GPC['status'];
      $sendtype = !isset($_GPC['sendtype']) ? 0 : $_GPC['sendtype'];
      $condition = '';
      if (!empty($_GPC['keyword'])) {
        $condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
      }

      if (!empty($_GPC['cate_2'])) {
        $cid = intval($_GPC['cate_2']);
        $condition .= " AND ccate = '{$cid}'";
      } elseif (!empty($_GPC['cate_1'])) {
        $cid = intval($_GPC['cate_1']);
        $condition .= " AND pcate = '{$cid}'";
      }

      if ($status != '-1') {
        $condition .= " AND status = '" . intval($status) . "'";
      }

      if (!empty($sendtype)) {
        $condition .= " AND sendtype = '" . intval($sendtype) . "' AND status != '3'";
      }

      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_order') . " WHERE weid = '{$_W['weid']}' $condition ORDER BY status ASC, createtime DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
      $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('juyousha_order') . " WHERE weid = '{$_W['weid']}' $condition");
      $pager = pagination($total, $pindex, $psize);
      if (!empty($list)) {
        foreach ($list as &$row) {
          !empty($row['addressid']) && $addressids[$row['addressid']] = $row['addressid'];
          $row['dispatch'] = pdo_fetch("SELECT * FROM " . tablename('juyousha_dispatch') . " WHERE id = :id", array(':id' => $row['dispatch']));
        }
        unset($row);
      }
      if (!empty($addressids)) {
        $address = pdo_fetchall("SELECT * FROM " . tablename('juyousha_address') . " WHERE id IN ('" . implode("','", $addressids) . "')", array(), 'id');
      }
    } elseif ($operation == 'detail') {
      $id = intval($_GPC['id']);
      $item = pdo_fetch("SELECT * FROM " . tablename('juyousha_order') . " WHERE id = :id", array(':id' => $id));
      if (empty($item)) {
        message("抱歉，订单不存在!", referer(), "error");
      }
      if (checksubmit('confirmsend')) {
        if (!empty($_GPC['isexpress']) && empty($_GPC['expresssn'])) {
          message('请输入快递单号！');
        }
        $item = pdo_fetch("SELECT transid FROM " . tablename('juyousha_order') . " WHERE id = :id", array(':id' => $id));
        if (!empty($item['transid'])) {
          $this->changeWechatSend($id, 1);
        }
        pdo_update('juyousha_order', array(
          'status' => 2,
          'remark' => $_GPC['remark'],
          'express' => $_GPC['express'],
          'expresscom' => $_GPC['expresscom'],
          'expresssn' => $_GPC['expresssn'],
        ), array('id' => $id));
        message('发货操作成功！', referer(), 'success');
      }
      if (checksubmit('cancelsend')) {
        $item = pdo_fetch("SELECT transid FROM " . tablename('juyousha_order') . " WHERE id = :id", array(':id' => $id));
        if (!empty($item['transid'])) {
          $this->changeWechatSend($id, 0, $_GPC['cancelreson']);
        }
        pdo_update('juyousha_order', array(
          'status' => 1,
          'remark' => $_GPC['remark'],
        ), array('id' => $id));
        message('取消发货操作成功！', referer(), 'success');
      }
      if (checksubmit('finish')) {
        pdo_update('juyousha_order', array('status' => 3, 'remark' => $_GPC['remark']), array('id' => $id));
        message('订单操作成功！', referer(), 'success');
      }
      //            if (checksubmit('cancel')) {
      //                pdo_update('juyousha_order', array('status' => 1, 'remark' => $_GPC['remark']), array('id' => $id));
      //                message('取消完成订单操作成功！', referer(), 'success');
      //            }
      if (checksubmit('cancelpay')) {
        pdo_update('juyousha_order', array('status' => 0, 'remark' => $_GPC['remark']), array('id' => $id));

        //设置库存
        $this->setOrderStock($id, false);
        //减少积分
        $this->setOrderCredit($orderid, false);

        message('取消订单付款操作成功！', referer(), 'success');
      }
      if (checksubmit('confrimpay')) {
        pdo_update('juyousha_order', array('status' => 1, 'paytype' => 2, 'remark' => $_GPC['remark']), array('id' => $id));

        //设置库存
        $this->setOrderStock($id);
        //增加积分
        $this->setOrderCredit($orderid);

        message('确认订单付款操作成功！', referer(), 'success');
      }
      if (checksubmit('close')) {
        $item = pdo_fetch("SELECT transid FROM " . tablename('juyousha_order') . " WHERE id = :id", array(':id' => $id));
        if (!empty($item['transid'])) {
          $this->changeWechatSend($id, 0, $_GPC['reson']);
        }
        pdo_update('juyousha_order', array('status' => -1, 'remark' => $_GPC['remark']), array('id' => $id));
        message('订单关闭操作成功！', referer(), 'success');
      }
      if (checksubmit('open')) {
        pdo_update('juyousha_order', array('status' => 0, 'remark' => $_GPC['remark']), array('id' => $id));
        message('开启订单操作成功！', referer(), 'success');
      }
      if (checksubmit('changeprice')) {
        pdo_update('juyousha_order', array('price' => floatval($_GPC['newprice'])), array('id' => $id));
        message('改价成功！', referer(), 'success');
      }

      $dispatch = pdo_fetch("SELECT * FROM " . tablename('juyousha_dispatch') . " WHERE id = :id", array(':id' => $item['dispatch']));
      if (!empty($dispatch) && !empty($dispatch['express'])) {
        $express = pdo_fetch("select * from " . tablename('juyousha_express') . " WHERE id=:id limit 1", array(":id" => $dispatch['express']));
      }
      $item['user'] = pdo_fetch("SELECT * FROM " . tablename('juyousha_address') . " WHERE id = {$item['addressid']}");
      $goods = pdo_fetchall("SELECT g.id, g.title, g.status,g.thumb, g.unit, g.marketprice,o.total,g.type, o.optionname,o.optionid, s.thumb, o.price as orderprice FROM " . tablename('juyousha_order_goods') . " o left join " . tablename('juyousha_goods') . " g on o.goodsid=g.id left join " . tablename('juyousha_spec_item') . " s on o.optionid = s.id"
        . " WHERE o.orderid='{$id}'");
      $item['goods'] = $goods;
    }
    include $this->template('order');
  }

  //设置订单商品的库存 minus  true 减少  false 增加
  private function setOrderStock($id = '', $minus = true) {

    $goods = pdo_fetchall("SELECT g.id, g.title, g.thumb, g.unit, g.marketprice,g.total as goodstotal,o.total,o.optionid,g.sales FROM " . tablename('juyousha_order_goods') . " o left join " . tablename('juyousha_goods') . " g on o.goodsid=g.id "
      . " WHERE o.orderid='{$id}'");
    foreach ($goods as $item) {
      if ($minus) {
        //属性
        if (!empty($item['optionid'])) {
          pdo_query("update " . tablename('juyousha_goods_option') . " set stock=stock-:stock where id=:id", array(":stock" => $item['total'], ":id" => $item['optionid']));
        }
        $data = array();
        if (!empty($item['goodstotal']) && $item['goodstotal'] != -1) {
          $data['total'] = $item['goodstotal'] - $item['total'];
        }
        $data['sales'] = $item['sales'] + $item['total'];
        pdo_update('juyousha_goods', $data, array('id' => $item['id']));
      } else {
        //属性
        if (!empty($item['optionid'])) {
          pdo_query("update " . tablename('juyousha_goods_option') . " set stock=stock+:stock where id=:id", array(":stock" => $item['total'], ":id" => $item['optionid']));
        }
        $data = array();
        if (!empty($item['goodstotal']) && $item['goodstotal'] != -1) {
          $data['total'] = $item['goodstotal'] + $item['total'];
        }
        $data['sales'] = $item['sales'] - $item['total'];
        pdo_update('juyousha_goods', $data, array('id' => $item['id']));
      }
    }
  }

  public function doWebNotice() {
    global $_GPC, $_W;

    $operation = empty($_GPC['op']) ? 'display' : $_GPC['op'];
    $operation = in_array($operation, array('display')) ? $operation : 'display';

    $pindex = max(1, intval($_GPC['page']));
    $psize = 50;

    $starttime = empty($_GPC['starttime']) ? strtotime('-1 month') : strtotime($_GPC['starttime']);
    $endtime = empty($_GPC['endtime']) ? TIMESTAMP : strtotime($_GPC['endtime']) + 86399;

    $where .= " WHERE `weid` = :weid AND `createtime` >= :starttime AND `createtime` < :endtime";
    $paras = array(
      ':weid' => $_W['weid'],
      ':starttime' => $starttime,
      ':endtime' => $endtime
    );
    $keyword = $_GPC['keyword'];
    if (!empty($keyword)) {
      $where .= " AND `feedbackid`=:feedbackid";
      $paras[':feedbackid'] = $keyword;
    }

    $type = empty($_GPC['type']) ? 0 : $_GPC['type'];
    $type = intval($type);
    if ($type != 0) {
      $where .= " AND `type`=:type";
      $paras[':type'] = $type;
    }
    $status = empty($_GPC['status']) ? 0 : intval($_GPC['status']);
    $status = intval($status);
    if ($status != -1) {
      $where .= " AND `status` = :status";
      $paras[':status'] = $status;
    }

    $total = pdo_fetchcolumn("SELECT COUNT(*) FROM " . tablename('juyousha_feedback') . $where, $paras);
    $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_feedback') . $where . " ORDER BY id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize, $paras);
    $pager = pagination($total, $pindex, $psize);

    $transids = array();
    foreach ($list as $row) {
      $transids[] = $row['transid'];
    }
    if (!empty($transids)) {
      $sql = "SELECT * FROM " . tablename('juyousha_order') . " WHERE weid='{$_W['weid']}' AND transid IN ( '" . implode("','", $transids) . "' )";
      $orders = pdo_fetchall($sql, array(), 'transid');
    }
    $addressids = array();
    if (!empty($orders)) {
      foreach ($orders as $transid => $order) {
        $addressids[] = $order['addressid'];
      }
    }
    $addresses = array();
    if (!empty($addressids)) {
      $sql = "SELECT * FROM " . tablename('juyousha_address') . " WHERE weid='{$_W['weid']}' AND id IN ( '" . implode("','", $addressids) . "' )";
      $addresses = pdo_fetchall($sql, array(), 'id');
    }

    foreach ($list as &$feedback) {
      $transid = $feedback['transid'];
      $order = $orders[$transid];
      $feedback['order'] = $order;
      $addressid = $order['addressid'];
      $feedback['address'] = $addresses[$addressid];
    }

    include $this->template('notice');
  }

  public function getCartTotal() {
    global $_W;
    $cartotal = pdo_fetchcolumn("select sum(total) from " . tablename('juyousha_cart') . " where weid = '{$_W['weid']}' and from_user='{$_W['fans']['from_user']}'");
    return empty($cartotal) ? 0 : $cartotal;
  }

  private function getFeedbackType($type) {
    $types = array(1 => '维权', 2 => '告警');
    return $types[intval($type)];
  }

  private function getFeedbackStatus($status) {
    $statuses = array('未解决', '用户同意', '用户拒绝');
    return $statuses[intval($status)];
  }

  public function doMobilelist() {
    global $_GPC, $_W;
    // $cart = $this->getCartGoods();
    $pindex = max(1, intval($_GPC['page']));
    $psize = 4;
    $condition = '';
    if (!empty($_GPC['ccate'])) {
      $cid = intval($_GPC['ccate']);
      $condition .= " AND ccate = '{$cid}'";
      $_GPC['pcate'] = pdo_fetchcolumn("SELECT parentid FROM " . tablename('juyousha_category') . " WHERE id = :id", array(':id' => intval($_GPC['ccate'])));
    } elseif (!empty($_GPC['pcate'])) {
      $cid = intval($_GPC['pcate']);
      $condition .= " AND pcate = '{$cid}'";
    }
    if (!empty($_GPC['keyword'])) {
      $condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
    }
    $children = array();
    $category = pdo_fetchall("SELECT * FROM " . tablename('juyousha_category') . " WHERE weid = '{$_W['weid']}' and enabled=1 ORDER BY parentid ASC, displayorder DESC", array(), 'id');
    foreach ($category as $index => $row) {
      if (!empty($row['parentid'])) {
        $children[$row['parentid']][$row['id']] = $row;
        unset($category[$index]);
      }
    }
    $recommandcategory = array();
    foreach ($category as &$c) {
      if ($c['isrecommand'] == 1) {
        $c['list'] = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}' and deleted=0 AND status = '1'  and pcate='{$c['id']}'  ORDER BY displayorder DESC, sales DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
        $c['total'] = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0  AND status = '1' and pcate='{$c['id']}'");
        $c['pager'] = pagination($c['total'], $pindex, $psize, $url = '', $context = array('before' => 0, 'after' => 0, 'ajaxcallback' => ''));
        $recommandcategory[] = $c;
      }
      if (!empty($children[$c['id']])) {
        foreach ($children[$c['id']] as &$child) {
          if ($child['isrecommand'] == 1) {
            $child['list'] = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0 AND status = '1'  and pcate='{$c['id']}' and ccate='{$child['id']}'  ORDER BY displayorder DESC, sales DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
            $child['total'] = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0  AND status = '1' and pcate='{$c['id']}' and ccate='{$child['id']}' ");
            $child['pager'] = pagination($child['total'], $pindex, $psize, $url = '', $context = array('before' => 0, 'after' => 0, 'ajaxcallback' => ''));
            $recommandcategory[] = $child;
          }
        }
        unset($child);
      }
    }
    unset($c);
    $carttotal = $this->getCartTotal();

    //幻灯片
    $advs = pdo_fetchall("select * from " . tablename('juyousha_adv') . " where enabled=1 and weid= '{$_W['weid']}'  order by displayorder asc");
    foreach ($advs as &$adv) {
      if (substr($adv['link'], 0, 5) != 'http:') {
        $adv['link'] = "http://" . $adv['link'];
      }
    }
    unset($adv);

    //首页推荐
    $rpindex = max(1, intval($_GPC['rpage']));
    $rpsize = 6;
    $condition = ' and isrecommand=1';
    $rlist = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0 AND status = '1' $condition ORDER BY displayorder DESC, sales DESC LIMIT " . ($rpindex - 1) * $rpsize . ',' . $rpsize);

    // 送分排名
    $toplist = pdo_fetchall("SELECT realname, nickname, totaldiscount, from_user FROM (SELECT begger, SUM(discount) as totaldiscount FROM " . tablename('juyousha_iptable') . " WHERE weid='{$_W['weid']}'  GROUP BY begger ORDER BY totaldiscount DESC LIMIT 10) a LEFT JOIN " . tablename('fans') . " b ON a.begger=b.from_user WHERE b.weid={$_W['weid']}");

    include $this->template('list');
  }

  public function doMobilelistmore_rec() {
    global $_GPC, $_W;
    $pindex = max(1, intval($_GPC['page']));
    $psize = 6;
    $condition = ' and isrecommand=1 ';
    $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0 AND status = '1' $condition ORDER BY displayorder DESC, sales DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
    include $this->template('list_more');
  }

  public function doMobilelistmore() {
    global $_GPC, $_W;
    $pindex = max(1, intval($_GPC['page']));
    $psize = 6;
    $condition = '';
    if (!empty($_GPC['ccate'])) {
      $cid = intval($_GPC['ccate']);
      $condition .= " AND ccate = '{$cid}'";
      $_GPC['pcate'] = pdo_fetchcolumn("SELECT parentid FROM " . tablename('juyousha_category') . " WHERE id = :id", array(':id' => intval($_GPC['ccate'])));
    } elseif (!empty($_GPC['pcate'])) {
      $cid = intval($_GPC['pcate']);
      $condition .= " AND pcate = '{$cid}'";
    }
    $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}' AND status = '1' $condition ORDER BY displayorder DESC, sales DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
    include $this->template('list_more');
  }

  public function doMobilelist2() {

    global $_GPC, $_W;
    $pindex = max(1, intval($_GPC["page"]));
    $psize = 10;
    $condition = '';
    if (!empty($_GPC['ccate'])) {
      $cid = intval($_GPC['ccate']);
      $condition .= " AND ccate = '{$cid}'";
      $_GPC['pcate'] = pdo_fetchcolumn("SELECT parentid FROM " . tablename('juyousha_category') . " WHERE id = :id", array(':id' => intval($_GPC['ccate'])));
    } elseif (!empty($_GPC['pcate'])) {
      $cid = intval($_GPC['pcate']);
      $condition .= " AND pcate = '{$cid}'";
    }
    if (!empty($_GPC['keyword'])) {
      $condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
    }
    $sort = empty($_GPC['sort']) ? 0 : $_GPC['sort'];
    $sortfield = "displayorder asc";

    $sortb0 = empty($_GPC['sortb0']) ? "desc" : $_GPC['sortb0'];
    $sortb1 = empty($_GPC['sortb1']) ? "desc" : $_GPC['sortb1'];
    $sortb2 = empty($_GPC['sortb2']) ? "desc" : $_GPC['sortb2'];
    $sortb3 = empty($_GPC['sortb3']) ? "asc" : $_GPC['sortb3'];

    if ($sort == 0) {
      $sortb00 = $sortb0 == "desc" ? "asc" : "desc";
      $sortfield = "createtime " . $sortb0;
      $sortb11 = "desc";
      $sortb22 = "desc";
      $sortb33 = "asc";
    } else if ($sort == 1) {
      $sortb11 = $sortb1 == "desc" ? "asc" : "desc";
      $sortfield = "sales " . $sortb1;
      $sortb00 = "desc";
      $sortb22 = "desc";
      $sortb33 = "asc";
    } else if ($sort == 2) {
      $sortb22 = $sortb2 == "desc" ? "asc" : "desc";
      $sortfield = "viewcount " . $sortb2;
      $sortb00 = "desc";
      $sortb11 = "desc";
      $sortb33 = "asc";
    } else if ($sort == 3) {
      $sortb33 = $sortb3 == "asc" ? "desc" : "asc";
      $sortfield = "marketprice " . $sortb3;
      $sortb00 = "desc";
      $sortb11 = "desc";
      $sortb22 = "desc";
    }



    $sorturl = $this->createMobileUrl('list2', array("keyword" => $_GPC['keyword'], "pcate" => $_GPC['pcate'], "ccate" => $_GPC['ccate']));
    if (!empty($_GPC['isnew'])) {
      $condition .= " AND isnew = 1";
      $sorturl.="&isnew=1";
    }


    if (!empty($_GPC['ishot'])) {
      $condition .= " AND ishot = 1";
      $sorturl.="&ishot=1";
    }
    if (!empty($_GPC['isdiscount'])) {
      $condition .= " AND isdiscount = 1";
      $sorturl.="&isdiscount=1";
    }
    if (!empty($_GPC['istime'])) {
      $condition .= " AND istime = 1 and " . time() . ">=timestart and " . time() . "<=timeend";
      $sorturl.="&istime=1";
    }

    $children = array();



    $category = pdo_fetchall("SELECT * FROM " . tablename('juyousha_category') . " WHERE weid = '{$_W['weid']}' and enabled=1 ORDER BY parentid ASC, displayorder DESC", array(), 'id');
    foreach ($category as $index => $row) {
      if (!empty($row['parentid'])) {
        $children[$row['parentid']][$row['id']] = $row;
        unset($category[$index]);
      }
    }
    $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0 AND status = '1' $condition ORDER BY $sortfield LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
    foreach ($list as &$r) {
      if ($r['istime'] == 1) {
        $arr = $this->time_tran($r['timeend']);
        $r['timelaststr'] = $arr[0];
        $r['timelast'] = $arr[1];
      }
    }
    unset($r);


    $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('juyousha_goods') . " WHERE weid = '{$_W['weid']}'  and deleted=0  AND status = '1' $condition");
    $pager = pagination($total, $pindex, $psize, $url = '', $context = array('before' => 0, 'after' => 0, 'ajaxcallback' => ''));
    $carttotal = $this->getCartTotal();
    include $this->template('list2');
  }

  function time_tran($the_time) {

    $timediff = $the_time - time();
    $days = intval($timediff / 86400);
    if (strlen($days) <= 1) {
      $days = "0" . $days;
    }
    $remain = $timediff % 86400;
    $hours = intval($remain / 3600);
    ;
    if (strlen($hours) <= 1) {
      $hours = "0" . $hours;
    }
    $remain = $remain % 3600;
    $mins = intval($remain / 60);
    if (strlen($mins) <= 1) {
      $mins = "0" . $mins;
    }
    $secs = $remain % 60;
    if (strlen($secs) <= 1) {
      $secs = "0" . $secs;
    }
    $ret = "";
    if ($days > 0) {
      $ret.=$days . " 天 ";
    }
    if ($hours > 0) {
      $ret.=$hours . ":";
    }
    if ($mins > 0) {
      $ret.=$mins . ":";
    }

    $ret.=$secs;

    return array("倒计时 " . $ret, $timediff);
  }

  public function doMobileMyCart() {
    global $_W, $_GPC;
    $this->checkAuth();
    $op = $_GPC['op'];
    if ($op == 'add') {
      $goodsid = intval($_GPC['id']);
      $total = intval($_GPC['total']);
      $total = empty($total) ? 1 : $total;
      $optionid = intval($_GPC['optionid']);
      $goods = pdo_fetch("SELECT id, type, total,marketprice,maxbuy FROM " . tablename('juyousha_goods') . " WHERE id = :id", array(':id' => $goodsid));
      if (empty($goods)) {
        $result['message'] = '抱歉，该商品不存在或是已经被删除！';
        message($result, '', 'ajax');
      }
      $marketprice = $goods['marketprice'];
      if (!empty($optionid)) {
        $option = pdo_fetch("select marketprice from " . tablename('juyousha_goods_option') . " where id=:id limit 1", array(":id" => $optionid));
        if (!empty($option)) {
          $marketprice = $option['marketprice'];
        }
      }

      $row = pdo_fetch("SELECT id, total FROM " . tablename('juyousha_cart') . " WHERE from_user = :from_user AND weid = '{$_W['weid']}' AND goodsid = :goodsid  and optionid=:optionid", array(':from_user' => $_W['fans']['from_user'], ':goodsid' => $goodsid,':optionid'=>$optionid));
      if ($row == false) {
        //不存在
        $data = array(
          'weid' => $_W['weid'],
          'goodsid' => $goodsid,
          'goodstype' => $goods['type'],
          'marketprice' => $marketprice,
          'from_user' => $_W['fans']['from_user'],
          'total' => $total,
          'optionid' => $optionid
        );
        pdo_insert('juyousha_cart', $data);
      } else {
        //累加最多限制购买数量
        $t = $total + $row['total'];
        if (!empty($goods['maxbuy'])) {
          if ($t > $goods['maxbuy']) {
            $t = $goods['maxbuy'];
          }
        }
        //存在
        $data = array(
          'marketprice' => $marketprice,
          'total' => $t,
          'optionid' => $optionid
        );
        pdo_update('juyousha_cart', $data, array('id' => $row['id']));
      }

      //返回数据
      $carttotal = $this->getCartTotal();

      $result = array(
        'result' => 1,
        'total' => $carttotal
      );
      die(json_encode($result));
    } else if ($op == 'clear') {
      pdo_delete('juyousha_cart', array('from_user' => $_W['fans']['from_user'], 'weid' => $_W['weid']));
      die(json_encode(array("result" => 1)));
    } else if ($op == 'remove') {
      $id = intval($_GPC['id']);
      pdo_delete('juyousha_cart', array('from_user' => $_W['fans']['from_user'], 'weid' => $_W['weid'], 'id' => $id));
      die(json_encode(array("result" => 1, "cartid" => $id)));
    } else if ($op == 'update') {
      $id = intval($_GPC['id']);
      $num = intval($_GPC['num']);
      $sql = "update " . tablename('juyousha_cart') . " set total=$num where id=:id";
      pdo_query($sql, array(":id" => $id));
      die(json_encode(array("result" => 1)));
    } else {
      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_cart') . " WHERE  weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'");
      $totalprice = 0;
      if (!empty($list)) {
        foreach ($list as &$item) {
          $goods = pdo_fetch("SELECT  title, thumb, marketprice, unit, total,maxbuy FROM " . tablename('juyousha_goods') . " WHERE id=:id limit 1", array(":id" => $item['goodsid']));
          //属性
          $option = pdo_fetch("select title,marketprice,stock from " . tablename("juyousha_goods_option") . " where id=:id limit 1", array(":id" => $item['optionid']));
          if ($option) {
            $goods['title'] = $goods['title'];
            $goods['optionname'] = $option['title'];
            $goods['marketprice'] = $option['marketprice'];
            $goods['total'] = $option['stock'];
          }
          $item['goods'] = $goods;
          $item['totalprice'] = (floatval($goods['marketprice']) * intval($item['total']));
          $totalprice += $item['totalprice'];
        }
        unset($item);
      }
      include $this->template('cart');
    }
  }

  public function doMobileConfirm() {
    global $_W, $_GPC;
    $this->checkAuth();

    $totalprice = 0;
    $allgoods = array();

    $id = intval($_GPC['id']);
    $optionid = intval($_GPC['optionid']);
    $total = intval($_GPC['total']);
    if (empty($total)) {
      $total = 1;
    }
    $direct = false; //是否是直接购买
    $returnurl = ""; //当前连接

    if (!empty($id)) {
      // 有id则表示直接购买，不是从购物车购买
      $item = pdo_fetch("select id,thumb,title,weight,marketprice,total,type,totalcnf,sales,unit,istime,timeend from " . tablename("juyousha_goods") . " where id=:id limit 1", array(":id" => $id));

      if ($item['istime'] == 1) {
        if (time() > $item['timeend']) {
          message('抱歉，商品限购时间已到，无法购买了！', referer(), "error");
        }
      }

      if (!empty($optionid)) {
        $option = pdo_fetch("select title,marketprice,weight,stock from " . tablename("juyousha_goods_option") . " where id=:id limit 1", array(":id" => $optionid));
        if ($option) {
          $item['optionid'] = $optionid;
          $item['title'] = $item['title'];
          $item['optionname'] = $option['title'];
          $item['marketprice'] = $option['marketprice'];
          $item['weight'] = $option['weight'];
        }
      }
      $item['stock'] = $item['total'];
      $item['total'] = $total;
      $item['totalprice'] = $total * $item['marketprice'];
      $allgoods[] = $item;
      $totalprice+= $item['totalprice'];
      if ($item['type'] == 1) {
        $needdispatch = true;
      }
      $direct = true;
      $returnurl = $this->createMobileUrl("confirm", array("id" => $id, "optionid" => $optionid, "total" => $total));
    }
    if (!$direct) {
      //如果不是直接购买（从购物车购买）
      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_cart') . " WHERE  weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'");
      if (!empty($list)) {
        foreach ($list as &$g) {
          $item = pdo_fetch("select id,thumb,title,weight,marketprice,total,type,totalcnf,sales,unit from " . tablename("juyousha_goods") . " where id=:id limit 1", array(":id" => $g['goodsid']));
          //属性
          $option = pdo_fetch("select title,marketprice,weight,stock from " . tablename("juyousha_goods_option") . " where id=:id limit 1", array(":id" => $g['optionid']));
          if ($option) {
            $item['optionid'] = $g['optionid'];
            $item['title'] = $item['title'];
            $item['optionname'] = $option['title'];
            $item['marketprice'] = $option['marketprice'];
            $item['weight'] = $option['weight'];
          }
          $item['stock'] = $item['total'];
          $item['total'] = $g['total'];
          $item['totalprice'] = $g['total'] * $item['marketprice'];
          $allgoods[] = $item;
          $totalprice+= $item['totalprice'];
          if ($item['type'] == 1) {
            $needdispatch = true;
          }
        }
        unset($g);
      }
      $returnurl = $this->createMobileUrl("confirm");
    }

    if (count($allgoods) <= 0) {
      header("location: " . $this->createMobileUrl('myorder'));
      exit();
    }
    //配送方式
    $dispatch = pdo_fetchall("select id,dispatchname,firstprice,firstweight,secondprice,secondweight from " . tablename("juyousha_dispatch") . " WHERE weid = {$_W['weid']} order by displayorder desc");
    foreach ($dispatch as &$d) {

      $weight = 0;

      foreach ($allgoods as $g) {
        $weight+=$g['weight'] * $g['total'];
      }

      $price = 0;
      if ($weight <= $d['firstweight']) {
        $price = $d['firstprice'];
      } else {
        $price = $d['firstprice'];
        $secondweight = $weight - $d['firstweight'];
        if ($secondweight % $d['secondweight'] == 0) {
          $price+= (int) ( $secondweight / $d['secondweight'] ) * $d['secondprice'];
        } else {
          $price+= (int) ( $secondweight / $d['secondweight'] + 1 ) * $d['secondprice'];
        }
      }
      $d['price'] = $price;
    }
    unset($d);

    if (checksubmit('submit')) {
      $address = pdo_fetch("SELECT * FROM " . tablename('juyousha_address') . " WHERE id = :id", array(':id' => intval($_GPC['address'])));
      if (empty($address)) {
        message('抱歉，请您填写收货地址！');
      }
      //商品价格
      $goodsprice = 0;
      foreach ($allgoods as $row) {
        if ($item['stock'] != -1 && $row['total'] > $item['stock']) {
          message('抱歉，“' . $row['title'] . '”此商品库存不足！', $this->createMobileUrl('confirm'), 'error');
        }
        $goodsprice+= $row['totalprice'];
      }
      //运费
      $dispatchid = intval($_GPC['dispatch']);
      $dispatchprice = 0;
      foreach ($dispatch as $d) {
        if ($d['id'] == $dispatchid) {
          $dispatchprice = $d['price'];
        }
      }
      $data = array(
        'weid' => $_W['weid'],
        'from_user' => $_W['fans']['from_user'],
        'ordersn' => date('md') . random(4, 1),
        'price' => $goodsprice + $dispatchprice,
        'dispatchprice' => $dispatchprice,
        'goodsprice' => $goodsprice,
        'status' => 0,
        'sendtype' => intval($_GPC['sendtype']),
        'dispatch' => $dispatchid,
        'paytype' => '2',
        'goodstype' => intval($cart['type']),
        'remark' => $_GPC['remark'],
        'addressid' => $address['id'],
        'createtime' => TIMESTAMP,
      );
      pdo_insert('juyousha_order', $data);
      $orderid = pdo_insertid();
      //插入订单商品
      foreach ($allgoods as $row) {
        if (empty($row)) {
          continue;
        }
        $d = array(
          'weid' => $_W['weid'],
          'goodsid' => $row['id'],
          'orderid' => $orderid,
          'total' => $row['total'],
          'price' => $row['marketprice'],
          'createtime' => TIMESTAMP,
          'optionid' => $row['optionid']
        );
        $o = pdo_fetch("select title from ".tablename('juyousha_goods_option')." where id=:id limit 1",array(":id"=>$row['optionid']));
        if(!empty($o)){
          $d['optionname'] = $o['title'];
        }
        pdo_insert('juyousha_order_goods', $d);
      }
      //清空购物车
      if (!$direct) {
        pdo_delete("juyousha_cart", array("weid" => $_W['weid'], "from_user" => $_W['fans']['from_user']));
      }
      //$this->setCartGoods(array());
      //变更商品库存
      $this->setOrderStock($orderid);

      //
      //  message('提交订单成功，现在跳转至付款页面...', $this->createMobileUrl('pay', array('orderid' => $orderid)), 'success');

      die("<script>alert('提交订单成功,现在跳转到付款页面...');location.href='" . $this->createMobileUrl('pay', array('orderid' => $orderid)) . "';</script>");
    }
    $carttotal = $this->getCartTotal();
    $profile = fans_search($_W['fans']['from_user'], array('resideprovince', 'residecity', 'residedist', 'address', 'realname', 'mobile'));
    $row = pdo_fetch("SELECT * FROM " . tablename('juyousha_address') . " WHERE isdefault = 1 and openid = :openid limit 1", array(':openid' => $_W['fans']['from_user']));


    $allgoods_id = array();
    foreach($allgoods as $g) {
      $allgoods_id[] = $g['id'];
    }
    $totaldiscount = $this->getDiscountByGoodsIds($allgoods_id, $_W['fans']['from_user']);
    include $this->template('confirm');
  }

  //设置订单积分
  public function setOrderCredit($orderid, $add = true) {
    $order = pdo_fetch("SELECT * FROM " . tablename('juyousha_order') . " WHERE id = :id limit 1", array(':id' => $orderid));
    if (empty($order)) {
      return;
    }
    $ordergoods = pdo_fetchall("SELECT goodsid, total FROM " . tablename('juyousha_order_goods') . " WHERE orderid = '{$orderid}'", array(), 'goodsid');
    if (!empty($ordergoods)) {
      $goods = pdo_fetchall("SELECT id, title, thumb, marketprice, unit, total,credit FROM " . tablename('juyousha_goods') . " WHERE id IN ('" . implode("','", array_keys($ordergoods)) . "')");
    }

    //增加积分
    if (!empty($goods)) {

      $credits = 0;
      foreach ($goods as $g) {
        $credits+=$g['credit'];
      }
      $fans = fans_search($order['from_user'], array("credit1"));
      if (!empty($fans)) {
        if ($add) {
          $new_credit = $credits + $fans['credit1'];
        } else {
          $new_credit = $fans['credit1'] - $credits;
          if ($new_credit <= 0) {
            $new_credit = 0;
          }
        }

        fans_update($order['from_user'], array("credit1" => $new_credit));
      }
    }
  }

  public function doMobilePay() {
    global $_W, $_GPC;
    $this->checkAuth();
    $orderid = intval($_GPC['orderid']);
    $order = pdo_fetch("SELECT * FROM " . tablename('juyousha_order') . " WHERE id = :id", array(':id' => $orderid));
    if ($order['status'] != '0') {
      message('抱歉，您的订单已经付款或是被关闭，请重新进入付款！', $this->createMobileUrl('myorder'), 'error');
    }
    if (checksubmit('codsubmit')) {

      $ordergoods = pdo_fetchall("SELECT goodsid, total,optionid FROM " . tablename('juyousha_order_goods') . " WHERE orderid = '{$orderid}'", array(), 'goodsid');
      if (!empty($ordergoods)) {
        $goods = pdo_fetchall("SELECT id, title, thumb, marketprice, unit, total,credit FROM " . tablename('juyousha_goods') . " WHERE id IN ('" . implode("','", array_keys($ordergoods)) . "')");
      }

      //邮件提醒
      if (!empty($this->module['config']['noticeemail'])) {

        $address = pdo_fetch("SELECT * FROM " . tablename('juyousha_address') . " WHERE id = :id", array(':id' => $order['addressid']));

        $body = "<h3>购买商品清单</h3> <br />";

        if (!empty($goods)) {
          foreach ($goods as $row) {

            //属性
            $option = pdo_fetch("select s.title as title,s.thumb as thumb, marketprice,weight,stock from " . tablename("juyousha_goods_option") . " o  left join " .
              tablename('juyousha_spec_item') . " s ON s.id=o.id where o.id=:id limit 1"
              , array(":id" => $ordergoods[$row['id']]['optionid']));
            if ($option) {
              $row['title'] = "[" . $option['title'] . "]" . $row['title'];
            }
            $body .= "名称：{$row['title']} ，数量：{$ordergoods[$row['id']]['total']} <br />";
            $body .= "<img width='100px' src='" . $_W['attachurl'] . $option['thumb'] . "'/><br />";
          }
        }
        $body .= "<br />总金额：{$order['price']}元 （已付款）<br />";
        $body .= "<h3>购买用户详情</h3> <br />";
        $body .= "真实姓名：$address[realname] <br />";
        $body .= "地区：$address[province] - $address[city] - $address[area]<br />";
        $body .= "详细地址：$address[address] <br />";
        $body .= "手机：$address[mobile] <br />";

        ihttp_email($this->module['config']['noticeemail'], '微商城订单提醒', $body);
      }
      $discount = $this->getDiscountByOrder($order['id'], $order['from_user']);
      pdo_update('juyousha_order', array('status' => '1', 'paytype' => '3', 'discount'=> $discount), array('id' => $orderid));


      //增加积分
      $this->setOrderCredit($orderid);

      message('订单提交成功，请您收到货时付款！', $this->createMobileUrl('myorder'), 'success');
    }

    if (checksubmit()) {
      if ($order['paytype'] == 1 && $_W['fans']['credit2'] < $order['price']) {
        message('抱歉，您帐户的余额不够支付该订单，请充值！', create_url('mobile/module/charge', array('name' => 'member', 'weid' => $_W['weid'])), 'error');
      }
      if ($order['price'] == '0') {
        $this->payResult(array('tid' => $orderid, 'from' => 'return', 'type' => 'credit2', 'user' => $order['from_user']));
        exit;
      }
    }
    $discount = $this->getDiscountByOrder($order['id'], $order['from_user']);
    $params['tid'] = $orderid;
    $params['user'] = $order['from_user'];
    $params['fee'] = $order['price'] - $discount;
    $params['origin_fee'] = $order['price'];
    $params['discount'] = $discount;
    $params['title'] = $_W['account']['name'];
    $params['ordersn'] = $order['ordersn'];
    $params['virtual'] = $order['goodstype'] == 2 ? true : false;
    include $this->template('pay');
  }

  public function doMobileContactUs() {
    global $_W;
    $cfg = $this->module['config'];

    include $this->template('contactus');
  }

  public function doMobileMyOrder() {
    global $_W, $_GPC;
    $this->checkAuth();
    $op = $_GPC['op'];
    if ($op == 'confirm') {
      $orderid = intval($_GPC['orderid']);
      $order = pdo_fetch("SELECT * FROM " . tablename('juyousha_order') . " WHERE id = :id AND from_user = :from_user", array(':id' => $orderid, ':from_user' => $_W['fans']['from_user']));
      if (empty($order)) {
        message('抱歉，您的订单不存或是已经被取消！', $this->createMobileUrl('myorder'), 'error');
      }
      $discount = $this->setDiscountGivenByOrder($orderid, $_W['fans']['from_user']);
      pdo_update('juyousha_order', array('status' => 3), array('id' => $orderid, 'from_user' => $_W['fans']['from_user']));

      message('确认收货完成！', $this->createMobileUrl('myorder'), 'success');
    } else if ($op == 'detail') {

      $orderid = intval($_GPC['orderid']);
      $item = pdo_fetch("SELECT * FROM " . tablename('juyousha_order') . " WHERE weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}' and id='{$orderid}' limit 1");
      if (empty($item)) {
        message('抱歉，您的订单不存或是已经被取消！', $this->createMobileUrl('myorder'), 'error');
      }
      $goodsid = pdo_fetchall("SELECT goodsid,total FROM " . tablename('juyousha_order_goods') . " WHERE orderid = '{$orderid}'", array(), 'goodsid');

      $goods = pdo_fetchall("SELECT g.id, g.title, g.thumb, g.unit, g.marketprice,o.total,o.optionid FROM " . tablename('juyousha_order_goods') . " o left join " . tablename('juyousha_goods') . " g on o.goodsid=g.id "
        . " WHERE o.orderid='{$orderid}'");
      foreach ($goods as &$g) {
        //属性
        $option = pdo_fetch("select title,marketprice,weight,stock from " . tablename("juyousha_goods_option") . " where id=:id limit 1", array(":id" => $g['optionid']));
        if ($option) {
          $g['title'] = "[" . $option['title'] . "]" . $g['title'];
          $g['marketprice'] = $option['marketprice'];
        }
      }
      unset($g);


      $dispatch = pdo_fetch("select id,dispatchname from " . tablename('juyousha_dispatch') . " where id=:id limit 1", array(":id" => $item['dispatch']));
      include $this->template('order_detail');
    } else {
      $pindex = max(1, intval($_GPC['page']));
      $psize = 20;

      $status = intval($_GPC['status']);
      $where = " weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'";
      ;
      if ($status == 2) {
        $where.=" and ( status=1 or status=2 )";
      } else {
        $where.=" and status=$status";
      }

      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_order') . " WHERE $where ORDER BY id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize, array(), 'id');
      $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('juyousha_order') . " WHERE weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'");
      $pager = pagination($total, $pindex, $psize);

      if (!empty($list)) {
        foreach ($list as &$row) {
          $goods = pdo_fetchall("SELECT g.id, g.title, g.thumb, g.unit, g.marketprice,o.total,o.optionid,o.optionname FROM " . tablename('juyousha_order_goods') . " o left join " . tablename('juyousha_goods') . " g on o.goodsid=g.id "
            . " WHERE o.orderid='{$row['id']}'");
          foreach ($goods as &$item) {
            //属性
            $option = pdo_fetch("select title,marketprice,weight,stock from " . tablename("juyousha_goods_option") . " where id=:id limit 1", array(":id" => $item['optionid']));
            if ($option) {
              $item['title'] = "[" . $option['title'] . "]" . $item['title'];
              $item['marketprice'] = $option['marketprice'];
            }
          }
          unset($item);
          $row['goods'] = $goods;
          $row['total'] = $goodsid;
          $row['dispatch'] = pdo_fetch("select id,dispatchname from " . tablename('juyousha_dispatch') . " where id=:id limit 1", array(":id" => $row['dispatch']));
        }
      }
      include $this->template('order');
    }
  }

  public function doMobileShareDetail() {
    global $_W, $_GPC;
    //$giver = $this->getUserOpenID();
    $begger = $_GPC['begger'];
    $giverinfo = $this->getUserOpenDetail();
    $giver = $giverinfo['openid'];
    $givername = $giverinfo['nickname'];
    //print_r($giverinfo);exit(0);
    $goodsid = intval($_GPC['id']);
    $goods = pdo_fetch("SELECT * FROM " . tablename('juyousha_goods') . " WHERE id = :id", array(':id' => $goodsid));

    if (empty($goods)) {
      message('抱歉，商品不存在或是已经被删除！');
    }
    if ($goods['totalcnf']!=2 && empty($goods['total'])) {
      message('抱歉，商品库存不足！');;
    }
    if ($goods['istime'] == 1) {
      if (time() < $goods['timestart']) {
        message('抱歉，还未到购买时间, 暂时无法购物哦~', referer(), "error");
      }
      if (time() > $goods['timeend']) {
        message('抱歉，商品限购时间已到，不能购买了哦~', referer(), "error");
      }
    }

    //浏览量
    pdo_query("update " . tablename('juyousha_goods') . " set viewcount=viewcount+1 where id=:id and weid='{$_W['weid']}' ", array(":id" => $goodsid));
    $piclist = array(array("attachment" => $goods['thumb']));
    if ($goods['thumb_url'] != 'N;') {
      $urls = unserialize($goods['thumb_url']);
      if (is_array($urls)) {
        $piclist = array_merge($piclist, $urls);
      }
    }

    $marketprice = $goods['marketprice'];
    $productprice= $goods['productprice'];
    $stock = $goods['total'];


    //规格及规格项
    $allspecs = pdo_fetchall("select * from " . tablename('juyousha_spec') . " where goodsid=:id order by displayorder asc", array(':id' => $goodsid));
    foreach ($allspecs as &$s) {
      $s['items'] = pdo_fetchall("select * from " . tablename('juyousha_spec_item') . " where  `show`=1 and specid=:specid order by displayorder asc", array(":specid" => $s['id']));
    }
    unset($s);

    //处理规格项
    $options = pdo_fetchall("select id,title,thumb,marketprice,productprice,costprice, stock,weight,specs from " . tablename('juyousha_goods_option') . " where goodsid=:id order by id asc", array(':id' => $goodsid));

    //排序好的specs
    $specs = array();
    //找出数据库存储的排列顺序
    if (count($options) > 0) {
      $specitemids = explode("_", $options[0]['specs'] );
      foreach($specitemids as $itemid){
        foreach($allspecs as $ss){
          $items=  $ss['items'];
          foreach($items as $it){
            if($it['id']==$itemid){
              $specs[] = $ss;
              break;
            }
          }
        }
      }
    }
    $openid = $_GPC['begger'];
    if (!empty($openid)) {
      $juinfo = $this->getClickInfo($goodsid, $openid);
    }

    include $this->template('share_detail');
  }


  public function doMobileDetail() {
    global $_W, $_GPC;
    $goodsid = intval($_GPC['id']);
    $goods = pdo_fetch("SELECT * FROM " . tablename('juyousha_goods') . " WHERE id = :id", array(':id' => $goodsid));

    if (empty($goods)) {
      message('抱歉，商品不存在或是已经被删除！');
    }
    if ($goods['totalcnf']!=2 && empty($goods['total'])) {
      message('抱歉，商品库存不足！');;
    }
    if ($goods['istime'] == 1) {
      if (time() < $goods['timestart']) {
        message('抱歉，还未到购买时间, 暂时无法购物哦~', referer(), "error");
      }
      if (time() > $goods['timeend']) {
        message('抱歉，商品限购时间已到，不能购买了哦~', referer(), "error");
      }
    }
    //浏览量
    pdo_query("update " . tablename('juyousha_goods') . " set viewcount=viewcount+1 where id=:id and weid='{$_W['weid']}' ", array(":id" => $goodsid));
    $piclist = array(array("attachment" => $goods['thumb']));
    if ($goods['thumb_url'] != 'N;') {
      $urls = unserialize($goods['thumb_url']);
      if (is_array($urls)) {
        $piclist = array_merge($piclist, $urls);
      }
    }

    $marketprice = $goods['marketprice'];
    $productprice= $goods['productprice'];
    $stock = $goods['total'];


    //规格及规格项
    $allspecs = pdo_fetchall("select * from " . tablename('juyousha_spec') . " where goodsid=:id order by displayorder asc", array(':id' => $goodsid));
    foreach ($allspecs as &$s) {
      $s['items'] = pdo_fetchall("select * from " . tablename('juyousha_spec_item') . " where  `show`=1 and specid=:specid order by displayorder asc", array(":specid" => $s['id']));
    }
    unset($s);

    //处理规格项
    $options = pdo_fetchall("select id,title,thumb,marketprice,productprice,costprice, stock,weight,specs from " . tablename('juyousha_goods_option') . " where goodsid=:id order by id asc", array(':id' => $goodsid));

    //排序好的specs
    $specs = array();
    //找出数据库存储的排列顺序
    if (count($options) > 0) {
      $specitemids = explode("_", $options[0]['specs'] );
      foreach($specitemids as $itemid){
        foreach($allspecs as $ss){
          $items=  $ss['items'];
          foreach($items as $it){
            if($it['id']==$itemid){
              $specs[] = $ss;
              break;
            }
          }
        }
      }
    }
        /*if (!empty($goods['hasoption'])) {
            $options = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods_option') . " WHERE goodsid=:goodsid order by thumb asc,displayorder asc", array(":goodsid" => $goods['id']));
            foreach ($options as $o) {
                if ($marketprice >= $o['marketprice']) {
                     $marketprice = $o['marketprice'];
                }
                if ($productprice >= $o['productprice']) {
                     $productprice = $o['productprice'];
                }
                if ($stock <= $o['stock']) {
                     $stock = $o['stock'];
                }
            }
        }*/
    $params = pdo_fetchall("SELECT * FROM " . tablename('juyousha_goods_param') . " WHERE goodsid=:goodsid order by displayorder asc", array(":goodsid" => $goods['id']));
    $carttotal = $this->getCartTotal();

    // 获取聚友杀信息
    $openid = $_W['fans']['from_user'];
    if (!empty($openid)) {
      $juinfo = $this->getClickInfo($goodsid, $openid);
    }
    include $this->template('detail');
  }

  public function doMobileAddress() {
    global $_W, $_GPC;
    $from = $_GPC['from'];
    $returnurl = urldecode($_GPC['returnurl']);
    $this->checkAuth();
    // $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'post';
    $operation = $_GPC['op'];

    if ($operation == 'post') {
      $id = intval($_GPC['id']);
      $data = array(
        'weid' => $_W['weid'],
        'openid' => $_W['fans']['from_user'],
        'realname' => $_GPC['realname'],
        'mobile' => $_GPC['mobile'],
        'province' => $_GPC['province'],
        'city' => $_GPC['city'],
        'area' => $_GPC['area'],
        'address' => $_GPC['address'],
      );
      if (empty($_GPC['realname']) || empty($_GPC['mobile']) || empty($_GPC['address'])) {
        message('请输完善您的资料！');
      }
      if (!empty($id)) {
        unset($data['weid']);
        unset($data['openid']);
        pdo_update('juyousha_address', $data, array('id' => $id));
        message($id, '', 'ajax');
      } else {
        pdo_update('juyousha_address', array('isdefault' => 0), array('weid' => $_W['weid'], 'openid' => $_W['fans']['from_user']));
        $data['isdefault'] = 1;
        pdo_insert('juyousha_address', $data);
        $id = pdo_insertid();
        if (!empty($id)) {
          message($id, '', 'ajax');
        } else {
          message(0, '', 'ajax');
        }
      }
    } elseif ($operation == 'default') {
      $id = intval($_GPC['id']);
      pdo_update('juyousha_address', array('isdefault' => 0), array('weid' => $_W['weid'], 'openid' => $_W['fans']['from_user']));
      pdo_update('juyousha_address', array('isdefault' => 1), array('id' => $id));
      message(1, '', 'ajax');
    } elseif ($operation == 'detail') {
      $id = intval($_GPC['id']);
      $row = pdo_fetch("SELECT id, realname, mobile, province, city, area, address FROM " . tablename('juyousha_address') . " WHERE id = :id", array(':id' => $id));
      message($row, '', 'ajax');
    } elseif ($operation == 'remove') {
      $id = intval($_GPC['id']);
      if (!empty($id)) {
        $address = pdo_fetch("select isdefault from " . tablename('juyousha_address') . " where id='{$id}' and weid='{$_W['weid']}' and openid='{$_W['fans']['from_user']}' limit 1 ");

        if (!empty($address)) {
          //pdo_delete("juyousha_address",  array('id'=>$id, 'weid' => $_W['weid'], 'openid' => $_W['fans']['from_user']));
          //修改成不直接删除，而设置deleted=1
          pdo_update("juyousha_address", array("deleted" => 1, "isdefault" => 0), array('id' => $id, 'weid' => $_W['weid'], 'openid' => $_W['fans']['from_user']));

          if ($address['isdefault'] == 1) {
            //如果删除的是默认地址，则设置是新的为默认地址
            $maxid = pdo_fetchcolumn("select max(id) as maxid from " . tablename('juyousha_address') . " where weid='{$_W['weid']}' and openid='{$_W['fans']['from_user']}' limit 1 ");
            if (!empty($maxid)) {
              pdo_update('juyousha_address', array('isdefault' => 1), array('id' => $maxid, 'weid' => $_W['weid'], 'openid' => $_W['fans']['from_user']));
              die(json_encode(array("result" => 1, "maxid" => $maxid)));
            }
          }
        }
      }
      die(json_encode(array("result" => 1, "maxid" => 0)));
    } else {
      $profile = fans_search($_W['fans']['from_user'], array('resideprovince', 'residecity', 'residedist', 'address', 'realname', 'mobile'));
      $address = pdo_fetchall("SELECT * FROM " . tablename('juyousha_address') . " WHERE deleted=0 and openid = :openid", array(':openid' => $_W['fans']['from_user']));
      $carttotal = $this->getCartTotal();
      include $this->template('address');
    }
  }

  private function checkAuth() {
    global $_W;
    $this->MyCheckauth();
  }

  private function MyCheckauth($redirect = true) {
    global $_W;
    if (empty($_W['fans']['from_user'])) {
      if ($redirect) {
        $follow = $this->module['config']['followurl'];
        if (!empty($follow)) {
          header('Location: ' . $follow);
          exit();
        } else {
          checkauth(); // call system auth
        }
      }
    }
  }


  private function changeWechatSend($id, $status, $msg = '') {
    global $_W;
    $paylog = pdo_fetch("SELECT plid, openid, tag FROM " . tablename('paylog') . " WHERE tid = '{$id}' AND status = 1 AND type = 'wechat'");
    if (!empty($paylog['openid'])) {
      $paylog['tag'] = iunserializer($paylog['tag']);
      $send = array(
        'appid' => $_W['account']['payment']['wechat']['appid'],
        'openid' => $paylog['openid'],
        'transid' => $paylog['tag']['transaction_id'],
        'out_trade_no' => $paylog['plid'],
        'deliver_timestamp' => TIMESTAMP,
        'deliver_status' => $status,
        'deliver_msg' => $msg,
      );
      $sign = $send;
      $sign['appkey'] = $_W['account']['payment']['wechat']['signkey'];
      ksort($sign);
      foreach ($sign as $key => $v) {
        $key = strtolower($key);
        $string .= "{$key}={$v}&";
      }
      $send['app_signature'] = sha1(rtrim($string, '&'));
      $send['sign_method'] = 'sha1';
      $token = account_weixin_token($_W['account']);
      $sendapi = 'https://api.weixin.qq.com/pay/delivernotify?access_token=' . $token;
      $response = ihttp_request($sendapi, json_encode($send));
      $response = json_decode($response['content'], true);
      if (empty($response)) {
        message('发货失败，请检查您的公众号权限或是公众号AppId和公众号AppSecret！');
      }
      if (!empty($response['errcode'])) {
        message($response['errmsg']);
      }
    }
  }

  public function payResult($params) {
    $fee = intval($params['fee']);
    $data = array('status' => $params['result'] == 'success' ? 1 : 0);
    if ($params['type'] == 'wechat') {
      $data['transid'] = $params['tag']['transaction_id'];
    }
    if ($data['status'] == 1) { //success
      $discount = $this->setDiscountGivenByOrder($params['tid'], $params['user']);
      $data['discount']= $discount;
      $data['remark'] = '本单通过聚友杀获得优惠' . $discount . '元';
    }
    pdo_update('juyousha_order', $data, array('id' => $params['tid']));
    if ($params['from'] == 'return') {
      //邮件提醒
      if (!empty($this->module['config']['noticeemail'])) {
        $order = pdo_fetch("SELECT price, from_user FROM " . tablename('juyousha_order') . " WHERE id = '{$params['tid']}'");
        $ordergoods = pdo_fetchall("SELECT goodsid, total FROM " . tablename('juyousha_order_goods') . " WHERE orderid = '{$params['tid']}'", array(), 'goodsid');
        $goods = pdo_fetchall("SELECT id, title, thumb, marketprice, unit, total FROM " . tablename('juyousha_goods') . " WHERE id IN ('" . implode("','", array_keys($ordergoods)) . "')");
        $address = pdo_fetch("SELECT * FROM " . tablename('juyousha_address') . " WHERE id = :id", array(':id' => $order['addressid']));
        $body = "<h3>购买商品清单</h3> <br />";
        if (!empty($goods)) {
          foreach ($goods as $row) {
            $body .= "名称：{$row['title']} ，数量：{$ordergoods[$row['id']]['total']} <br />";
          }
        }
        $body .= "<br />总金额：{$order['price']}元 （已付款）<br />";
        $body .= "<h3>购买用户详情</h3> <br />";
        $body .= "真实姓名：{$address['realname']} <br />";
        $body .= "地区：{$address['province']} - {$address['city']} - {$address['area']}<br />";
        $body .= "详细地址：{$address['address']} <br />";
        $body .= "手机：{$address['mobile']} <br />";
        ihttp_email($this->module['config']['noticeemail'], '微商城订单提醒', $body);
      }
      if ($params['type'] == 'credit2') {
        message('支付成功！', $this->createMobileUrl('myorder'), 'success');
      } else {
        message('支付成功！', '../../' . $this->createMobileUrl('myorder'), 'success');
      }
    }
  }

  public function doWebOption() {
    $tag = random(32);
    global $_GPC;
    include $this->template('option');
  }

  public function doWebSpec() {

    global $_GPC;
    $spec = array(
      "id" => random(32),
      "title" => $_GPC['title']
    );
    include $this->template('spec');
  }

  public function doWebSpecItem() {
    global $_GPC;
    $spec = array(
      "id" => $_GPC['specid']
    );
    $specitem = array(
      "id" => random(32),
      "title" => $_GPC['title'],
      "show" => 1
    );
    include $this->template('spec_item');
  }

  public function doWebParam() {
    $tag = random(32);
    global $_GPC;
    include $this->template('param');
  }

  public function doWebExpress() {
    global $_W, $_GPC;
    // pdo_query('DROP TABLE ims_juyousha_express');
    //pdo_query("CREATE TABLE IF NOT EXISTS `ims_juyousha_express` (  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',  `express_name` varchar(50) NOT NULL COMMENT '分类名称',  `express_price` varchar(10) NOT NULL DEFAULT '0',  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',  `express_area` varchar(50) NOT NULL COMMENT '配送区域',  `enabled` tinyint(1) NOT NULL,  PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8 ");
    //pdo_query("ALTER TABLE  `ims_juyousha_order` ADD  `expressprice` VARCHAR( 10 ) NOT NULL AFTER  `totalnum` ;");
    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
    if ($operation == 'display') {
      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_express') . " WHERE weid = '{$_W['weid']}' ORDER BY displayorder DESC");
    } elseif ($operation == 'post') {
      $id = intval($_GPC['id']);
      if (checksubmit('submit')) {
        if (empty($_GPC['express_name'])) {
          message('抱歉，请输入物流名称！');
        }
        $data = array(
          'weid' => $_W['weid'],
          'displayorder' => intval($_GPC['express_name']),
          'express_name' => $_GPC['express_name'],
          'express_url' => $_GPC['express_url'],
          'express_area' => $_GPC['express_area'],
        );
        if (!empty($id)) {
          unset($data['parentid']);
          pdo_update('juyousha_express', $data, array('id' => $id));
        } else {
          pdo_insert('juyousha_express', $data);
          $id = pdo_insertid();
        }
        message('更新物流成功！', $this->createWebUrl('express', array('op' => 'display')), 'success');
      }
      //修改
      $express = pdo_fetch("SELECT * FROM " . tablename('juyousha_express') . " WHERE id = '$id' and weid = '{$_W['weid']}'");
    } elseif ($operation == 'delete') {
      $id = intval($_GPC['id']);
      $express = pdo_fetch("SELECT id  FROM " . tablename('juyousha_express') . " WHERE id = '$id' AND weid=" . $_W['weid'] . "");
      if (empty($express)) {
        message('抱歉，物流方式不存在或是已经被删除！', $this->createWebUrl('express', array('op' => 'display')), 'error');
      }
      pdo_delete('juyousha_express', array('id' => $id));
      message('物流方式删除成功！', $this->createWebUrl('express', array('op' => 'display')), 'success');
    } else {
      message('请求方式不存在');
    }
    include $this->template('express', TEMPLATE_INCLUDEPATH, true);
  }

  public function doWebDispatch() {
    global $_W, $_GPC;
    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
    if ($operation == 'display') {

      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_dispatch') . " WHERE weid = '{$_W['weid']}' ORDER BY displayorder DESC");
    } elseif ($operation == 'post') {

      $id = intval($_GPC['id']);
      if (checksubmit('submit')) {
        $data = array(
          'weid' => $_W['weid'],
          'displayorder' => intval($_GPC['dispatch_name']),
          'dispatchtype' => intval($_GPC['dispatchtype']),
          'dispatchname' => $_GPC['dispatchname'],
          'express' => $_GPC['express'],
          'firstprice' => $_GPC['firstprice'],
          'firstweight' => $_GPC['firstweight'],
          'secondprice' => $_GPC['secondprice'],
          'secondweight' => $_GPC['secondweight'],
          'description' => $_GPC['description']
        );
        if (!empty($id)) {
          pdo_update('juyousha_dispatch', $data, array('id' => $id));
        } else {
          pdo_insert('juyousha_dispatch', $data);
          $id = pdo_insertid();
        }
        message('更新配送方式成功！', $this->createWebUrl('dispatch', array('op' => 'display')), 'success');
      }
      //修改
      $dispatch = pdo_fetch("SELECT * FROM " . tablename('juyousha_dispatch') . " WHERE id = '$id' and weid = '{$_W['weid']}'");
      $express = pdo_fetchall("select * from " . tablename('juyousha_express') . " WHERE weid = '{$_W['weid']}' ORDER BY displayorder DESC");
    } elseif ($operation == 'delete') {
      $id = intval($_GPC['id']);
      $dispatch = pdo_fetch("SELECT id  FROM " . tablename('juyousha_dispatch') . " WHERE id = '$id' AND weid=" . $_W['weid'] . "");
      if (empty($dispatch)) {
        message('抱歉，配送方式不存在或是已经被删除！', $this->createWebUrl('dispatch', array('op' => 'display')), 'error');
      }
      pdo_delete('juyousha_dispatch', array('id' => $id));
      message('配送方式删除成功！', $this->createWebUrl('dispatch', array('op' => 'display')), 'success');
    } else {
      message('请求方式不存在');
    }
    include $this->template('dispatch', TEMPLATE_INCLUDEPATH, true);
  }

  public function doWebAdv() {
    global $_W, $_GPC;
    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
    if ($operation == 'display') {
      $list = pdo_fetchall("SELECT * FROM " . tablename('juyousha_adv') . " WHERE weid = '{$_W['weid']}' ORDER BY displayorder DESC");
    } elseif ($operation == 'post') {

      $id = intval($_GPC['id']);
      if (checksubmit('submit')) {
        $data = array(
          'weid' => $_W['weid'],
          'advname' => $_GPC['advname'],
          'link' => $_GPC['link'],
          'enabled' => intval($_GPC['enabled']),
          'displayorder' => intval($_GPC['displayorder'])
        );
        if (!empty($_GPC['thumb'])) {
          $data['thumb'] = $_GPC['thumb'];
          file_delete($_GPC['thumb-old']);
        }

        if (!empty($id)) {
          pdo_update('juyousha_adv', $data, array('id' => $id));
        } else {
          pdo_insert('juyousha_adv', $data);
          $id = pdo_insertid();
        }
        message('更新幻灯片成功！', $this->createWebUrl('adv', array('op' => 'display')), 'success');
      }
      $adv = pdo_fetch("select * from " . tablename('juyousha_adv') . " where id=:id and weid=:weid limit 1", array(":id" => $id, ":weid" => $_W['weid']));
    } elseif ($operation == 'delete') {
      $id = intval($_GPC['id']);
      $adv = pdo_fetch("SELECT id  FROM " . tablename('juyousha_adv') . " WHERE id = '$id' AND weid=" . $_W['weid'] . "");
      if (empty($adv)) {
        message('抱歉，幻灯片不存在或是已经被删除！', $this->createWebUrl('adv', array('op' => 'display')), 'error');
      }
      pdo_delete('juyousha_adv', array('id' => $id));
      message('幻灯片删除成功！', $this->createWebUrl('adv', array('op' => 'display')), 'success');
    } else {
      message('请求方式不存在');
    }
    include $this->template('adv', TEMPLATE_INCLUDEPATH, true);
  }

  public function doMobileAjaxdelete() {
    global $_GPC;
    $delurl = $_GPC['pic'];
    ob_clean();
    if (file_delete($delurl)) {
      echo 1;
    } else {
      echo 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////
  /// 聚友杀部分
  ////////////////////////////////////////////////////////////////////////
  public function doMobileKill()
  {
    global $_GPC, $_W;
    $goodsid = intval($_GPC['goodsid']);
    $begger = ($_GPC['begger']);
    $weid = intval($_GPC['weid']);
    $giver = $_GPC['giver'];
    $givername = $_GPC['givername'];

    if (empty($goodsid)) {
      $msg = array(
        'title'=>'星际穿越',
        'msg'=>'您在给哪一件商品杀价呢？小二居然在商品库里没找到！so..杀价失败...',
        'code' => 1
      );
      message($msg,'', 'ajax');
    } else if (empty($begger)) {
      $msg = array(
        'title'=>'星际穿越',
        'msg'=>'您在帮谁杀价呢？小二居然在会员库里没找到他！so..杀价失败...',
        'code' => 1
      );
      message($msg,'', 'ajax');
    }

    /* 1. 确定本次杀价的基本数据：
     *   > 是否还能杀 $killdone
     *   > 杀多少 $discount
     */
    $goods = pdo_fetch('SELECT * FROM ' . tablename('juyousha_goods') . ' WHERE id=:goodsid AND weid=:weid', array(':goodsid'=>$goodsid, ':weid'=>$weid));
    $title = $goods['title'];
    $discount = $this->randBetween($goods['killmindiscount'], $goods['killdiscount']);

    // 各种检查一番，确认砍价资格
    if ($goods['istime'] == 1) {
      if ($goods['timestart'] > TIMESTAMP) {
        message('活动尚未开始', '', 'ajax');
      } else if ($goods['timeend'] < TIMESTAMP) {
        $msg = array(
          'title'=>'杀价失败',
          'msg'=>'活动已经于'.date('m-d H:i', $goods['timeend']).'结束',
          'code' => 1);
        message($msg,'', 'ajax');
      }
    }
    if ($goods['killenable'] != 1) {
      $msg = array(
        'title'=>'客官别急',
        'msg'=> '别太心急噢，活动还在筹备中，请稍后再试 ^_^',
        'code' => 1);
      message($msg,'', 'ajax');
    }

    $gotten_discount = $this->getDiscountByGoodsId($goodsid, $begger);
    if ($goods['killtotaldiscount'] <= $gotten_discount) {
      $msg = array(
        'title'=>'多谢客官',
        'msg'=> '哎呀，你的朋友人气爆棚，已经提前完成打折目标！省的不是一般多啊~~',
        'code' => 1);
      message($msg,'', 'ajax');
    }
    if ($gotten_discount + $discount > $goods['killtotaldiscount']) {
      $discount = $goods['killtotaldiscount'] - $gotten_discount;
    }
    if ($discount < 0) {
      die("Unexpected discount {$discount}");
    }

    WeUtility::logging("KILLPRICE",
      array('discount'=>$discount, 'gotten'=>$gotten_discount, 'total'=>$goods['killtotaldiscount']));

    // 检查策略：
    // 1. 首先检查是否有cookie，若有则不增加点击
    // 2. 如果有giver id，则只检查是否giver id存在，若存在则不增加点击
    // 3. 如果没有give id，则检查IP地址，如果IP地址已经存在，则不增加点击
    //
    // 4. 无论如何，以上完成后总是设置cookie
    if (true != $this->addClick($_W['weid'], $goodsid, $begger, $giver, $givername, getip(), $title, $discount)) {
      $msg = array(
        'title' => '感谢支持',
        'msg' =>'你已经帮忙杀过价啦，谢谢~~杀了又杀，这才是真爱啊！！',
        'code' => 1);
      message($msg,'', 'ajax');
    }
    if ($goods['killdiscount'] <= 0) {
      $msg = array(
        'title' => '手气不好',
        'msg' =>'居然1分钱都没杀下来，哎！',
        'code' => 0);
        message($msg,'', 'ajax');
    }
    $msg = array(
      'title' => '杀价成功',
      'msg' =>'在你的帮助下，你的朋友本单再省'.$discount.'元! 快保留证据让他请吃饭！！',
      'code' => 0
    );
    message($msg,'', 'ajax');
  }

  public function doWebShare() {
    global $_W, $_GPC;

    $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display-log';

    if ($operation == 'display-log') {
      $list = pdo_fetchall("SELECT SUM(discount) as discount, COUNT(goodsid) as click, goodsid, title  FROM " . tablename($this->table_iptable) . " WHERE weid=:weid GROUP BY goodsid",
        array(":weid" => $_W['weid']));
    }
    include $this->template('share');
  }

  private function addClick($weid, $goodsid, $begger, $giver, $givername, $ip, $title, $discount)
  {
    global $_W;
    $isOK = false;

    // (1) . 检查cookie
    if (false) {
      $cookie_name = "t2-juyousha-" . $weid . "-" . $goodsid . "-" . $begger;
      if (isset($_COOKIE[$cookie_name])) {
        return false;
      } else {
        setcookie($cookie_name, 'killed', time()+60*60*24*7); // 7天内本订单内的每个商品最多杀一次
      }
    }

    // (2) . 如果有giver id，则只检查是否giver id存在，若存在则不增加点击
    if (!empty($giver)) {
      $history = pdo_fetch("SELECT * FROM "
        . tablename($this->table_iptable)
        . " WHERE weid=:weid AND goodsid=:goodsid AND giver=:giver AND begger=:begger AND TIMESTAMPDIFF(HOUR, FROM_UNIXTIME(createtime), NOW()) < 24 * 7",
          array(":weid"=>$_W['weid'], ":goodsid" => $goodsid, ":giver"=>$giver, ":begger"=>$begger));

      // (3) . 如果没有give id，则检查IP地址，如果IP地址已经存在，则不增加点击
    } else {
      $history = pdo_fetch("SELECT * FROM "
        . tablename($this->table_iptable)
        . " WHERE weid=:weid AND ip=:ip AND goodsid=:goodsid AND begger=:begger AND TIMESTAMPDIFF(HOUR, FROM_UNIXTIME(createtime), NOW()) < 24 * 7",
          array(":weid"=>$_W['weid'], ":ip" => $ip, ":goodsid" => $goodsid, ":begger" => $begger));
    }

    if (false != $history) {
      $isOK = false;
    } else {
      $isOK = true;
      pdo_insert($this->table_iptable,
        array("weid"=>$weid,
        "ip"=>$ip,
        "goodsid" => $goodsid,
        "discount" => $discount,
        "title"=>$title,
        "createtime"=>TIMESTAMP,
        "giver"=>$giver,
        "givername"=>$givername,
        "begger"=>$begger));
    }
    return $isOK;
  }

  private function setDiscountGivenByOrder($orderid, $begger)
  {
    $ordergoods = pdo_fetchall("SELECT goodsid, total,optionid FROM " . tablename('juyousha_order_goods') . " WHERE orderid = '{$orderid}'", array(), 'goodsid');
    $goodsids = array_keys($ordergoods);
    $discount = $this->getDiscountByGoodsIds($goodsids, $begger);
    $this->setDiscountGivenByGoodsIds($goodsids, $begger);
    return $discount;
  }

  private function setDiscountGivenByGoodsIds($goodsids, $begger)
  {
    global $_W;
    if (count($goodsids) > 0) {
      $allgoodsid_str = join(',', $goodsids);
      pdo_query("UPDATE " . tablename($this->table_iptable)
        . " SET exchangetime=:exchangetime WHERE begger=:begger AND weid=:weid AND goodsid in (" . $allgoodsid_str . ") AND exchangetime IS NULL",
          array(':exchangetime'=>TIMESTAMP, ':begger'=>$begger, ':weid'=>$_W['weid']));
    }
  }

  private function getDiscountByOrder($orderid, $openid)
  {
    $ordergoods = pdo_fetchall("SELECT goodsid, total,optionid FROM " . tablename('juyousha_order_goods') . " WHERE orderid = '{$orderid}'", array(), 'goodsid');
    return $this->getDiscountByGoodsIds(array_keys($ordergoods), $openid);
  }

  private function getDiscountByGoodsId($goodsid, $openid)
  {
    global $_W;
    $discount = pdo_fetchall("SELECT * FROM " . tablename($this->table_iptable)
        . " WHERE begger=:begger AND weid=:weid AND goodsid=:goodsid AND exchangetime IS NULL",
          array(':begger'=> $openid, ':weid'=>$_W['weid'], ':goodsid'=>$goodsid));
    $totaldiscount = 0;
    foreach ($discount as $d) {
      $totaldiscount += $d['discount'];
    }
    return $totaldiscount;
  }

  private function getDiscountByGoodsIds($goodsids, $openid)
  {
    global $_W;
    $totaldiscount = 0.0;
    if (count($goodsids) > 0) {
      $allgoodsid_str = join(',', $goodsids);
      $discounts = pdo_fetchall("SELECT * FROM " . tablename($this->table_iptable)
        . " WHERE begger=:begger AND weid=:weid AND goodsid in (" . $allgoodsid_str . ") AND exchangetime IS NULL",
          array(':begger'=> $openid, ':weid'=>$_W['weid']));
      foreach ($discounts as $d) {
        $totaldiscount += $d['discount'];
      }
    }
    return $totaldiscount;
  }


  private function getClickCount($goodsid, $begger)
  {
    global $_W;
    $act_click = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename($this->table_iptable) . ' WHERE begger=:begger AND goodsid=:goodsid AND weid=:weid AND exchangetime is NULL',
      array(':begger'=>$begger, ':goodsid'=>$goodsid, ':weid'=>$_W['weid']));
    return $act_click;
  }

  private function getClickInfo($goodsid, $begger)
  {
    global $_W;
    $click_info = pdo_fetchall('SELECT * FROM ' . tablename($this->table_iptable) . ' WHERE begger=:begger AND goodsid=:goodsid AND weid=:weid AND exchangetime is NULL',
      array(':begger'=>$begger, ':goodsid'=>$goodsid, ':weid'=>$_W['weid']));
    return $click_info;
  }

  private function randBetween($a, $b)
  {
    $discount = 0;
    if ($a == $b) {
      $discount = $a;
    } else {
      if ($a > $b) {
        $tmp = $a; $a = $b; $b = $tmp; // swap a, b so that $a < $b
      }
      $fval = floatval(rand() % 100) / 100; //  gen value from 0~1
      WeUtility::logging('fv', $fval);
      $discount = $a + $fval * ($b - $a); // get real discount
      WeUtility::logging('discount', $discount);
      $discount = floatval(intval($discount * 100)) / 100; // keep 2 digits at most for discount
    }
    return $discount;
  }

}
