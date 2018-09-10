-- phpMyAdmin SQL Dump
-- version 3.4.8
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 01 月 15 日 12:09
-- 服务器版本: 5.1.65
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `waimai`
--

-- --------------------------------------------------------

--
-- 表的结构 `ims_album`
--

CREATE TABLE IF NOT EXISTS `ims_album` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `content` varchar(1000) NOT NULL DEFAULT '',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `isview` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_album_photo`
--

CREATE TABLE IF NOT EXISTS `ims_album_photo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `albumid` int(10) unsigned NOT NULL,
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `attachment` varchar(100) NOT NULL DEFAULT '',
  `ispreview` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_albumid` (`albumid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_album_reply`
--

CREATE TABLE IF NOT EXISTS `ims_album_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `albumid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_article`
--

CREATE TABLE IF NOT EXISTS `ims_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `iscommend` tinyint(1) NOT NULL DEFAULT '0',
  `ishot` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `pcate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '一级分类',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '二级分类',
  `template` varchar(300) NOT NULL DEFAULT '' COMMENT '内容模板',
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `thumb` varchar(100) NOT NULL DEFAULT '' COMMENT '缩略图',
  `source` varchar(50) NOT NULL DEFAULT '' COMMENT '来源',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `linkurl` varchar(500) NOT NULL DEFAULT '',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_iscommend` (`iscommend`),
  KEY `idx_ishot` (`ishot`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `ims_article`
--

INSERT INTO `ims_article` (`id`, `weid`, `iscommend`, `ishot`, `pcate`, `ccate`, `template`, `title`, `description`, `content`, `thumb`, `source`, `author`, `displayorder`, `linkurl`, `createtime`) VALUES
(1, 1, 0, 0, 0, 0, '', '客户案例', '', '<h1 id="activity-name">客户案例</h1><p><span id="post-date">作者：&nbsp;&nbsp;&nbsp;时间：2016-01-12&nbsp;&nbsp;&nbsp;<a class="contacts" href="weixin://contacts/profile/fyhl800" jquery1720841136608385791="2">琪琪订餐系统</a></span> </p><section class="tn-Powered-by-XIUMI" style="font-family: inherit; white-space: normal; box-sizing: border-box; border: 1px solid rgb(255, 129, 36); text-align: center; padding: 0px; margin: 96px 16px 16px; max-width: 100%; font-size: 1.5em; text-decoration: inherit; border-radius: 8px; word-wrap: break-word !important;"><section class="tn-Powered-by-XIUMI" style="box-sizing: border-box; border-color: rgb(255, 129, 36); padding: 0px; margin: 16px; max-width: 100%; border-top-width: 1px; border-top-style: solid; word-wrap: break-word !important;">风云互联</section><section class="tn-Powered-by-XIUMI" style="box-sizing: border-box; padding: 0px; line-height: 1.4; margin: 8px; font-family: inherit; max-width: 100%; font-size: 0.7em; text-decoration: inherit; word-wrap: break-word !important;"><section class="tn-Powered-by-XIUMI" style="box-sizing: border-box; padding: 0px; margin: 0px; max-width: 100%; word-wrap: break-word !important;">微信号：FYHL800</section></section><img src="./resource/attachment/images/1/2016/01/bEIj31C6cGlEHJeh4HNEd6lYLDyuLg.jpg"/></section><section style="BOX-SIZING: border-box; BORDER-BOTTOM: rgb(255,129,36) 1px solid; TEXT-ALIGN: center; BORDER-LEFT: rgb(255,129,36) 1px solid; PADDING-BOTTOM: 0px; MARGIN: 96px 16px 16px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 1.5em; BORDER-TOP: rgb(255,129,36) 1px solid; BORDER-RIGHT: rgb(255,129,36) 1px solid; TEXT-DECORATION: inherit; PADDING-TOP: 0px; border-top-left-radius: 8px; border-bottom-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; LINE-HEIGHT: 1.4; MARGIN: 0px 8px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(52,54,60); FONT-SIZE: 0.7em; TEXT-DECORATION: inherit; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI">潭州最具特色的竹文化主题餐厅--竹湾山庄<br style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"/></section></section><section style="BOX-SIZING: border-box; BORDER-BOTTOM-COLOR: rgb(255,129,36); PADDING-BOTTOM: 0px; MARGIN: 16px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-RIGHT-COLOR: rgb(255,129,36); BORDER-LEFT-COLOR: rgb(255,129,36); BORDER-TOP: rgb(255,129,36) 1px solid; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"></section><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; LINE-HEIGHT: 1.4; MARGIN: 8px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 0.7em; TEXT-DECORATION: inherit; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI">微信号：ZWSZ8888</section></section><img src="./resource/attachment/images/1/2016/01/x71SFk42NtHgg2SSzKS08S4SFTeCG4.jpg"/></section><section style="BOX-SIZING: border-box; BORDER-BOTTOM: rgb(255,129,36) 1px solid; TEXT-ALIGN: center; BORDER-LEFT: rgb(255,129,36) 1px solid; PADDING-BOTTOM: 0px; MARGIN: 96px 16px 16px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 1.5em; BORDER-TOP: rgb(255,129,36) 1px solid; BORDER-RIGHT: rgb(255,129,36) 1px solid; TEXT-DECORATION: inherit; PADDING-TOP: 0px; border-top-left-radius: 8px; border-bottom-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; LINE-HEIGHT: 1.4; MARGIN: 0px 8px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(52,54,60); FONT-SIZE: 0.7em; TEXT-DECORATION: inherit; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI">一群不想长大的人寻找的地方</section></section><section style="BOX-SIZING: border-box; BORDER-BOTTOM-COLOR: rgb(255,129,36); PADDING-BOTTOM: 0px; MARGIN: 16px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-RIGHT-COLOR: rgb(255,129,36); BORDER-LEFT-COLOR: rgb(255,129,36); BORDER-TOP: rgb(255,129,36) 1px solid; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"></section><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; LINE-HEIGHT: 1.4; MARGIN: 8px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 0.7em; TEXT-DECORATION: inherit; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI">微信号：qingchunkaoba</section></section><img src="./resource/attachment/images/1/2016/01/b0dISSI4DRue9AnzzTnTEi9s4Jtjmt.jpg"/></section><section style="BOX-SIZING: border-box; BORDER-BOTTOM: rgb(255,129,36) 1px solid; TEXT-ALIGN: center; BORDER-LEFT: rgb(255,129,36) 1px solid; PADDING-BOTTOM: 0px; MARGIN: 96px 16px 16px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 1.5em; BORDER-TOP: rgb(255,129,36) 1px solid; BORDER-RIGHT: rgb(255,129,36) 1px solid; TEXT-DECORATION: inherit; PADDING-TOP: 0px; border-top-left-radius: 8px; border-bottom-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; LINE-HEIGHT: 1.4; MARGIN: 0px 8px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(52,54,60); FONT-SIZE: 0.7em; TEXT-DECORATION: inherit; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI">蒸湘味是以湘土问候微基石，特别提供民间小炒、蒸菜各类养颜养身美味套餐<br style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"/></section></section><section style="BOX-SIZING: border-box; BORDER-BOTTOM-COLOR: rgb(255,129,36); PADDING-BOTTOM: 0px; MARGIN: 16px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-RIGHT-COLOR: rgb(255,129,36); BORDER-LEFT-COLOR: rgb(255,129,36); BORDER-TOP: rgb(255,129,36) 1px solid; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"></section><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; LINE-HEIGHT: 1.4; MARGIN: 8px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: inherit; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 0.7em; TEXT-DECORATION: inherit; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI"><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px" class="tn-Powered-by-XIUMI">微信号：zhengxwdg</section></section><img src="./resource/attachment/images/1/2016/01/L6cZ76AAngznP7pfGL76Enf77NZgg4.jpg"/><section style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; WIDTH: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: 0px; CLEAR: both; PADDING-TOP: 0px"></section></section><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(89,89,89); FONT-SIZE: 18px; PADDING-TOP: 0px">请不要随意下单，保护客户利益</span></strong></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(89,89,89); PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(62,62,62); FONT-SIZE: 14px; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></span></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px; PADDING-TOP: 0px">你也想做一个微信外卖订餐联系我们</span></strong></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px; PADDING-TOP: 0px">外卖订餐系统购买地址：https://shop36918457.taobao.com</span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px">联系电话：<span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; LINE-HEIGHT: 24px; BACKGROUND-COLOR: rgb(251,252,252); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(88,88,88); PADDING-TOP: 0px">13730717060</span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px">联系QQ：540616918</p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px">联系旺旺：琪琦网购</p><p><br/></p>', 'images/1/2016/01/m5gfBHryO6Rk5m1JnoP5g5mYYGvrr8.jpg', '', '', 0, '', 1452584966),
(2, 1, 0, 0, 1, 0, '', '优惠券', '', '', 'images/1/2016/01/hN4actcmnjA3GeCTnXHC8tCh41TAeJ.jpg', '', '', 0, 'mobile.php?act=module&name=izc_strcoupon&do=index&weid=1', 1452587730),
(4, 1, 0, 0, 1, 0, '', '积分兑换礼品', '', '', 'images/1/2016/01/Vb61AFE17GQAaUOAFUZQjQA6016X1O.jpg', '', '', 0, 'mobile.php?act=entry&eid=52&weid=1', 1452587908),
(5, 1, 0, 0, 1, 0, '', '大转盘活动', '', '', 'images/1/2016/01/SG08PmP62WBPQPyLccGz2eTQW6g0Bc.jpg', '', '', 0, 'mobile.php?act=module&id=10&name=bigwheel&do=index&weid=1', 1452588004),
(6, 1, 0, 0, 1, 0, '', '刮刮奖活动', '', '', 'images/1/2016/01/l7ID4h4k42T5DE14I6Hqt4ld6S62Z4.jpg', '', '', 0, 'mobile.php?act=entry&eid=63&weid=1', 1452588119),
(8, 1, 0, 0, 1, 0, '', '积分签到', '', '', 'images/1/2016/01/xmgP1D4zT5XxQm45M1d16Tj5PhtHDg.jpg', '', '', 0, 'mobile.php?act=module&rid=8&name=nsign&do=index&weid=1', 1452588378),
(9, 1, 0, 0, 3, 0, '', '关于我们', '', '<p></p><p><section data-id="196" class="v3editor" style="margin: 0px; padding: 0px; max-width: 100%; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><section style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36);"><fieldset style="margin: 0.3em 0px; padding: 0px 0px 1.5em; max-width: 100%; min-width: 0px; border: none rgb(255, 129, 36); font-weight: bold; text-decoration: inherit; color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><img border="0" data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLwoSEentBeHvkVibhHvTYcDd2VLbTa3lEWH1icwFvmdQDkAb3Xf8rs7Ig/0?wx_fmt=jpeg" title="" vspace="0" data-width="112px" width="112" height="112" data-type="jpeg" data-ratio="1" data-w="112" _width="112px" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLwoSEentBeHvkVibhHvTYcDd2VLbTa3lEWH1icwFvmdQDkAb3Xf8rs7Ig/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px 10px 0px 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%; color: inherit; vertical-align: middle; width: 112px !important; visibility: visible !important;"/><section class="wxqq-border-color;" style="margin: 1em 0px 0px; padding: 0px 0px 0px 1em; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-left-width: 1px; border-left-style: solid; border-color: rgb(255, 129, 36); display: inline-block; height: 6em; vertical-align: top; color: rgb(255, 129, 36);"><section class="wxqq-color" data-style="font-size: 16px;" style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit;"><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit; font-size: 24px;">Part1.</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit; font-size: 24px;">店铺介绍</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; color: rgb(89, 89, 89); font-family: &#39;helvetica neue&#39;, helvetica, arial, sans-serif; font-size: 12px; line-height: 21.6000003814697px; text-decoration: inherit;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; line-height: 21.6000003814697px;">From Guoyoo</span></span></p></section></section></fieldset></section></section></p><p></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　琪琪外卖订餐系统基于微信公众平台开发，系统功能完善，操作简单，5分钟开通微信店铺，把店铺搬进手机，顾客关注微信公众号，3步完成微信下单。拥有独立管理平台，客户CRM，店铺和商品信息随时修改。</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　多种方式实时接收订单：支持GPRS无线打印机、短信通知、邮件提醒等多种接单方式。支持接入自己的微信支付，支付宝支付，货到付款和会员余额支付等多种支付方式。</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　拥有优惠券系统，大转盘、砸金蛋、刮刮卡等多种营销活动功能。成熟的外卖订餐系统，完美支持餐饮店、奶茶店、超市、便利店、水果店、甜品店、蛋糕店、鲜花店等实体O2O运营店铺。</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p></p><p><section data-id="196" class="v3editor" style="margin: 0px; padding: 0px; max-width: 100%; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><section style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36);"><fieldset style="margin: 0.3em 0px; padding: 0px 0px 1.5em; max-width: 100%; min-width: 0px; border: none rgb(255, 129, 36); font-weight: bold; text-decoration: inherit; color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><img border="0" data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLLE0AnZKtUhGeia37YxHI4yMOiaBLs90hddWqhzicsmX7ayTvPYgPCQnqw/0?wx_fmt=jpeg" title="" vspace="0" data-width="112px" width="112" height="112" data-type="jpeg" data-ratio="0.6607142857142857" data-w="112" _width="112px" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLLE0AnZKtUhGeia37YxHI4yMOiaBLs90hddWqhzicsmX7ayTvPYgPCQnqw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px 10px 0px 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%; color: inherit; vertical-align: middle; width: 112px !important; visibility: visible !important;"/><section class="wxqq-border-color;" style="margin: 1em 0px 0px; padding: 0px 0px 0px 1em; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-left-width: 1px; border-left-style: solid; border-color: rgb(255, 129, 36); display: inline-block; height: 6em; vertical-align: top; color: rgb(255, 129, 36);"><section class="wxqq-color" data-style="font-size: 16px;" style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit;"><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit; font-size: 24px;">Part2.</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 24px;">店面欣赏</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; color: rgb(89, 89, 89); font-family: &#39;helvetica neue&#39;, helvetica, arial, sans-serif; font-size: 12px; line-height: 21.6000003814697px; text-decoration: inherit;">From Guoyoo</span></p></section></section></fieldset></section></section></p><p></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); text-align: center; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(227, 108, 9);">琪琪全体员工恭候您的光临！！</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLX6XTWgh4xYUygib8SWHXn5whtHy2HAqgaKrSUVXiaxQnc1ic51XBR70mg/0?wx_fmt=jpeg" data-type="jpeg" data-ratio="0.5557553956834532" data-w="" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLX6XTWgh4xYUygib8SWHXn5whtHy2HAqgaKrSUVXiaxQnc1ic51XBR70mg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); text-align: center; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(227, 108, 9);">店内优雅的环境</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLuKtlxlhtqXgbYliabpVHYgmNoy6mR94kCnrvF56I9Xjg35t7W7I0RaQ/0?wx_fmt=jpeg" data-type="jpeg" data-ratio="0.6654676258992805" data-w="" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLuKtlxlhtqXgbYliabpVHYgmNoy6mR94kCnrvF56I9Xjg35t7W7I0RaQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); text-align: center; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; color: rgb(227, 108, 9); font-size: 18px;">舒适的桌椅</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLLE0AnZKtUhGeia37YxHI4yMOiaBLs90hddWqhzicsmX7ayTvPYgPCQnqw/0?wx_fmt=jpeg" data-type="jpeg" data-ratio="0.6654676258992805" data-w="" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLLE0AnZKtUhGeia37YxHI4yMOiaBLs90hddWqhzicsmX7ayTvPYgPCQnqw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); text-align: center; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; color: rgb(227, 108, 9); font-size: 18px; line-height: 22.3999996185303px;">“热心”的吧台</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLJ3YMfoISEfQ1jFc2PUOt4MicwXZ9OXNhfzUqEh7Jx8qbG3SwrfOlbwQ/0?wx_fmt=jpeg" data-type="jpeg" data-ratio="0.5629496402877698" data-w="" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLJ3YMfoISEfQ1jFc2PUOt4MicwXZ9OXNhfzUqEh7Jx8qbG3SwrfOlbwQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p></p><p><section data-id="196" class="v3editor" style="margin: 0px; padding: 0px; max-width: 100%; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><section style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36);"><fieldset style="margin: 0.3em 0px; padding: 0px 0px 1.5em; max-width: 100%; min-width: 0px; border: none rgb(255, 129, 36); font-weight: bold; text-decoration: inherit; color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><img border="0" data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLZjGw02jA06C53UBzHyR3haxfwua4LHYtaAn8ic7rACDTfogiaLYBQ6Kw/0?wx_fmt=gif" title="" vspace="0" data-width="112px" width="112" height="112" data-type="gif" data-ratio="0.8303571428571429" data-w="112" _width="112px" src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XlCyJiaUHzUVB19MUFurUTbLZjGw02jA06C53UBzHyR3haxfwua4LHYtaAn8ic7rACDTfogiaLYBQ6Kw/0?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px 10px 0px 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); border-top-left-radius: 50%; border-top-right-radius: 50%; border-bottom-right-radius: 50%; border-bottom-left-radius: 50%; color: inherit; vertical-align: middle; width: 112px !important; visibility: visible !important;"/><section class="wxqq-border-color;" style="margin: 1em 0px 0px; padding: 0px 0px 0px 1em; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-left-width: 1px; border-left-style: solid; border-color: rgb(255, 129, 36); display: inline-block; height: 6em; vertical-align: top; color: rgb(255, 129, 36);"><section class="wxqq-color" data-style="font-size: 16px;" style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit;"><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit; font-size: 24px;">Part3.</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; border-color: rgb(255, 129, 36); color: inherit; font-size: 24px;">联系琪琪</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; border-color: rgb(255, 129, 36); color: inherit; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; color: rgb(89, 89, 89); font-family: &#39;helvetica neue&#39;, helvetica, arial, sans-serif; font-size: 12px; line-height: 21.6000003814697px; text-decoration: inherit;">From Guoyoo</span></p></section></section></fieldset></section></section></p><p></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　QQ：540616918</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　电话：<span style="margin: 0px; padding: 0px; max-width: 100%; color: rgb(88, 88, 88); font-family: 微软雅黑; line-height: 24px; background-color: rgb(251, 252, 252); box-sizing: border-box !important; word-wrap: break-word !important;">13730717060</span></span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　旺旺：琪琦网购</span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);">　　店铺地址：shop36918457.taobao.com</span></p><p><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 18px; color: rgb(89, 89, 89);"><br/></span></p><p><br/></p>', '', '', '', 0, '', 1452588888);
INSERT INTO `ims_article` (`id`, `weid`, `iscommend`, `ishot`, `pcate`, `ccate`, `template`, `title`, `description`, `content`, `thumb`, `source`, `author`, `displayorder`, `linkurl`, `createtime`) VALUES
(10, 1, 0, 0, 3, 0, '', '环境展示 ', '', '<p><img class="rich_media_thumb" id="js_cover" data-backsrc="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgdLfIHpiaKlSeJSsu7zOOFiazIuIjmDmRMgrIk6Bp2ozbwBG7Q2UU7cdQ/0?wx_fmt=jpeg" data-s="300,640" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgdLfIHpiaKlSeJSsu7zOOFiazIuIjmDmRMgrIk6Bp2ozbwBG7Q2UU7cdQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5" style="margin: 0px; padding: 0px; height: auto !important; display: block; width: 670px;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;">湛蓝微企</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgcKbrc4vn3oQqic8xFUX7bmOKvpqNAGIUcXO2gicw8ZErvoA2jNyJs6vg/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgcKbrc4vn3oQqic8xFUX7bmOKvpqNAGIUcXO2gicw8ZErvoA2jNyJs6vg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgZItBAV6ASkIbibhVziatIFqwuL7ULT2lpVkCqrXpCS3R61qp10Llib8Yg/0?wx_fmt=jpeg" data-ratio="0.658102766798419" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgZItBAV6ASkIbibhVziatIFqwuL7ULT2lpVkCqrXpCS3R61qp10Llib8Yg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgWYh0ttRWJstU67e6FNoHffBYOKparlP468RXUlgxXEibzQxTICxMHqA/0?wx_fmt=jpeg" data-ratio="0.7608695652173914" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgWYh0ttRWJstU67e6FNoHffBYOKparlP468RXUlgxXEibzQxTICxMHqA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgibdywzicxC9DGDoV2iczReBCcEfnZicsncueh4Njb6oVmQQNEZ4SsxYuNA/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgibdywzicxC9DGDoV2iczReBCcEfnZicsncueh4Njb6oVmQQNEZ4SsxYuNA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgyglQicV8FsIE11liaUMaoHNeCLHgm2wKNDLP1NrpGEm8oMcNDj7BQGCg/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgyglQicV8FsIE11liaUMaoHNeCLHgm2wKNDLP1NrpGEm8oMcNDj7BQGCg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgI4vu0OdP8uZosYCtsV8y5AangazPQsBibxUPucB4Vdpzq161lemMpKA/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgI4vu0OdP8uZosYCtsV8y5AangazPQsBibxUPucB4Vdpzq161lemMpKA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgfEgk6Wj5g1x0HAicQNcNtvWmV4Lw3zKstG2ATyD7rFVYZcKS8fQ3obw/0?wx_fmt=jpeg" data-ratio="1.3379446640316206" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgfEgk6Wj5g1x0HAicQNcNtvWmV4Lw3zKstG2ATyD7rFVYZcKS8fQ3obw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgjjAkicKZXbaibZTia1XrntGX4ZVIMwqLZArHia2g9YrelMEjobAibcN5tAQ/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgjjAkicKZXbaibZTia1XrntGX4ZVIMwqLZArHia2g9YrelMEjobAibcN5tAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgkyI20xK1UOsoaWQ4Sr3NUtA83ibXibJiacVib9icmmGbQ6Sgf4NlickOsppw/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgkyI20xK1UOsoaWQ4Sr3NUtA83ibXibJiacVib9icmmGbQ6Sgf4NlickOsppw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCguia3lWCGjEyDAvlibvT17rufIuKmzic4xMKQgwqnrxgkIBzHhSsI6h5hw/0?wx_fmt=jpeg" data-ratio="1.140316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCguia3lWCGjEyDAvlibvT17rufIuKmzic4xMKQgwqnrxgkIBzHhSsI6h5hw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgdeTyeooAD5Xmyz32ZyIFuMQwtYAUaa1vrPoFuG9qOjp9eMseCIcIDA/0?wx_fmt=jpeg" data-ratio="0.7075098814229249" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgdeTyeooAD5Xmyz32ZyIFuMQwtYAUaa1vrPoFuG9qOjp9eMseCIcIDA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgCibw8e67AXdAKPlL7q5qAqNdAdUibjzwEhEqFnnXZeTAxET3Wa9UUiaKw/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgCibw8e67AXdAKPlL7q5qAqNdAdUibjzwEhEqFnnXZeTAxET3Wa9UUiaKw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgKVibSPRG3JoUEpXwtQeKmFbQRibRmqownvCFLkDUMeeona1n96Mk9VaQ/0?wx_fmt=jpeg" data-ratio="0.6640316205533597" data-w="" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgKVibSPRG3JoUEpXwtQeKmFbQRibRmqownvCFLkDUMeeona1n96Mk9VaQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgjVuuzVzl5Q2UnDk8VxLyKydcwVS8Hkib59mhDUU2iayD3kvvMJT0TYtQ/0?wx_fmt=jpeg" data-ratio="0.614" data-w="500" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgjVuuzVzl5Q2UnDk8VxLyKydcwVS8Hkib59mhDUU2iayD3kvvMJT0TYtQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; white-space: pre-wrap; font-family: &#39;Helvetica Neue&#39;, Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; line-height: 25px; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img data-s="300,640" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgITmqHr50w8Z88XVMLvOGK4Ilz757ia9Be8iaib0yPsyuE3ZBParhAAib0A/0?wx_fmt=jpeg" data-ratio="1.1111111111111112" data-w="18" src="http://mmbiz.qpic.cn/mmbiz/znlTCD6icVbYIibr2NzibbUfhg4Ph0uOcCgITmqHr50w8Z88XVMLvOGK4Ilz757ia9Be8iaib0yPsyuE3ZBParhAAib0A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" style="margin: 0px; padding: 0px; height: auto !important; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"/></p><p><br/></p>', '', '', '', 0, '', 1452647771);
INSERT INTO `ims_article` (`id`, `weid`, `iscommend`, `ishot`, `pcate`, `ccate`, `template`, `title`, `description`, `content`, `thumb`, `source`, `author`, `displayorder`, `linkurl`, `createtime`) VALUES
(11, 1, 0, 0, 5, 0, '', '首次关注 下单流程演示', '', '<p>&nbsp;</p><p>&nbsp;<img src="./resource/attachment/images/1/2016/01/sEEiEQq8quYgquzqxEN38Ugg5qQGy8.jpg"/></p><p><br/></p><p><br/></p><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM: medium none; TEXT-ALIGN: center; BORDER-LEFT: medium none; PADDING-BOTTOM: 0px; MARGIN: 1em auto; PADDING-LEFT: 0px; WIDTH: 574px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px; BORDER-TOP: medium none; BORDER-RIGHT: medium none; PADDING-TOP: 0px" label="Copyright © 2015 Yead All Rights Reserved."><section style="BOX-SIZING: border-box; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(254,254,254); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; DISPLAY: inline-block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; MARGIN-RIGHT: 10px; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; BACKGROUND-COLOR: rgb(255,255,255); MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: normal; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; BORDER-BOTTOM: rgb(255,105,31) 4px solid; PADDING-BOTTOM: 10px; LINE-HEIGHT: 36px; BACKGROUND-COLOR: rgb(255,105,31); BORDER-TOP-COLOR: rgb(255,105,31); MARGIN: 0px 7px 11px 0px; PADDING-LEFT: 20px; PADDING-RIGHT: 20px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-RIGHT-COLOR: rgb(255,105,31); BORDER-LEFT-COLOR: rgb(255,105,31); CURSOR: pointer; PADDING-TOP: 10px; border-top-left-radius: 15px; border-bottom-left-radius: 15px; border-top-right-radius: 15px; border-bottom-right-radius: 15px" class="yead" data-brushtype="text" data-bclessp="10%">·<span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 10px; MARGIN: 0px 7px 11px 0px; PADDING-LEFT: 20px; PADDING-RIGHT: 20px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 10px">首次关注 下单流程演示</span>·</span></strong></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; PADDING-BOTTOM: 0px; MARGIN: 1em auto; PADDING-LEFT: 0px; WIDTH: 574px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px; BORDER-TOP: medium none; BORDER-RIGHT: medium none; PADDING-TOP: 0px" label="Copyright © 2015 Yead All Rights Reserved."><h2 style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 18px; MARGIN: 8px 0px 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: 32px; COLOR: rgb(255,105,31); FONT-SIZE: 16px; FONT-WEIGHT: normal; PADDING-TOP: 0px" class="main"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 3px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px; DISPLAY: block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FLOAT: left; FONT-SIZE: 20px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 4px; BACKGROUND-COLOR: rgb(255,105,31); MARGIN: 0px 8px 0px 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 4px; border-top-left-radius: 80%; border-bottom-left-radius: 20%; border-top-right-radius: 100%; border-bottom-right-radius: 90%" class="main2">1</span><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">选择订餐入口</strong></span></h2></section><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,105,31); PADDING-TOP: 0px" class="ue_t">（关注自动回复 自定义菜单进入）</strong></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/QSsAaSuIgDSGzA4aEl9A5EL5gbLzXa.jpg"/></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; FONT-SIZE: 14px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,105,31); PADDING-TOP: 0px" class="ue_t">（微官网幻灯片、网站按钮、底部导航进入）</strong></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; PADDING-BOTTOM: 0px; MARGIN: 1em auto; PADDING-LEFT: 0px; WIDTH: 574px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px; BORDER-TOP: medium none; BORDER-RIGHT: medium none; PADDING-TOP: 0px" label="Copyright © 2015 Yead All Rights Reserved."><h2 style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 18px; MARGIN: 8px 0px 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: 32px; COLOR: rgb(255,105,31); FONT-SIZE: 16px; FONT-WEIGHT: normal; PADDING-TOP: 0px" class="main"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 3px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px; DISPLAY: block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FLOAT: left; FONT-SIZE: 20px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 4px; BACKGROUND-COLOR: rgb(255,105,31); MARGIN: 0px 8px 0px 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 4px; border-top-left-radius: 80%; border-bottom-left-radius: 20%; border-top-right-radius: 100%; border-bottom-right-radius: 90%" class="main2">2</span><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">选购商品</strong></span><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></strong></p></h2></section><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; MARGIN-RIGHT: 10px; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/ba06SAgPPBC21sCz8PNpnoa1qWP0GS.jpg"/></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; MARGIN-RIGHT: 10px; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/tI2cULUYVRd66kNrkCN5ifrdYZNk3S.jpg"/></p></section></section><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; PADDING-BOTTOM: 0px; MARGIN: 1em auto; PADDING-LEFT: 0px; WIDTH: 574px; PADDING-RIGHT: 0px; FONT-FAMILY: 微软雅黑; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px; BORDER-TOP: medium none; BORDER-RIGHT: medium none; PADDING-TOP: 0px" label="Copyright © 2015 Yead All Rights Reserved."><h2 style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 18px; MARGIN: 8px 0px 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: 32px; COLOR: rgb(255,105,31); FONT-SIZE: 16px; FONT-WEIGHT: 400; PADDING-TOP: 0px" class="main"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 3px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px; DISPLAY: block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FLOAT: left; FONT-SIZE: 20px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 4px; BACKGROUND-COLOR: rgb(255,105,31); MARGIN: 0px 8px 0px 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 4px; border-top-left-radius: 80%; border-bottom-left-radius: 20%; border-top-right-radius: 100%; border-bottom-right-radius: 90%" class="main2">3</span><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">进入下单（第一次需要输入信息）</strong></span></h2><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 18px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,105,31); PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></strong></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/a17kk97SW3lYQm9U191zrK9QMnY2NA.jpg"/></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><h2 style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 18px; MARGIN: 8px 0px 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: 32px; COLOR: rgb(255,105,31); FONT-SIZE: 16px; FONT-WEIGHT: normal; PADDING-TOP: 0px" class="main"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 3px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px; DISPLAY: block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FLOAT: left; FONT-SIZE: 20px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 4px; BACKGROUND-COLOR: rgb(255,105,31); MARGIN: 0px 8px 0px 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 4px; border-top-left-radius: 80%; border-bottom-left-radius: 20%; border-top-right-radius: 100%; border-bottom-right-radius: 90%" class="main2">4</span><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">你还可以使用优惠券</strong></span><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></strong></p></h2><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/d39QRrJ5rJ33a3ar5Zj3C53aRngcaj.jpg"/></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,105,31); PADDING-TOP: 0px" class="ue_t">（先领取优惠券，优惠券领取入口关注回复、自定义菜单、微官网都可以进入领取）</strong></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></span></strong></span></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"></span></strong></span></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,105,31); PADDING-TOP: 0px" class="ue_t"><img src="./resource/attachment/images/1/2016/01/tJMFZH52M4s4DdMp7QeW0MFD52sdsS.jpg"/>（下单的时候可使用优惠券）</strong></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 3px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px; DISPLAY: block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FLOAT: left; COLOR: rgb(255,105,31); FONT-SIZE: 20px; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 4px; BACKGROUND-COLOR: rgb(255,105,31); MARGIN: 0px 8px 0px 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 4px; border-top-left-radius: 80%; border-bottom-left-radius: 20%; border-top-right-radius: 100%; border-bottom-right-radius: 90%" class="main2">5</span><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">选择支付 提交订单</strong></span></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></strong></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"></strong></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></strong></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,0,0); PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"></span></strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 3px; LINE-HEIGHT: 28px; MARGIN: 0px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px; DISPLAY: block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FLOAT: left; COLOR: rgb(255,105,31); FONT-SIZE: 20px; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/bV7ZP37237n73kwlINnlVP3Uk1520N.jpg"/><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 4px; BACKGROUND-COLOR: rgb(255,105,31); MARGIN: 0px 8px 0px 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; COLOR: rgb(255,255,255); FONT-SIZE: 18px; PADDING-TOP: 4px; border-top-left-radius: 80%; border-bottom-left-radius: 20%; border-top-right-radius: 100%; border-bottom-right-radius: 90%" class="main2">6</span><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">下单成功</strong></span></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></strong></p><p style="BOX-SIZING: border-box !important; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><img src="./resource/attachment/images/1/2016/01/ki9UN1Y1TeFitL2EwL2fV1SEse2111.jpg"/></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><h2 style="BOX-SIZING: border-box !important; TEXT-ALIGN: justify; PADDING-BOTTOM: 0px; LINE-HEIGHT: 18px; MARGIN: 8px 0px 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: 32px; COLOR: rgb(255,105,31); FONT-SIZE: 16px; FONT-WEIGHT: normal; PADDING-TOP: 0px" class="main"><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><br/></p></h2><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; PADDING-BOTTOM: 0px; MARGIN: 1em auto; PADDING-LEFT: 0px; WIDTH: 574px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-TOP: medium none; BORDER-RIGHT: medium none; PADDING-TOP: 0px" label="Copyright © 2015 Yead All Rights Reserved."><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM-STYLE: none; TEXT-ALIGN: center; PADDING-BOTTOM: 0px; BORDER-RIGHT-STYLE: none; MARGIN: 15px auto; MIN-HEIGHT: 150px; PADDING-LEFT: 0px; WIDTH: 280px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-TOP-STYLE: none; CLEAR: both; BORDER-LEFT-STYLE: none; PADDING-TOP: 0px"><section style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 10px; MARGIN: 0px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px; DISPLAY: inline-block; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-TOP: rgb(132,132,132) 2px dashed; PADDING-TOP: 10px"><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px"><span style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 16px; PADDING-TOP: 0px"><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">立即关注 微信公众账号下单体验吧</strong></span></p></section><section style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"><p><strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">微信ID：FYHL800</strong></p><section style="BOX-SIZING: border-box !important; BORDER-BOTTOM: rgb(132,132,132) 2px dashed; BORDER-LEFT: rgb(132,132,132) 2px dashed; PADDING-BOTTOM: 10px; MARGIN: 10px auto; PADDING-LEFT: 10px; WIDTH: 200px; PADDING-RIGHT: 10px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; BORDER-TOP: rgb(132,132,132) 2px dashed; BORDER-RIGHT: rgb(132,132,132) 2px dashed; PADDING-TOP: 10px"><p><img style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 5px 0px 0px; PADDING-LEFT: 0px; WIDTH: 180px !important; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; HEIGHT: auto !important; VISIBILITY: visible !important; PADDING-TOP: 0px" title="" src="./resource/attachment/images/1/2016/01/PgPs4P70pV37qU51CU0c3000039w1Z.jpg" source="lib" _width="180px" data-s="300,640" data-w="180" data-ratio="1" format="jpeg" file_id="210797587" url="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XmICQcn8aiaqyqAJHeesXSibwgyk4s1rBZD36KaWiaR9JGaP8GicHyycJicEHdF1BmL5bBv9MwVxhGy8gQ/0?wx_fmt=jpeg" data-type="jpeg" data-src="http://mmbiz.qpic.cn/mmbiz/6Y0nCMFI3XmICQcn8aiaqyqAJHeesXSibwgyk4s1rBZD36KaWiaR9JGaP8GicHyycJicEHdF1BmL5bBv9MwVxhGy8gQ/0?wx_fmt=jpeg"/></p></section><p>长按二维码关注<strong style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px">风云互联</strong><br style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; PADDING-TOP: 0px"/></p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px">微启业外卖订餐系统购买地址：http://shop36918457.taobao.com</p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px">联系电话：13730717060</p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px">联系QQ：540616918</p><p style="BOX-SIZING: border-box !important; PADDING-BOTTOM: 0px; MARGIN-TOP: 0px; MIN-HEIGHT: 1em; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; WHITE-SPACE: pre-wrap; MARGIN-BOTTOM: 0px; CLEAR: both; PADDING-TOP: 0px">联系旺旺：琪琦网购</p></section><p><br/></p><p><br/></p><p><br/></p></section></section></section>', 'images/1/2016/01/u9lx9KOvv9VjhxH3khOF5j399rHXVl.png', '', '', 0, '', 1452657090),
(12, 1, 0, 0, 5, 0, '', '微信订餐的先行者', '', '<p><img src="/resource/attachment/images/2/2015/08/kXXG79kwUKZX1Ju9w4jk1M41m1LZ1u.jpg"/></p><p><br/></p><p>　　一年多来，微信订餐使用的人群越来越普遍，这是微信功能发展必然趋势。当时就义无反顾地登上这艘扬帆的大船，现在很多老客户还一直保留着我们微信公众号，我们的发展也从普通微信平台，目的只有一个，更好的服务于大家。</p><p>　　目前外卖订餐基本这样的格局。为什么要选择微信作为订餐平台？</p><p>　　因为要让更多人去下载独立的餐饮平台，需要大量的财力和线下大量的布点，那是烧钱的活，也是大佬干的事。这对于走独立道路，利用好人人都有的微信，只要通过关注，就能订餐的，对于顾客与商家都是一种双赢模式。</p><p>　　作为微信订餐的先行者，微启业怎么解决实际操作中经常漏单，消除顾客怕没点上，心里又没底的心态。我们刚开始采用三种电脑、短信、邮件提醒模式，还是会出现漏单情况，因为电脑会没网络，无法做到提醒，短信会延迟，影响用餐时间。经过多次的改进，现在有订单打印机无线自动打印，我们的微信订餐系统越来越完善，效果非常理想。</p><p>　　采用微信订餐，可以有更灵活方式服务大家，因为订餐到用餐每一次可以说都是独立循环的，有新菜品只需要在后台自行就可以修改，做一些抽奖活动、优惠券都可以自己领取，正所谓“船小好掉头”。</p><p>　 &nbsp;作为微信订餐的先行者，无法预知微信将来会发展成什么样子，但是有一点可以肯定，手机离不开微信，就好像当年电脑里不能没有QQ一样。我们将用自己的智慧去探寻前进的道路，成为外卖订餐的前行者和实践者。</p><p><br/></p><p><br/></p>', 'images/2/2015/08/kXXG79kwUKZX1Ju9w4jk1M41m1LZ1u.jpg', '', '', 0, '', 1452657497),
(13, 1, 0, 0, 5, 0, '', '38节“吃饭不要钱”', '', '<h1 id="activity-name">38节“吃饭不要钱”</h1><p><img src="/resource/attachment/images/2/2015/08/YAJFofhcj2lSNX4FZsyYqYxXH2HxjH.jpg"/></p><p><br/></p><p>　　3月8日当日如您在微启业消费，并通过手机微信客户端微信公众账号进行买单（支付） 成功后都将得到“吃多少返多少“，最高58元</p><p><br/></p><p>　　同一个微信账号在3月8日只能够订1次哦</p><p><br/></p><p>　　为了方便大家直接进入，下面是微启业的微信店二维码，微信扫一扫更快！！！</p><p><br/></p><p>　　1、凡是3月7-8日在手机微信店铺下单成功的，都将送上现金</p><p><br/></p><p>　　2、38节当天下单成功，7日内消费（非常适合周日休息的朋友）。可以在下单特殊要求中注明哪天消费。例如，38节当天中午下订单，要求周二中午12点送到，唯一要注意的是你在38节下午一定要记住确认订单，这样红包才能在24小时之内发到你的支付宝里，切记切记。</p><p><br/></p><p>　　3、为这次活动还准备了大米、牛奶、水果、披萨、可乐、食用油等商品，你都可以在店铺下单，如果你方便还可以来店内自提。</p><p><br/></p><p>　　机会只有一次，红包不用抢！人人有份！</p><p><br/></p>', 'images/1/2016/01/x2efzk4MldSMW5w2fddOXwlSoWxlt2.png', '', '', 0, '', 1452657654),
(14, 1, 0, 0, 5, 0, '', '关于外卖那些事', '', '<p><img src="/resource/attachment/images/2/2015/08/mm77ieMaDLwqaIl27weWm5mAEE7l8Z.jpg"/></p><p><br/></p><p>　　关于外卖，中午的时间确是非常非常紧张，我们也一直在改善，想把外卖及时送到各位手里，可就是心里着急还是老方一帖--没用。所以，明年打算计划资源整合，把一部分的品种去掉，做精品煲仔饭，减少等待时间，优化服务流程，只有这样才能更好的为客户服务。</p><p>　　在这里有同行、有客户，我想分享一下，外卖的一些看法：要做到人人喜欢不现实、要做到样样全不现实，我们的方向是走精品、完善服务、而快速抵达，是大部分商家心里的痛，我相信只有我们坚守一个原则，一切只为等着的顾客着想，凡是难事，会有解决的办法，也许我们还需要改变思考方式。。。</p><p><br/></p><p><br/></p>', 'images/1/2016/01/W2mxOiOR72rOa0l1D06mmpi97Z07d6.png', '', '', 0, '', 1452657978),
(15, 1, 0, 0, 5, 0, '', '2016年春节不放假', '', '<p><br/></p><p><br/></p><p>　　春节即将来到，我们将在上海等你。</p><p>　　为了让不回家的我们能过上一个欢乐无忧的春节，方便在外滩游玩及工作的朋友们，公司决定：春节期间不放假。</p><p>　　1、就餐请到我们餐厅</p><p>　　地址： 上海外滩外白渡桥桥北50米</p><p>　　----------在外滩，过桥直走穿过红绿灯50米就能看到店</p><p>　　2、春节期间，只供应煲仔饭系列。</p><p>　　3、由于春节加班人员及菜价因素，菜饭价格上浮，节后恢复正常，请相互理解，你懂得。</p><p>　　4、春节期间营业时间：9：30--21:30</p><p><br/></p><p><br/></p>', 'images/1/2016/01/HY69qY4F6JYFqsQSQhTsXqmqT6Tqtq.jpg', '', '', 0, '', 1452658103),
(17, 1, 0, 0, 0, 0, '', '会员卡', '', '', 'images/1/2016/01/R3F84z39cM489i2h8F39DI2F3cDiCC.jpg', '', '', 0, 'mobile.php?act=entry&eid=7&weid=1', 1452662389);

-- --------------------------------------------------------

--
-- 表的结构 `ims_article_category`
--

CREATE TABLE IF NOT EXISTS `ims_article_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `nid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '关联导航id',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID,0为第一级',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  `icontype` tinyint(1) unsigned NOT NULL,
  `icon` varchar(100) NOT NULL DEFAULT '' COMMENT '分类图标',
  `css` varchar(500) NOT NULL,
  `description` varchar(100) NOT NULL DEFAULT '' COMMENT '分类描述',
  `template` varchar(300) NOT NULL DEFAULT '' COMMENT '分类模板',
  `templatefile` varchar(100) NOT NULL DEFAULT '',
  `linkurl` varchar(500) NOT NULL DEFAULT '',
  `ishomepage` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `ims_article_category`
--

INSERT INTO `ims_article_category` (`id`, `weid`, `nid`, `name`, `parentid`, `displayorder`, `enabled`, `icontype`, `icon`, `css`, `description`, `template`, `templatefile`, `linkurl`, `ishomepage`) VALUES
(1, 1, 0, '营销活动', 0, 0, 1, 1, '', 'a:1:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}}', '', '', '', '', 0),
(2, 1, 0, '关注回复多图文', 0, 0, 1, 1, '', 'a:1:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}}', '', '', '', '', 0),
(3, 1, 0, '文章列表', 0, 0, 1, 1, '', 'a:1:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}}', '', '', '', '', 0),
(4, 1, 0, '营销功能', 0, 0, 1, 1, '', 'a:1:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}}', '', '', '', '', 0),
(5, 1, 0, '店铺动态', 0, 0, 1, 1, '', 'a:1:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}}', '', '', '', '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_article_reply`
--

CREATE TABLE IF NOT EXISTS `ims_article_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `articleid` int(11) NOT NULL,
  `isfill` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_attachment`
--

CREATE TABLE IF NOT EXISTS `ims_attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `filename` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `type` tinyint(3) unsigned NOT NULL COMMENT '1为图片',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=86 ;

--
-- 转存表中的数据 `ims_attachment`
--

INSERT INTO `ims_attachment` (`id`, `weid`, `uid`, `filename`, `attachment`, `type`, `createtime`) VALUES
(1, 1, 1, '轮播1.jpg', '/images/1/2016/01/YZw2iZdIu7Zoujt4bGZ4JGnObludNK.jpg', 1, 1452568269),
(2, 1, 1, '轮播2.png', '/images/1/2016/01/nz64dI3hf4Y4g61W3yBHZ3dYWw4yRN.png', 1, 1452568298),
(3, 1, 1, '轮播3.png', '/images/1/2016/01/X3hsgLst44st4n5Sa9FA9x94aN4t3K.png', 1, 1452568318),
(4, 1, 1, '客户案例.jpg', '/images/1/2016/01/m5gfBHryO6Rk5m1JnoP5g5mYYGvrr8.jpg', 1, 1452584953),
(5, 1, 1, '优惠券.jpg', '/images/1/2016/01/dEm3341RxLlg3u6Rr3rzRFee3Qx4Qe.jpg', 1, 1452585948),
(6, 1, 1, '会员卡.jpg', '/images/1/2016/01/Muat7XLJ3JKpKK3Lht3daqTK93ZyOj.jpg', 1, 1452586004),
(7, 1, 1, '优惠券.jpg', '/images/1/2016/01/hN4actcmnjA3GeCTnXHC8tCh41TAeJ.jpg', 1, 1452587719),
(8, 1, 1, '会员卡.jpg', '/images/1/2016/01/Q5v89m20n5Zx585OaG9504X5n4yom5.jpg', 1, 1452587789),
(9, 1, 1, '积分况换.jpg', '/images/1/2016/01/Vb61AFE17GQAaUOAFUZQjQA6016X1O.jpg', 1, 1452587905),
(10, 1, 1, '大转盘.jpg', '/images/1/2016/01/KOWLnzx2P5RqpnEVMfUpXBUrwFYduW.jpg', 1, 1452587980),
(11, 1, 1, '大转盘.jpg', '/images/1/2016/01/SG08PmP62WBPQPyLccGz2eTQW6g0Bc.jpg', 1, 1452587996),
(12, 1, 1, '刮刮奖.jpg', '/images/1/2016/01/l7ID4h4k42T5DE14I6Hqt4ld6S62Z4.jpg', 1, 1452588049),
(13, 1, 1, '砸金蛋.jpg', '/images/1/2016/01/cqTR5fwpn99FqwWZYE5WxJKXQqJ55I.jpg', 1, 1452588306),
(14, 1, 1, '签到.jpg', '/images/1/2016/01/xmgP1D4zT5XxQm45M1d16Tj5PhtHDg.jpg', 1, 1452588372),
(15, 1, 1, '我的订单.gif', '/images/1/2016/01/Ni1xXilBjhXMV3JAa9BgJh1taJrB3m.gif', 1, 1452589386),
(16, 1, 1, '开始点餐.jpg', '/images/1/2016/01/F3CPHCEtT3OJ3t6zGHCZ29pP0tk2Ot.jpg', 1, 1452589339),
(17, 1, 1, '微信订餐.png', '/images/1/2016/01/O5G5U9R5R5iter4RZ3nJLM55m5L5it.png', 1, 1452591719),
(18, 1, 1, '开始点餐.jpg', '/images/1/2016/01/rfFFqTK3BnZ2TQfstNaBFtt7t1FzBs.jpg', 1, 1452592626),
(19, 1, 1, 'mmexport1452594725280.jpeg', '/images/1/2016/01/y8BBJVPSgvB50N7PxnevwFB5es0EZV.jpeg', 1, 1452602556),
(20, 1, 1, 'mmexport1452594734345.jpeg', '/images/1/2016/01/lI9OM88EO5eK7CEOeUBO678UCBoIKo.jpeg', 1, 1452602678),
(21, 1, 1, 'mmexport1452594751009.jpeg', '/images/1/2016/01/yi7Ku00k003InQH9O0eR9hz0Cq9K70.jpeg', 1, 1452602923),
(22, 1, 1, 'mmexport1452594765616.jpeg', '/images/1/2016/01/swH2SDJ72lh2ZHJc02scYYWh0yusYl.jpeg', 1, 1452603186),
(23, 1, 1, 'mmexport1452594759570.jpeg', '/images/1/2016/01/P525QCvAPCdaA2Eue5CC7dEuqDA202.jpeg', 1, 1452603223),
(24, 1, 1, 'mmexport1452594776398.jpeg', '/images/1/2016/01/I9mG5pA0pX5Rm5bdX65CmpZ0wRcB6M.jpeg', 1, 1452603309),
(25, 1, 1, 'mmexport1452594801758.jpeg', '/images/1/2016/01/MMFu110ubtn2T12B7nD0mN2uBM0U4t.jpeg', 1, 1452603490),
(26, 1, 1, 'mmexport1452594808272.jpeg', '/images/1/2016/01/nY9i9EMj2wLiyWw9MQwbmcLV9zz9yG.jpeg', 1, 1452603679),
(27, 1, 1, 'mmexport1452594814672.jpeg', '/images/1/2016/01/AFZ89FdcUD7j0zrCWjqqZwWD9wUDWz.jpeg', 1, 1452603782),
(28, 1, 1, 'mmexport1452594824944.jpeg', '/images/1/2016/01/D7Sc2OffCoPVYaICJlcSFjCsJS7IVI.jpeg', 1, 1452603864),
(29, 1, 1, 'mmexport1452594838097.jpeg', '/images/1/2016/01/y3Z46p8oS469v94vP4BzQ4ZTpfA9P4.jpeg', 1, 1452603940),
(30, 1, 1, 'mmexport1452594741859.jpeg', '/images/1/2016/01/FoRnrunorU0jua7JrNU5nOqO5HU7js.jpeg', 1, 1452604086),
(31, 1, 1, 'mmexport1452594851332.jpeg', '/images/1/2016/01/eMHmCSdaZHAELLzmuScLUZBsHH4Dez.jpeg', 1, 1452604295),
(32, 1, 1, 'mmexport1452594859776.jpeg', '/images/1/2016/01/iRAIv4iZ0n6B6234Ooaob83r38okik.jpeg', 1, 1452604429),
(33, 1, 1, 'mmexport1452594865156.jpeg', '/images/1/2016/01/sqHi7kqehINnnIV47eHC0iRC4wHvZH.jpeg', 1, 1452604559),
(34, 1, 1, 'mmexport1452594871582.jpeg', '/images/1/2016/01/s36o6py1w11vZT1B6PZbuthV12VYbp.jpeg', 1, 1452604655),
(35, 1, 1, 'mmexport1452594879105.jpeg', '/images/1/2016/01/YICXWXfWUuWRbiLXaAilsBl67I37lI.jpeg', 1, 1452605041),
(36, 1, 1, 'mmexport1452594892303.jpeg', '/images/1/2016/01/NF6bXZ8y40YZ8CCbbc8s4CfBCz4Zof.jpeg', 1, 1452605259),
(37, 1, 1, 'mmexport1452594897461.jpeg', '/images/1/2016/01/WVXPnNWnPVt9xDvR2tt12HpwtnUyAS.jpeg', 1, 1452605362),
(38, 1, 1, 'mmexport1452594906077.jpeg', '/images/1/2016/01/sNfpH0ZU7cztUWPFsPONsu727PiF0m.jpeg', 1, 1452605453),
(39, 1, 1, 'mmexport1452594911589.jpeg', '/images/1/2016/01/ItbYTBDU8kkzTT65td6t6686ub87xx.jpeg', 1, 1452605544),
(40, 1, 1, 'mmexport1452594920715.jpeg', '/images/1/2016/01/w9gmzGmn6dMKnhyNHBm49ggKyI957b.jpeg', 1, 1452606192),
(41, 1, 1, 'mmexport1452594926227.jpeg', '/images/1/2016/01/oOSRqkr4Na4prqKkIOQKdZlAaLlLLL.jpeg', 1, 1452606302),
(42, 1, 1, 'mmexport1452594931860.jpeg', '/images/1/2016/01/kVu817wE0W78UzX0X081u8180pzPOT.jpeg', 1, 1452606362),
(43, 1, 1, 'mmexport1452594937383.jpeg', '/images/1/2016/01/mV38VQ4c9V484L44EVX4XkcLovU9L5.jpeg', 1, 1452606503),
(44, 1, 1, 'mmexport1452594946044.jpeg', '/images/1/2016/01/rxL148rbXZr4r9ZZkW19FXEXXFXF5G.jpeg', 1, 1452606579),
(45, 1, 1, 'mmexport1452594951758.jpeg', '/images/1/2016/01/gLZynL9HyNC5k8nK6lHJxGcLxg6xc2.jpeg', 1, 1452606677),
(46, 1, 1, 'mmexport1452594957489.jpeg', '/images/1/2016/01/etNM6cmyB6I3Cn20Itty23GzB6CNZv.jpeg', 1, 1452606785),
(47, 1, 1, 'mmexport1452594965178.jpeg', '/images/1/2016/01/Mz4D21lYyyHW6BS1gzVY5lghFHwZd6.jpeg', 1, 1452606926),
(48, 1, 1, 'mmexport1452594973125.jpeg', '/images/1/2016/01/Bw99NTzdW9dg83dDIgnI3N8989yG3d.jpeg', 1, 1452607024),
(49, 1, 1, 'tx.JPG', '/images/1/2016/01/Ych8kl7220laDhc82zr0eCi9IHEdE2.JPG', 1, 1452611047),
(50, 1, 1, '首次关注.png', '/images/1/2016/01/u9lx9KOvv9VjhxH3khOF5j399rHXVl.png', 1, 1452657068),
(51, 1, 1, '3.8节.png', '/images/1/2016/01/x2efzk4MldSMW5w2fddOXwlSoWxlt2.png', 1, 1452657651),
(52, 1, 1, '外卖那些事.png', '/images/1/2016/01/W2mxOiOR72rOa0l1D06mmpi97Z07d6.png', 1, 1452657975),
(53, 1, 1, '通知.jpg', '/images/1/2016/01/HY69qY4F6JYFqsQSQhTsXqmqT6Tqtq.jpg', 1, 1452658095),
(54, 1, 1, '砸金蛋.jpg', '/images/1/2016/01/MWc1Ju2ZcR6whJU76Q11Jjju1rBxaw.jpg', 1, 1452662269),
(55, 1, 1, '会员卡.jpg', '/images/1/2016/01/R3F84z39cM489i2h8F39DI2F3cDiCC.jpg', 1, 1452662370),
(56, 1, 1, '20245948_160938992000_2.jpg', '/images/1/2016/01/zPzRKzGkPsoxMxsO8GZRo3RZmxkrBm.jpg', 1, 1452665506),
(57, 1, 1, '1.webp.jpg', '', 1, 1452739261),
(58, 1, 1, '2.webp.jpg', '', 1, 1452739298),
(59, 1, 1, '2.webp.jpg', '', 1, 1452739732),
(60, 1, 1, '3.webp.jpg', '', 1, 1452739900),
(61, 1, 1, '4.webp.jpg', '', 1, 1452739941),
(62, 1, 1, '5.webp.jpg', '', 1, 1452739780),
(63, 1, 1, '6.webp.jpg', '', 1, 1452739817),
(64, 1, 1, '7.webp.jpg', '', 1, 1452739845),
(65, 1, 1, '8.webp.jpg', '', 1, 1452739871),
(66, 1, 1, 'qrcode_for_gh_8fbaa8dd1992_258.jpg', '', 1, 1452739925),
(67, 1, 1, '通知.jpg', '/images/1/2016/01/phIzYxttfPtH8ivYTa65sTVaiwYT5a.jpg', 1, 1452753320),
(68, 1, 1, 'qrcode_for_gh_8fbaa8dd1992_258.jpg', '', 1, 1452755056),
(69, 1, 1, 'qrcode_for_gh_8fbaa8dd1992_258.jpg', '', 1, 1452755086),
(70, 1, 1, '竹湾山庄.webp.jpg', '', 1, 1452755181),
(71, 1, 1, '789青春烤吧.webp.jpg', '', 1, 1452755353),
(72, 1, 1, '蒸湘味.webp.jpg', '', 1, 1452755376),
(73, 1, 1, 'qrcode_for_gh_8fbaa8dd1992_258.jpg', '', 1, 1452755570),
(74, 1, 1, '1.webp.jpg', '', 1, 1452780630),
(75, 1, 1, '1.webp.jpg', '', 1, 1452780749),
(76, 1, 1, '1.webp.jpg', '', 1, 1452780808),
(77, 1, 1, '1.webp (1).jpg', '', 1, 1452780854),
(78, 1, 1, '2.webp.jpg', '', 1, 1452780906),
(79, 1, 1, '3.webp.jpg', '', 1, 1452780819),
(80, 1, 1, '4.webp.jpg', '', 1, 1452780878),
(81, 1, 1, '5.webp.jpg', '', 1, 1452780941),
(82, 1, 1, '6.webp.jpg', '', 1, 1452780982),
(83, 1, 1, '7.webp.jpg', '', 1, 1452781018),
(84, 1, 1, '8.webp.jpg', '', 1, 1452781087),
(85, 1, 1, '7.webp.jpg', '', 1, 1452781127);

-- --------------------------------------------------------

--
-- 表的结构 `ims_award`
--

CREATE TABLE IF NOT EXISTS `ims_award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `fansID` int(11) DEFAULT NULL,
  `from_user` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `prizetype` varchar(10) DEFAULT NULL,
  `award_sn` varchar(50) DEFAULT NULL,
  `createtime` int(10) DEFAULT NULL,
  `consumetime` int(10) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_award_list`
--

CREATE TABLE IF NOT EXISTS `ims_award_list` (
  `award_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '0',
  `deadline` datetime NOT NULL,
  `credit_cost` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '100',
  `content` text NOT NULL,
  `createtime` int(10) NOT NULL,
  PRIMARY KEY (`award_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_award_list`
--

INSERT INTO `ims_award_list` (`award_id`, `weid`, `title`, `logo`, `amount`, `deadline`, `credit_cost`, `price`, `content`, `createtime`) VALUES
(1, 1, 'aaaa', '', 0, '2020-10-10 00:00:00', 1000, 10, '&lt;p&gt;dfaffasas&lt;/p&gt;', 1452613926);

-- --------------------------------------------------------

--
-- 表的结构 `ims_basic_reply`
--

CREATE TABLE IF NOT EXISTS `ims_basic_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL DEFAULT '0',
  `content` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_basic_reply`
--

INSERT INTO `ims_basic_reply` (`id`, `rid`, `content`) VALUES
(1, 1, '这里是默认文字回复');

-- --------------------------------------------------------

--
-- 表的结构 `ims_bigwheel_award`
--

CREATE TABLE IF NOT EXISTS `ims_bigwheel_award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT '0',
  `rid` int(11) DEFAULT '0',
  `fansID` int(11) DEFAULT '0',
  `from_user` varchar(50) DEFAULT '0' COMMENT '用户ID',
  `name` varchar(50) DEFAULT '' COMMENT '名称',
  `description` varchar(200) DEFAULT '' COMMENT '描述',
  `prizetype` varchar(10) DEFAULT '' COMMENT '类型',
  `award_sn` varchar(50) DEFAULT '' COMMENT 'SN',
  `createtime` int(10) DEFAULT '0',
  `consumetime` int(10) DEFAULT '0',
  `status` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `indx_rid` (`rid`),
  KEY `indx_weid` (`weid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_bigwheel_fans`
--

CREATE TABLE IF NOT EXISTS `ims_bigwheel_fans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT '0',
  `fansID` int(11) DEFAULT '0',
  `from_user` varchar(50) DEFAULT '' COMMENT '用户ID',
  `tel` varchar(20) DEFAULT '' COMMENT '登记信息(手机等)',
  `todaynum` int(11) DEFAULT '0',
  `totalnum` int(11) DEFAULT '0',
  `awardnum` int(11) DEFAULT '0',
  `last_time` int(10) DEFAULT '0',
  `createtime` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `indx_rid` (`rid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_bigwheel_fans`
--

INSERT INTO `ims_bigwheel_fans` (`id`, `rid`, `fansID`, `from_user`, `tel`, `todaynum`, `totalnum`, `awardnum`, `last_time`, `createtime`) VALUES
(1, 10, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', '', 1, 1, 0, 1452528000, 1452614173);

-- --------------------------------------------------------

--
-- 表的结构 `ims_bigwheel_reply`
--

CREATE TABLE IF NOT EXISTS `ims_bigwheel_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned DEFAULT '0',
  `weid` int(11) DEFAULT '0',
  `title` varchar(50) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `content` varchar(200) DEFAULT '',
  `start_picurl` varchar(200) DEFAULT '',
  `isshow` tinyint(1) DEFAULT '0',
  `ticket_information` varchar(200) DEFAULT '',
  `starttime` int(10) DEFAULT '0',
  `endtime` int(10) DEFAULT '0',
  `repeat_lottery_reply` varchar(50) DEFAULT '',
  `end_theme` varchar(50) DEFAULT '',
  `end_instruction` varchar(200) DEFAULT '',
  `end_picurl` varchar(200) DEFAULT '',
  `c_type_one` varchar(20) DEFAULT '',
  `c_name_one` varchar(50) DEFAULT '',
  `c_num_one` int(11) DEFAULT '0',
  `c_draw_one` int(11) DEFAULT '0',
  `c_rate_one` double DEFAULT '0',
  `c_type_two` varchar(20) DEFAULT '',
  `c_name_two` varchar(50) DEFAULT '',
  `c_num_two` int(11) DEFAULT '0',
  `c_draw_two` int(11) DEFAULT '0',
  `c_rate_two` double DEFAULT '0',
  `c_type_three` varchar(20) DEFAULT '',
  `c_name_three` varchar(50) DEFAULT '',
  `c_num_three` int(11) DEFAULT '0',
  `c_draw_three` int(11) DEFAULT '0',
  `c_rate_three` double DEFAULT '0',
  `c_type_four` varchar(20) DEFAULT '',
  `c_name_four` varchar(50) DEFAULT '',
  `c_num_four` int(11) DEFAULT '0',
  `c_draw_four` int(11) DEFAULT '0',
  `c_rate_four` double DEFAULT '0',
  `c_type_five` varchar(20) DEFAULT '',
  `c_name_five` varchar(50) DEFAULT '',
  `c_num_five` int(11) DEFAULT '0',
  `c_draw_five` int(11) DEFAULT '0',
  `c_rate_five` double DEFAULT '0',
  `c_type_six` varchar(20) DEFAULT '',
  `c_name_six` varchar(50) DEFAULT '',
  `c_num_six` int(11) DEFAULT '0',
  `c_draw_six` int(10) DEFAULT '0',
  `c_rate_six` double DEFAULT '0',
  `total_num` int(11) DEFAULT '0' COMMENT '总获奖人数(自动加)',
  `probability` double DEFAULT '0',
  `award_times` int(11) DEFAULT '0',
  `number_times` int(11) DEFAULT '0',
  `most_num_times` int(11) DEFAULT '0',
  `sn_code` tinyint(4) DEFAULT '0',
  `sn_rename` varchar(20) DEFAULT '',
  `tel_rename` varchar(20) DEFAULT '',
  `copyright` varchar(20) DEFAULT '',
  `show_num` tinyint(2) DEFAULT '0',
  `viewnum` int(11) DEFAULT '0',
  `fansnum` int(11) DEFAULT '0',
  `createtime` int(10) DEFAULT '0',
  `share_title` varchar(200) DEFAULT '',
  `share_desc` varchar(300) DEFAULT '',
  `share_url` varchar(100) DEFAULT '',
  `share_txt` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `indx_rid` (`rid`),
  KEY `indx_weid` (`weid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_bigwheel_reply`
--

INSERT INTO `ims_bigwheel_reply` (`id`, `rid`, `weid`, `title`, `description`, `content`, `start_picurl`, `isshow`, `ticket_information`, `starttime`, `endtime`, `repeat_lottery_reply`, `end_theme`, `end_instruction`, `end_picurl`, `c_type_one`, `c_name_one`, `c_num_one`, `c_draw_one`, `c_rate_one`, `c_type_two`, `c_name_two`, `c_num_two`, `c_draw_two`, `c_rate_two`, `c_type_three`, `c_name_three`, `c_num_three`, `c_draw_three`, `c_rate_three`, `c_type_four`, `c_name_four`, `c_num_four`, `c_draw_four`, `c_rate_four`, `c_type_five`, `c_name_five`, `c_num_five`, `c_draw_five`, `c_rate_five`, `c_type_six`, `c_name_six`, `c_num_six`, `c_draw_six`, `c_rate_six`, `total_num`, `probability`, `award_times`, `number_times`, `most_num_times`, `sn_code`, `sn_rename`, `tel_rename`, `copyright`, `show_num`, `viewnum`, `fansnum`, `createtime`, `share_title`, `share_desc`, `share_url`, `share_txt`) VALUES
(1, 10, 1, '幸运大转盘活动开始了!', '欢迎参加幸运大转盘活动', '', './source/modules/bigwheel/template/style/activity-lottery-start.jpg', 1, '兑奖请联系我们,电话: 13888888888', 1452614100, 1453218900, '亲，继续努力哦~~', '幸运大转盘活动已经结束了', '亲，活动已经结束，请继续关注我们的后续活动哦~', './source/modules/bigwheel/template/style/activity-lottery-end.jpg', '一等奖', '价值99元的2人餐一份', 900, 0, 10, '二等奖', '价值48元的水煮牛肉一份', 960, 0, 10, '三等奖', '价值班15的柠檬奶茶一杯', 920, 0, 0, '', '', 0, 0, 0, '', '', 0, 0, 0, '', '', 0, 0, 0, 2780, 0, 1, 99, 9, 0, 'SN码', '手机号', '', 1, 4, 1, 1452672621, '欢迎参加大转盘活动', '亲，欢迎参加大转盘抽奖活动，祝您好运哦！！ 亲，需要绑定账号才可以参加哦', '', '&lt;p&gt;1. 关注微信公众账号&quot;()&quot;&lt;/p&gt;&lt;p&gt;2. 发送消息&quot;大转盘&quot;, 点击返回的消息即可参加&lt;/p&gt;');

-- --------------------------------------------------------

--
-- 表的结构 `ims_cache`
--

CREATE TABLE IF NOT EXISTS `ims_cache` (
  `key` varchar(50) NOT NULL COMMENT '缓存键名',
  `value` mediumtext NOT NULL COMMENT '缓存内容',
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='缓存表';

--
-- 转存表中的数据 `ims_cache`
--

INSERT INTO `ims_cache` (`key`, `value`) VALUES
('setting', 'a:1:{s:5:"basic";a:1:{s:8:"template";s:7:"m_style";}}'),
('announcement', 'a:3:{s:6:"status";N;s:7:"content";N;s:10:"lastupdate";i:1452558567;}'),
('menus:platform', 'a:0:{}'),
('menus:site', 'a:0:{}'),
('modules', 'a:27:{s:5:"basic";a:14:{s:3:"mid";s:1:"1";s:4:"name";s:5:"basic";s:4:"type";s:0:"";s:5:"title";s:18:"基本文字回复";s:7:"version";s:3:"1.0";s:7:"ability";s:24:"和您进行简单对话";s:11:"description";s:201:"一问一答得简单对话. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的回复内容.";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:18:"http://www.we7.cc/";s:8:"settings";s:1:"0";s:10:"subscribes";s:0:"";s:7:"handles";s:0:"";s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"1";}s:4:"news";a:14:{s:3:"mid";s:1:"2";s:4:"name";s:4:"news";s:4:"type";s:0:"";s:5:"title";s:24:"基本混合图文回复";s:7:"version";s:3:"1.0";s:7:"ability";s:33:"为你提供生动的图文资讯";s:11:"description";s:272:"一问一答得简单对话, 但是回复内容包括图片文字等更生动的媒体内容. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的图文回复内容.";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:18:"http://www.we7.cc/";s:8:"settings";s:1:"0";s:10:"subscribes";s:0:"";s:7:"handles";s:0:"";s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"1";}s:5:"music";a:14:{s:3:"mid";s:1:"3";s:4:"name";s:5:"music";s:4:"type";s:0:"";s:5:"title";s:18:"基本语音回复";s:7:"version";s:3:"1.0";s:7:"ability";s:39:"提供语音、音乐等音频类回复";s:11:"description";s:183:"在回复规则中可选择具有语音、音乐等音频类的回复内容，并根据用户所设置的特定关键字精准的返回给粉丝，实现一问一答得简单对话。";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:18:"http://www.we7.cc/";s:8:"settings";s:1:"0";s:10:"subscribes";s:0:"";s:7:"handles";s:0:"";s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"1";}s:7:"userapi";a:14:{s:3:"mid";s:1:"4";s:4:"name";s:7:"userapi";s:4:"type";s:0:"";s:5:"title";s:21:"自定义接口回复";s:7:"version";s:3:"1.1";s:7:"ability";s:33:"更方便的第三方接口设置";s:11:"description";s:141:"自定义接口又称第三方接口，可以让开发者更方便的接入微擎系统，高效的与微信公众平台进行对接整合。";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:18:"http://www.we7.cc/";s:8:"settings";s:1:"0";s:10:"subscribes";s:0:"";s:7:"handles";s:0:"";s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"1";}s:4:"fans";a:14:{s:3:"mid";s:1:"5";s:4:"name";s:4:"fans";s:4:"type";s:8:"customer";s:5:"title";s:12:"粉丝管理";s:7:"version";s:3:"1.1";s:7:"ability";s:21:"关注的粉丝管理";s:11:"description";s:0:"";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:74:"http://bbs.we7.cc/forum.php?mod=forumdisplay&fid=36&filter=typeid&typeid=1";s:8:"settings";s:1:"0";s:10:"subscribes";a:8:{i:0;s:4:"text";i:1;s:5:"image";i:2;s:5:"voice";i:3;s:5:"video";i:4;s:8:"location";i:5;s:4:"link";i:6;s:9:"subscribe";i:7;s:11:"unsubscribe";}s:7:"handles";a:0:{}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"1";}s:6:"member";a:14:{s:3:"mid";s:1:"6";s:4:"name";s:6:"member";s:4:"type";s:8:"customer";s:5:"title";s:9:"微会员";s:7:"version";s:3:"1.2";s:7:"ability";s:12:"会员管理";s:11:"description";s:12:"会员管理";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";s:0:"";s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"1";}s:9:"shopping3";a:14:{s:3:"mid";s:1:"8";s:4:"name";s:9:"shopping3";s:4:"type";s:8:"business";s:5:"title";s:12:"新微餐饮";s:7:"version";s:3:"3.2";s:7:"ability";s:20:"微商城(餐饮版)";s:11:"description";s:20:"微商城 for 餐饮";s:6:"author";s:12:"超级无聊";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:5:"album";a:14:{s:3:"mid";s:1:"9";s:4:"name";s:5:"album";s:4:"type";s:8:"business";s:5:"title";s:9:"微相册";s:7:"version";s:3:"1.7";s:7:"ability";s:45:"展示一系列图片来介绍你的公众号";s:11:"description";s:0:"";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:17:"http://www.we7.cc";s:8:"settings";s:1:"1";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:4:"site";a:14:{s:3:"mid";s:2:"10";s:4:"name";s:4:"site";s:4:"type";s:8:"business";s:5:"title";s:14:"微文章(CMS)";s:7:"version";s:3:"2.1";s:7:"ability";s:48:"展示一个手机网页来介绍你的公众号";s:11:"description";s:0:"";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:17:"http://www.we7.cc";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:8:"shopping";a:14:{s:3:"mid";s:2:"12";s:4:"name";s:8:"shopping";s:4:"type";s:8:"business";s:5:"title";s:9:"微商城";s:7:"version";s:3:"2.1";s:7:"ability";s:9:"微商城";s:11:"description";s:9:"微商城";s:6:"author";s:13:"WeEngine Team";s:3:"url";s:0:"";s:8:"settings";s:1:"1";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:8:"bigwheel";a:14:{s:3:"mid";s:2:"13";s:4:"name";s:8:"bigwheel";s:4:"type";s:8:"activity";s:5:"title";s:9:"大转盘";s:7:"version";s:5:"1.1.2";s:7:"ability";s:21:"大转盘营销抽奖";s:11:"description";s:21:"大转盘营销抽奖";s:6:"author";s:4:"ewei";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:6:"credit";a:14:{s:3:"mid";s:2:"14";s:4:"name";s:6:"credit";s:4:"type";s:8:"activity";s:5:"title";s:12:"积分兑换";s:7:"version";s:3:"1.0";s:7:"ability";s:12:"积分兑换";s:11:"description";s:171:"积分兑换，签到积分，购物积分，酒店积分兑换。通过本模块进行营销活动，可以获得用户的真实姓名、手机号码、邮寄地址等。";s:6:"author";s:6:"晓楚";s:3:"url";s:26:"http://blog.csdn.net/maray";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:9:"cgtsignin";a:14:{s:3:"mid";s:2:"15";s:4:"name";s:9:"cgtsignin";s:4:"type";s:8:"services";s:5:"title";s:12:"图文签到";s:7:"version";s:3:"1.0";s:7:"ability";s:12:"图文签到";s:11:"description";s:45:"可自由设置签到时间、奖励积分等";s:6:"author";s:31:"福州程序员 qq群:342893058";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:8:"smashegg";a:14:{s:3:"mid";s:2:"16";s:4:"name";s:8:"smashegg";s:4:"type";s:8:"activity";s:5:"title";s:9:"砸金蛋";s:7:"version";s:3:"1.5";s:7:"ability";s:48:"砸金蛋，抽奖营销活动，带兑换页面";s:11:"description";s:48:"砸金蛋，抽奖营销活动，带兑换页面";s:6:"author";s:9:"微动力";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:13:"izc_strcoupon";a:14:{s:3:"mid";s:2:"17";s:4:"name";s:13:"izc_strcoupon";s:4:"type";s:8:"customer";s:5:"title";s:9:"优惠券";s:7:"version";s:3:"1.3";s:7:"ability";s:9:"各种券";s:11:"description";s:9:"各种券";s:6:"author";s:12:"智策&strai";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:7:"scratch";a:14:{s:3:"mid";s:2:"18";s:4:"name";s:7:"scratch";s:4:"type";s:8:"activity";s:5:"title";s:9:"刮刮卡";s:7:"version";s:3:"1.2";s:7:"ability";s:21:"刮刮卡营销抽奖";s:11:"description";s:165:"刮刮卡是指卡上的一种覆盖数字和字母密码等文字的涂层，因此刮刮卡也叫密码覆膜卡、帐户卡或记账密码卡。客户端可兑奖";s:6:"author";s:12:"超级无聊";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:9:"ewei_tbzs";a:14:{s:3:"mid";s:2:"19";s:4:"name";s:9:"ewei_tbzs";s:4:"type";s:6:"server";s:5:"title";s:18:"淘宝同步助手";s:7:"version";s:3:"0.1";s:7:"ability";s:32:"淘宝商品同步 For 微商城";s:11:"description";s:56:"淘宝商品抓取, 从淘宝，天猫抓取商品数据";s:6:"author";s:9:"微动力";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:5:"icard";a:14:{s:3:"mid";s:2:"20";s:4:"name";s:5:"icard";s:4:"type";s:8:"business";s:5:"title";s:15:"微信会员卡";s:7:"version";s:3:"2.2";s:7:"ability";s:30:"新一代电子移动会员卡";s:11:"description";s:30:"新一代电子移动会员卡";s:6:"author";s:15:"迷失卍国度";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:5:"nsign";a:14:{s:3:"mid";s:2:"21";s:4:"name";s:5:"nsign";s:4:"type";s:8:"business";s:5:"title";s:15:"签到高级版";s:7:"version";s:3:"1.5";s:7:"ability";s:6:"签到";s:11:"description";s:6:"签到";s:6:"author";s:9:"微动力";s:3:"url";s:0:"";s:8:"settings";s:1:"1";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:3:"reg";a:14:{s:3:"mid";s:2:"22";s:4:"name";s:3:"reg";s:4:"type";s:8:"customer";s:5:"title";s:12:"会员注册";s:7:"version";s:4:"1.24";s:7:"ability";s:18:"会员注册模块";s:11:"description";s:120:"基于ＦＡＮＳ表的会员管理系统，增加会员坐标，会员一些相关信息，以及会员积分功能。";s:6:"author";s:0:"";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:4:{i:0;s:4:"text";i:1;s:9:"subscribe";i:2;s:11:"unsubscribe";i:3;s:5:"click";}s:7:"handles";a:3:{i:0;s:5:"image";i:1;s:8:"location";i:2;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:6:"chaxun";a:14:{s:3:"mid";s:2:"23";s:4:"name";s:6:"chaxun";s:4:"type";s:5:"other";s:5:"title";s:12:"实用工具";s:7:"version";s:3:"1.5";s:7:"ability";s:12:"信息查询";s:11:"description";s:12:"信息查询";s:6:"author";s:9:"微信通";s:3:"url";s:12:"wx.qfinfo.cn";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:0:{}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:8:"commform";a:14:{s:3:"mid";s:2:"24";s:4:"name";s:8:"commform";s:4:"type";s:5:"other";s:5:"title";s:12:"通用表单";s:7:"version";s:3:"0.1";s:7:"ability";s:33:"自定义生成通用维护表单";s:11:"description";s:33:"自定义生成通用维护表单";s:6:"author";s:13:"Godietion Koo";s:3:"url";s:20:"http://beidoulbs.com";s:8:"settings";s:1:"1";s:10:"subscribes";a:1:{i:0;s:4:"text";}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:3:"msg";a:14:{s:3:"mid";s:2:"25";s:4:"name";s:3:"msg";s:4:"type";s:8:"services";s:5:"title";s:9:"留言板";s:7:"version";s:3:"0.1";s:7:"ability";s:57:"直接在微信界面输入的留言板，方便快捷！";s:11:"description";s:90:"将留言功能融入到微信界面，方便快捷收集用户反馈、意见及建议。";s:6:"author";s:7:"daduing";s:3:"url";s:17:"http://www.we7.cc";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:5:"tools";a:14:{s:3:"mid";s:2:"26";s:4:"name";s:5:"tools";s:4:"type";s:8:"services";s:5:"title";s:15:"便民小工具";s:7:"version";s:5:"1.0.0";s:7:"ability";s:26:"69个实用查询小工具";s:11:"description";s:26:"69个实用查询小工具";s:6:"author";s:12:"紫气东来";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:0:{}s:12:"isrulefields";s:1:"0";s:8:"issystem";s:1:"0";}s:2:"kf";a:14:{s:3:"mid";s:2:"27";s:4:"name";s:2:"kf";s:4:"type";s:8:"customer";s:5:"title";s:12:"客服系统";s:7:"version";s:4:"1.37";s:7:"ability";s:12:"客服交流";s:11:"description";s:57:"为用户提供客服服务。限高级接口权限使用";s:6:"author";s:0:"";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:11:"lxyrtrouter";a:14:{s:3:"mid";s:2:"28";s:4:"name";s:11:"lxyrtrouter";s:4:"type";s:8:"activity";s:5:"title";s:9:"微路由";s:7:"version";s:3:"0.5";s:7:"ability";s:9:"微名片";s:11:"description";s:81:"支持RippleTek路由器接口实现微信与路由器之间的各项应用交互";s:6:"author";s:22:"大路货 QQ:792454007";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}s:10:"lxybuscard";a:14:{s:3:"mid";s:2:"29";s:4:"name";s:10:"lxybuscard";s:4:"type";s:8:"customer";s:5:"title";s:9:"微名片";s:7:"version";s:3:"0.5";s:7:"ability";s:9:"微名片";s:11:"description";s:115:"供企业业务员、销售员进行营销时的名片展示,同时对企业形象及企业产品进行全面展示";s:6:"author";s:19:"大路货-微动力";s:3:"url";s:0:"";s:8:"settings";s:1:"0";s:10:"subscribes";a:0:{}s:7:"handles";a:1:{i:0;s:4:"text";}s:12:"isrulefields";s:1:"1";s:8:"issystem";s:1:"0";}}'),
('fansfields', 'a:49:{i:0;s:2:"id";i:1;s:4:"weid";i:2;s:9:"from_user";i:3;s:4:"salt";i:4;s:6:"follow";i:5;s:7:"credit1";i:6;s:7:"credit2";i:7;s:10:"createtime";i:8;s:8:"realname";i:9;s:8:"nickname";i:10;s:6:"avatar";i:11;s:2:"qq";i:12;s:6:"mobile";i:13;s:6:"fakeid";i:14;s:3:"vip";i:15;s:6:"gender";i:16;s:9:"birthyear";i:17;s:10:"birthmonth";i:18;s:8:"birthday";i:19;s:13:"constellation";i:20;s:6:"zodiac";i:21;s:9:"telephone";i:22;s:6:"idcard";i:23;s:9:"studentid";i:24;s:5:"grade";i:25;s:7:"address";i:26;s:7:"zipcode";i:27;s:11:"nationality";i:28;s:14:"resideprovince";i:29;s:10:"residecity";i:30;s:10:"residedist";i:31;s:14:"graduateschool";i:32;s:7:"company";i:33;s:9:"education";i:34;s:10:"occupation";i:35;s:8:"position";i:36;s:7:"revenue";i:37;s:15:"affectivestatus";i:38;s:10:"lookingfor";i:39;s:9:"bloodtype";i:40;s:6:"height";i:41;s:6:"weight";i:42;s:6:"alipay";i:43;s:3:"msn";i:44;s:5:"email";i:45;s:6:"taobao";i:46;s:4:"site";i:47;s:3:"bio";i:48;s:8:"interest";}'),
('weid:1', 's:1:"1";');

-- --------------------------------------------------------

--
-- 表的结构 `ims_card`
--

CREATE TABLE IF NOT EXISTS `ims_card` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(100) NOT NULL DEFAULT '',
  `color` varchar(255) NOT NULL DEFAULT '',
  `background` varchar(255) NOT NULL DEFAULT '',
  `logo` varchar(255) NOT NULL DEFAULT '',
  `format` varchar(50) NOT NULL DEFAULT '',
  `fields` varchar(1000) NOT NULL DEFAULT '',
  `snpos` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_card_coupon`
--

CREATE TABLE IF NOT EXISTS `ims_card_coupon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `starttime` int(10) NOT NULL DEFAULT '0',
  `endtime` int(10) NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL,
  `pretotal` int(11) NOT NULL DEFAULT '1',
  `total` int(11) NOT NULL DEFAULT '1',
  `content` text NOT NULL,
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL,
  `createtime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_card_log`
--

CREATE TABLE IF NOT EXISTS `ims_card_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1积分，2金额，3优惠券',
  `content` varchar(255) NOT NULL DEFAULT '',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_card_members`
--

CREATE TABLE IF NOT EXISTS `ims_card_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL DEFAULT '',
  `cardsn` varchar(20) NOT NULL DEFAULT '',
  `credit1` varchar(15) NOT NULL DEFAULT '0',
  `credit2` varchar(15) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_card_members_coupon`
--

CREATE TABLE IF NOT EXISTS `ims_card_members_coupon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `couponid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1为正常状态，2为已使用',
  `receiver` varchar(50) NOT NULL,
  `consumetime` int(10) unsigned NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_card_password`
--

CREATE TABLE IF NOT EXISTS `ims_card_password` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_cgt_signin_record`
--

CREATE TABLE IF NOT EXISTS `ims_cgt_signin_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `time` int(11) NOT NULL COMMENT '签到时间',
  `rank` int(11) DEFAULT NULL COMMENT '排名',
  `continuedays` int(11) NOT NULL DEFAULT '0',
  `credit` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `weid` (`weid`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_cgt_signin_reply`
--

CREATE TABLE IF NOT EXISTS `ims_cgt_signin_reply` (
  `id` int(123) NOT NULL AUTO_INCREMENT,
  `rid` int(123) NOT NULL COMMENT '规则ID',
  `awardrules` text,
  `awardinfo` text,
  `days` int(11) NOT NULL DEFAULT '0',
  `credit` int(11) NOT NULL DEFAULT '0',
  `thumb` varchar(255) DEFAULT NULL,
  `start_time` int(11) NOT NULL COMMENT '开始时间',
  `end_time` int(11) NOT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_chax`
--

CREATE TABLE IF NOT EXISTS `ims_chax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `fileicon` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `displayorder` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_cover_reply`
--

CREATE TABLE IF NOT EXISTS `ims_cover_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `rid` int(10) unsigned NOT NULL,
  `module` varchar(30) NOT NULL DEFAULT '',
  `do` varchar(30) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `thumb` varchar(255) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `ims_cover_reply`
--

INSERT INTO `ims_cover_reply` (`id`, `weid`, `rid`, `module`, `do`, `title`, `description`, `thumb`, `url`) VALUES
(1, 1, 3, 'wesite', 'channel', '微站入口设置', '', '', 'mobile.php?act=channel&name=index&weid=1'),
(2, 1, 4, 'izc_strcoupon', 'index', '入口设置', '', 'images/1/2016/01/dEm3341RxLlg3u6Rr3rzRFee3Qx4Qe.jpg', ''),
(3, 1, 5, 'member', 'card', '会员卡入口设置', '', 'images/1/2016/01/Muat7XLJ3JKpKK3Lht3daqTK93ZyOj.jpg', ''),
(4, 1, 6, 'shopping3', 'wlmember', '订单查询入口设置', '', '', ''),
(5, 1, 7, 'shopping3', 'wlindex', '微餐饮入口设置', '', 'images/1/2016/01/F3CPHCEtT3OJ3t6zGHCZ29pP0tk2Ot.jpg', ''),
(6, 1, 9, 'credit', 'award', '积分兑换设置', 'fffffffffffffffffffffffff', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `ims_credit_request`
--

CREATE TABLE IF NOT EXISTS `ims_credit_request` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `award_id` int(10) unsigned NOT NULL,
  `createtime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_default_reply_log`
--

CREATE TABLE IF NOT EXISTS `ims_default_reply_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(11) NOT NULL COMMENT '微信号ID，关联wechats表',
  `from_user` varchar(50) NOT NULL COMMENT '用户的唯一身份ID',
  `lastupdate` int(10) unsigned NOT NULL COMMENT '用户最后发送信息时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_defineform`
--

CREATE TABLE IF NOT EXISTS `ims_defineform` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `weid` varchar(30) NOT NULL DEFAULT '' COMMENT '公众号ID',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '表单名称',
  `ruleid` int(8) DEFAULT '0' COMMENT '规则ID',
  `keyword` varchar(100) DEFAULT '' COMMENT '关键字',
  `intro` varchar(400) NOT NULL DEFAULT '' COMMENT '介绍',
  `content` text NOT NULL COMMENT '内容',
  `time` int(8) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `successtip` varchar(60) NOT NULL DEFAULT '' COMMENT '成功提示',
  `failtip` varchar(60) NOT NULL DEFAULT '' COMMENT '失败提示',
  `endtime` int(8) NOT NULL DEFAULT '0' COMMENT '结束时间',
  `logourl` varchar(100) NOT NULL DEFAULT '' COMMENT 'LOGO',
  `bannerurl` varchar(100) NOT NULL DEFAULT '' COMMENT 'banner',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '表单状态',
  PRIMARY KEY (`id`),
  KEY `weid` (`weid`),
  KEY `endtime` (`endtime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_defineformfields`
--

CREATE TABLE IF NOT EXISTS `ims_defineformfields` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `formid` int(8) NOT NULL DEFAULT '0',
  `displayname` varchar(30) NOT NULL DEFAULT '',
  `fieldname` varchar(30) NOT NULL DEFAULT '',
  `inputtype` varchar(20) NOT NULL DEFAULT '',
  `options` varchar(200) NOT NULL DEFAULT '',
  `require` tinyint(1) NOT NULL DEFAULT '0',
  `display` tinyint(1) NOT NULL DEFAULT '0',
  `regex` varchar(100) NOT NULL DEFAULT '',
  `zindex` tinyint(2) NOT NULL DEFAULT '0',
  `errortip` varchar(100) NOT NULL DEFAULT '',
  `time` int(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `formid` (`formid`,`zindex`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_egg_award`
--

CREATE TABLE IF NOT EXISTS `ims_egg_award` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `title` varchar(50) NOT NULL COMMENT '奖品名称',
  `total` int(11) NOT NULL COMMENT '数量',
  `probalilty` varchar(5) NOT NULL COMMENT '概率单位%',
  `description` varchar(100) NOT NULL DEFAULT '' COMMENT '描述',
  `inkind` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是实物',
  `activation_code` text COMMENT '激活码',
  `activation_url` varchar(200) NOT NULL COMMENT '激活地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_egg_reply`
--

CREATE TABLE IF NOT EXISTS `ims_egg_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `picture` varchar(100) NOT NULL COMMENT '活动图片',
  `description` varchar(100) NOT NULL COMMENT '活动描述',
  `rule` varchar(1000) NOT NULL COMMENT '规则',
  `periodlottery` smallint(10) unsigned NOT NULL DEFAULT '1' COMMENT '0为无周期',
  `maxlottery` tinyint(3) unsigned NOT NULL COMMENT '最大抽奖数',
  `default_tips` varchar(100) NOT NULL COMMENT '默认提示信息',
  `hitcredit` int(11) NOT NULL COMMENT '中奖奖励积分',
  `misscredit` int(11) NOT NULL COMMENT '未中奖奖励积分',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_egg_winner`
--

CREATE TABLE IF NOT EXISTS `ims_egg_winner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `aid` int(10) unsigned NOT NULL COMMENT '奖品ID',
  `award` varchar(100) NOT NULL DEFAULT '' COMMENT '奖品名称',
  `description` varchar(500) NOT NULL DEFAULT '' COMMENT '中奖信息描述',
  `from_user` varchar(50) NOT NULL COMMENT '用户唯一身份ID',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0未领奖，1不需要领奖，2已领奖',
  `createtime` int(10) unsigned NOT NULL COMMENT '获奖日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_ewei_tbzs_goods`
--

CREATE TABLE IF NOT EXISTS `ims_ewei_tbzs_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `pcate` int(10) unsigned NOT NULL DEFAULT '0',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1为实体，2为虚拟',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `unit` varchar(5) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `goodssn` varchar(50) NOT NULL DEFAULT '',
  `productsn` varchar(50) NOT NULL DEFAULT '',
  `marketprice` varchar(10) NOT NULL DEFAULT '',
  `productprice` decimal(10,2) NOT NULL DEFAULT '0.00',
  `costprice` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` int(10) NOT NULL DEFAULT '0',
  `totalcnf` int(11) DEFAULT '0' COMMENT '0 拍下减库存 1 付款减库存 2 永久不减',
  `sales` int(10) unsigned NOT NULL DEFAULT '0',
  `spec` varchar(5000) NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `weight` decimal(10,2) NOT NULL DEFAULT '0.00',
  `credit` int(11) DEFAULT '0',
  `maxbuy` int(11) DEFAULT '0',
  `hasoption` int(11) DEFAULT '0',
  `dispatch` int(11) DEFAULT '0',
  `thumb_url` text,
  `isnew` int(11) DEFAULT '0',
  `ishot` int(11) DEFAULT '0',
  `isdiscount` int(11) DEFAULT '0',
  `istime` int(11) DEFAULT '0',
  `timestart` int(11) DEFAULT '0',
  `timeend` int(11) DEFAULT '0',
  `viewcount` int(11) DEFAULT '0',
  `isrecommand` int(11) DEFAULT '0',
  `deleted` int(11) DEFAULT '0' COMMENT '表示是否删除',
  `taobaoid` varchar(255) DEFAULT '',
  `taobaourl` varchar(255) DEFAULT '',
  `goodsid` int(11) DEFAULT '0',
  `updatetime` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_ewei_tbzs_goods_option`
--

CREATE TABLE IF NOT EXISTS `ims_ewei_tbzs_goods_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(10) DEFAULT '0',
  `title` varchar(50) DEFAULT '',
  `thumb` varchar(60) DEFAULT '',
  `productprice` decimal(10,2) DEFAULT '0.00',
  `marketprice` decimal(10,2) DEFAULT '0.00',
  `costprice` decimal(10,2) DEFAULT '0.00',
  `stock` int(11) DEFAULT '0',
  `weight` decimal(10,2) DEFAULT '0.00',
  `displayorder` int(11) DEFAULT '0',
  `specs` text,
  `skuId` varchar(255) DEFAULT '',
  `optionid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `indx_goodsid` (`goodsid`),
  KEY `indx_displayorder` (`displayorder`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_ewei_tbzs_goods_param`
--

CREATE TABLE IF NOT EXISTS `ims_ewei_tbzs_goods_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(10) DEFAULT '0',
  `title` varchar(50) DEFAULT '',
  `value` text,
  `displayorder` int(11) DEFAULT '0',
  `paramid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `indx_goodsid` (`goodsid`),
  KEY `indx_displayorder` (`displayorder`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_ewei_tbzs_set`
--

CREATE TABLE IF NOT EXISTS `ims_ewei_tbzs_set` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) DEFAULT '0',
  `upload` int(10) DEFAULT '0' COMMENT ' 0 本地 1 七牛',
  `access_key` varchar(255) DEFAULT '0' COMMENT '七牛accesskey',
  `secret_key` varchar(255) DEFAULT '0' COMMENT '七牛secretkey',
  `bucket` varchar(255) DEFAULT '0' COMMENT '七牛bucket',
  `auto` int(10) DEFAULT '0' COMMENT '是否自动导入商城',
  PRIMARY KEY (`id`),
  KEY `indx_weid` (`weid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_ewei_tbzs_spec`
--

CREATE TABLE IF NOT EXISTS `ims_ewei_tbzs_spec` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `displaytype` tinyint(3) unsigned NOT NULL,
  `content` text NOT NULL,
  `goodsid` int(11) DEFAULT '0',
  `displayorder` int(11) DEFAULT '0',
  `propId` varchar(255) DEFAULT '',
  `specid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_ewei_tbzs_spec_item`
--

CREATE TABLE IF NOT EXISTS `ims_ewei_tbzs_spec_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT '0',
  `specid` int(11) DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  `thumb` varchar(255) DEFAULT '',
  `show` int(11) DEFAULT '0',
  `displayorder` int(11) DEFAULT '0',
  `valueId` varchar(255) DEFAULT '',
  `spec_item_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `indx_weid` (`weid`),
  KEY `indx_specid` (`specid`),
  KEY `indx_show` (`show`),
  KEY `indx_displayorder` (`displayorder`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_fans`
--

CREATE TABLE IF NOT EXISTS `ims_fans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL COMMENT '公众号ID',
  `from_user` varchar(50) NOT NULL COMMENT '用户的唯一身份ID',
  `salt` char(8) NOT NULL DEFAULT '' COMMENT '加密盐',
  `follow` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否订阅',
  `credit1` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '积分',
  `credit2` double unsigned NOT NULL DEFAULT '0' COMMENT '余额',
  `createtime` int(10) unsigned NOT NULL COMMENT '加入时间',
  `realname` varchar(10) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(200) NOT NULL DEFAULT '' COMMENT '头像',
  `qq` varchar(15) NOT NULL DEFAULT '' COMMENT 'QQ号',
  `mobile` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `fakeid` varchar(30) NOT NULL DEFAULT '',
  `vip` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'VIP级别,0为普通会员',
  `gender` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别(0:保密 1:男 2:女)',
  `birthyear` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '生日年',
  `birthmonth` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '生日月',
  `birthday` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '生日',
  `constellation` varchar(10) NOT NULL DEFAULT '' COMMENT '星座',
  `zodiac` varchar(5) NOT NULL DEFAULT '' COMMENT '生肖',
  `telephone` varchar(15) NOT NULL DEFAULT '' COMMENT '固定电话',
  `idcard` varchar(30) NOT NULL DEFAULT '' COMMENT '证件号码',
  `studentid` varchar(50) NOT NULL DEFAULT '' COMMENT '学号',
  `grade` varchar(10) NOT NULL DEFAULT '' COMMENT '班级',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '邮寄地址',
  `zipcode` varchar(10) NOT NULL DEFAULT '' COMMENT '邮编',
  `nationality` varchar(30) NOT NULL DEFAULT '' COMMENT '国籍',
  `resideprovince` varchar(30) NOT NULL DEFAULT '' COMMENT '居住省份',
  `residecity` varchar(30) NOT NULL DEFAULT '' COMMENT '居住城市',
  `residedist` varchar(30) NOT NULL DEFAULT '' COMMENT '居住行政区/县',
  `graduateschool` varchar(50) NOT NULL DEFAULT '' COMMENT '毕业学校',
  `company` varchar(50) NOT NULL DEFAULT '' COMMENT '公司',
  `education` varchar(10) NOT NULL DEFAULT '' COMMENT '学历',
  `occupation` varchar(30) NOT NULL DEFAULT '' COMMENT '职业',
  `position` varchar(30) NOT NULL DEFAULT '' COMMENT '职位',
  `revenue` varchar(10) NOT NULL DEFAULT '' COMMENT '年收入',
  `affectivestatus` varchar(30) NOT NULL DEFAULT '' COMMENT '情感状态',
  `lookingfor` varchar(255) NOT NULL DEFAULT '' COMMENT ' 交友目的',
  `bloodtype` varchar(5) NOT NULL DEFAULT '' COMMENT '血型',
  `height` varchar(5) NOT NULL DEFAULT '' COMMENT '身高',
  `weight` varchar(5) NOT NULL DEFAULT '' COMMENT '体重',
  `alipay` varchar(30) NOT NULL DEFAULT '' COMMENT '支付宝帐号',
  `msn` varchar(30) NOT NULL DEFAULT '' COMMENT 'MSN',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '电子邮箱',
  `taobao` varchar(30) NOT NULL DEFAULT '' COMMENT '阿里旺旺',
  `site` varchar(30) NOT NULL DEFAULT '' COMMENT '主页',
  `bio` text NOT NULL COMMENT '自我介绍',
  `interest` text NOT NULL COMMENT '兴趣爱好',
  `wxusr` varchar(100) NOT NULL COMMENT '微信号',
  `age` int(4) NOT NULL DEFAULT '18' COMMENT '年龄',
  `x` varchar(200) NOT NULL COMMENT '坐标X',
  `y` varchar(200) NOT NULL COMMENT '坐标Y',
  `city` varchar(255) NOT NULL COMMENT '地址',
  `isblacklist` int(2) NOT NULL COMMENT '黑名单',
  `isshow` int(2) NOT NULL COMMENT '审核与否',
  `isjoin` int(1) NOT NULL DEFAULT '0' COMMENT '在线状态',
  `rid` int(8) NOT NULL COMMENT '规则ID',
  PRIMARY KEY (`id`),
  KEY `weid` (`weid`),
  KEY `idx_from_user` (`from_user`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ims_fans`
--

INSERT INTO `ims_fans` (`id`, `weid`, `from_user`, `salt`, `follow`, `credit1`, `credit2`, `createtime`, `realname`, `nickname`, `avatar`, `qq`, `mobile`, `fakeid`, `vip`, `gender`, `birthyear`, `birthmonth`, `birthday`, `constellation`, `zodiac`, `telephone`, `idcard`, `studentid`, `grade`, `address`, `zipcode`, `nationality`, `resideprovince`, `residecity`, `residedist`, `graduateschool`, `company`, `education`, `occupation`, `position`, `revenue`, `affectivestatus`, `lookingfor`, `bloodtype`, `height`, `weight`, `alipay`, `msn`, `email`, `taobao`, `site`, `bio`, `interest`, `wxusr`, `age`, `x`, `y`, `city`, `isblacklist`, `isshow`, `isjoin`, `rid`) VALUES
(1, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', 'WgoQEsJw', 1, 10, 0, 1452781621, '黄东东', '黄', '', '', '13730717060', '', 0, 1, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 18, '', '', '', 0, 0, 0, 0),
(2, 1, 'okplGuA8LSxUZ2Y_xSxZP0rQiJq0', 'oD3FgGVu', 1, 0, 0, 1452736949, '', '', '', '', '', '', 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 18, '', '', '', 0, 0, 0, 0),
(3, 1, 'okplGuE4qlVqxRhPDxl51C4xHYvc', 'W362y66S', 1, 0, 0, 1452763402, '', '', '', '', '', '', 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 18, '', '', '', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_fans_group`
--

CREATE TABLE IF NOT EXISTS `ims_fans_group` (
  `id` int(3) NOT NULL AUTO_INCREMENT COMMENT '群组id',
  `groupname` varchar(100) NOT NULL COMMENT '群组名',
  `credit` int(11) NOT NULL DEFAULT '0' COMMENT '等级积分',
  `info` varchar(250) NOT NULL COMMENT '说明介绍',
  `weid` tinyint(5) NOT NULL DEFAULT '0' COMMENT '公众号ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_fans_status`
--

CREATE TABLE IF NOT EXISTS `ims_fans_status` (
  `uid` int(15) unsigned NOT NULL COMMENT '用户ID',
  `oid` varchar(35) NOT NULL DEFAULT '0' COMMENT '对话用户OID',
  `wxusr` varchar(80) NOT NULL COMMENT '昵称(微信名)',
  `lastvisit` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后一次登录时间',
  `userzt` tinyint(6) NOT NULL DEFAULT '0' COMMENT '用户在线状态(0-未在线，1-在线，2-锁定,-1-用户离线)',
  `lastmessage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后一次发消息时间',
  `type` varchar(30) NOT NULL COMMENT '用户来自模块',
  `weid` int(5) NOT NULL COMMENT '公号ID',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='会员状态附表';

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_announce`
--

CREATE TABLE IF NOT EXISTS `ims_icard_announce` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `giftid` int(10) NOT NULL DEFAULT '0',
  `from_user` varchar(50) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '通知类型 0代表后台2优惠券3特权4礼品券',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '通知标题',
  `content` varchar(400) NOT NULL DEFAULT '' COMMENT '通知内容',
  `levelid` int(10) NOT NULL DEFAULT '0' COMMENT '所属人群',
  `money` int(10) NOT NULL DEFAULT '0',
  `displayorder` tinyint(4) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_announce`
--

INSERT INTO `ims_icard_announce` (`id`, `weid`, `giftid`, `from_user`, `type`, `title`, `content`, `levelid`, `money`, `displayorder`, `updatetime`, `dateline`) VALUES
(1, 1, 0, '', 0, '会员通知', '&lt;p&gt;fdsfsaasdas&lt;/p&gt;', 0, 0, 0, 1452611840, 1452611840);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_business`
--

CREATE TABLE IF NOT EXISTS `ims_icard_business` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `logo` varchar(200) NOT NULL DEFAULT '' COMMENT '商家logo',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '商家名称',
  `content` text NOT NULL,
  `info` varchar(200) NOT NULL,
  `tel` varchar(20) NOT NULL DEFAULT '' COMMENT '联系电话',
  `location_p` varchar(100) NOT NULL COMMENT '所在地区_省',
  `location_c` varchar(100) NOT NULL COMMENT '所在地区_市',
  `location_a` varchar(100) NOT NULL COMMENT '所在地区_区',
  `category_f` varchar(100) NOT NULL COMMENT '商家类别_大类',
  `category_s` varchar(100) NOT NULL COMMENT '商家类别_小类',
  `place` varchar(200) NOT NULL DEFAULT '',
  `lng` decimal(18,10) NOT NULL DEFAULT '0.0000000000',
  `lat` decimal(18,10) NOT NULL DEFAULT '0.0000000000',
  `address` varchar(200) NOT NULL DEFAULT '',
  `pwd` varchar(20) NOT NULL DEFAULT '',
  `dateline` int(10) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `sort` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_business`
--

INSERT INTO `ims_icard_business` (`id`, `weid`, `logo`, `title`, `content`, `info`, `tel`, `location_p`, `location_c`, `location_a`, `category_f`, `category_s`, `place`, `lng`, `lat`, `address`, `pwd`, `dateline`, `updatetime`, `sort`) VALUES
(1, 1, '', '琪琪外卖订餐', '&lt;p&gt;djhgjdddddddddddddddd&lt;/p&gt;', '微时代会员卡，方便携带收藏，永不挂失', '13730717060', '四川省', '绵阳市', '江油市', '1', '12', '四川省绵阳市江油市解放路北段', '104.7470360000', '31.7937490000', '', '', 1452611344, 1452611344, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_card`
--

CREATE TABLE IF NOT EXISTS `ims_icard_card` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `cardpre` varchar(10) NOT NULL DEFAULT '',
  `cardno` int(10) NOT NULL DEFAULT '0' COMMENT '会员卡号',
  `from_user` varchar(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `coin` decimal(11,2) NOT NULL DEFAULT '0.00' COMMENT '余额',
  `balance_score` int(10) NOT NULL DEFAULT '0' COMMENT '剩余积分',
  `total_score` int(10) NOT NULL DEFAULT '0' COMMENT '总积分',
  `spend_score` int(10) NOT NULL DEFAULT '0' COMMENT '消费积分',
  `sign_score` int(10) NOT NULL DEFAULT '0' COMMENT '签到积分',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总消费金额',
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `dateline` int(10) NOT NULL DEFAULT '0' COMMENT '领卡时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_card_log`
--

CREATE TABLE IF NOT EXISTS `ims_icard_card_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=金额，2=积分',
  `score` int(10) NOT NULL DEFAULT '0' COMMENT '充值的积分或金额',
  `outletid` int(10) NOT NULL DEFAULT '0' COMMENT '门店id',
  `cardid` int(10) NOT NULL DEFAULT '0' COMMENT '会员卡id',
  `dateline` int(10) NOT NULL DEFAULT '0' COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_coupon`
--

CREATE TABLE IF NOT EXISTS `ims_icard_coupon` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `title` varchar(50) NOT NULL COMMENT '优惠券名称',
  `count` int(10) NOT NULL DEFAULT '0' COMMENT '优惠券领取张数',
  `levelid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '所属人群',
  `permoney` int(10) NOT NULL DEFAULT '0' COMMENT '单次消费金额',
  `allmoney` int(10) NOT NULL DEFAULT '0' COMMENT '累计消费金额',
  `content` text NOT NULL COMMENT '详细内容',
  `starttime` int(10) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `endtime` int(10) NOT NULL DEFAULT '0' COMMENT '结束时间',
  `displayorder` tinyint(4) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_coupon`
--

INSERT INTO `ims_icard_coupon` (`id`, `weid`, `title`, `count`, `levelid`, `permoney`, `allmoney`, `content`, `starttime`, `endtime`, `displayorder`, `updatetime`, `dateline`) VALUES
(1, 1, '优惠券', 1, 0, 0, 0, '&lt;p&gt;jjjjjjjjjjjj&lt;/p&gt;', 1451491200, 1453392000, 0, 1452612022, 1452612022);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_gift`
--

CREATE TABLE IF NOT EXISTS `ims_icard_gift` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `title` varchar(100) NOT NULL DEFAULT '',
  `count` tinyint(3) NOT NULL DEFAULT '0' COMMENT '允许数量',
  `picture` varchar(200) NOT NULL DEFAULT '' COMMENT '图片',
  `content` varchar(400) NOT NULL COMMENT '详细内容',
  `needscore` int(10) NOT NULL DEFAULT '0' COMMENT '兑换需要积分',
  `starttime` int(10) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `endtime` int(10) NOT NULL DEFAULT '0' COMMENT '结束时间',
  `displayorder` tinyint(4) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ims_icard_gift`
--

INSERT INTO `ims_icard_gift` (`id`, `weid`, `title`, `count`, `picture`, `content`, `needscore`, `starttime`, `endtime`, `displayorder`, `updatetime`, `dateline`) VALUES
(1, 1, 'aaa', 0, '', '&lt;p&gt;aaaaaaaaaaa&lt;/p&gt;', 100, 1452611820, 1453475820, 0, 1452611900, 1452611900),
(2, 1, 'bbb', 0, '', '&lt;p&gt;bbbbbbbbbbbbb&lt;/p&gt;', 1000, 1452611880, 1453475880, 0, 1452611922, 1452611922),
(3, 1, 'ccc', 0, '', '&lt;p&gt;cccccccc&lt;/p&gt;', 10000, 1452611880, 1453475880, 0, 1452611942, 1452611942);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_level`
--

CREATE TABLE IF NOT EXISTS `ims_icard_level` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0',
  `levelname` varchar(100) NOT NULL DEFAULT '' COMMENT '等级名称',
  `min` int(10) NOT NULL DEFAULT '0' COMMENT '开始积分',
  `max` int(10) NOT NULL DEFAULT '0' COMMENT '结束积分',
  `dateline` int(10) NOT NULL DEFAULT '0' COMMENT '发布日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ims_icard_level`
--

INSERT INTO `ims_icard_level` (`id`, `weid`, `levelname`, `min`, `max`, `dateline`) VALUES
(1, 1, '金牌会员', 10000, 100000, 1452611582),
(2, 1, '银牌会员', 500, 9999, 1452611634),
(3, 1, '普通会员', 0, 499, 1452611671);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_money_log`
--

CREATE TABLE IF NOT EXISTS `ims_icard_money_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `from_user` varchar(50) NOT NULL COMMENT '微信id',
  `payment` tinyint(1) NOT NULL DEFAULT '0' COMMENT '支付方式',
  `outletid` int(10) NOT NULL DEFAULT '0' COMMENT '门店id',
  `giftid` int(10) NOT NULL COMMENT '物品id',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '物品类型',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '消费金额',
  `score` int(10) NOT NULL DEFAULT '0' COMMENT '获得积分',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_outlet`
--

CREATE TABLE IF NOT EXISTS `ims_icard_outlet` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '名称',
  `content` text NOT NULL,
  `tel` varchar(20) NOT NULL DEFAULT '' COMMENT '联系电话',
  `location_p` varchar(100) NOT NULL DEFAULT '' COMMENT '省',
  `location_c` varchar(100) NOT NULL DEFAULT '' COMMENT '市',
  `location_a` varchar(100) NOT NULL DEFAULT '' COMMENT '区',
  `place` varchar(200) NOT NULL DEFAULT '',
  `lat` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '经度',
  `lng` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '纬度',
  `address` varchar(200) NOT NULL COMMENT '地址',
  `is_show` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否在手机端显示',
  `password` varchar(20) NOT NULL DEFAULT '' COMMENT '登录密码',
  `recharging_password` varchar(20) NOT NULL DEFAULT '' COMMENT '充值密码',
  `displayorder` tinyint(3) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_outlet`
--

INSERT INTO `ims_icard_outlet` (`id`, `weid`, `title`, `content`, `tel`, `location_p`, `location_c`, `location_a`, `place`, `lat`, `lng`, `address`, `is_show`, `password`, `recharging_password`, `displayorder`, `updatetime`, `dateline`) VALUES
(1, 1, '一分店', '&lt;p&gt;111111111111111111111111111111111111&lt;/p&gt;', '12345678', '四川省', '绵阳市', '江油市', '四川省绵阳市江油市太平路中段', '31.7716030000', '104.7392210000', '四川省绵阳市江油市解放路北段', 0, '12344321', '12344321', 0, 1452612174, 1452612174);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_privilege`
--

CREATE TABLE IF NOT EXISTS `ims_icard_privilege` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '特权名称',
  `count` tinyint(3) NOT NULL DEFAULT '0' COMMENT '允许购买数量',
  `levelids` varchar(200) NOT NULL DEFAULT '' COMMENT '所属人群',
  `content` text NOT NULL COMMENT '详细内容',
  `starttime` int(10) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `endtime` int(10) NOT NULL DEFAULT '0' COMMENT '结束时间',
  `displayorder` tinyint(3) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_privilege`
--

INSERT INTO `ims_icard_privilege` (`id`, `weid`, `title`, `count`, `levelids`, `content`, `starttime`, `endtime`, `displayorder`, `updatetime`, `dateline`) VALUES
(1, 1, '会员特权', 0, '0,3,2,1', '&lt;p&gt;fdfsfsfs&lt;br/&gt;&lt;/p&gt;', 1452611700, 1453475700, 0, 1452611767, 1452611767);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_reply`
--

CREATE TABLE IF NOT EXISTS `ims_icard_reply` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0',
  `rid` int(10) NOT NULL DEFAULT '0',
  `title` varchar(100) NOT NULL DEFAULT '',
  `title_not` varchar(100) NOT NULL DEFAULT '' COMMENT '非会员回复标题',
  `description` text NOT NULL COMMENT '会员回复内容',
  `description_not` text NOT NULL COMMENT '非会员回复内容',
  `picture` varchar(200) NOT NULL DEFAULT '' COMMENT '会员回复图片',
  `picture_not` varchar(200) NOT NULL DEFAULT '' COMMENT '非会员回复图片',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_reply`
--

INSERT INTO `ims_icard_reply` (`id`, `weid`, `rid`, `title`, `title_not`, `description`, `description_not`, `picture`, `picture_not`, `dateline`) VALUES
(1, 1, 13, '会员卡,省钱,打折,促销,优先知道,有奖励哦', '申请成为会员', '尊贵vip是您消费身份的体现,会员卡,省钱,打折,促销,优先知道,有奖励哦', '申请成为会员,享受更多优惠', '', '', 1452615235);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_score`
--

CREATE TABLE IF NOT EXISTS `ims_icard_score` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0',
  `card_info` text NOT NULL COMMENT '会员卡使用说明',
  `score_info` text NOT NULL COMMENT '积分规则说明',
  `day_score` int(10) NOT NULL DEFAULT '0' COMMENT '每天签到奖励积分',
  `dayx_score` int(10) NOT NULL DEFAULT '0' COMMENT '连续签到6天积分',
  `payx_score` int(10) NOT NULL DEFAULT '0' COMMENT '消费一元积分',
  `dateline` int(10) NOT NULL DEFAULT '0' COMMENT '发布日期',
  `updatetime` int(10) NOT NULL DEFAULT '0' COMMENT '更新日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_score`
--

INSERT INTO `ims_icard_score` (`id`, `weid`, `card_info`, `score_info`, `day_score`, `dayx_score`, `payx_score`, `dateline`, `updatetime`) VALUES
(1, 1, '&lt;p&gt;hhhhhhhhhhhhh&lt;br/&gt;&lt;/p&gt;', '', 10, 40, 10, 1452611457, 1452611457);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_sign`
--

CREATE TABLE IF NOT EXISTS `ims_icard_sign` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0',
  `from_user` varchar(50) NOT NULL COMMENT '微信id',
  `score` int(10) NOT NULL DEFAULT '0' COMMENT '获得积分',
  `count` tinyint(1) NOT NULL DEFAULT '0' COMMENT '当前连续签到次数',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_sncode`
--

CREATE TABLE IF NOT EXISTS `ims_icard_sncode` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL DEFAULT '0' COMMENT '产品id',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2优惠券3特权4礼品券',
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `sncode` varchar(30) NOT NULL COMMENT 'sn码',
  `title` varchar(40) NOT NULL,
  `from_user` varchar(50) NOT NULL COMMENT '微信id',
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态',
  `outletid` int(10) NOT NULL DEFAULT '0' COMMENT '门店id',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '消费金额',
  `winningtime` int(10) NOT NULL DEFAULT '0' COMMENT '生成时间',
  `usetime` int(10) NOT NULL COMMENT '使用时间',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_style`
--

CREATE TABLE IF NOT EXISTS `ims_icard_style` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `cardpre` varchar(10) NOT NULL DEFAULT '',
  `cardstart` int(10) NOT NULL DEFAULT '100001',
  `cardname` varchar(100) NOT NULL DEFAULT '' COMMENT '会员卡名称',
  `pwd` varchar(20) NOT NULL COMMENT '密码',
  `cardnamecolor` varchar(20) NOT NULL DEFAULT '' COMMENT '会员卡名称颜色',
  `cardnumcolor` varchar(20) NOT NULL DEFAULT '' COMMENT '会员号码颜色',
  `bg` varchar(200) NOT NULL DEFAULT '' COMMENT '背景图片',
  `diybg` varchar(200) NOT NULL DEFAULT '' COMMENT '自定义背景图片',
  `logo` varchar(200) NOT NULL DEFAULT '' COMMENT 'LOGO',
  `dateline` int(11) NOT NULL DEFAULT '0',
  `show_privilege` tinyint(1) NOT NULL DEFAULT '1' COMMENT '首页是否显示特权',
  `show_gift` tinyint(1) NOT NULL DEFAULT '1' COMMENT '首页是否显示礼品券',
  `show_coupon` tinyint(1) NOT NULL DEFAULT '1' COMMENT '首页是否显示优惠券',
  `updatetime` int(11) NOT NULL DEFAULT '0',
  `sort` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_icard_style`
--

INSERT INTO `ims_icard_style` (`id`, `weid`, `cardpre`, `cardstart`, `cardname`, `pwd`, `cardnamecolor`, `cardnumcolor`, `bg`, `diybg`, `logo`, `dateline`, `show_privilege`, `show_gift`, `show_coupon`, `updatetime`, `sort`) VALUES
(1, 1, '', 100001, '会员卡', '12344321', '#820a0a', '#db6d07', './source/modules/icard/template/images/card_bg12.png', './source/modules/icard/template/images/card_bg12.png', '/resource/attachment/images/1/2016/01/Ych8kl7220laDhc82zr0eCi9IHEdE2.JPG', 1452611132, 1, 1, 1, 1452611132, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_icard_user`
--

CREATE TABLE IF NOT EXISTS `ims_icard_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL,
  `from_user` varchar(50) NOT NULL DEFAULT '' COMMENT '微信id',
  `username` varchar(100) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `tel` varchar(20) NOT NULL DEFAULT '' COMMENT '联系电话',
  `birthday` int(10) NOT NULL DEFAULT '0' COMMENT '生日',
  `address` varchar(200) NOT NULL DEFAULT '' COMMENT '联系地址',
  `sex` tinyint(1) NOT NULL DEFAULT '-1' COMMENT '性别',
  `age` tinyint(3) NOT NULL DEFAULT '0' COMMENT '年龄',
  `remark` varchar(400) NOT NULL DEFAULT '' COMMENT '备注',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_cart`
--

CREATE TABLE IF NOT EXISTS `ims_idish_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `storeid` int(10) unsigned NOT NULL,
  `goodsid` int(11) NOT NULL,
  `goodstype` tinyint(1) NOT NULL DEFAULT '1',
  `price` varchar(10) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `total` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_category`
--

CREATE TABLE IF NOT EXISTS `ims_idish_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `storeid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '门店id',
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID,0为第一级',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_email_setting`
--

CREATE TABLE IF NOT EXISTS `ims_idish_email_setting` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `storeid` int(10) unsigned NOT NULL,
  `email_enable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '开启邮箱提醒',
  `email_host` varchar(50) DEFAULT '' COMMENT '邮箱服务器',
  `email_send` varchar(20) DEFAULT '' COMMENT '商户发送邮件邮箱',
  `email_pwd` varchar(20) DEFAULT '' COMMENT '邮箱密码',
  `email_user` varchar(100) DEFAULT '' COMMENT '发信人名称',
  `email` varchar(20) DEFAULT '' COMMENT '商户接收邮件邮箱',
  `email_business_tpl` varchar(200) DEFAULT '' COMMENT '商户接收内容模板',
  `dateline` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_goods`
--

CREATE TABLE IF NOT EXISTS `ims_idish_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `storeid` int(10) unsigned NOT NULL,
  `weid` int(10) unsigned NOT NULL,
  `pcate` int(10) unsigned NOT NULL DEFAULT '0',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `recommend` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否推荐',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `unitname` varchar(5) NOT NULL DEFAULT '份',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `taste` varchar(1000) NOT NULL DEFAULT '' COMMENT '口味',
  `isspecial` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `marketprice` varchar(10) NOT NULL DEFAULT '',
  `productprice` varchar(10) NOT NULL DEFAULT '',
  `subcount` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '被点次数',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_intelligent`
--

CREATE TABLE IF NOT EXISTS `ims_idish_intelligent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `storeid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '门店id',
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `name` int(10) NOT NULL DEFAULT '0' COMMENT '适用人数',
  `content` varchar(1000) NOT NULL DEFAULT '' COMMENT '菜品',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_nave`
--

CREATE TABLE IF NOT EXISTS `ims_idish_nave` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `type` int(10) NOT NULL DEFAULT '-1' COMMENT '链接类型 -1:自定义 1:首页2:门店3:菜单列表4:我的菜单',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '导航名称',
  `link` varchar(200) NOT NULL DEFAULT '' COMMENT '导航链接',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_order`
--

CREATE TABLE IF NOT EXISTS `ims_idish_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL COMMENT '公众号id',
  `storeid` int(10) unsigned NOT NULL COMMENT '门店id',
  `from_user` varchar(50) NOT NULL,
  `ordersn` varchar(30) NOT NULL COMMENT '订单号',
  `totalnum` tinyint(4) DEFAULT NULL COMMENT '总数量',
  `totalprice` varchar(10) NOT NULL COMMENT '总金额',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-1取消状态，0普通状态，1为确认付款方式，2为成功',
  `paytype` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1余额，2在线，3到付',
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `address` varchar(250) NOT NULL DEFAULT '' COMMENT '地址',
  `tel` varchar(50) NOT NULL DEFAULT '' COMMENT '联系电话',
  `meal_time` varchar(50) NOT NULL DEFAULT '' COMMENT '就餐时间',
  `counts` tinyint(4) DEFAULT '0' COMMENT '预订人数',
  `seat_type` tinyint(1) DEFAULT '0' COMMENT '位置类型1大厅2包间',
  `carports` tinyint(3) DEFAULT '0' COMMENT '车位',
  `dining_mode` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '用餐类型 1:到店 2:外卖',
  `remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '备注',
  `tables` varchar(10) NOT NULL DEFAULT '' COMMENT '桌号',
  `print_sta` tinyint(1) DEFAULT '-1' COMMENT '打印状态',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_order_goods`
--

CREATE TABLE IF NOT EXISTS `ims_idish_order_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `storeid` int(10) unsigned NOT NULL,
  `orderid` int(10) unsigned NOT NULL,
  `goodsid` int(10) unsigned NOT NULL,
  `price` varchar(10) NOT NULL,
  `total` int(10) unsigned NOT NULL DEFAULT '1',
  `dateline` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_print_setting`
--

CREATE TABLE IF NOT EXISTS `ims_idish_print_setting` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `storeid` int(10) unsigned NOT NULL,
  `print_status` tinyint(1) NOT NULL,
  `print_type` tinyint(1) NOT NULL,
  `print_usr` varchar(50) DEFAULT '',
  `print_nums` tinyint(3) DEFAULT '1',
  `print_top` varchar(40) DEFAULT '',
  `print_bottom` varchar(40) DEFAULT '',
  `dateline` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_reply`
--

CREATE TABLE IF NOT EXISTS `ims_idish_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '入口类型',
  `storeid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '入口门店',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `picture` varchar(255) NOT NULL DEFAULT '',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加日期',
  PRIMARY KEY (`id`),
  KEY `idx_rid` (`rid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_setting`
--

CREATE TABLE IF NOT EXISTS `ims_idish_setting` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) DEFAULT '' COMMENT '网站名称',
  `thumb` varchar(200) DEFAULT '' COMMENT '背景图',
  `entrance_type` tinyint(1) unsigned NOT NULL COMMENT '入口类型1:首页2门店列表3菜品列表4我的菜单',
  `entrance_storeid` tinyint(1) unsigned NOT NULL COMMENT '入口门店id',
  `order_enable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订餐开启',
  `dining_mode` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '用餐类型 1:到店 2:外卖',
  `dateline` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_sms_setting`
--

CREATE TABLE IF NOT EXISTS `ims_idish_sms_setting` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `storeid` int(10) unsigned NOT NULL,
  `sms_enable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '开启短信提醒',
  `sms_verify_enable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '开启短信验证提醒',
  `sms_username` varchar(20) DEFAULT '' COMMENT '平台帐号',
  `sms_pwd` varchar(20) DEFAULT '' COMMENT '平台密码',
  `sms_mobile` varchar(20) DEFAULT '' COMMENT '商户接收短信手机',
  `sms_verify_tpl` varchar(120) DEFAULT '' COMMENT '验证短信模板',
  `sms_business_tpl` varchar(120) DEFAULT '' COMMENT '商户短信模板',
  `sms_user_tpl` varchar(120) DEFAULT '' COMMENT '用户短信模板',
  `dateline` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_idish_stores`
--

CREATE TABLE IF NOT EXISTS `ims_idish_stores` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) NOT NULL DEFAULT '0' COMMENT '公众号id',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '名称',
  `logo` varchar(200) NOT NULL DEFAULT '' COMMENT '商家logo',
  `info` varchar(1000) NOT NULL DEFAULT '' COMMENT '简短描述',
  `content` text NOT NULL COMMENT '简介',
  `tel` varchar(20) NOT NULL DEFAULT '' COMMENT '联系电话',
  `location_p` varchar(100) NOT NULL DEFAULT '' COMMENT '省',
  `location_c` varchar(100) NOT NULL DEFAULT '' COMMENT '市',
  `location_a` varchar(100) NOT NULL DEFAULT '' COMMENT '区',
  `address` varchar(200) NOT NULL COMMENT '地址',
  `place` varchar(200) NOT NULL DEFAULT '',
  `lat` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '经度',
  `lng` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '纬度',
  `is_show` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否在手机端显示',
  `password` varchar(20) NOT NULL DEFAULT '' COMMENT '登录密码',
  `hours` varchar(200) NOT NULL DEFAULT '' COMMENT '营业时间',
  `recharging_password` varchar(20) NOT NULL DEFAULT '' COMMENT '充值密码',
  `thumb_url` varchar(1000) DEFAULT NULL,
  `enable_wifi` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否有wifi',
  `enable_card` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否能刷卡',
  `enable_room` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否有包厢',
  `enable_park` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否有停车',
  `displayorder` tinyint(3) NOT NULL DEFAULT '0',
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `dateline` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_kf`
--

CREATE TABLE IF NOT EXISTS `ims_kf` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `cateid` int(5) NOT NULL DEFAULT '0' COMMENT '分类ID',
  `picture` varchar(100) NOT NULL COMMENT '介绍图片',
  `description` varchar(100) NOT NULL COMMENT '模型描述',
  `default_tips` varchar(100) NOT NULL COMMENT '默认提示信息',
  `send_tips` varchar(200) NOT NULL COMMENT '发送内容提示',
  `wechattype` tinyint(2) NOT NULL DEFAULT '0' COMMENT '公众号类型',
  `timeout` int(18) NOT NULL COMMENT '超时时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_kf_kflog`
--

CREATE TABLE IF NOT EXISTS `ims_kf_kflog` (
  `oid` varchar(80) NOT NULL COMMENT '用户OID',
  `num` int(10) NOT NULL DEFAULT '1' COMMENT '来访次数',
  `cattype` varchar(100) NOT NULL COMMENT '客户类别',
  `bak` varchar(300) NOT NULL COMMENT '备注',
  `lasttime` int(18) NOT NULL COMMENT '最后一次来访时间',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '用户在线状态(0-未在线，1-在线，2-锁定,-1-黑名单)',
  `weid` int(5) NOT NULL COMMENT '公号ID',
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ims_kf_kfuser`
--

CREATE TABLE IF NOT EXISTS `ims_kf_kfuser` (
  `uid` int(15) NOT NULL DEFAULT '0' COMMENT '客服UID',
  `oid` varchar(35) NOT NULL COMMENT '客服OID',
  `formoid` varchar(35) NOT NULL COMMENT '服务的用户ID',
  `nickname` varchar(50) NOT NULL COMMENT '客服昵称',
  `avatar` varchar(100) NOT NULL COMMENT '客服头像',
  `kfzt` tinyint(6) NOT NULL DEFAULT '0' COMMENT '客服状态(0-未在线，1-在线，2-锁定,-1-禁止用户)',
  `rid` int(15) NOT NULL COMMENT '规则RID',
  `groupid` int(10) NOT NULL COMMENT '客服所在用户组ID',
  `weid` int(10) NOT NULL COMMENT '公众号ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ims_kf_statmessage`
--

CREATE TABLE IF NOT EXISTS `ims_kf_statmessage` (
  `id` int(18) NOT NULL AUTO_INCREMENT COMMENT '客服消息ID',
  `workid` varchar(80) NOT NULL COMMENT '工单号',
  `oid` varchar(80) NOT NULL COMMENT '用户OID',
  `kfid` int(10) NOT NULL COMMENT '客服UID',
  `content` varchar(1000) NOT NULL COMMENT '消息内容',
  `messagecat` varchar(30) NOT NULL COMMENT '消息分类（KF/USR）',
  `type` varchar(30) NOT NULL COMMENT '消息类型',
  `weid` int(18) NOT NULL COMMENT '公众号类型',
  `ctime` int(18) NOT NULL COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_kf_work`
--

CREATE TABLE IF NOT EXISTS `ims_kf_work` (
  `id` int(18) NOT NULL AUTO_INCREMENT COMMENT '工单ID',
  `workid` varchar(80) NOT NULL COMMENT '工单号',
  `oid` varchar(80) NOT NULL COMMENT '用户OID',
  `kfid` int(10) NOT NULL COMMENT '客服ID',
  `status` int(3) NOT NULL COMMENT '状态',
  `weid` int(10) NOT NULL COMMENT '公号ID',
  `ctime` int(18) NOT NULL COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_bussiness_card`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_bussiness_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `degree` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `websiteswitch` tinyint(4) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `addrswitch` tinyint(4) DEFAULT NULL,
  `addr` varchar(255) DEFAULT NULL,
  `jw_addr` varchar(255) DEFAULT NULL,
  `lng` varchar(10) DEFAULT NULL,
  `lat` varchar(10) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `dist` varchar(50) DEFAULT NULL,
  `style` varchar(20) DEFAULT 'default',
  `createtime` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_bussiness_card_class`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_bussiness_card_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `cname` varchar(50) DEFAULT NULL,
  `outurl` varchar(255) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `isshow` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_bussiness_card_cop`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_bussiness_card_cop` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `copname` varchar(100) DEFAULT NULL,
  `copintro` varchar(255) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `addr` varchar(255) DEFAULT NULL,
  `jw_addr` varchar(255) DEFAULT NULL,
  `lng` varchar(10) DEFAULT NULL,
  `lat` varchar(10) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `dist` varchar(50) DEFAULT NULL,
  `bankuser` varchar(50) DEFAULT NULL,
  `bankname` varchar(50) DEFAULT NULL,
  `bankaccount` varchar(50) DEFAULT NULL,
  `createtime` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_bussiness_card_reply`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_bussiness_card_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '规则id',
  `title` varchar(50) NOT NULL COMMENT '规则标题',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `picture` varchar(100) DEFAULT NULL COMMENT '图片',
  `cid` int(10) unsigned NOT NULL COMMENT '名片id',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '开关状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_rtrouter_authentication`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_rtrouter_authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `routerid` int(11) DEFAULT NULL,
  `fromuser` varchar(100) DEFAULT NULL,
  `createtime` int(11) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  `resultmemo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_rtrouter_info`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_rtrouter_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `iurl` varchar(255) DEFAULT NULL,
  `rname` varchar(100) DEFAULT NULL,
  `appid` varchar(100) DEFAULT NULL,
  `appkey` varchar(100) DEFAULT NULL,
  `nodeid` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_lxy_rtrouter_reply`
--

CREATE TABLE IF NOT EXISTS `ims_lxy_rtrouter_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '规则id',
  `oktip` varchar(255) NOT NULL COMMENT '规则标题',
  `routerid` int(10) unsigned NOT NULL COMMENT '名片id',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '开关状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_members`
--

CREATE TABLE IF NOT EXISTS `ims_members` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `groupid` int(10) unsigned NOT NULL DEFAULT '0',
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(200) NOT NULL COMMENT '用户密码',
  `salt` varchar(10) NOT NULL COMMENT '加密盐',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '会员状态，0正常，-1禁用',
  `joindate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `joinip` varchar(15) NOT NULL DEFAULT '',
  `lastvisit` int(10) unsigned NOT NULL DEFAULT '0',
  `lastip` varchar(15) NOT NULL DEFAULT '',
  `remark` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_members`
--

INSERT INTO `ims_members` (`uid`, `groupid`, `username`, `password`, `salt`, `status`, `joindate`, `joinip`, `lastvisit`, `lastip`, `remark`) VALUES
(1, 0, 'admin', 'd36e1fe3b86b5a9b7107d85b66dd0bda406b516b', '5283a7cd', 0, 1452558567, '', 1452793371, '223.198.105.153', '');

-- --------------------------------------------------------

--
-- 表的结构 `ims_members_group`
--

CREATE TABLE IF NOT EXISTS `ims_members_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `modules` varchar(5000) NOT NULL DEFAULT '',
  `templates` varchar(5000) NOT NULL DEFAULT '',
  `maxaccount` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '0为不限制',
  `maxsubaccount` int(10) unsigned NOT NULL COMMENT '子公号最多添加数量，为0为不可以添加',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_members_permission`
--

CREATE TABLE IF NOT EXISTS `ims_members_permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `resourceid` int(11) NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1为模块,2为模板',
  PRIMARY KEY (`id`),
  KEY `idx_uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_members_profile`
--

CREATE TABLE IF NOT EXISTS `ims_members_profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `createtime` int(10) unsigned NOT NULL COMMENT '加入时间',
  `realname` varchar(10) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(100) NOT NULL DEFAULT '' COMMENT '头像',
  `qq` varchar(15) NOT NULL DEFAULT '' COMMENT 'QQ号',
  `mobile` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `fakeid` varchar(30) NOT NULL,
  `vip` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'VIP级别,0为普通会员',
  `gender` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别(0:保密 1:男 2:女)',
  `birthyear` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '生日年',
  `birthmonth` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '生日月',
  `birthday` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '生日',
  `constellation` varchar(10) NOT NULL DEFAULT '' COMMENT '星座',
  `zodiac` varchar(5) NOT NULL DEFAULT '' COMMENT '生肖',
  `telephone` varchar(15) NOT NULL DEFAULT '' COMMENT '固定电话',
  `idcard` varchar(30) NOT NULL DEFAULT '' COMMENT '证件号码',
  `studentid` varchar(50) NOT NULL DEFAULT '' COMMENT '学号',
  `grade` varchar(10) NOT NULL DEFAULT '' COMMENT '班级',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '邮寄地址',
  `zipcode` varchar(10) NOT NULL DEFAULT '' COMMENT '邮编',
  `nationality` varchar(30) NOT NULL DEFAULT '' COMMENT '国籍',
  `resideprovince` varchar(30) NOT NULL DEFAULT '' COMMENT '居住省份',
  `residecity` varchar(30) NOT NULL DEFAULT '' COMMENT '居住城市',
  `residedist` varchar(30) NOT NULL DEFAULT '' COMMENT '居住行政区/县',
  `graduateschool` varchar(50) NOT NULL DEFAULT '' COMMENT '毕业学校',
  `company` varchar(50) NOT NULL DEFAULT '' COMMENT '公司',
  `education` varchar(10) NOT NULL DEFAULT '' COMMENT '学历',
  `occupation` varchar(30) NOT NULL DEFAULT '' COMMENT '职业',
  `position` varchar(30) NOT NULL DEFAULT '' COMMENT '职位',
  `revenue` varchar(10) NOT NULL DEFAULT '' COMMENT '年收入',
  `affectivestatus` varchar(30) NOT NULL DEFAULT '' COMMENT '情感状态',
  `lookingfor` varchar(255) NOT NULL DEFAULT '' COMMENT ' 交友目的',
  `bloodtype` varchar(5) NOT NULL DEFAULT '' COMMENT '血型',
  `height` varchar(5) NOT NULL DEFAULT '' COMMENT '身高',
  `weight` varchar(5) NOT NULL DEFAULT '' COMMENT '体重',
  `alipay` varchar(30) NOT NULL DEFAULT '' COMMENT '支付宝帐号',
  `msn` varchar(30) NOT NULL DEFAULT '' COMMENT 'MSN',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '电子邮箱',
  `taobao` varchar(30) NOT NULL DEFAULT '' COMMENT '阿里旺旺',
  `site` varchar(30) NOT NULL DEFAULT '' COMMENT '主页',
  `bio` text NOT NULL COMMENT '自我介绍',
  `interest` text NOT NULL COMMENT '兴趣爱好',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_menu_event`
--

CREATE TABLE IF NOT EXISTS `ims_menu_event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `keyword` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL COMMENT '事件类型',
  `picmd5` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uniacid` (`weid`),
  KEY `picmd5` (`picmd5`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_modules`
--

CREATE TABLE IF NOT EXISTS `ims_modules` (
  `mid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '标识',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT '类型',
  `title` varchar(100) NOT NULL COMMENT '名称',
  `version` varchar(10) NOT NULL DEFAULT '' COMMENT '版本',
  `ability` varchar(500) NOT NULL COMMENT '功能描述',
  `description` varchar(1000) NOT NULL COMMENT '介绍',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `url` varchar(255) NOT NULL COMMENT '发布页面',
  `settings` tinyint(1) NOT NULL DEFAULT '0' COMMENT '扩展设置项',
  `subscribes` varchar(500) NOT NULL DEFAULT '' COMMENT '订阅的消息类型',
  `handles` varchar(500) NOT NULL DEFAULT '' COMMENT '能够直接处理的消息类型',
  `isrulefields` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有规则嵌入项',
  `issystem` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否是系统模块',
  PRIMARY KEY (`mid`),
  KEY `idx_name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- 转存表中的数据 `ims_modules`
--

INSERT INTO `ims_modules` (`mid`, `name`, `type`, `title`, `version`, `ability`, `description`, `author`, `url`, `settings`, `subscribes`, `handles`, `isrulefields`, `issystem`) VALUES
(1, 'basic', '', '基本文字回复', '1.0', '和您进行简单对话', '一问一答得简单对话. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的回复内容.', 'WeEngine Team', 'http://www.we7.cc/', 0, '', '', 1, 1),
(2, 'news', '', '基本混合图文回复', '1.0', '为你提供生动的图文资讯', '一问一答得简单对话, 但是回复内容包括图片文字等更生动的媒体内容. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的图文回复内容.', 'WeEngine Team', 'http://www.we7.cc/', 0, '', '', 1, 1),
(3, 'music', '', '基本语音回复', '1.0', '提供语音、音乐等音频类回复', '在回复规则中可选择具有语音、音乐等音频类的回复内容，并根据用户所设置的特定关键字精准的返回给粉丝，实现一问一答得简单对话。', 'WeEngine Team', 'http://www.we7.cc/', 0, '', '', 1, 1),
(4, 'userapi', '', '自定义接口回复', '1.1', '更方便的第三方接口设置', '自定义接口又称第三方接口，可以让开发者更方便的接入微擎系统，高效的与微信公众平台进行对接整合。', 'WeEngine Team', 'http://www.we7.cc/', 0, '', '', 1, 1),
(5, 'fans', 'customer', '粉丝管理', '1.1', '关注的粉丝管理', '', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&fid=36&filter=typeid&typeid=1', 0, 'a:8:{i:0;s:4:"text";i:1;s:5:"image";i:2;s:5:"voice";i:3;s:5:"video";i:4;s:8:"location";i:5;s:4:"link";i:6;s:9:"subscribe";i:7;s:11:"unsubscribe";}', 'a:0:{}', 0, 1),
(6, 'member', 'customer', '微会员', '1.2', '会员管理', '会员管理', 'WeEngine Team', '', 0, 'a:0:{}', '', 0, 1),
(9, 'album', 'business', '微相册', '1.7', '展示一系列图片来介绍你的公众号', '', 'WeEngine Team', 'http://www.we7.cc', 1, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(8, 'shopping3', 'business', '新微餐饮', '3.2', '微商城(餐饮版)', '微商城 for 餐饮', '超级无聊', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 0, 0),
(10, 'site', 'business', '微文章(CMS)', '2.1', '展示一个手机网页来介绍你的公众号', '', 'WeEngine Team', 'http://www.we7.cc', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(18, 'scratch', 'activity', '刮刮卡', '1.2', '刮刮卡营销抽奖', '刮刮卡是指卡上的一种覆盖数字和字母密码等文字的涂层，因此刮刮卡也叫密码覆膜卡、帐户卡或记账密码卡。客户端可兑奖', '超级无聊', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(12, 'shopping', 'business', '微商城', '2.1', '微商城', '微商城', 'WeEngine Team', '', 1, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 0, 0),
(13, 'bigwheel', 'activity', '大转盘', '1.1.2', '大转盘营销抽奖', '大转盘营销抽奖', 'ewei', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(14, 'credit', 'activity', '积分兑换', '1.0', '积分兑换', '积分兑换，签到积分，购物积分，酒店积分兑换。通过本模块进行营销活动，可以获得用户的真实姓名、手机号码、邮寄地址等。', '晓楚', 'http://blog.csdn.net/maray', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 0, 0),
(15, 'cgtsignin', 'services', '图文签到', '1.0', '图文签到', '可自由设置签到时间、奖励积分等', '福州程序员 qq群:342893058', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(16, 'smashegg', 'activity', '砸金蛋', '1.5', '砸金蛋，抽奖营销活动，带兑换页面', '砸金蛋，抽奖营销活动，带兑换页面', '微动力', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(17, 'izc_strcoupon', 'customer', '优惠券', '1.3', '各种券', '各种券', '智策&strai', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 0, 0),
(19, 'ewei_tbzs', 'server', '淘宝同步助手', '0.1', '淘宝商品同步 For 微商城', '淘宝商品抓取, 从淘宝，天猫抓取商品数据', '微动力', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 0, 0),
(20, 'icard', 'business', '微信会员卡', '2.2', '新一代电子移动会员卡', '新一代电子移动会员卡', '迷失卍国度', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(21, 'nsign', 'business', '签到高级版', '1.5', '签到', '签到', '微动力', '', 1, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(22, 'reg', 'customer', '会员注册', '1.24', '会员注册模块', '基于ＦＡＮＳ表的会员管理系统，增加会员坐标，会员一些相关信息，以及会员积分功能。', '', '', 0, 'a:4:{i:0;s:4:"text";i:1;s:9:"subscribe";i:2;s:11:"unsubscribe";i:3;s:5:"click";}', 'a:3:{i:0;s:5:"image";i:1;s:8:"location";i:2;s:4:"text";}', 1, 0),
(23, 'chaxun', 'other', '实用工具', '1.5', '信息查询', '信息查询', '微信通', 'wx.qfinfo.cn', 0, 'a:0:{}', 'a:0:{}', 0, 0),
(24, 'commform', 'other', '通用表单', '0.1', '自定义生成通用维护表单', '自定义生成通用维护表单', 'Godietion Koo', 'http://beidoulbs.com', 1, 'a:1:{i:0;s:4:"text";}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(25, 'msg', 'services', '留言板', '0.1', '直接在微信界面输入的留言板，方便快捷！', '将留言功能融入到微信界面，方便快捷收集用户反馈、意见及建议。', 'daduing', 'http://www.we7.cc', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(26, 'tools', 'services', '便民小工具', '1.0.0', '69个实用查询小工具', '69个实用查询小工具', '紫气东来', '', 0, 'a:0:{}', 'a:0:{}', 0, 0),
(27, 'kf', 'customer', '客服系统', '1.37', '客服交流', '为用户提供客服服务。限高级接口权限使用', '', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(28, 'lxyrtrouter', 'activity', '微路由', '0.5', '微名片', '支持RippleTek路由器接口实现微信与路由器之间的各项应用交互', '大路货 QQ:792454007', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0),
(29, 'lxybuscard', 'customer', '微名片', '0.5', '微名片', '供企业业务员、销售员进行营销时的名片展示,同时对企业形象及企业产品进行全面展示', '大路货-微动力', '', 0, 'a:0:{}', 'a:1:{i:0;s:4:"text";}', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_modules_bindings`
--

CREATE TABLE IF NOT EXISTS `ims_modules_bindings` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(30) NOT NULL DEFAULT '',
  `entry` varchar(10) NOT NULL DEFAULT '',
  `call` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(50) NOT NULL,
  `do` varchar(30) NOT NULL,
  `state` varchar(200) NOT NULL,
  `direct` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`eid`),
  KEY `idx_module` (`module`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=109 ;

--
-- 转存表中的数据 `ims_modules_bindings`
--

INSERT INTO `ims_modules_bindings` (`eid`, `module`, `entry`, `call`, `title`, `do`, `state`, `direct`) VALUES
(1, 'fans', 'menu', '', '粉丝管理选项', 'settings', '', 0),
(2, 'fans', 'menu', '', '地理位置分布', 'location', '', 0),
(3, 'fans', 'menu', '', '粉丝分组', 'group', '', 0),
(4, 'fans', 'menu', '', '粉丝列表', 'display', '', 0),
(5, 'fans', 'profile', '', '我的资料', 'profile', '', 0),
(6, 'member', 'menu', '', '消费密码管理', 'password', '', 0),
(7, 'member', 'profile', '', '我的会员卡', 'mycard', '', 0),
(8, 'member', 'menu', '', '优惠券管理', 'coupon', '', 0),
(9, 'member', 'menu', '', '商家设置', 'store', '', 0),
(10, 'member', 'menu', '', '会员管理', 'member', '', 0),
(11, 'member', 'menu', '', '会员卡设置', 'card', '', 0),
(12, 'member', 'cover', '', '优惠券入口设置', 'entrycoupon', '', 0),
(13, 'member', 'cover', '', '会员卡入口设置', 'card', '', 0),
(14, 'member', 'profile', '', '我的充值记录', 'mycredit', '', 0),
(15, 'member', 'profile', '', '我的优惠券', 'entrycoupon', '', 0),
(34, 'album', 'home', '', '相册首页', 'list', '', 0),
(33, 'album', 'home', 'getAlbumTiles', '', '', '', 0),
(32, 'album', 'menu', '', '相册列表', 'list', '', 0),
(31, 'album', 'cover', '', '相册列表入口设置', 'list', '', 0),
(21, 'shopping3', 'cover', '', '微餐饮入口设置', 'wlindex', '', 0),
(22, 'shopping3', 'cover', '', '订单查询入口设置', 'wlmember', '', 0),
(23, 'shopping3', 'menu', '', '基本设置', 'shopset', '', 0),
(24, 'shopping3', 'menu', '', '订单管理', 'order', '', 0),
(25, 'shopping3', 'menu', '', '商品分类', 'category', '', 0),
(26, 'shopping3', 'menu', '', '商品管理', 'goods', '', 0),
(27, 'shopping3', 'menu', '', '智能选餐', 'genius', '', 0),
(28, 'shopping3', 'menu', '', '会员管理', 'member', '', 0),
(29, 'shopping3', 'home', '', '微餐饮', 'wlindex', '', 0),
(30, 'shopping3', 'profile', '', '我的订单', 'wlorder', '', 0),
(35, 'site', 'menu', '', '文章管理', 'article', '', 0),
(36, 'site', 'menu', '', '文章分类', 'category', '', 0),
(37, 'site', 'home', 'getCategoryTiles', '', '', '', 0),
(62, 'scratch', 'menu', '', '刮刮卡管理', 'manage', '', 0),
(40, 'shopping', 'cover', '', '商城入口设置', 'list', '', 0),
(41, 'shopping', 'menu', '', '订单管理', 'order', '', 0),
(42, 'shopping', 'menu', '', '商品管理', 'goods', '', 0),
(43, 'shopping', 'menu', '', '商品分类', 'category', '', 0),
(44, 'shopping', 'menu', '', '维权与告警', 'notice', '', 0),
(45, 'shopping', 'home', '', '商城', 'list', '', 0),
(46, 'shopping', 'profile', '', '我的订单', 'myorder', '', 0),
(47, 'bigwheel', 'menu', '', '大转盘管理', 'manage', '', 0),
(48, 'bigwheel', 'home', 'getItemTiles', '', '', '', 0),
(49, 'credit', 'cover', '', '积分兑换设置', 'award', '', 0),
(50, 'credit', 'menu', '', '兑换商品管理', 'award', '', 0),
(51, 'credit', 'menu', '', '兑换请求管理', 'credit', '', 0),
(52, 'credit', 'profile', '', '我的积分', 'mycredit', '', 0),
(53, 'cgtsignin', 'menu', '', '签到信息', 'display', '', 0),
(54, 'cgtsignin', 'home', '', '签到', 'signhome', '', 0),
(55, 'smashegg', 'menu', '', '砸金蛋管理', 'manage', '', 0),
(56, 'smashegg', 'home', '', '砸金蛋微站', 'index', '', 0),
(57, 'izc_strcoupon', 'cover', '', '入口设置', 'index', '', 0),
(58, 'izc_strcoupon', 'menu', '', '优惠券管理', 'manage', '', 0),
(59, 'izc_strcoupon', 'menu', '', '领取记录', 'receive', '', 0),
(60, 'izc_strcoupon', 'menu', '', '使用记录', 'record', '', 0),
(61, 'izc_strcoupon', 'profile', '', '我的优惠券', 'myCoupon', '', 0),
(63, 'scratch', 'home', '', '刮刮卡微站', 'index', '', 0),
(64, 'ewei_tbzs', 'menu', '', '单品获取', 'single', '', 0),
(65, 'ewei_tbzs', 'menu', '', '批量获取', 'many', '', 0),
(66, 'ewei_tbzs', 'menu', '', '整店获取', 'whole', '', 0),
(67, 'ewei_tbzs', 'menu', '', '宝贝仓库', 'goods', '', 0),
(68, 'ewei_tbzs', 'menu', '', '系统设置', 'sysset', '', 0),
(69, 'icard', 'menu', '', '会员卡设置', 'style', '', 0),
(70, 'icard', 'menu', '', '商家设置', 'business', '', 0),
(71, 'icard', 'menu', '', '积分策略', 'score', '', 0),
(72, 'icard', 'menu', '', '等级设置', 'level', '', 0),
(73, 'icard', 'menu', '', '会员特权', 'privilege', '', 0),
(74, 'icard', 'menu', '', '会员管理', 'card', '', 0),
(75, 'icard', 'menu', '', '通知管理', 'announce', '', 0),
(76, 'icard', 'menu', '', '礼品券管理', 'gift', '', 0),
(77, 'icard', 'menu', '', '优惠券管理', 'coupon', '', 0),
(78, 'icard', 'menu', '', '门店系统', 'outlet', '', 0),
(79, 'icard', 'home', '', '微信会员卡', 'wapindex', '', 0),
(80, 'nsign', 'rule', '', '签到统计', 'record', '', 0),
(81, 'nsign', 'rule', '', '中奖名单', 'winners', '', 0),
(82, 'nsign', 'rule', '', '广告管理', 'mngadd', '', 0),
(83, 'nsign', 'home', 'gethometiles', '', '', '', 0),
(84, 'reg', 'rule', '', '会员组管理', 'group', '', 0),
(85, 'reg', 'rule', '', '管理会员', 'manage', '', 0),
(86, 'reg', 'menu', '', '会员组管理', 'group', '', 0),
(87, 'reg', 'menu', '', '管理会员', 'manage', '', 0),
(88, 'chaxun', 'menu', '', '工具管理', 'Display', '', 0),
(89, 'tools', 'cover', '', '封面设置', 'fm', '', 0),
(90, 'kf', 'rule', '', '会员聊天', 'jdchat', '', 0),
(91, 'kf', 'rule', '', '消息记录', 'manage', '', 0),
(92, 'kf', 'rule', '', '客服管理', 'kfset', '', 0),
(93, 'kf', 'rule', '', '客服登录', 'chat', '', 0),
(94, 'kf', 'rule', '', '工单管理', 'work', '', 0),
(95, 'kf', 'rule', '', '工单信息', 'workmessage', '', 0),
(96, 'kf', 'rule', '', '群发消息', 'qunchat', '', 0),
(97, 'kf', 'menu', '', '会员聊天', 'jdchat', '', 0),
(98, 'kf', 'menu', '', '消息记录', 'manage', '', 0),
(99, 'kf', 'menu', '', '客服管理', 'kfset', '', 0),
(100, 'kf', 'menu', '', '客服登录', 'chat', '', 0),
(101, 'kf', 'menu', '', '工单管理', 'work', '', 0),
(102, 'kf', 'menu', '', '工单信息', 'workmessage', '', 0),
(103, 'kf', 'menu', '', '群发消息', 'qunchat', '', 0),
(104, 'lxyrtrouter', 'menu', '', '路由器管理', 'routerlist', '', 0),
(105, 'lxyrtrouter', 'menu', '', '认证记录', 'authlist', '', 0),
(106, 'lxybuscard', 'menu', '', '名片管理', 'cardlist', '', 0),
(107, 'lxybuscard', 'menu', '', '公司设置', 'copadd', '', 0),
(108, 'lxybuscard', 'menu', '', '分类管理', 'classlist', '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_msg`
--

CREATE TABLE IF NOT EXISTS `ims_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `weid` int(11) NOT NULL,
  `msg` text NOT NULL,
  `msg_succ` text NOT NULL,
  `msg_fail` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_msg_reply`
--

CREATE TABLE IF NOT EXISTS `ims_msg_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '规则id',
  `fid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '粉丝id',
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'weid',
  `msg` varchar(200) NOT NULL COMMENT '消息',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_music_reply`
--

CREATE TABLE IF NOT EXISTS `ims_music_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '介绍',
  `url` varchar(300) NOT NULL DEFAULT '' COMMENT '音乐地址',
  `hqurl` varchar(300) NOT NULL DEFAULT '' COMMENT '高清地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_news_reply`
--

CREATE TABLE IF NOT EXISTS `ims_news_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL,
  `parentid` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `thumb` varchar(60) NOT NULL,
  `content` text NOT NULL,
  `url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ims_news_reply`
--

INSERT INTO `ims_news_reply` (`id`, `rid`, `parentid`, `title`, `description`, `thumb`, `content`, `url`) VALUES
(1, 2, 0, '点击进入微站', '微官网辅助外卖点餐把店铺信息、服务、活动等方式来进行更好的展示宣传你的店铺', '/images/1/2016/01/zPzRKzGkPsoxMxsO8GZRo3RZmxkrBm.jpg', '', 'mobile.php?act=channel&name=index&weid=1');

-- --------------------------------------------------------

--
-- 表的结构 `ims_nsign_add`
--

CREATE TABLE IF NOT EXISTS `ims_nsign_add` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `shop` text NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `thumb` text NOT NULL,
  `content` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_nsign_prize`
--

CREATE TABLE IF NOT EXISTS `ims_nsign_prize` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `fromuser` text NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `award` text NOT NULL,
  `time` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_nsign_record`
--

CREATE TABLE IF NOT EXISTS `ims_nsign_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `fromuser` text NOT NULL,
  `username` text NOT NULL,
  `today_rank` int(11) NOT NULL,
  `sign_time` int(11) NOT NULL,
  `last_sign_time` int(11) NOT NULL,
  `continue_sign_days` int(11) NOT NULL,
  `maxcontinue_sign_days` int(11) NOT NULL,
  `total_sign_num` int(11) NOT NULL,
  `maxtotal_sign_num` int(11) NOT NULL,
  `first_sign_days` int(11) NOT NULL,
  `maxfirst_sign_days` int(11) NOT NULL,
  `credit` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_nsign_record`
--

INSERT INTO `ims_nsign_record` (`id`, `rid`, `fromuser`, `username`, `today_rank`, `sign_time`, `last_sign_time`, `continue_sign_days`, `maxcontinue_sign_days`, `total_sign_num`, `maxtotal_sign_num`, `first_sign_days`, `maxfirst_sign_days`, `credit`) VALUES
(1, 8, 'okplGuMiOjTyn_-99ANpf_XvnGps', '黄东东', 1, 1452648786, 1452648786, 1, 1, 1, 1, 1, 1, 10);

-- --------------------------------------------------------

--
-- 表的结构 `ims_nsign_reply`
--

CREATE TABLE IF NOT EXISTS `ims_nsign_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `title` text NOT NULL,
  `picture` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_nsign_reply`
--

INSERT INTO `ims_nsign_reply` (`id`, `rid`, `title`, `picture`, `description`, `content`) VALUES
(1, 8, '签到签到签到', '', '签到签到签到签到签到签到签到签到签到', '<p>签到签到签到签到签到签到签到签到签到</p>');

-- --------------------------------------------------------

--
-- 表的结构 `ims_paylog`
--

CREATE TABLE IF NOT EXISTS `ims_paylog` (
  `plid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL DEFAULT '',
  `weid` int(11) NOT NULL,
  `openid` varchar(40) NOT NULL DEFAULT '',
  `tid` varchar(64) NOT NULL,
  `fee` decimal(10,2) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `module` varchar(50) NOT NULL DEFAULT '',
  `tag` varchar(2000) NOT NULL DEFAULT '',
  PRIMARY KEY (`plid`),
  KEY `idx_weid` (`weid`),
  KEY `idx_openid` (`openid`),
  KEY `idx_tid` (`tid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_profile_fields`
--

CREATE TABLE IF NOT EXISTS `ims_profile_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field` varchar(255) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `displayorder` smallint(6) NOT NULL DEFAULT '0',
  `required` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否必填',
  `unchangeable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否不可修改',
  `showinregister` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否显示在注册表单',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37 ;

--
-- 转存表中的数据 `ims_profile_fields`
--

INSERT INTO `ims_profile_fields` (`id`, `field`, `available`, `title`, `description`, `displayorder`, `required`, `unchangeable`, `showinregister`) VALUES
(1, 'realname', 1, '真实姓名', '', 0, 1, 1, 1),
(2, 'nickname', 1, '昵称', '', 1, 1, 0, 1),
(3, 'avatar', 1, '头像', '', 1, 0, 0, 0),
(4, 'qq', 1, 'QQ号', '', 0, 0, 0, 1),
(5, 'mobile', 1, '手机号码', '', 0, 0, 0, 0),
(6, 'vip', 1, 'VIP级别', '', 0, 0, 0, 0),
(7, 'gender', 1, '性别', '', 0, 0, 0, 0),
(8, 'birthyear', 1, '出生生日', '', 0, 0, 0, 0),
(9, 'constellation', 1, '星座', '', 0, 0, 0, 0),
(10, 'zodiac', 1, '生肖', '', 0, 0, 0, 0),
(11, 'telephone', 1, '固定电话', '', 0, 0, 0, 0),
(12, 'idcard', 1, '证件号码', '', 0, 0, 0, 0),
(13, 'studentid', 1, '学号', '', 0, 0, 0, 0),
(14, 'grade', 1, '班级', '', 0, 0, 0, 0),
(15, 'address', 1, '邮寄地址', '', 0, 0, 0, 0),
(16, 'zipcode', 1, '邮编', '', 0, 0, 0, 0),
(17, 'nationality', 1, '国籍', '', 0, 0, 0, 0),
(18, 'resideprovince', 1, '居住地址', '', 0, 0, 0, 0),
(19, 'graduateschool', 1, '毕业学校', '', 0, 0, 0, 0),
(20, 'company', 1, '公司', '', 0, 0, 0, 0),
(21, 'education', 1, '学历', '', 0, 0, 0, 0),
(22, 'occupation', 1, '职业', '', 0, 0, 0, 0),
(23, 'position', 1, '职位', '', 0, 0, 0, 0),
(24, 'revenue', 1, '年收入', '', 0, 0, 0, 0),
(25, 'affectivestatus', 1, '情感状态', '', 0, 0, 0, 0),
(26, 'lookingfor', 1, ' 交友目的', '', 0, 0, 0, 0),
(27, 'bloodtype', 1, '血型', '', 0, 0, 0, 0),
(28, 'height', 1, '身高', '', 0, 0, 0, 0),
(29, 'weight', 1, '体重', '', 0, 0, 0, 0),
(30, 'alipay', 1, '支付宝帐号', '', 0, 0, 0, 0),
(31, 'msn', 1, 'MSN', '', 0, 0, 0, 0),
(32, 'email', 1, '电子邮箱', '', 0, 0, 0, 0),
(33, 'taobao', 1, '阿里旺旺', '', 0, 0, 0, 0),
(34, 'site', 1, '主页', '', 0, 0, 0, 0),
(35, 'bio', 1, '自我介绍', '', 0, 0, 0, 0),
(36, 'interest', 1, '兴趣爱好', '', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_reg_reply`
--

CREATE TABLE IF NOT EXISTS `ims_reg_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `enter_tips` varchar(300) NOT NULL DEFAULT '' COMMENT '进入提示',
  `quit_tips` varchar(300) NOT NULL DEFAULT '' COMMENT '退出提示',
  `send_tips` varchar(300) NOT NULL DEFAULT '' COMMENT '发表提示',
  `quit_command` varchar(10) NOT NULL DEFAULT '' COMMENT '退出指令',
  `timeout` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '超时时间',
  `isshow` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否需要审核',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_rule`
--

CREATE TABLE IF NOT EXISTS `ims_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0',
  `cid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID',
  `name` varchar(50) NOT NULL DEFAULT '',
  `module` varchar(50) NOT NULL,
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '规则排序',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '规则状态，0禁用，1启用，2置顶',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- 转存表中的数据 `ims_rule`
--

INSERT INTO `ims_rule` (`id`, `weid`, `cid`, `name`, `module`, `displayorder`, `status`) VALUES
(1, 1, 0, '默认文字回复', 'basic', 0, 1),
(2, 1, 0, '点击进入微站', 'news', 0, 1),
(3, 1, 0, '微站入口设置', 'cover', 0, 1),
(4, 1, 0, '入口设置', 'cover', 0, 1),
(5, 1, 0, '会员卡入口设置', 'cover', 0, 1),
(6, 1, 0, '订单查询入口设置', 'cover', 0, 1),
(7, 1, 0, '微餐饮入口设置', 'cover', 0, 1),
(8, 1, 0, '签到', 'nsign', 0, 1),
(9, 1, 0, '积分兑换设置', 'cover', 0, 1),
(10, 1, 0, '大转盘', 'bigwheel', 0, 1),
(14, 1, 0, '砸金蛋', 'smashegg', 0, 1),
(15, 1, 0, '刮刮卡', 'scratch', 0, 1),
(13, 1, 0, '会员卡', 'icard', 0, 1),
(16, 0, 0, '城市天气', 'userapi', 255, 1),
(17, 0, 0, '百度百科', 'userapi', 255, 1),
(18, 0, 0, '即时翻译', 'userapi', 255, 1),
(19, 0, 0, '今日老黄历', 'userapi', 255, 1),
(20, 0, 0, '看新闻', 'userapi', 255, 1),
(21, 0, 0, '快递查询', 'userapi', 255, 1);

-- --------------------------------------------------------

--
-- 表的结构 `ims_rule_keyword`
--

CREATE TABLE IF NOT EXISTS `ims_rule_keyword` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '规则ID',
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `module` varchar(50) NOT NULL COMMENT '对应模块',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '类型1匹配，2包含，3正则',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '规则排序，255为置顶，其它为普通排序',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '规则状态，0禁用，1启用',
  PRIMARY KEY (`id`),
  KEY `idx_content` (`content`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

--
-- 转存表中的数据 `ims_rule_keyword`
--

INSERT INTO `ims_rule_keyword` (`id`, `rid`, `weid`, `module`, `content`, `type`, `displayorder`, `status`) VALUES
(1, 1, 1, 'basic', '文字', 2, 1, 1),
(33, 2, 1, 'news', '关注', 1, 0, 1),
(8, 3, 1, 'cover', '微站', 1, 0, 1),
(12, 4, 1, 'cover', '优惠券', 1, 0, 1),
(5, 5, 1, 'cover', '会员卡', 1, 0, 1),
(11, 6, 1, 'cover', '订单', 1, 0, 1),
(10, 7, 1, 'cover', '餐饮', 1, 0, 1),
(13, 8, 1, 'nsign', '签到', 1, 0, 1),
(15, 9, 1, 'cover', '积分兑换', 1, 0, 1),
(34, 10, 1, 'bigwheel', '大转盘', 1, 0, 1),
(29, 14, 1, 'smashegg', '金蛋', 1, 0, 1),
(35, 15, 1, 'scratch', '刮刮卡', 1, 0, 1),
(24, 13, 1, 'icard', '会员卡', 1, 0, 1),
(32, 2, 1, 'news', '图文', 2, 0, 1),
(36, 16, 0, 'userapi', '^.+天气$', 3, 255, 1),
(37, 17, 0, 'userapi', '^百科.+$', 3, 255, 1),
(38, 17, 0, 'userapi', '^定义.+$', 3, 255, 1),
(39, 18, 0, 'userapi', '^@.+$', 3, 255, 1),
(40, 19, 0, 'userapi', '日历', 1, 255, 1),
(41, 19, 0, 'userapi', '万年历', 1, 255, 1),
(42, 19, 0, 'userapi', '黄历', 1, 255, 1),
(43, 19, 0, 'userapi', '几号', 1, 255, 1),
(44, 20, 0, 'userapi', '新闻', 1, 255, 1),
(45, 21, 0, 'userapi', '^(申通|圆通|中通|汇通|韵达|顺丰|EMS) *[a-z0-9]{1,}$', 3, 255, 1);

-- --------------------------------------------------------

--
-- 表的结构 `ims_scratch_fans`
--

CREATE TABLE IF NOT EXISTS `ims_scratch_fans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `fansID` int(11) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `todaynum` int(11) NOT NULL,
  `totalnum` int(11) NOT NULL,
  `awardnum` int(11) DEFAULT '0',
  `last_time` int(10) NOT NULL,
  `createtime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ims_scratch_fans`
--

INSERT INTO `ims_scratch_fans` (`id`, `rid`, `fansID`, `from_user`, `tel`, `todaynum`, `totalnum`, `awardnum`, `last_time`, `createtime`) VALUES
(1, 12, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', NULL, 0, 0, 0, 0, 1452615050),
(2, 15, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', NULL, 5, 5, 0, 1452674604, 1452674549);

-- --------------------------------------------------------

--
-- 表的结构 `ims_scratch_reply`
--

CREATE TABLE IF NOT EXISTS `ims_scratch_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `start_picurl` varchar(200) NOT NULL,
  `isshow` tinyint(1) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `ticket_information` varchar(200) DEFAULT NULL,
  `starttime` int(10) DEFAULT NULL,
  `endtime` int(10) DEFAULT NULL,
  `Repeat_lottery_reply` varchar(50) DEFAULT NULL,
  `end_theme` varchar(50) DEFAULT NULL,
  `end_instruction` varchar(200) DEFAULT NULL,
  `end_picurl` varchar(200) DEFAULT NULL,
  `c_type_one` varchar(20) DEFAULT NULL,
  `c_name_one` varchar(50) DEFAULT NULL,
  `c_num_one` int(11) DEFAULT '0',
  `c_draw_one` int(11) DEFAULT '0',
  `c_type_two` varchar(20) DEFAULT NULL,
  `c_name_two` varchar(50) DEFAULT NULL,
  `c_num_two` int(11) DEFAULT NULL,
  `c_draw_two` int(11) DEFAULT '0',
  `c_type_three` varchar(20) DEFAULT NULL,
  `c_name_three` varchar(50) DEFAULT NULL,
  `c_num_three` int(11) DEFAULT '0',
  `c_draw_three` int(11) DEFAULT '0',
  `c_type_four` varchar(20) DEFAULT NULL,
  `c_name_four` varchar(50) DEFAULT NULL,
  `c_num_four` int(11) DEFAULT '0',
  `c_draw_four` int(11) DEFAULT '0',
  `c_type_five` varchar(20) DEFAULT NULL,
  `c_name_five` varchar(50) DEFAULT NULL,
  `c_num_five` int(11) DEFAULT NULL,
  `c_draw_five` int(11) DEFAULT '0',
  `c_type_six` varchar(20) DEFAULT NULL,
  `c_name_six` varchar(50) DEFAULT NULL,
  `c_num_six` int(11) DEFAULT '0',
  `c_draw_six` int(10) DEFAULT '0',
  `total_num` int(11) DEFAULT NULL COMMENT '总获奖人数(自动加)',
  `probability` double DEFAULT NULL,
  `award_times` int(11) DEFAULT '0',
  `number_times` int(11) DEFAULT '0',
  `most_num_times` int(11) DEFAULT '0',
  `sn_code` tinyint(4) DEFAULT '0',
  `sn_rename` varchar(20) DEFAULT NULL,
  `tel_rename` varchar(20) DEFAULT NULL,
  `copyright` varchar(20) DEFAULT NULL,
  `show_num` tinyint(2) DEFAULT NULL,
  `viewnum` int(11) DEFAULT '0',
  `fansnum` int(11) DEFAULT '0',
  `createtime` int(10) DEFAULT NULL,
  `share_title` varchar(200) DEFAULT NULL,
  `share_desc` varchar(300) DEFAULT NULL,
  `share_url` varchar(100) DEFAULT NULL,
  `share_txt` varchar(500) DEFAULT NULL,
  `accept_passwrod` varchar(20) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ims_scratch_reply`
--

INSERT INTO `ims_scratch_reply` (`id`, `rid`, `title`, `description`, `content`, `start_picurl`, `isshow`, `keyword`, `ticket_information`, `starttime`, `endtime`, `Repeat_lottery_reply`, `end_theme`, `end_instruction`, `end_picurl`, `c_type_one`, `c_name_one`, `c_num_one`, `c_draw_one`, `c_type_two`, `c_name_two`, `c_num_two`, `c_draw_two`, `c_type_three`, `c_name_three`, `c_num_three`, `c_draw_three`, `c_type_four`, `c_name_four`, `c_num_four`, `c_draw_four`, `c_type_five`, `c_name_five`, `c_num_five`, `c_draw_five`, `c_type_six`, `c_name_six`, `c_num_six`, `c_draw_six`, `total_num`, `probability`, `award_times`, `number_times`, `most_num_times`, `sn_code`, `sn_rename`, `tel_rename`, `copyright`, `show_num`, `viewnum`, `fansnum`, `createtime`, `share_title`, `share_desc`, `share_url`, `share_txt`, `accept_passwrod`, `is_default`) VALUES
(1, 12, 'fdsafafa', 'fafafdafaaaaa', 'dfadfasdfasf', '', 1, '刮刮奖', 'sdaadfasfda', 1450886820, 1478275620, 'adfafa', 'adsafda', 'dfsadfsa', '', 'fadsfaf', 'afdafa', 1222, 0, 'dfvsdvs', '', 0, 0, 'fafaf', '', 0, 0, '', '', 0, 0, '', '', 0, 0, '', '', 0, 0, 1222, 10, 0, 0, 0, 0, 'SN码', '手机号', '', 0, 5, 1, 1452614809, 'afasfasfafsfas', 'dfafdasffafasf', 'fafas', 'fasfasafafasf', 'adafda', 0),
(2, 15, '刮刮卡活动开始了', '欢迎参加刮刮卡抽奖', '亲，请点击进入刮刮奖活动页面，祝您好运哦！', '/source/modules/public/style/scratch/activity-scratch-card-start.jpg', NULL, '刮刮卡', '兑奖请联系我们，电话13899999999', 1452587040, 1488875040, '亲，继续努力哦！', '刮刮卡活动已经结束了', '亲，活动已经结束，请继续关注我们的后续活动哦。', '/source/modules/public/style/scratch/activity-scratch-card-end.jpg', '一等奖', '128元的4人套餐一份', 100, 0, '二等奖', '68元的2人套餐一份', 200, 0, '三等奖', '价值班15的柠檬奶茶一杯', 500, 0, '', '', 0, 0, '', '', 0, 0, '', '', 0, 0, 800, 0, 1, 99, 9, 1, 'SN码', '手机号', '@超级无聊', 1, 6, 1, 1452673560, '欢迎参加刮刮卡活动', '亲，欢迎参加刮刮卡抽奖活动，祝您好运哦！！ 亲，需要绑定账号才可以参加哦', '', '&lt;p&gt;\n	1. 关注微信公众账号&quot;()&quot;\n&lt;/p&gt;\n&lt;p&gt;\n	2. 发送消息&quot;刮刮卡&quot;, 点击返回的消息即可参加\n&lt;/p&gt;', '123456', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_sessions`
--

CREATE TABLE IF NOT EXISTS `ims_sessions` (
  `sid` char(32) NOT NULL DEFAULT '' COMMENT 'sessionid唯一标识',
  `weid` int(10) unsigned NOT NULL COMMENT '所属公众号',
  `from_user` varchar(50) NOT NULL COMMENT '用户唯一标识',
  `data` varchar(500) NOT NULL,
  `expiretime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '超时时间',
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ims_sessions`
--

INSERT INTO `ims_sessions` (`sid`, `weid`, `from_user`, `data`, `expiretime`) VALUES
('c1822b27fcef58bb93fe34761149bcf5', 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', '', 1452785221),
('81a2d4dfa8f1fde6391b47f395a09689', 1, 'okplGuA8LSxUZ2Y_xSxZP0rQiJq0', '', 1452740549),
('5sot4sru6dt1mbkv8kjbgddjj4', 0, '', 'phone|s:11:"13730717060";code|s:6:"438644";', 1452655483),
('0e2eq4pnlis49a295qj01kiln5', 0, '', 'phone|s:11:"13730717060";code|s:6:"676226";', 1452656715),
('4q64bv2g3t12bdit490ki4shv2', 0, '', 'phone|s:11:"18181754802";code|s:6:"092468";', 1452656973),
('b5f52d78437e18bc077d0b4a0401ce87', 1, 'okplGuE4qlVqxRhPDxl51C4xHYvc', '', 1452767002);

-- --------------------------------------------------------

--
-- 表的结构 `ims_settings`
--

CREATE TABLE IF NOT EXISTS `ims_settings` (
  `key` varchar(200) NOT NULL COMMENT '设置键名',
  `value` text NOT NULL COMMENT '设置内容，大量数据将序列化',
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ims_settings`
--

INSERT INTO `ims_settings` (`key`, `value`) VALUES
('basic', 'a:1:{s:8:"template";s:7:"m_style";}');

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_address`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `tel` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_cart`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `goodsid` int(11) NOT NULL,
  `goodstype` tinyint(1) NOT NULL DEFAULT '1',
  `price` varchar(10) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `total` int(10) unsigned NOT NULL,
  `create_time` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `ims_shopping3_cart`
--

INSERT INTO `ims_shopping3_cart` (`id`, `weid`, `goodsid`, `goodstype`, `price`, `from_user`, `total`, `create_time`) VALUES
(7, 1, 1, 1, '18', 'okplGuE4qlVqxRhPDxl51C4xHYvc', 1, 1452763452),
(8, 1, 2, 1, '6', 'okplGuE4qlVqxRhPDxl51C4xHYvc', 1, 1452763452);

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_category`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID,0为第一级',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `ims_shopping3_category`
--

INSERT INTO `ims_shopping3_category` (`id`, `weid`, `name`, `parentid`, `displayorder`, `enabled`) VALUES
(1, 1, '冷菜', 0, 0, 1),
(2, 1, '家常美食', 0, 0, 1),
(3, 1, '川湘美食', 0, 0, 1),
(4, 1, '杭州名菜', 0, 0, 1),
(5, 1, '汤羹煲', 0, 0, 1),
(6, 1, '主食点心', 0, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_express`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_express` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `express_name` varchar(50) DEFAULT NULL,
  `displayorder` int(11) NOT NULL,
  `express_price` varchar(10) DEFAULT NULL,
  `express_area` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_fans`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_fans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `login_nums` int(11) DEFAULT NULL,
  `login_time` int(10) DEFAULT NULL,
  `crteate_time` int(10) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0,拉黑1正常',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_fans_like`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_fans_like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `fansid` int(11) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `goodsid` int(10) unsigned NOT NULL DEFAULT '0',
  `checked` tinyint(1) NOT NULL,
  `create_time` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_genius`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_genius` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `rens` tinyint(4) NOT NULL,
  `displayorder` tinyint(4) NOT NULL,
  `sort` tinyint(4) DEFAULT NULL,
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `nums` tinyint(4) NOT NULL,
  `dishes` text NOT NULL COMMENT '菜品的ID，以逗号隔开',
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_goods`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `pcate` int(10) unsigned NOT NULL DEFAULT '0',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1为实体，2为虚拟',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `isindex` tinyint(1) NOT NULL,
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `unit` varchar(5) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `goodssn` varchar(50) NOT NULL DEFAULT '',
  `productsn` varchar(50) NOT NULL DEFAULT '',
  `marketprice` varchar(10) NOT NULL DEFAULT '',
  `productprice` varchar(10) NOT NULL DEFAULT '',
  `total` int(10) NOT NULL DEFAULT '0',
  `sellnums` int(10) NOT NULL DEFAULT '0',
  `thumb_url` varchar(1000) DEFAULT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `hits` int(10) DEFAULT NULL,
  `label` varchar(2) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- 转存表中的数据 `ims_shopping3_goods`
--

INSERT INTO `ims_shopping3_goods` (`id`, `weid`, `pcate`, `ccate`, `type`, `status`, `displayorder`, `isindex`, `title`, `thumb`, `unit`, `description`, `content`, `goodssn`, `productsn`, `marketprice`, `productprice`, `total`, `sellnums`, `thumb_url`, `createtime`, `hits`, `label`) VALUES
(1, 1, 1, 0, 0, 1, 0, 0, '百切农家鸡', '/resource/attachment/images/1/2016/01/y8BBJVPSgvB50N7PxnevwFB5es0EZV.jpeg', '份', '', '', '', '', '18', '28', 989, 11, '/resource/attachment/images/1/2016/01/y8BBJVPSgvB50N7PxnevwFB5es0EZV.jpeg', 1452602611, NULL, '推荐'),
(2, 1, 1, 0, 0, 1, 0, 0, '剁椒皮蛋', '/resource/attachment/images/1/2016/01/lI9OM88EO5eK7CEOeUBO678UCBoIKo.jpeg', '份', '', '', '', '', '6', '12', 800, 15, '/resource/attachment/images/1/2016/01/lI9OM88EO5eK7CEOeUBO678UCBoIKo.jpeg', 1452602711, NULL, '特价'),
(3, 1, 1, 0, 0, 1, 0, 0, '芥辣黄瓜', '/resource/attachment/images/1/2016/01/FoRnrunorU0jua7JrNU5nOqO5HU7js.jpeg', '份', '', '', '', '', '8', '12', 980, 20, '/resource/attachment/images/1/2016/01/FoRnrunorU0jua7JrNU5nOqO5HU7js.jpeg', 1452602817, NULL, '特价'),
(4, 1, 1, 0, 0, 1, 0, 0, '肉汁小香菇', '/resource/attachment/images/1/2016/01/yi7Ku00k003InQH9O0eR9hz0Cq9K70.jpeg', '份', '', '', '', '', '9', '15', 999, 21, '/resource/attachment/images/1/2016/01/yi7Ku00k003InQH9O0eR9hz0Cq9K70.jpeg', 1452602881, NULL, '推荐'),
(5, 1, 1, 0, 0, 1, 0, 0, '小鱼拌花生', '/resource/attachment/images/1/2016/01/P525QCvAPCdaA2Eue5CC7dEuqDA202.jpeg', '份', '', '', '', '', '6', '13', 980, 70, '/resource/attachment/images/1/2016/01/P525QCvAPCdaA2Eue5CC7dEuqDA202.jpeg', 1452603059, NULL, ''),
(6, 1, 1, 0, 0, 1, 0, 0, '凉拌黑木耳', '/resource/attachment/images/1/2016/01/swH2SDJ72lh2ZHJc02scYYWh0yusYl.jpeg', '份', '', '', '', '', '8', '12', 500, 15, '/resource/attachment/images/1/2016/01/swH2SDJ72lh2ZHJc02scYYWh0yusYl.jpeg', 1452603150, NULL, ''),
(7, 1, 1, 0, 0, 1, 0, 0, '新夫妻肺片', '/resource/attachment/images/1/2016/01/I9mG5pA0pX5Rm5bdX65CmpZ0wRcB6M.jpeg', '份', '', '', '', '', '9', '18', 880, 18, '/resource/attachment/images/1/2016/01/I9mG5pA0pX5Rm5bdX65CmpZ0wRcB6M.jpeg', 1452603340, NULL, ''),
(8, 1, 2, 0, 0, 1, 0, 0, '靓汤煮蛤蜊', '/resource/attachment/images/1/2016/01/MMFu110ubtn2T12B7nD0mN2uBM0U4t.jpeg', '份', '', '', '', '', '8', '15', 900, 45, '/resource/attachment/images/1/2016/01/MMFu110ubtn2T12B7nD0mN2uBM0U4t.jpeg', 1452603524, NULL, '推荐'),
(9, 1, 2, 0, 0, 1, 0, 0, '咸肉丝瓜鱼面筋', '/resource/attachment/images/1/2016/01/nY9i9EMj2wLiyWw9MQwbmcLV9zz9yG.jpeg', '份', '', '', '', '', '9', '14', 900, 55, '/resource/attachment/images/1/2016/01/nY9i9EMj2wLiyWw9MQwbmcLV9zz9yG.jpeg', 1452603685, NULL, '新品'),
(10, 1, 2, 0, 0, 1, 0, 0, '铜盘虾', '/resource/attachment/images/1/2016/01/AFZ89FdcUD7j0zrCWjqqZwWD9wUDWz.jpeg', '份', '', '', '', '', '9', '18', 680, 55, '/resource/attachment/images/1/2016/01/AFZ89FdcUD7j0zrCWjqqZwWD9wUDWz.jpeg', 1452603757, NULL, ''),
(11, 1, 2, 0, 0, 1, 0, 0, '避风塘匣茄子', '/resource/attachment/images/1/2016/01/D7Sc2OffCoPVYaICJlcSFjCsJS7IVI.jpeg', '份', '', '', '', '', '6', '12', 480, 12, '/resource/attachment/images/1/2016/01/D7Sc2OffCoPVYaICJlcSFjCsJS7IVI.jpeg', 1452603885, NULL, ''),
(12, 1, 2, 0, 0, 1, 0, 0, '响油蟮丝', '/resource/attachment/images/1/2016/01/y3Z46p8oS469v94vP4BzQ4ZTpfA9P4.jpeg', '份', '', '', '', '', '8', '15', 600, 25, '/resource/attachment/images/1/2016/01/y3Z46p8oS469v94vP4BzQ4ZTpfA9P4.jpeg', 1452603962, NULL, ''),
(13, 1, 3, 0, 0, 1, 0, 0, '三椒牛蛙', '/resource/attachment/images/1/2016/01/eMHmCSdaZHAELLzmuScLUZBsHH4Dez.jpeg', '份', '', '', '', '', '9', '17', 800, 45, '/resource/attachment/images/1/2016/01/eMHmCSdaZHAELLzmuScLUZBsHH4Dez.jpeg', 1452604317, NULL, '推荐'),
(14, 1, 3, 0, 0, 1, 0, 0, '水煮牛肉', '/resource/attachment/images/1/2016/01/iRAIv4iZ0n6B6234Ooaob83r38okik.jpeg', '份', '', '', '', '', '6', '15', 900, 120, '/resource/attachment/images/1/2016/01/iRAIv4iZ0n6B6234Ooaob83r38okik.jpeg', 1452604447, NULL, '特价'),
(15, 1, 3, 0, 0, 1, 0, 0, '酸汤肥牛', '/resource/attachment/images/1/2016/01/sqHi7kqehINnnIV47eHC0iRC4wHvZH.jpeg', '份', '', '', '', '', '8', '16', 100, 15, '/resource/attachment/images/1/2016/01/sqHi7kqehINnnIV47eHC0iRC4wHvZH.jpeg', 1452604568, NULL, ''),
(16, 1, 3, 0, 0, 1, 0, 0, '麻辣馋嘴蛙', '/resource/attachment/images/1/2016/01/s36o6py1w11vZT1B6PZbuthV12VYbp.jpeg', '', '', '', '', '', '8', '18', 700, 150, '/resource/attachment/images/1/2016/01/s36o6py1w11vZT1B6PZbuthV12VYbp.jpeg', 1452604629, NULL, ''),
(17, 1, 3, 0, 0, 1, 0, 0, '宫保鸡丁', '/resource/attachment/images/1/2016/01/YICXWXfWUuWRbiLXaAilsBl67I37lI.jpeg', '份', '', '', '', '', '7', '14', -1, 0, '/resource/attachment/images/1/2016/01/YICXWXfWUuWRbiLXaAilsBl67I37lI.jpeg', 1452605059, NULL, ''),
(18, 1, 4, 0, 0, 1, 0, 0, '龙进虾仁', '/resource/attachment/images/1/2016/01/NF6bXZ8y40YZ8CCbbc8s4CfBCz4Zof.jpeg', '份', '', '', '', '', '9', '18', 980, 88, '/resource/attachment/images/1/2016/01/NF6bXZ8y40YZ8CCbbc8s4CfBCz4Zof.jpeg', 1452605292, NULL, '推荐'),
(19, 1, 4, 0, 0, 1, 0, 0, '干炸响铃', '/resource/attachment/images/1/2016/01/WVXPnNWnPVt9xDvR2tt12HpwtnUyAS.jpeg', '份', '', '', '', '', '8', '16', 750, 111, '/resource/attachment/images/1/2016/01/WVXPnNWnPVt9xDvR2tt12HpwtnUyAS.jpeg', 1452605394, NULL, '新品'),
(20, 1, 4, 0, 0, 1, 0, 0, '番虾锅巴', '/resource/attachment/images/1/2016/01/sNfpH0ZU7cztUWPFsPONsu727PiF0m.jpeg', '份', '', '', '', '', '6', '12', 990, 205, '/resource/attachment/images/1/2016/01/sNfpH0ZU7cztUWPFsPONsu727PiF0m.jpeg', 1452605484, NULL, ''),
(21, 1, 4, 0, 0, 1, 0, 0, '神仙老鸭汤', '/resource/attachment/images/1/2016/01/ItbYTBDU8kkzTT65td6t6686ub87xx.jpeg', '份', '', '', '', '', '9', '18', 980, 88, '/resource/attachment/images/1/2016/01/ItbYTBDU8kkzTT65td6t6686ub87xx.jpeg', 1452605574, NULL, ''),
(22, 1, 5, 0, 0, 1, 0, 0, '萝卜小排汤', '/resource/attachment/images/1/2016/01/w9gmzGmn6dMKnhyNHBm49ggKyI957b.jpeg', '份', '', '', '', '', '8', '16', 900, 55, '/resource/attachment/images/1/2016/01/w9gmzGmn6dMKnhyNHBm49ggKyI957b.jpeg', 1452606211, NULL, '推荐'),
(23, 1, 5, 0, 0, 1, 0, 0, '荠菜豆腐羹', '/resource/attachment/images/1/2016/01/oOSRqkr4Na4prqKkIOQKdZlAaLlLLL.jpeg', '份', '', '', '', '', '6', '12', 790, 24, '/resource/attachment/images/1/2016/01/oOSRqkr4Na4prqKkIOQKdZlAaLlLLL.jpeg', 1452606304, NULL, '推荐'),
(24, 1, 5, 0, 0, 1, 0, 0, '番茄土豆小排汤', '/resource/attachment/images/1/2016/01/kVu817wE0W78UzX0X081u8180pzPOT.jpeg', '份', '', '', '', '', '7', '14', 980, 80, '/resource/attachment/images/1/2016/01/kVu817wE0W78UzX0X081u8180pzPOT.jpeg', 1452606394, NULL, ''),
(25, 1, 5, 0, 0, 1, 0, 0, '酸辣豆腐羹', '/resource/attachment/images/1/2016/01/mV38VQ4c9V484L44EVX4XkcLovU9L5.jpeg', '份', '', '', '', '', '8', '16', 980, 48, '/resource/attachment/images/1/2016/01/mV38VQ4c9V484L44EVX4XkcLovU9L5.jpeg', 1452606509, NULL, ''),
(26, 1, 6, 0, 0, 1, 0, 0, '金牌南瓜饼', '/resource/attachment/images/1/2016/01/rxL148rbXZr4r9ZZkW19FXEXXFXF5G.jpeg', '份', '', '', '', '', '9', '18', 800, 150, '/resource/attachment/images/1/2016/01/rxL148rbXZr4r9ZZkW19FXEXXFXF5G.jpeg', 1452606606, NULL, '推荐'),
(27, 1, 6, 0, 0, 1, 0, 0, '杨州炒饭', '/resource/attachment/images/1/2016/01/gLZynL9HyNC5k8nK6lHJxGcLxg6xc2.jpeg', '份', '', '', '', '', '6', '12', 990, 165, '/resource/attachment/images/1/2016/01/gLZynL9HyNC5k8nK6lHJxGcLxg6xc2.jpeg', 1452606709, NULL, ''),
(28, 1, 6, 0, 0, 1, 0, 0, '三鲜汤面', '/resource/attachment/images/1/2016/01/etNM6cmyB6I3Cn20Itty23GzB6CNZv.jpeg', '份', '', '', '', '', '7', '14', 890, 69, '/resource/attachment/images/1/2016/01/etNM6cmyB6I3Cn20Itty23GzB6CNZv.jpeg', 1452606807, NULL, ''),
(29, 1, 6, 0, 0, 1, 0, 0, '酒酿圆子', '/resource/attachment/images/1/2016/01/Mz4D21lYyyHW6BS1gzVY5lghFHwZd6.jpeg', '份', '', '', '', '', '9', '18', 760, 36, '/resource/attachment/images/1/2016/01/Mz4D21lYyyHW6BS1gzVY5lghFHwZd6.jpeg', 1452606932, NULL, '推荐'),
(30, 1, 6, 0, 0, 1, 0, 0, '红糖麻糍', '/resource/attachment/images/1/2016/01/Bw99NTzdW9dg83dDIgnI3N8989yG3d.jpeg', '份', '', '', '', '', '8', '16', 886, 36, '/resource/attachment/images/1/2016/01/Bw99NTzdW9dg83dDIgnI3N8989yG3d.jpeg', 1452607031, NULL, '');

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_order`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `ordersn` varchar(30) NOT NULL,
  `expressprice` varchar(5) NOT NULL COMMENT '快递费',
  `totalnum` tinyint(4) NOT NULL,
  `totalprice` varchar(10) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-1取消状态，0普通状态，1为已付款，2为成功',
  `sendtype` tinyint(1) unsigned NOT NULL COMMENT '1为快递，2为自提',
  `sendstatus` tinyint(1) NOT NULL COMMENT '配送状态',
  `order_type` tinyint(2) NOT NULL,
  `ispay` tinyint(1) NOT NULL,
  `paytype` tinyint(1) unsigned NOT NULL COMMENT '1为余额，2为在线，3为到付',
  `seat_type` tinyint(2) NOT NULL,
  `guest_name` varchar(30) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `sex` tinyint(2) NOT NULL,
  `guest_address` varchar(200) NOT NULL,
  `time_day` varchar(12) NOT NULL,
  `time_hour` varchar(4) NOT NULL,
  `time_second` varchar(4) NOT NULL,
  `remark` varchar(1000) NOT NULL DEFAULT '',
  `secretid` varchar(4) NOT NULL,
  `print_sta` tinyint(2) NOT NULL,
  `sms_sta` varchar(3) NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `desk` varchar(10) NOT NULL,
  `nums` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `ims_shopping3_order`
--

INSERT INTO `ims_shopping3_order` (`id`, `weid`, `from_user`, `ordersn`, `expressprice`, `totalnum`, `totalprice`, `status`, `sendtype`, `sendstatus`, `order_type`, `ispay`, `paytype`, `seat_type`, `guest_name`, `tel`, `sex`, `guest_address`, `time_day`, `time_hour`, `time_second`, `remark`, `secretid`, `print_sta`, `sms_sta`, `createtime`, `desk`, `nums`) VALUES
(3, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', '011200016852', '', 1, '9', 1, 0, 0, 2, 0, 3, 2, '黄', '13730717060', 1, '全成', '2016/1/12', '22', '00', '', '8544', 0, '', 1452608196, '一号包间', 1),
(5, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', '011200018228', '', 1, '18', 1, 0, 0, 3, 0, 3, 2, '黄', '13730717060', 1, '全成', '2016/1/12', '22', '00', '', '0494', 0, '', 1452608405, '一号包间', 1);

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_order_goods`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_order_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `orderid` int(10) unsigned NOT NULL,
  `goodsid` int(10) unsigned NOT NULL,
  `total` int(10) unsigned NOT NULL DEFAULT '1',
  `description` varchar(30) NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `ims_shopping3_order_goods`
--

INSERT INTO `ims_shopping3_order_goods` (`id`, `weid`, `orderid`, `goodsid`, `total`, `description`, `createtime`) VALUES
(4, 1, 3, 4, 1, '', 1452608196),
(6, 1, 5, 1, 1, '', 1452608405);

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping3_set`
--

CREATE TABLE IF NOT EXISTS `ims_shopping3_set` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weid` int(11) DEFAULT NULL,
  `shop_name` varchar(50) DEFAULT NULL,
  `thumb` varchar(1000) DEFAULT NULL,
  `shop_tel` varchar(20) NOT NULL,
  `shop_address` varchar(120) NOT NULL,
  `shop_notice` varchar(500) NOT NULL,
  `lng` varchar(20) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `paytype1` tinyint(1) NOT NULL,
  `paytype2` tinyint(1) NOT NULL,
  `paytype3` tinyint(1) NOT NULL,
  `mail_status` tinyint(1) NOT NULL,
  `mail_smtp` varchar(50) NOT NULL,
  `mail_user` varchar(50) NOT NULL,
  `mail_psw` varchar(50) NOT NULL,
  `mail_to` varchar(50) NOT NULL,
  `print_status` tinyint(1) NOT NULL,
  `print_type` tinyint(2) NOT NULL,
  `print_usr` varchar(50) NOT NULL,
  `print_nums` tinyint(3) NOT NULL,
  `print_top` varchar(1000) NOT NULL,
  `print_bottom` varchar(1000) NOT NULL,
  `sms_status` tinyint(1) NOT NULL,
  `sms_type` tinyint(2) NOT NULL COMMENT '0商家，1客户，2both',
  `sms_phone` varchar(20) NOT NULL,
  `sms_from` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1是打印机自己发，2是短信平台',
  `sms_secret` varchar(80) NOT NULL,
  `sms_text` varchar(200) NOT NULL,
  `sms_resgister` tinyint(1) NOT NULL DEFAULT '1',
  `order_limit` tinyint(4) NOT NULL,
  `sms_user` varchar(50) NOT NULL DEFAULT '',
  `address_list` varchar(500) NOT NULL DEFAULT '',
  `desk_list` varchar(1000) NOT NULL DEFAULT '',
  `room_list` varchar(1000) NOT NULL DEFAULT '',
  `ordretype1` tinyint(1) NOT NULL DEFAULT '1',
  `ordretype2` tinyint(1) NOT NULL DEFAULT '1',
  `ordretype3` tinyint(1) NOT NULL DEFAULT '1',
  `yy_start_time` varchar(5) NOT NULL DEFAULT '00:00',
  `yy_end_time` varchar(5) NOT NULL DEFAULT '23:59',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_shopping3_set`
--

INSERT INTO `ims_shopping3_set` (`id`, `weid`, `shop_name`, `thumb`, `shop_tel`, `shop_address`, `shop_notice`, `lng`, `lat`, `paytype1`, `paytype2`, `paytype3`, `mail_status`, `mail_smtp`, `mail_user`, `mail_psw`, `mail_to`, `print_status`, `print_type`, `print_usr`, `print_nums`, `print_top`, `print_bottom`, `sms_status`, `sms_type`, `sms_phone`, `sms_from`, `sms_secret`, `sms_text`, `sms_resgister`, `order_limit`, `sms_user`, `address_list`, `desk_list`, `room_list`, `ordretype1`, `ordretype2`, `ordretype3`, `yy_start_time`, `yy_end_time`) VALUES
(1, 1, '琪琪外卖订餐系统', '', '13730717060', '江油大场口', '欢迎使用琪琪外卖订餐系统,，这里是公知版块，内空可以自己设置！', '104.746918', '31.793843', 0, 0, 0, 0, '', '', '', '', 0, 0, '', 0, '', '', 0, 0, '', 0, '', '', 0, 0, '', '全城', '一号桌\r\n二号桌\r\n三号桌', '一号包间\r\n二号包间\r\n二号包间', 1, 1, 1, '08:00', '23:59');

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_address`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `openid` varchar(50) NOT NULL,
  `realname` varchar(20) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `province` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `area` varchar(30) NOT NULL,
  `address` varchar(300) NOT NULL,
  `isdefault` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_cart`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `goodsid` int(11) NOT NULL,
  `goodstype` tinyint(1) NOT NULL DEFAULT '1',
  `from_user` varchar(50) NOT NULL,
  `total` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_openid` (`from_user`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_category`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID,0为第一级',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_feedback`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_feedback` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `openid` varchar(50) NOT NULL,
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1为维权，2为告擎',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态0未解决，1用户同意，2用户拒绝',
  `feedbackid` varchar(30) NOT NULL COMMENT '投诉单号',
  `transid` varchar(30) NOT NULL COMMENT '订单号',
  `reason` varchar(1000) NOT NULL COMMENT '理由',
  `solution` varchar(1000) NOT NULL COMMENT '期待解决方案',
  `remark` varchar(1000) NOT NULL COMMENT '备注',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_weid` (`weid`),
  KEY `idx_feedbackid` (`feedbackid`),
  KEY `idx_createtime` (`createtime`),
  KEY `idx_transid` (`transid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_goods`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `pcate` int(10) unsigned NOT NULL DEFAULT '0',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1为实体，2为虚拟',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `unit` varchar(5) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `goodssn` varchar(50) NOT NULL DEFAULT '',
  `productsn` varchar(50) NOT NULL DEFAULT '',
  `marketprice` varchar(10) NOT NULL DEFAULT '',
  `productprice` varchar(10) NOT NULL DEFAULT '',
  `total` int(10) NOT NULL DEFAULT '0',
  `sales` int(10) unsigned NOT NULL DEFAULT '0',
  `spec` varchar(5000) NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_order`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `ordersn` varchar(20) NOT NULL,
  `price` varchar(10) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-1取消状态，0普通状态，1为已付款，2为已发货，3为成功',
  `sendtype` tinyint(1) unsigned NOT NULL COMMENT '1为快递，2为自提',
  `paytype` tinyint(1) unsigned NOT NULL COMMENT '1为余额，2为在线，3为到付',
  `transid` varchar(30) NOT NULL DEFAULT '0' COMMENT '微信支付单号',
  `goodstype` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `remark` varchar(1000) NOT NULL DEFAULT '',
  `addressid` int(10) unsigned NOT NULL,
  `expresscom` varchar(30) NOT NULL DEFAULT '',
  `expresssn` varchar(50) NOT NULL DEFAULT '',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_order_goods`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_order_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `orderid` int(10) unsigned NOT NULL,
  `goodsid` int(10) unsigned NOT NULL,
  `total` int(10) unsigned NOT NULL DEFAULT '1',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_product`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goodsid` int(11) NOT NULL,
  `productsn` varchar(50) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `marketprice` decimal(10,0) unsigned NOT NULL,
  `productprice` decimal(10,0) unsigned NOT NULL,
  `total` int(11) NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `spec` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_goodsid` (`goodsid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_shopping_spec`
--

CREATE TABLE IF NOT EXISTS `ims_shopping_spec` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `displaytype` tinyint(3) unsigned NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_site_nav`
--

CREATE TABLE IF NOT EXISTS `ims_site_nav` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `module` varchar(50) NOT NULL DEFAULT '',
  `displayorder` smallint(5) unsigned NOT NULL COMMENT '排序',
  `name` varchar(50) NOT NULL COMMENT '导航名称',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `position` tinyint(4) NOT NULL DEFAULT '1' COMMENT '显示位置，1首页，2个人中心',
  `url` varchar(1000) NOT NULL DEFAULT '' COMMENT '链接地址',
  `icon` varchar(500) NOT NULL DEFAULT '' COMMENT '图标',
  `css` varchar(1000) NOT NULL DEFAULT '' COMMENT '扩展CSS',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '0为隐藏，1为显示',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `ims_site_nav`
--

INSERT INTO `ims_site_nav` (`id`, `weid`, `module`, `displayorder`, `name`, `description`, `position`, `url`, `icon`, `css`, `status`) VALUES
(1, 1, '', 0, '开始点餐', '', 1, 'mobile.php?act=entry&eid=21&weid=1', 'images/2016/01/lOOQ3Qbz3o3IZui3zb9o3Q91XQF8uB.jpg', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(2, 1, '', 0, '我的订单', '', 1, 'mobile.php?act=entry&eid=22&weid=1', 'images/2016/01/tL1a7aT66Xt9H7uKiZueHaag66m969.gif', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(3, 1, '', 0, '关天我们', '', 1, 'mobile.php?act=module&id=9&weid=1&name=site&do=detail', 'images/2016/01/DcAb7ef4B31ZdB7AxD4b8En5T5bztl.jpg', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(4, 1, '', 0, '案户案例', '', 1, 'mobile.php?act=module&id=1&weid=1&name=site&do=detail', 'images/2016/01/n1m5Rye5AXQWPjhqZmHwwGcR6gNynO.jpg', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(5, 1, '', 0, '营销活动', '', 1, 'mobile.php?act=module&cid=1&weid=1&name=site&do=list', 'images/2016/01/L66bqZKBrrt6Rk6rsVkdeTBd5Qdt1T.jpg', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(6, 1, '', 0, '地图导航', '', 1, 'http://api.map.baidu.com/marker?location=31.791948,104.747007&title=%E7%90%AA%E7%90%AA%E5%A4%96%E5%8D%96%E8%AE%A2%E9%A4%90%E7%B3%BB%E7%BB%9F&name=%E7%90%AA%E7%90%AA%E5%A4%96%E5%8D%96%E8%AE%A2%E9%A4%90%E7%B3%BB%E7%BB%9F&content=%E7%90%AA%E7%90%AA%E5%A4%96%E5%8D%96%E8%AE%A2%E9%A4%90%E7%B3%BB%E7%BB%9F&output=html&src=we7', 'images/2016/01/byvjyLKsmjVPSjYqk5iYyMssWiST0l.png', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(7, 1, '', 0, '店铺动态', '', 1, 'mobile.php?act=module&cid=5&name=site&do=list&weid=1', 'images/2016/01/i16IvxQwS48shRrV585218fi41JIhr.jpg', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(8, 1, '', 0, '便民工具', '', 1, 'http://m.46644.com/', 'images/2016/01/QlAq22abEXSGlRt6eALe26xLo6LQxQ.gif', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(9, 1, '', 0, '微站首页', '', 3, 'mobile.php?act=channel&name=index&weid=1', '', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(10, 1, '', 0, '开始点餐', '', 3, 'mobile.php?act=entry&eid=29&weid=1', '', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(11, 1, '', 0, '电话订餐', '', 3, 'tel:13730717060', '', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1),
(15, 1, '', 0, '个人中心', '', 3, 'mobile.php?act=channel&name=home&weid=1', '', 'a:2:{s:4:"icon";a:4:{s:9:"font-size";s:2:"35";s:5:"color";s:0:"";s:5:"width";s:2:"35";s:4:"icon";s:0:"";}s:4:"name";a:1:{s:5:"color";N;}}', 1);

-- --------------------------------------------------------

--
-- 表的结构 `ims_site_slide`
--

CREATE TABLE IF NOT EXISTS `ims_site_slide` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL DEFAULT '',
  `thumb` varchar(255) NOT NULL DEFAULT '',
  `displayorder` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `weid` (`weid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ims_site_slide`
--

INSERT INTO `ims_site_slide` (`id`, `weid`, `title`, `url`, `thumb`, `displayorder`) VALUES
(1, 1, 'a', '', 'images/1/2016/01/YZw2iZdIu7Zoujt4bGZ4JGnObludNK.jpg', 0),
(2, 1, 'b', '', 'images/1/2016/01/nz64dI3hf4Y4g61W3yBHZ3dYWw4yRN.png', 0),
(3, 1, '3', '', 'images/1/2016/01/X3hsgLst44st4n5Sa9FA9x94aN4t3K.png', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_site_styles`
--

CREATE TABLE IF NOT EXISTS `ims_site_styles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0',
  `templateid` int(10) unsigned NOT NULL COMMENT '风格ID',
  `variable` varchar(50) NOT NULL COMMENT '模板预设变量',
  `content` text NOT NULL COMMENT '变量值',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `ims_site_styles`
--

INSERT INTO `ims_site_styles` (`id`, `weid`, `templateid`, `variable`, `content`) VALUES
(1, 1, 1, 'indexbgcolor', '#e06666'),
(2, 1, 1, 'fontfamily', 'Tahoma,Helvetica,''SimSun'',sans-serif'),
(3, 1, 1, 'fontsize', '12px/1.5'),
(4, 1, 1, 'fontcolor', '#434343'),
(5, 1, 1, 'fontnavcolor', '#ffffff'),
(6, 1, 1, 'linkcolor', '#ffffff'),
(7, 1, 1, 'indexbgimg', 'bg_index.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `ims_site_templates`
--

CREATE TABLE IF NOT EXISTS `ims_site_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '标识',
  `title` varchar(30) NOT NULL COMMENT '名称',
  `description` varchar(500) NOT NULL DEFAULT '' COMMENT '描述',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '发布页面',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=149 ;

--
-- 转存表中的数据 `ims_site_templates`
--

INSERT INTO `ims_site_templates` (`id`, `name`, `title`, `description`, `author`, `url`) VALUES
(1, 'default', '微站默认模板', '由微擎提供默认微站模板套系', '微擎团队', 'http://we7.cc'),
(2, 'style1', '微站默认模板1', '由微擎提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(3, 'style10', '微站默认模板10', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(4, 'style100', '微服务微站模板100', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(5, 'style101', '微服务微站模板101', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(6, 'style102', '微服务微站模板102', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(7, 'style103', '微服务微站模板103', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(8, 'style104', '微服务微站模板104', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(9, 'style105', '微服务微站模板105', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(10, 'style106', '微服务微站模板106', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(11, 'style107', '微服务微站模板107', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(12, 'style11', '微站默认模板11', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(13, 'style108', '微服务微站模板108', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(14, 'style110', '微服务微站模板110', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(15, 'style111', '微服务微站模板111', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(16, 'style112', '微服务微站模板112', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(17, 'style113', '微服务微站模板113', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(18, 'style116', '微服务微站模板116', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(19, 'style117', '微服务微站模板117', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(20, 'style118', '微服务微站模板118', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(21, 'style119', '微服务微站模板119', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(22, 'style12', '微站默认模板12', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(23, 'style120', '微服务微站模板120', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(24, 'style121', '微服务微站模板121', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(25, 'style122', '微服务微站模板122', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(26, 'style123', '微服务微站模板123', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(27, 'style125', '微服务微站模板125', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(28, 'style126', '微服务微站模板126', '微服务提供微站模板', '微服务', ''),
(29, 'style127', '微服务微站默认模板127', '霓虹灯下的旋转特效', '微服务', 'http://www.weixfu.cn'),
(30, 'style128', '微服务模版128', '由微服务提供微站模板套系128', '微服务', 'http://www.b2ctui.com'),
(31, 'style129', '微服务模版系列', '由微服务提供微站模板套系129', '微服务', 'http://www.b2ctui.com'),
(32, 'style13', '微站默认模板13', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(33, 'style130', '微服务130', '由微服务提供微站模板套系130', '微服务', 'http://www.b2ctui.com'),
(34, 'style131', '微服务模版系列131', '由微服务提供微站模板套系131', '微服务', 'http://www.b2ctui.com'),
(35, 'style133', '微服务', '由微服务提供默认套系', 'weixfu', 'http://www.b2ctui.com'),
(36, 'style134', '微服务134', '由微服务提供默认套系', 'weixfu', 'http://www.b2ctui.com'),
(37, 'style136', '微服务136', '炫动win8淡淡的小调调，刷新看事例，请自行上传30*30px大小的png格式透明分类图片', 'Hooyo', 'http://www.weixfu.cn/?396'),
(38, 'style137', '微服务', '圆圆的小角，圆圆的卡片，刷新看事例，请自行上传30*30px大小的png格式分类图片', 'Hooyo', 'http://www.weixfu.cn/?396'),
(39, 'style139', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(40, 'style14', '微站默认模板14', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(41, 'style140', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(42, 'style141', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(43, 'style143', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(44, 'style144', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(45, 'style146', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(46, 'style147', '微服务', '由微服务提供默认套系', 'WeEngine Team', 'http://www.weixfu.cn'),
(47, 'style148', '微服务', '微服务系列', '微服务', '微'),
(48, 'style149', '微服务', '由微服务提供默认套系', 'WeiYang Team', 'http://www.weixfu.cn'),
(49, 'style15', '微站默认模板15', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(50, 'style150', '微服务', '微', '微', '微'),
(51, 'style152', '微服务', '8', '微', '微'),
(52, 'style153', '微服务', '由微服务提供套系', '微服务', 'http://www.b2ctui.com'),
(53, 'style154', '微服务', '由微服务网络套系', 'wdl Team', 'http://www.b2ctui.com'),
(54, 'style155', '微服务', '微服务', '微服务', '#'),
(55, 'style156', '微服务', '由微服务提供小清新套系', 'b2ctui.com', 'http://b2ctui.com'),
(56, 'style157', '微服务', '由微服务提供小清新套系', 'b2ctui.com', 'http://b2ctui.com'),
(57, 'style158', '微服务', '仿微盟的电商微官网模板', '微服务 大圣', 'http://www.b2ctui.com'),
(58, 'style16', '微站默认模板16', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(59, 'style17', '微站默认模板17', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(60, 'style18', '微服务模板18', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(61, 'style19', '微服务模板19', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(62, 'style2', '微站默认模板2', '由微擎提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(63, 'style20', '微服务模板20', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(64, 'style21', '微服务模板21', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(65, 'style22', '微服务模板22', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(66, 'style23', '微服务模板23', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(67, 'style24', '微服务模板24', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(68, 'style25', '微服务模板25', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(69, 'style26', '微服务模板26', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(70, 'style27', '微服务模板27', '由微服务提供默认微站模板套系，圆圆的小角，圆圆的卡片，刷新看事例，请自行上传30*30px大小的png格式分类图片', 'Hooyo', 'http://www.weixfu.cn'),
(71, 'style28', '微服务模板28', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(72, 'style29', '微服务模板29', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(73, 'style3', '微站默认模板3', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(74, 'style30', '微服务模板30', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(75, 'style31', '微服务模板31', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(76, 'style32', '微服务模板32', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(77, 'style33', '微服务模板33', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(78, 'style34', '微服务模板34', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(79, 'style35', '微服务模板35', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(80, 'style36', '微服务模板36', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(81, 'style37', '微服务模板37', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(82, 'style38', '微服务模板38', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(83, 'style39', '微服务模板39', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(84, 'style4', '微站默认模板4', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(85, 'style40', '微服务模板40', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(86, 'style41', '微服务模板41', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(87, 'style42', '微服务模板42', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(88, 'style43', '微服务模板43', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(89, 'style44', '微服务模板44', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(90, 'style45', '微服务模板45', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(91, 'style46', '微服务模板46', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(92, 'style47', '微服务模板47', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(93, 'style48', '微服务模板48', '微服务模板炫动style125淡淡的小调调，刷新看事例，请自行上传30*30px大小的png格式透明分类图片', 'WDL', 'http://www.weixfu.cn'),
(94, 'style49', '微服务模板49', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(95, 'style5', '微站默认模板5', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(96, 'style50', '微服务模板50', '微服务模板炫动style125淡淡的小调调，刷新看事例，请自行上传30*30px大小的png格式透明分类图片', 'WDL', 'http://www.weixfu.cn'),
(97, 'style51', '微服务模板51', '微服务模板炫动style125淡淡的小调调，刷新看事例，请自行上传30*30px大小的png格式透明分类图片', 'WDL', 'http://www.weixfu.cn'),
(98, 'style52', '微服务模板52', '炫动style125系列04，请自行上传png格式分类图片', 'WDL', 'http://www.weixfu.cn'),
(99, 'style53', '微服务模板53', '冒泡的对话框，请自行上传png格式分类图片', 'WDL', 'http://www.weixfu.cn'),
(100, 'style54', '微服务模板54', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(101, 'style55', '微服务模板55', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(102, 'style56', '微服务模板56', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(103, 'style57', '微服务模板57', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(104, 'style58', '微服务模板58', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(105, 'style59', '微服务模板59', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(106, 'style6', '微站默认模板6', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(107, 'style60', '微服务模板60', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(108, 'style61', '微服务模板61', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(109, 'style62', '微服务模板62', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(110, 'style63', '微服务模板63', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(111, 'style64', '微服务模板64', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(112, 'style65', '微服务模板65', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(113, 'style66', '微服务模板66', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(114, 'style67', '微服务模板67', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(115, 'style68', '微服务模板68', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(116, 'style69', '微服务模板69', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(117, 'style7', '微站默认模板7', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(118, 'style70', '微服务模板70', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(119, 'style71', '微服务模71', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(120, 'style72', '微服务模板72', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(121, 'style73', '微服务模板73', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(122, 'style74', '微服务模板74', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(123, 'style75', '微服务模板75', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(124, 'style76', '微服务模板76', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(125, 'style77', '微服务模板77', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(126, 'style78', '微服务模板78', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(127, 'style79', '微服务模板79', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(128, 'style8', '微站默认模板8', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(129, 'style80', '微服务模板80', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(130, 'style81', '微服务模板81', '由微服务提供默认微站模板套系，刷新看事例，请自行上传30*30px大小的png格式透明分类图片', 'WDL', 'http://www.weixfu.cn'),
(131, 'style82', '微服务模板82', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(132, 'style83', '微服务模板83', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(133, 'style84', '微服务模板84', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(134, 'style85', '微服务模板85', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(135, 'style86', '微服务模板86', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(136, 'style87', '微服务模板87', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(137, 'style88', '微服务模板88', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(138, 'style89', '微服务模板89', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(139, 'style9', '微站默认模板9', '由微服务提供默认微站模板套系', 'WeEngine Team', 'http://bbs.we7.cc'),
(140, 'style90', '微服务模板90', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(141, 'style91', '微服务模板91', '由微服务提供默认微站模板套系', 'WDL', 'http://www.weixfu.cn'),
(142, 'style92', '微服务微站模板92', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(143, 'style93', '微服务微站模板93', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(144, 'style94', '微服务微站模板94', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(145, 'style95', '微服务微站模板95', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(146, 'style96', '微服务微站模板96', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(147, 'style98', '微服务微站模板98', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn'),
(148, 'style99', '微服务微站模板99', '由微服务微站模板套系', 'weixfu Team', 'http://www.weixfu.cn');

-- --------------------------------------------------------

--
-- 表的结构 `ims_smashegg_fans`
--

CREATE TABLE IF NOT EXISTS `ims_smashegg_fans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `fansID` int(11) NOT NULL,
  `from_user` varchar(50) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `todaynum` int(11) NOT NULL,
  `totalnum` int(11) NOT NULL,
  `awardnum` int(11) DEFAULT '0',
  `last_time` int(10) NOT NULL,
  `createtime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ims_smashegg_fans`
--

INSERT INTO `ims_smashegg_fans` (`id`, `rid`, `fansID`, `from_user`, `username`, `tel`, `todaynum`, `totalnum`, `awardnum`, `last_time`, `createtime`) VALUES
(1, 11, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', NULL, NULL, 2, 2, 0, 1452661987, 1452615082),
(2, 14, 1, 'okplGuMiOjTyn_-99ANpf_XvnGps', NULL, NULL, 0, 0, 0, 0, 1452665848);

-- --------------------------------------------------------

--
-- 表的结构 `ims_smashegg_reply`
--

CREATE TABLE IF NOT EXISTS `ims_smashegg_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `start_picurl` varchar(200) NOT NULL,
  `isshow` tinyint(1) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `ticket_information` varchar(200) DEFAULT NULL,
  `starttime` int(10) DEFAULT NULL,
  `endtime` int(10) DEFAULT NULL,
  `Repeat_lottery_reply` varchar(50) DEFAULT NULL,
  `end_theme` varchar(50) DEFAULT NULL,
  `end_instruction` varchar(200) DEFAULT NULL,
  `end_picurl` varchar(200) DEFAULT NULL,
  `c_type_one` varchar(20) DEFAULT NULL,
  `c_name_one` varchar(50) DEFAULT NULL,
  `c_num_one` int(11) DEFAULT '0',
  `c_draw_one` int(11) DEFAULT '0',
  `c_pic_one` varchar(200) DEFAULT NULL,
  `c_type_two` varchar(20) DEFAULT NULL,
  `c_name_two` varchar(50) DEFAULT NULL,
  `c_num_two` int(11) DEFAULT NULL,
  `c_draw_two` int(11) DEFAULT '0',
  `c_pic_two` varchar(200) DEFAULT NULL,
  `c_type_three` varchar(20) DEFAULT NULL,
  `c_name_three` varchar(50) DEFAULT NULL,
  `c_num_three` int(11) DEFAULT '0',
  `c_draw_three` int(11) DEFAULT '0',
  `c_pic_three` int(200) DEFAULT NULL,
  `c_type_four` varchar(20) DEFAULT NULL,
  `c_name_four` varchar(50) DEFAULT NULL,
  `c_num_four` int(11) DEFAULT '0',
  `c_draw_four` int(11) DEFAULT '0',
  `c_pic_four` varchar(200) DEFAULT NULL,
  `c_type_five` varchar(20) DEFAULT NULL,
  `c_name_five` varchar(50) DEFAULT NULL,
  `c_num_five` int(11) DEFAULT NULL,
  `c_draw_five` int(11) DEFAULT '0',
  `c_pic_five` varchar(200) DEFAULT NULL,
  `c_type_six` varchar(20) DEFAULT NULL,
  `c_name_six` varchar(50) DEFAULT NULL,
  `c_num_six` int(11) DEFAULT '0',
  `c_draw_six` int(10) DEFAULT '0',
  `c_pic_six` varchar(200) DEFAULT NULL,
  `total_num` int(11) DEFAULT NULL COMMENT '总获奖人数(自动加)',
  `probability` double DEFAULT NULL,
  `award_times` int(11) DEFAULT '0',
  `number_times` int(11) DEFAULT '0',
  `most_num_times` int(11) DEFAULT '0',
  `sn_code` tinyint(4) DEFAULT '0',
  `sn_rename` varchar(20) DEFAULT NULL,
  `tel_rename` varchar(20) DEFAULT NULL,
  `copyright` varchar(20) DEFAULT NULL,
  `show_num` tinyint(2) DEFAULT NULL,
  `viewnum` int(11) DEFAULT '0',
  `fansnum` int(11) DEFAULT '0',
  `createtime` int(10) DEFAULT NULL,
  `win_info` varchar(40) DEFAULT NULL,
  `no_win_info` varchar(40) DEFAULT NULL,
  `share_title` varchar(200) DEFAULT NULL,
  `share_desc` varchar(300) DEFAULT NULL,
  `share_url` varchar(100) DEFAULT NULL,
  `share_txt` varchar(500) DEFAULT NULL,
  `accept_passwrod` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ims_smashegg_reply`
--

INSERT INTO `ims_smashegg_reply` (`id`, `rid`, `title`, `description`, `content`, `start_picurl`, `isshow`, `keyword`, `ticket_information`, `starttime`, `endtime`, `Repeat_lottery_reply`, `end_theme`, `end_instruction`, `end_picurl`, `c_type_one`, `c_name_one`, `c_num_one`, `c_draw_one`, `c_pic_one`, `c_type_two`, `c_name_two`, `c_num_two`, `c_draw_two`, `c_pic_two`, `c_type_three`, `c_name_three`, `c_num_three`, `c_draw_three`, `c_pic_three`, `c_type_four`, `c_name_four`, `c_num_four`, `c_draw_four`, `c_pic_four`, `c_type_five`, `c_name_five`, `c_num_five`, `c_draw_five`, `c_pic_five`, `c_type_six`, `c_name_six`, `c_num_six`, `c_draw_six`, `c_pic_six`, `total_num`, `probability`, `award_times`, `number_times`, `most_num_times`, `sn_code`, `sn_rename`, `tel_rename`, `copyright`, `show_num`, `viewnum`, `fansnum`, `createtime`, `win_info`, `no_win_info`, `share_title`, `share_desc`, `share_url`, `share_txt`, `accept_passwrod`, `is_default`) VALUES
(1, 11, 'ddddddd', 'ddddddddddddddd', 'fasfdasfda', '', 1, '砸金蛋', 'rwewerwqre', 1452355680, 1481386080, 'afdasfas', 'asdfafa', 'adfasfda', '', 'fdsafa', 'fasfa', 0, 0, '', 'safdsafa', '', 0, 0, '', 'asdfafaf', '', 0, 0, 0, '', '', 0, 0, '', '', '', 0, 0, '', '', '', 0, 0, '', 0, 11, 0, 0, 0, 0, '', '', '', 0, 5, 1, 1452660623, 'fafdas', 'fasfdasfs', 'fdsafsa', 'fadsfsa', 'fassadf', 'fasfas', NULL, 0),
(2, 14, '砸金蛋活动开始了', '亲，请点击进入砸金蛋抽奖活动页面，祝您好运哦！', '亲，请点击进入砸金蛋抽奖活动页面，祝您好运哦！', '/source/modules/public/style/smashegg/start.jpg', 1, '金蛋', '兑奖请联系我们，电话13899999999', 1452673500, 1485937500, '亲，继续努力哦！', '砸金蛋活动已经结束了', '亲，活动已经结束，请继续关注我们的后续活动哦。', '/source/modules/public/style/smashegg/end.jpg', '一等奖', '价值128 元的4人套餐一份', 100, 0, '', '二等奖', '价值48元的水煮牛肉一份', 100, 0, '', '三等奖', '价值班15的柠檬奶茶一杯', 100, 0, 0, '', '', 0, 0, '', '', '', 0, 0, '', '', '', 0, 0, '', 300, 11, 99, 1, 9, 1, 'SN码', '手机号', '@微服务', 1, 5, 1, 1452673773, '恭喜您中奖了！您的运气实在是太好了！', '感谢您的参与，请再接再厉哟！', '欢迎参加砸金蛋活动', '亲，欢迎参加砸金蛋抽奖活动，祝您好运哦！！ 亲，需要绑定账号才可以参加哦', 'dsfas', '&lt;p&gt;\n	1. 关注微信公众账号&quot;()&quot;\n&lt;/p&gt;\n&lt;p&gt;\n	2. 发送消息&quot;砸金蛋&quot;, 点击返回的消息即可参加\n&lt;/p&gt;', NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_stat_keyword`
--

CREATE TABLE IF NOT EXISTS `ims_stat_keyword` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL COMMENT '所属帐号ID',
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `kid` int(10) unsigned NOT NULL COMMENT '关键字ID',
  `hit` int(10) unsigned NOT NULL COMMENT '命中次数',
  `lastupdate` int(10) unsigned NOT NULL COMMENT '最后触发时间',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_createtime` (`createtime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_stat_msg_history`
--

CREATE TABLE IF NOT EXISTS `ims_stat_msg_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL COMMENT '所属帐号ID',
  `rid` int(10) unsigned NOT NULL COMMENT '命中规则ID',
  `kid` int(10) unsigned NOT NULL COMMENT '命中关键字ID',
  `from_user` varchar(50) NOT NULL COMMENT '用户的唯一身份ID',
  `module` varchar(50) NOT NULL COMMENT '命中模块',
  `message` varchar(1000) NOT NULL COMMENT '用户发送的消息',
  `type` varchar(10) NOT NULL DEFAULT '' COMMENT '消息类型',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_createtime` (`createtime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_stat_rule`
--

CREATE TABLE IF NOT EXISTS `ims_stat_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL COMMENT '所属帐号ID',
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `hit` int(10) unsigned NOT NULL COMMENT '命中次数',
  `lastupdate` int(10) unsigned NOT NULL COMMENT '最后触发时间',
  `createtime` int(10) unsigned NOT NULL COMMENT '记录新建的日期',
  PRIMARY KEY (`id`),
  KEY `idx_createtime` (`createtime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_strcoupon`
--

CREATE TABLE IF NOT EXISTS `ims_strcoupon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(256) NOT NULL DEFAULT '' COMMENT '图文标题',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `module_name` varchar(50) NOT NULL DEFAULT '' COMMENT '模块标识',
  `logo` varchar(200) NOT NULL DEFAULT '' COMMENT '图文封面',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '优惠券名',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '优惠券类型',
  `description` varchar(2000) NOT NULL DEFAULT '' COMMENT '图文描述',
  `cp_dst` varchar(2000) NOT NULL DEFAULT '' COMMENT '优惠券说明',
  `start_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '有效期',
  `end_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '有效期',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态',
  `total_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '总数',
  `day_sum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每天发送数',
  `surplus_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '剩余数',
  `day_surplus_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每天剩余数',
  `user_sum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每人领取总数',
  `user_day_sum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每人每天领取数',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '面额',
  `discount_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '抵用金额',
  `total_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '满金额',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ims_strcoupon`
--

INSERT INTO `ims_strcoupon` (`id`, `weid`, `title`, `displayorder`, `module_name`, `logo`, `name`, `type`, `description`, `cp_dst`, `start_time`, `end_time`, `create_time`, `status`, `total_num`, `day_sum`, `surplus_num`, `day_surplus_num`, `user_sum`, `user_day_sum`, `money`, `discount_money`, `total_money`) VALUES
(1, 1, '', 0, 'izc_strcoupon', '', '满百元抵10元', 1, '', '', 1452612240, 1475421840, 1452612432, 0, 0, 0, 0, 0, 0, 0, '0.00', '10.00', '100.00'),
(2, 1, '', 0, 'izc_strcoupon', '', '满200抵20', 1, '', '', 1452612300, 1453130700, 1452612388, 0, 0, 0, 0, 0, 0, 0, '0.00', '20.00', '200.00');

-- --------------------------------------------------------

--
-- 表的结构 `ims_strcoupon_fans`
--

CREATE TABLE IF NOT EXISTS `ims_strcoupon_fans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0',
  `day_sum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每天领取数',
  `user_day_sum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每人每天领取数',
  `surplus_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '剩余领取数',
  `day_surplus_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '当天剩余领取数',
  `total_sum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每人总数',
  `coupon_name` varchar(100) NOT NULL DEFAULT '' COMMENT '优惠券名',
  `coupon_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '优惠券id',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `last_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后领取时间',
  `use_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0,失效,1,可使用,2,使用中',
  `start_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '有效期',
  `end_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '有效期',
  `from_user` varchar(50) NOT NULL DEFAULT '' COMMENT 'openid',
  `cp_dst` varchar(2000) NOT NULL DEFAULT '' COMMENT '优惠券说明',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '面额',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '已有数量',
  `used_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '已使用数量',
  `inuse_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '在使用数量',
  `fansid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '粉丝id',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '图文标题',
  `content` varchar(1024) NOT NULL DEFAULT '' COMMENT '图文内容',
  `discount_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '抵用金额',
  `total_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '满金额',
  `credit1` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '积分',
  `credit2` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '现金',
  `isused` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否使用',
  `coupon_module` varchar(100) NOT NULL DEFAULT '' COMMENT '模块标识',
  `coupon_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '优惠券类型',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_strcoupon_fans_log`
--

CREATE TABLE IF NOT EXISTS `ims_strcoupon_fans_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '公众号id',
  `from_user` varchar(50) NOT NULL DEFAULT '' COMMENT 'openid',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `use_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用时间',
  `SN` varchar(100) NOT NULL DEFAULT '' COMMENT 'SN码',
  `discount_money` decimal(10,2) DEFAULT NULL COMMENT '抵用金额',
  `coupon_fans_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'fans优惠券id',
  `order_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '订单id',
  `order_sn` varchar(30) NOT NULL DEFAULT '' COMMENT '订单号',
  `module_name` varchar(100) NOT NULL DEFAULT '' COMMENT '模块名称',
  `coupon_name` varchar(100) NOT NULL DEFAULT '' COMMENT '优惠券名称',
  `isused` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0使用中1使用成功2使用失败',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_strcoupon_shop`
--

CREATE TABLE IF NOT EXISTS `ims_strcoupon_shop` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '公众号id',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `shop_name` varchar(100) NOT NULL DEFAULT '' COMMENT '店铺名称',
  `address` varchar(200) NOT NULL DEFAULT '' COMMENT '地址',
  `tel` varchar(20) NOT NULL DEFAULT '' COMMENT '电话',
  `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '手机',
  `shop_imgs` varchar(2048) NOT NULL DEFAULT '' COMMENT '店铺实景',
  `description` text NOT NULL COMMENT '介绍',
  `module_name` varchar(100) NOT NULL DEFAULT '' COMMENT '模块标识',
  `order_id` int(10) NOT NULL DEFAULT '0' COMMENT '订单id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_userapi_cache`
--

CREATE TABLE IF NOT EXISTS `ims_userapi_cache` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(32) NOT NULL COMMENT 'apiurl缓存标识',
  `content` text NOT NULL COMMENT '回复内容',
  `lastupdate` int(10) unsigned NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_userapi_reply`
--

CREATE TABLE IF NOT EXISTS `ims_userapi_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL COMMENT '规则ID',
  `description` varchar(300) NOT NULL DEFAULT '',
  `apiurl` varchar(300) NOT NULL DEFAULT '' COMMENT '接口地址',
  `token` varchar(32) NOT NULL DEFAULT '',
  `default_text` varchar(100) NOT NULL DEFAULT '' COMMENT '默认回复文字',
  `cachetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '返回数据的缓存时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `ims_userapi_reply`
--

INSERT INTO `ims_userapi_reply` (`id`, `rid`, `description`, `apiurl`, `token`, `default_text`, `cachetime`) VALUES
(1, 16, '"城市名+天气", 如: "北京天气"', 'weather.php', '', '', 0),
(2, 17, '"百科+查询内容" 或 "定义+查询内容", 如: "百科姚明", "定义自行车"', 'baike.php', '', '', 0),
(3, 18, '"@查询内容(中文或英文)"', 'translate.php', '', '', 0),
(4, 19, '"日历", "万年历", "黄历"或"几号"', 'calendar.php', '', '', 0),
(5, 20, '"新闻"', 'news.php', '', '', 0),
(6, 21, '"快递+单号", 如: "申通1200041125"', 'express.php', '', '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ims_wechats`
--

CREATE TABLE IF NOT EXISTS `ims_wechats` (
  `weid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hash` char(5) NOT NULL COMMENT '用户标识. 随机生成保持不重复',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '公众号类型，1微信，2易信',
  `uid` int(10) unsigned NOT NULL COMMENT '关联的用户',
  `token` varchar(32) NOT NULL COMMENT '随机生成密钥',
  `EncodingAESKey` varchar(43) NOT NULL,
  `access_token` varchar(1000) NOT NULL DEFAULT '' COMMENT '存取凭证结构',
  `jsapi_ticket` varchar(1000) NOT NULL DEFAULT '' COMMENT '共享接口ticket',
  `level` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '接口权限级别, 0 普通订阅号, 1 认证订阅号|普通服务号, 2认证服务号',
  `name` varchar(30) NOT NULL COMMENT '公众号名称',
  `account` varchar(30) NOT NULL COMMENT '微信帐号',
  `original` varchar(50) NOT NULL,
  `signature` varchar(100) NOT NULL COMMENT '功能介绍',
  `country` varchar(10) NOT NULL,
  `province` varchar(3) NOT NULL,
  `city` varchar(15) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `welcome` varchar(1000) NOT NULL,
  `default` varchar(1000) NOT NULL,
  `default_message` varchar(500) NOT NULL DEFAULT '' COMMENT '其他消息类型默认处理器',
  `default_period` tinyint(3) unsigned NOT NULL COMMENT '回复周期时间',
  `lastupdate` int(10) unsigned NOT NULL DEFAULT '0',
  `key` varchar(50) NOT NULL,
  `secret` varchar(50) NOT NULL,
  `styleid` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '风格ID',
  `payment` varchar(5000) NOT NULL DEFAULT '',
  `shortcuts` varchar(2000) NOT NULL DEFAULT '',
  `quickmenu` varchar(2000) NOT NULL DEFAULT '',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0',
  `subwechats` varchar(1000) NOT NULL DEFAULT '',
  `siteinfo` varchar(1000) NOT NULL DEFAULT '',
  `menuset` text NOT NULL COMMENT '自定义菜单历史',
  PRIMARY KEY (`weid`),
  UNIQUE KEY `hash` (`hash`),
  KEY `idx_parentid` (`parentid`),
  KEY `idx_key` (`key`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_wechats`
--

INSERT INTO `ims_wechats` (`weid`, `hash`, `type`, `uid`, `token`, `EncodingAESKey`, `access_token`, `jsapi_ticket`, `level`, `name`, `account`, `original`, `signature`, `country`, `province`, `city`, `username`, `password`, `welcome`, `default`, `default_message`, `default_period`, `lastupdate`, `key`, `secret`, `styleid`, `payment`, `shortcuts`, `quickmenu`, `parentid`, `subwechats`, `siteinfo`, `menuset`) VALUES
(1, '1cd10', 1, 1, 'd602391253997b62dbfb74edea1f109a', '', 'a:2:{s:5:"token";s:117:"ggf2rbsqx2CDN98KPBbZBxt3sRwqpTllUIM76QkUnZk-BRTdzbHvqKV28W6cY5obniS33j2MOe0jCbscXIGpDR7sqld4qWwlG0yyE_FPdKsXQJgABASLE";s:6:"expire";i:1452672834;}', '', 0, '外卖订餐系统', 'fyhl800', 'gh_8fbaa8dd1992', '', '', '', '', '', '', 'a:2:{s:6:"module";s:4:"news";s:2:"id";i:2;}', 'a:2:{s:6:"module";s:4:"news";s:2:"id";i:2;}', '', 0, 0, 'wxe0b50bcc099dadf0', 'e5995b4a1f8f04e5d72b0a076e5bf256', 2, 'a:5:{s:6:"credit";a:1:{s:6:"switch";b:1;}s:6:"alipay";a:4:{s:6:"switch";b:0;s:7:"account";s:0:"";s:7:"partner";s:0:"";s:6:"secret";s:0:"";}s:6:"wechat";a:8:{s:6:"switch";b:0;s:5:"appid";s:18:"wxe0b50bcc099dadf0";s:6:"secret";s:32:"e5995b4a1f8f04e5d72b0a076e5bf256";s:7:"signkey";s:32:"bBt8G4Sc8DG99GnG3S76SSkckbdG8h5h";s:7:"partner";s:0:"";s:3:"key";s:0:"";s:7:"version";s:1:"2";s:5:"mchid";s:0:"";}s:7:"offline";a:2:{s:6:"switch";b:0;s:7:"account";s:0:"";}s:8:"delivery";a:1:{s:6:"switch";b:1;}}', '', 'a:2:{s:8:"template";s:6:"quick2";s:12:"enablemodule";a:0:{}}', 0, '', '', 'YToyOntzOjU6Im1lbnVzIjthOjM6e2k6MDthOjI6e3M6NDoibmFtZSI7czozNjoiJUU1JUJFJUFFJUU0JUJGJUExJUU4JUFFJUEyJUU5JUE0JTkwIjtzOjEwOiJzdWJfYnV0dG9uIjthOjQ6e2k6MDthOjM6e3M6NDoibmFtZSI7czozNjoiJUU1JTlDJUIwJUU1JTlCJUJFJUU1JUFGJUJDJUU4JTg4JUFBIjtzOjQ6InR5cGUiO3M6NDoidmlldyI7czozOiJ1cmwiO3M6NDY4OiJodHRwOi8vYXBpLm1hcC5iYWlkdS5jb20vbWFya2VyP2xvY2F0aW9uPTMxLjc5MTk0OCUyNTJDMTA0Ljc0NzAwNyZ0aXRsZT0lMjVFNyUyNTkwJTI1QUElMjVFNyUyNTkwJTI1QUElMjVFNSUyNUE0JTI1OTYlMjVFNSUyNThEJTI1OTYlMjVFOCUyNUFFJTI1QTIlMjVFOSUyNUE0JTI1OTAlMjVFNyUyNUIzJTI1QkIlMjVFNyUyNUJCJTI1OUYmbmFtZT0lMjVFNyUyNTkwJTI1QUElMjVFNyUyNTkwJTI1QUElMjVFNSUyNUE0JTI1OTYlMjVFNSUyNThEJTI1OTYlMjVFOCUyNUFFJTI1QTIlMjVFOSUyNUE0JTI1OTAlMjVFNyUyNUIzJTI1QkIlMjVFNyUyNUJCJTI1OUYmY29udGVudD0lMjVFNyUyNTkwJTI1QUElMjVFNyUyNTkwJTI1QUElMjVFNSUyNUE0JTI1OTYlMjVFNSUyNThEJTI1OTYlMjVFOCUyNUFFJTI1QTIlMjVFOSUyNUE0JTI1OTAlMjVFNyUyNUIzJTI1QkIlMjVFNyUyNUJCJTI1OUYmb3V0cHV0PWh0bWwmc3JjPXdlNyMiO31pOjE7YTozOntzOjQ6Im5hbWUiO3M6MzY6IiVFOCU4MSU5NCVFNyVCMyVCQiVFNSU4MiVBQyVFNSU4RCU5NSI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjYwOiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9ZW50cnkmZWlkPTI5JndlaWQ9MSMiO31pOjI7YTozOntzOjQ6Im5hbWUiO3M6MzY6IiVFNiU4OCU5MSVFNyU5QSU4NCVFOCVBRSVBMiVFNSU4RCU5NSI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjYwOiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9ZW50cnkmZWlkPTIyJndlaWQ9MSMiO31pOjM7YTozOntzOjQ6Im5hbWUiO3M6MzY6IiVFNSU5QyVBOCVFNyVCQSVCRiVFOCVBRSVBMiVFOSVBNCU5MCI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjYwOiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9ZW50cnkmZWlkPTI5JndlaWQ9MSMiO319fWk6MTthOjI6e3M6NDoibmFtZSI7czozNjoiJUU0JUJGJTgzJUU5JTk0JTgwJUU2JUI0JUJCJUU1JThBJUE4IjtzOjEwOiJzdWJfYnV0dG9uIjthOjU6e2k6MDthOjM6e3M6NDoibmFtZSI7czozNjoiJUU3JUFEJUJFJUU1JTg4JUIwJUU3JUE3JUFGJUU1JTg4JTg2IjtzOjQ6InR5cGUiO3M6NDoidmlldyI7czozOiJ1cmwiO3M6ODA6Imh0dHA6Ly93YWltYWkuanlkczk1LmNvbS9tb2JpbGUucGhwP2FjdD1tb2R1bGUmcmlkPTgmbmFtZT1uc2lnbiZkbz1pbmRleCZ3ZWlkPTEjIjt9aToxO2E6Mzp7czo0OiJuYW1lIjtzOjM2OiIlRTclQTclQUYlRTUlODglODYlRTUlODUlOTElRTYlOEQlQTIiO3M6NDoidHlwZSI7czo0OiJ2aWV3IjtzOjM6InVybCI7czo2MDoiaHR0cDovL3dhaW1haS5qeWRzOTUuY29tL21vYmlsZS5waHA/YWN0PWVudHJ5JmVpZD01MiZ3ZWlkPTEjIjt9aToyO2E6Mzp7czo0OiJuYW1lIjtzOjI3OiIlRTQlQkMlOTglRTYlODMlQTAlRTUlODglQjgiO3M6NDoidHlwZSI7czo0OiJ2aWV3IjtzOjM6InVybCI7czo2MDoiaHR0cDovL3dhaW1haS5qeWRzOTUuY29tL21vYmlsZS5waHA/YWN0PWVudHJ5JmVpZD02MSZ3ZWlkPTEjIjt9aTozO2E6Mzp7czo0OiJuYW1lIjtzOjM2OiIlRTQlQkMlOUElRTUlOTElOTglRTQlQjglQUQlRTUlQkYlODMiO3M6NDoidHlwZSI7czo0OiJ2aWV3IjtzOjM6InVybCI7czo1OToiaHR0cDovL3dhaW1haS5qeWRzOTUuY29tL21vYmlsZS5waHA/YWN0PWVudHJ5JmVpZD03JndlaWQ9MSMiO31pOjQ7YTozOntzOjQ6Im5hbWUiO3M6Mjc6IiVFNyVBMCVCOCVFOSU4NyU5MSVFOCU5QiU4QiI7czo0OiJ0eXBlIjtzOjU6ImNsaWNrIjtzOjM6ImtleSI7czoxODoiJUU5JTg3JTkxJUU4JTlCJThCIjt9fX1pOjI7YToyOntzOjQ6Im5hbWUiO3M6MzY6IiVFNCVCQSU4NiVFOCVBNyVBMyVFNiU4OCU5MSVFNCVCQiVBQyI7czoxMDoic3ViX2J1dHRvbiI7YTo1OntpOjA7YTozOntzOjQ6Im5hbWUiO3M6MzY6IiVFNSU4NSVCMyVFNCVCQSU4RSVFNiU4OCU5MSVFNCVCQiVBQyI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjc5OiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9bW9kdWxlJmlkPTkmd2VpZD0xJm5hbWU9c2l0ZSZkbz1kZXRhaWwjIjt9aToxO2E6Mzp7czo0OiJuYW1lIjtzOjM2OiIlRTclOEUlQUYlRTUlQTIlODMlRTUlQjElOTUlRTclQTQlQkEiO3M6NDoidHlwZSI7czo0OiJ2aWV3IjtzOjM6InVybCI7czo4MDoiaHR0cDovL3dhaW1haS5qeWRzOTUuY29tL21vYmlsZS5waHA/YWN0PW1vZHVsZSZpZD0xMCZ3ZWlkPTEmbmFtZT1zaXRlJmRvPWRldGFpbCMiO31pOjI7YTozOntzOjQ6Im5hbWUiO3M6MzY6IiVFOCU4RiU5QyVFNSU5MyU4MSVFNSVCMSU5NSVFNyVBNCVCQSI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjYwOiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9ZW50cnkmZWlkPTI5JndlaWQ9MSMiO31pOjM7YTozOntzOjQ6Im5hbWUiO3M6Mjc6IiVFNSVCRSVBRSVFNSVBRSU5OCVFNyVCRCU5MSI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjY2OiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9Y2hhbm5lbCZuYW1lPWluZGV4JndlaWQ9MSMiO31pOjQ7YTozOntzOjQ6Im5hbWUiO3M6MzY6IiVFOSU4NyU4RCVFOCVBNiU4MSVFOCVCNSU4NCVFOCVBRSVBRiI7czo0OiJ0eXBlIjtzOjQ6InZpZXciO3M6MzoidXJsIjtzOjc4OiJodHRwOi8vd2FpbWFpLmp5ZHM5NS5jb20vbW9iaWxlLnBocD9hY3Q9bW9kdWxlJmNpZD01Jm5hbWU9c2l0ZSZkbz1saXN0JndlaWQ9MSMiO319fX1zOjEwOiJjcmVhdGV0aW1lIjtpOjE0NTI2NjU4MDQ7fQ==');

-- --------------------------------------------------------

--
-- 表的结构 `ims_wechats_modules`
--

CREATE TABLE IF NOT EXISTS `ims_wechats_modules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `mid` int(10) unsigned NOT NULL,
  `enabled` tinyint(1) unsigned NOT NULL,
  `settings` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `ims_wechats_modules`
--

INSERT INTO `ims_wechats_modules` (`id`, `weid`, `mid`, `enabled`, `settings`) VALUES
(1, 1, 21, 1, 'a:13:{s:5:"times";i:1;s:6:"credit";i:10;s:8:"showrank";i:10;s:5:"tsign";i:10;s:5:"csign";i:7;s:5:"osign";i:0;s:10:"tsignprize";s:2:"10";s:10:"csignprize";s:2:"30";s:10:"osignprize";s:0:"";s:9:"start_day";s:16:"2016-01-12 23:36";s:7:"end_day";s:16:"2018-02-11 23:36";s:10:"start_time";s:5:"06:00";s:8:"end_time";s:5:"22:00";}');

-- --------------------------------------------------------

--
-- 表的结构 `ims_wxuser`
--

CREATE TABLE IF NOT EXISTS `ims_wxuser` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_user` varchar(50) NOT NULL DEFAULT '0' COMMENT '用户的唯一身份ID',
  `fakeid` varchar(18) NOT NULL DEFAULT '' COMMENT 'FakeId',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(100) NOT NULL DEFAULT '' COMMENT '头像',
  `username` varchar(15) NOT NULL DEFAULT '' COMMENT '微信号',
  `signature` varchar(255) NOT NULL DEFAULT '' COMMENT '签名',
  `sex` varchar(5) NOT NULL,
  `groupid` int(2) NOT NULL,
  `city` varchar(255) NOT NULL,
  `ctime` varchar(30) NOT NULL,
  `weid` int(8) NOT NULL,
  `rid` int(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
