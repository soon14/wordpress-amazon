/**
 * Created by bjie on 11/26/2014.
 */
(function(){
    window.ND.FORMBUILDER = window.ND.FORMBUILDER || {};
    window.ND.FORMBUILDER.LOCATIONMAP = window.ND.FORMBUILDER.LOCATIONMAP || {
        //北京
        "\u5317\u4eac":{
            code: "010",
            cities:{
                "\u5317\u4eac\u5e02":"1" //北京市
            }
        },
        //上海
        "\u4e0a\u6d77":{
            code: "020",
            cities: {
                "\u4e0a\u6d77":"2" //上海
            }
        },
        //天津
        "\u5929\u6d25":{
            code: "030",
            cities: {
                "\u5929\u6d25":"4" //天津
            }
        },
        //内蒙古
        "\u5185\u8499\u53e4":{
            code: "040",
            cities: {
                "\u547c\u548c\u6d69\u7279":"53", //呼和浩特
                "\u5305\u5934":"54", //包头
                "\u4e4c\u6d77":"55", //乌海
                "\u8d64\u5cf0":"56", //赤峰
                "\u901a\u8fbd":"57", //通辽
                "\u4e4c\u5170\u5bdf\u5e03\u76df":"58", //乌兰察布盟
                "\u9521\u6797\u90ed\u52d2\u76df":"59", //锡林郭勒盟
                "\u547c\u4f26\u8d1d\u5c14":"60", //呼伦贝尔
                "\u9102\u5c14\u591a\u65af":"61", //鄂尔多斯
                "\u5df4\u5f66\u6dd6\u5c14\u76df":"62", //巴彦淖尔盟
                "\u963f\u62c9\u5584\u76df":"63", //阿拉善盟
                "\u5174\u5b89\u76df":"64", //兴安盟
                "\u989d\u5c14\u53e4\u7eb3":"65", //额尔古纳
                "\u970d\u6797\u90ed\u52d2":"66", //霍林郭勒
                "\u6ee1\u5dde\u91cc":"67", //满州里
                "\u7259\u514b\u77f3":"68", //牙克石
                "\u624e\u5170\u5c6f":"69", //扎兰屯
                "\u6839\u6cb3":"70" //根河
            }
        },
        //山西
        "\u5c71\u897f":{
            code: "050",
            cities: {
                "\u592a\u539f":"36", //太原
                "\u5927\u540c":"37", //大同
                "\u9633\u6cc9":"38", //阳泉
                "\u957f\u6cbb":"39", //长治
                "\u664b\u57ce":"40", //晋城
                "\u6714\u5dde":"41", //朔州
                "\u664b\u4e2d":"42", //晋中
                "\u5ffb\u5dde":"43", //忻州
                "\u5415\u6881\u5730\u533a":"44", //吕梁地区
                "\u4e34\u6c7e":"45", //临汾
                "\u8fd0\u57ce":"46", //运城
                "\u4ecb\u4f11":"47", //介休
                "\u539f\u5e73":"48", //原平
                "\u6cb3\u6d25":"49", //河津
                "\u6c38\u6d4e":"50", //永济
                "\u4faf\u9a6c":"51", //侯马
                "\u970d\u5dde":"52" //霍州
            }
        },
        //河北
        "\u6cb3\u5317":{
            code: "060",
            cities: {
                "\u77f3\u5bb6\u5e84":"25", //石家庄
                "\u90af\u90f8":"26", //邯郸
                "\u90a2\u53f0":"27", //邢台
                "\u4fdd\u5b9a":"28", //保定
                "\u5f20\u5bb6\u53e3":"29", //张家口
                "\u627f\u5fb7":"30", //承德
                "\u5510\u5c71":"31", //唐山
                "\u5eca\u574a":"32", //廊坊
                "\u6ca7\u5dde":"33", //沧州
                "\u8861\u6c34":"34", //衡水
                "\u79e6\u7687\u5c9b":"35" //秦皇岛
            }
        },
        //辽宁
        "\u8fbd\u5b81":{
            code: "070",
            cities: {
                "\u6c88\u9633":"71", //沈阳
                "\u5927\u8fde":"72", //大连
                "\u978d\u5c71":"73", //鞍山
                "\u629a\u987a":"74", //抚顺
                "\u672c\u6eaa":"75", //本溪
                "\u4e39\u4e1c":"76", //丹东
                "\u9526\u5dde":"77", //锦州
                "\u846b\u82a6\u5c9b":"78", //葫芦岛
                "\u8425\u53e3":"79", //营口
                "\u76d8\u9526":"80", //盘锦
                "\u961c\u65b0":"81", //阜新
                "\u94c1\u5cad":"82", //铁岭
                "\u8fbd\u9633":"83", //辽阳
                "\u671d\u9633":"84" //朝阳
            }
        },
        //吉林
        "\u5409\u6797":{
            code: "080",
            cities: {
                "\u957f\u6625":"85", //长春
                "\u5409\u6797":"86", //吉林
                "\u56db\u5e73":"87", //四平
                "\u8fbd\u6e90":"88", //辽源
                "\u901a\u5316":"89", //通化
                "\u767d\u5c71":"90", //白山
                "\u677e\u539f":"91", //松原
                "\u767d\u57ce":"92", //白城
                "\u5ef6\u8fb9\u671d\u9c9c\u65cf":"93" //延边朝鲜族
            }
        },
        //黑龙江
        "\u9ed1\u9f99\u6c5f":{
            code: "090",
            cities: {
                "\u54c8\u5c14\u6ee8":"94", //哈尔滨
                "\u9f50\u9f50\u54c8\u5c14":"95", //齐齐哈尔
                "\u9e64\u5c97":"96", //鹤岗
                "\u53cc\u9e2d\u5c71":"97", //双鸭山
                "\u9e21\u897f":"98", //鸡西
                "\u5927\u5e86":"99", //大庆
                "\u4f0a\u6625":"100", //伊春
                "\u7261\u4e39\u6c5f":"101", //牡丹江
                "\u4f73\u6728\u65af":"102", //佳木斯
                "\u4e03\u53f0\u6cb3":"103", //七台河
                "\u9ed1\u6cb3":"104", //黑河
                "\u7ee5\u5316":"105", //绥化
                "\u5927\u5174\u5b89\u5cad\u533a":"106" //大兴安岭区
            }
        },
        //江苏
        "\u6c5f\u82cf":{
            code: "100",
            cities: {
                "\u5357\u4eac":"107", //南京
                "\u65e0\u9521":"108", //无锡
                "\u9547\u6c5f":"109", //镇江
                "\u5357\u901a":"110", //南通
                "\u626c\u5dde":"111", //扬州
                "\u76d0\u57ce":"112", //盐城
                "\u5f90\u5dde":"113", //徐州
                "\u6dee\u5b89":"114", //淮安
                "\u8fde\u4e91\u6e2f":"115", //连云港
                "\u5e38\u5dde":"116", //常州
                "\u82cf\u5dde":"117", //苏州
                "\u6cf0\u5dde":"118", //泰州
                "\u5bbf\u8fc1":"119" //宿迁
            }
        },
        //安徽
        "\u5b89\u5fbd":{
            code: "110",
            cities: {
                "\u5408\u80a5":"132", //合肥
                "\u6dee\u5357":"133", //淮南
                "\u6dee\u5317":"134", //淮北
                "\u829c\u6e56":"135", //芜湖
                "\u94dc\u9675":"136", //铜陵
                "\u868c\u57e0":"137", //蚌埠
                "\u9a6c\u978d\u5c71":"138", //马鞍山
                "\u5b89\u5e86":"139", //安庆
                "\u9ec4\u5c71":"140", //黄山
                "\u6ec1\u5dde":"141", //滁州
                "\u961c\u9633":"142", //阜阳
                "\u4eb3\u5dde":"143", //亳州
                "\u5bbf\u5dde":"144", //宿州
                "\u5de2\u6e56":"145", //巢湖
                "\u516d\u5b89":"146", //六安
                "\u5ba3\u5dde":"147", //宣州
                "\u6c60\u5dde":"148", //池州
                "\u5b81\u56fd":"149" //宁国
            }
        },
        //山东
        "\u5c71\u4e1c":{
            code: "120",
            cities: {
                "\u6d4e\u5357":"177", //济南
                "\u9752\u5c9b":"178", //青岛
                "\u6dc4\u535a":"179", //淄博
                "\u67a3\u5e84":"180", //枣庄
                "\u6f4d\u574a":"181", //潍坊
                "\u4e1c\u8425":"182", //东营
                "\u70df\u53f0":"183", //烟台
                "\u6d4e\u5b81":"184", //济宁
                "\u5a01\u6d77":"185", //威海
                "\u6cf0\u5b89":"186", //泰安
                "\u65e5\u7167":"187", //日照
                "\u83b1\u829c":"188", //莱芜
                "\u5fb7\u5dde":"189", //德州
                "\u4e34\u6c82":"190", //临沂
                "\u804a\u57ce":"191", //聊城
                "\u6ee8\u5dde":"192", //滨州
                "\u83cf\u6cfd":"193" //菏泽
            }
        },
        //浙江
        "\u6d59\u6c5f":{
            code: "130",
            cities: {
                "\u676d\u5dde":"120", //杭州
                "\u5b81\u6ce2":"121", //宁波
                "\u6e29\u5dde":"122", //温州
                "\u5609\u5174":"123", //嘉兴
                "\u6e56\u5dde":"124", //湖州
                "\u7ecd\u5174":"125", //绍兴
                "\u91d1\u534e":"126", //金华
                "\u8862\u5dde":"127", //衢州
                "\u821f\u5c71":"128", //舟山
                "\u53f0\u5dde":"129", //台州
                "\u4e3d\u6c34":"130", //丽水
                "\u9f99\u6cc9":"131" //龙泉
            }
        },
        //江西
        "\u6c5f\u897f":{
            code: "140",
            cities: {
                "\u5357\u660c":"159", //南昌
                "\u666f\u5fb7\u9547":"160", //景德镇
                "\u840d\u4e61":"161", //萍乡
                "\u65b0\u4f59":"162", //新余
                "\u4e5d\u6c5f":"163", //九江
                "\u9e70\u6f6d":"164", //鹰潭
                "\u8d63\u5dde":"165", //赣州
                "\u5b9c\u6625":"166", //宜春
                "\u4e0a\u9976":"167", //上饶
                "\u629a\u5dde":"168", //抚州
                "\u5409\u5b89":"169", //吉安
                "\u745e\u91d1":"170", //瑞金
                "\u5357\u5eb7":"171", //南康
                "\u4e30\u57ce":"172", //丰城
                "\u6a1f\u6811":"173", //樟树
                "\u9ad8\u5b89":"174", //高安
                "\u5fb7\u5174":"175", //德兴
                "\u4e95\u5188\u5c71":"176" //井冈山
            }
        },
        //福建
        "\u798f\u5efa":{
            code: "150",
            cities: {
                "\u798f\u5dde":"150", //福州
                "\u53a6\u95e8":"151", //厦门
                "\u4e09\u660e":"152", //三明
                "\u8386\u7530":"153", //莆田
                "\u6cc9\u5dde":"154", //泉州
                "\u5357\u5e73":"155", //南平
                "\u6f33\u5dde":"156", //漳州
                "\u9f99\u5ca9":"157", //龙岩
                "\u5b81\u5fb7":"158" //宁德
            }
        },
        //湖南
        "\u6e56\u5357":{
            code: "160",
            cities: {
                "\u957f\u6c99":"230", //长沙
                "\u682a\u5dde":"231", //株州
                "\u6e58\u6f6d":"232", //湘潭
                "\u8861\u9633":"233", //衡阳
                "\u90b5\u9633":"234", //邵阳
                "\u5cb3\u9633":"235", //岳阳
                "\u5e38\u5fb7":"236", //常德
                "\u5f20\u5bb6\u754c":"237", //张家界
                "\u90f4\u5dde":"238", //郴州
                "\u76ca\u9633":"239", //益阳
                "\u6c38\u5dde":"240", //永州
                "\u6000\u5316":"241", //怀化
                "\u5a04\u5e95":"242", //娄底
                "\u6e58\u897f\u571f\u5bb6\u65cf\u82d7\u65cf":"243", //湘西土家族苗族
                "\u51b7\u6c34\u6c5f":"244", //冷水江
                "\u6d9f\u6e90":"245" //涟源
            }
        },
        //湖北
        "\u6e56\u5317":{
            code: "170",
            cities: {
                "\u6b66\u6c49":"213", //武汉
                "\u9ec4\u77f3":"214", //黄石
                "\u8944\u6a0a":"215", //襄樊
                "\u8346\u5dde":"217", //荆州
                "\u5b9c\u660c":"218", //宜昌
                "\u8346\u95e8":"219", //荆门
                "\u9102\u5dde":"220", //鄂州
                "\u5b5d\u611f":"221", //孝感
                "\u54b8\u5b81":"222", //咸宁
                "\u9ec4\u5188":"223", //黄冈
                "\u968f\u5dde":"224", //随州
                "\u6069\u65bd\u571f\u5bb6\u65cf\u82d7\u65cf":"225", //恩施土家族苗族
                "\u4ed9\u6843":"226", //仙桃
                "\u5929\u95e8":"227", //天门
                "\u6f5c\u6c5f":"228", //潜江
                "\u795e\u519c\u67b6\u6797\u533a":"229", //神农架林区
                "\u5341\u5830":"390" //十堰
            }
        },
        //河南
        "\u6cb3\u5357":{
            code: "180",
            cities: {
                "\u90d1\u5dde":"194", //郑州
                "\u5f00\u5c01":"195", //开封
                "\u6d1b\u9633":"196", //洛阳
                "\u5e73\u9876\u5c71":"197", //平顶山
                "\u7126\u4f5c":"198", //焦作
                "\u9e64\u58c1":"199", //鹤壁
                "\u65b0\u4e61":"200", //新乡
                "\u5b89\u9633":"201", //安阳
                "\u6fee\u9633":"202", //濮阳
                "\u8bb8\u660c":"203", //许昌
                "\u6f2f\u6cb3":"204", //漯河
                "\u4e09\u95e8\u5ce1":"205", //三门峡
                "\u5357\u9633":"206", //南阳
                "\u5546\u4e18":"207", //商丘
                "\u4fe1\u9633":"208", //信阳
                "\u5468\u53e3":"209", //周口
                "\u9a7b\u9a6c\u5e97":"210", //驻马店
                "\u6d4e\u6e90":"211", //济源
                "\u9879\u57ce":"212" //项城
            }
        },
        //广东
        "\u5e7f\u4e1c":{
            code: "190",
            cities: {
                "\u5e7f\u5dde\u5e02":"246", //广州市
                "\u6df1\u5733":"247", //深圳
                "\u73e0\u6d77":"248", //珠海
                "\u97f6\u5173":"249", //韶关
                "\u6c55\u5934":"250", //汕头
                "\u6cb3\u6e90":"252", //河源
                "\u6885\u5dde":"253", //梅州
                "\u60e0\u5dde":"254", //惠州
                "\u6c55\u5c3e":"255", //汕尾
                "\u4e1c\u839e":"256", //东莞
                "\u4e2d\u5c71":"257", //中山
                "\u6c5f\u95e8":"258", //江门
                "\u4f5b\u5c71":"259", //佛山
                "\u9633\u6c5f":"260", //阳江
                "\u6e5b\u6c5f":"261", //湛江
                "\u8302\u540d":"262", //茂名
                "\u8087\u5e86":"263", //肇庆
                "\u4e91\u6d6e":"264", //云浮
                "\u6e05\u8fdc":"265", //清远
                "\u6f6e\u5dde":"266", //潮州
                "\u63ed\u9633":"267" //揭阳
            }
        },
        //海南
        "\u6d77\u5357":{
            code: "200",
            cities: {
                "\u6d77\u53e3":"6", //海口
                "\u4e09\u4e9a":"7", //三亚
                "\u4e94\u6307\u5c71":"8", //五指山
                "\u743c\u6d77":"9", //琼海
                "\u510b\u5dde":"10", //儋州
                "\u743c\u5c71":"11", //琼山
                "\u6587\u660c":"12", //文昌
                "\u4e07\u5b81":"13", //万宁
                "\u4e1c\u65b9":"14", //东方
                "\u6f84\u8fc8\u53bf":"15", //澄迈县
                "\u5b9a\u5b89\u53bf":"16", //定安县
                "\u5c6f\u660c\u53bf":"17", //屯昌县
                "\u4e34\u9ad8\u53bf":"18", //临高县
                "\u767d\u6c99\u9ece\u65cf":"19", //白沙黎族
                "\u660c\u6c5f\u9ece\u65cf":"20", //昌江黎族
                "\u4e50\u4e1c\u9ece\u65cf":"21", //乐东黎族
                "\u9675\u6c34\u9ece\u65cf":"22", //陵水黎族
                "\u743c\u4e2d\u9ece\u65cf\u82d7\u65cf":"23", //琼中黎族苗族
                "\u4fdd\u4ead\u9ece\u65cf\u82d7\u65cf":"24" //保亭黎族苗族
            }
        },
        //广西
        "\u5e7f\u897f":{
            code: "210",
            cities: {
                "\u5357\u5b81":"268", //南宁
                "\u67f3\u5dde":"269", //柳州
                "\u6842\u6797":"270", //桂林
                "\u68a7\u5dde":"271", //梧州
                "\u5317\u6d77":"272", //北海
                "\u9632\u57ce\u6e2f":"273", //防城港
                "\u94a6\u5dde":"274", //钦州
                "\u8d35\u6e2f":"275", //贵港
                "\u7389\u6797":"276", //玉林
                "\u5357\u5b81\u5730\u533a":"277", //南宁地区
                "\u67f3\u5dde\u5730\u533a":"278", //柳州地区
                "\u8d3a\u5dde":"279", //贺州
                "\u767e\u8272":"280", //百色
                "\u6cb3\u6c60":"281" //河池
            }
        },
        //贵州
        "\u8d35\u5dde":{
            code: "220",
            cities: {
                "\u8d35\u9633":"305", //贵阳
                "\u516d\u76d8\u6c34":"306", //六盘水
                "\u9075\u4e49":"307", //遵义
                "\u94dc\u4ec1\u5730\u533a":"308", //铜仁地区
                "\u6bd5\u8282\u5730\u533a":"309", //毕节地区
                "\u5b89\u987a":"310", //安顺
                "\u9ed4\u897f\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf":"311", //黔西南布依族苗族
                "\u9ed4\u4e1c\u5357\u82d7\u65cf\u4f97\u65cf":"312", //黔东南苗族侗族
                "\u9ed4\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf":"313" //黔南布依族苗族
            }
        },
        //四川
        "\u56db\u5ddd":{
            code: "230",
            cities: {
                "\u6210\u90fd":"282", //成都
                "\u81ea\u8d21":"283", //自贡
                "\u6500\u679d\u82b1":"284", //攀枝花
                "\u6cf8\u5dde":"285", //泸州
                "\u5fb7\u9633":"286", //德阳
                "\u7ef5\u9633":"287", //绵阳
                "\u5e7f\u5143":"288", //广元
                "\u9042\u5b81":"289", //遂宁
                "\u5185\u6c5f":"290", //内江
                "\u4e50\u5c71":"291", //乐山
                "\u5357\u5145":"292", //南充
                "\u5b9c\u5bbe":"293", //宜宾
                "\u5e7f\u5b89":"294", //广安
                "\u8fbe\u5dde":"295", //达州
                "\u8d44\u9633":"296", //资阳
                "\u5df4\u4e2d":"297", //巴中
                "\u96c5\u5b89":"298", //雅安
                "\u7709\u5c71":"299", //眉山
                "\u963f\u575d\u85cf\u65cf\u7f8c\u65cf":"300", //阿坝藏族羌族
                "\u7518\u5b5c\u85cf\u65cf":"301", //甘孜藏族
                "\u51c9\u5c71\u5f5d\u65cf":"302", //凉山彝族
                "\u534e\u84e5":"303", //华蓥
                "\u7b80\u9633":"304" //简阳
            }
        },
        //云南
        "\u4e91\u5357":{
            code: "240",
            cities: {
                "\u6606\u660e":"314", //昆明
                "\u66f2\u9756":"315", //曲靖
                "\u7389\u6eaa":"316", //玉溪
                "\u662d\u901a":"317", //昭通
                "\u4e34\u4ed3\u5730\u533a":"318", //临仓地区
                "\u4e3d\u6c5f\u5730\u533a":"319", //丽江地区
                "\u601d\u8305\u5730\u533a":"320", //思茅地区
                "\u4fdd\u5c71":"321", //保山
                "\u6587\u5c71\u58ee\u65cf\u82d7\u65cf":"322", //文山壮族苗族
                "\u7ea2\u6cb3\u54c8\u5c3c\u65cf\u5f5d\u65cf":"323", //红河哈尼族彝族
                "\u897f\u53cc\u7248\u7eb3\u50a3\u65cf":"324", //西双版纳傣族
                "\u695a\u96c4\u5f5d\u65cf":"325", //楚雄彝族
                "\u5927\u7406\u767d\u65cf":"326", //大理白族
                "\u5fb7\u5b8f\u50a3\u65cf\u666f\u9887\u65cf":"327", //德宏傣族景颇族
                "\u6012\u6c5f\u5088\u50f3\u65cf":"328", //怒江傈僳族
                "\u8fea\u5e86\u85cf\u65cf":"329" //迪庆藏族
            }
        },
        //陕西
        "\u9655\u897f":{
            code: "250",
            cities: {
                "\u897f\u5b89":"337", //西安
                "\u94dc\u5ddd":"338", //铜川
                "\u5b9d\u9e21":"339", //宝鸡
                "\u54b8\u9633":"340", //咸阳
                "\u6e2d\u5357":"341", //渭南
                "\u5ef6\u5b89":"342", //延安
                "\u6c49\u4e2d":"343", //汉中
                "\u6986\u6797":"344", //榆林
                "\u5b89\u5eb7":"345", //安康
                "\u5546\u6d1b":"346" //商洛
            }
        },
        //甘肃
        "\u7518\u8083":{
            code: "260",
            cities: {
                "\u5170\u5dde":"347", //兰州
                "\u91d1\u660c":"348", //金昌
                "\u767d\u94f6":"349", //白银
                "\u5929\u6c34":"350", //天水
                "\u5609\u5cea\u5173":"351", //嘉峪关
                "\u5b9a\u897f\u5730\u533a":"352", //定西地区
                "\u5e73\u51c9":"353", //平凉
                "\u6b66\u5a01":"354", //武威
                "\u5e86\u9633":"355", //庆阳
                "\u9647\u5357\u5730\u533a":"356", //陇南地区
                "\u5f20\u6396\u5730\u533a":"357", //张掖地区
                "\u9152\u6cc9":"358", //酒泉
                "\u7518\u5357\u85cf\u65cf":"359", //甘南藏族
                "\u4e34\u590f\u56de\u65cf":"360" //临夏回族
            }
        },
        //宁夏
        "\u5b81\u590f":{
            code: "270",
            cities: {
                "\u94f6\u5ddd":"369", //银川
                "\u77f3\u5634\u5c71":"370", //石嘴山
                "\u5434\u5fe0":"371", //吴忠
                "\u56fa\u539f":"372", //固原
                "\u9752\u94dc\u5ce1":"373", //青铜峡
                "\u7075\u6b66":"374" //灵武
            }
        },
        //青海
        "\u9752\u6d77":{
            code: "280",
            cities: {
                "\u897f\u5b81":"361", //西宁
                "\u6d77\u4e1c\u5730\u533a":"362", //海东地区
                "\u6d77\u5317\u85cf\u65cf":"363", //海北藏族
                "\u9ec4\u5357\u85cf\u65cf":"364", //黄南藏族
                "\u6d77\u5357\u85cf\u65cf":"365", //海南藏族
                "\u679c\u6d1b\u85cf\u65cf":"366", //果洛藏族
                "\u7389\u6811\u85cf\u65cf":"367", //玉树藏族
                "\u6d77\u897f\u8499\u53e4\u65cf\u85cf\u65cf":"368" //海西蒙古族藏族
            }
        },
        //新疆
        "\u65b0\u7586":{
            code: "290",
            cities: {
                "\u4e4c\u9c81\u6728\u9f50":"375", //乌鲁木齐
                "\u514b\u62c9\u739b\u4f9d":"376", //克拉玛依
                "\u5410\u9c81\u756a\u5730\u533a":"377", //吐鲁番地区
                "\u54c8\u5bc6\u5730\u533a":"378", //哈密地区
                "\u548c\u7530\u5730\u533a":"379", //和田地区
                "\u963f\u514b\u82cf\u5730\u533a":"380", //阿克苏地区
                "\u5580\u4ec0\u5730\u533a":"381", //喀什地区
                "\u514b\u5b5c\u52d2\u82cf\u67ef\u5c14\u514b\u5b5c":"382", //克孜勒苏柯尔克孜
                "\u5df4\u97f3\u90ed\u695e\u8499\u53e4":"383", //巴音郭楞蒙古
                "\u535a\u5c14\u5854\u62c9\u8499\u53e4":"384", //博尔塔拉蒙古
                "\u660c\u5409\u56de\u65cf":"385", //昌吉回族
                "\u4f0a\u7281\u54c8\u8428\u514b":"386", //伊犁哈萨克
                "\u5854\u57ce\u5730\u533a":"387", //塔城地区
                "\u963f\u52d2\u6cf0\u5730\u533a":"388", //阿勒泰地区
                "\u77f3\u6cb3\u5b50":"389" //石河子
            }
        },
        //西藏
        "\u897f\u85cf":{
            code: "300",
            cities: {
                "\u62c9\u8428":"330", //拉萨
                "\u660c\u90fd\u5730\u533a":"331", //昌都地区
                "\u90a3\u66f2\u5730\u533a":"332", //那曲地区
                "\u5c71\u5357\u5730\u533a":"333", //山南地区
                "\u963f\u91cc\u5730\u533a":"334", //阿里地区
                "\u65e5\u5580\u5219\u5730\u533a":"335", //日喀则地区
                "\u6797\u829d\u5730\u533a":"336" //林芝地区

            }
        },
        //重庆
        "\u91cd\u5e86":{
            code: "320",
            cities: {
                "\u91cd\u5e86":"5" //重庆
            }
        },
        "Beijing":{
            code: "010",
            cities: {
                "Beijing":"1"
            }
        },
        "Shanghai":{
            code: "020",
            cities: {
                "Shanghai":"2"
            }
        },
        "Tianjin":{
            code: "030",
            cities: {
                "Tianjin":"4"
            }
        },
        "Neimenggu":{
            code: "040",
            cities: {
                "Huhehaote":"53",
                "Baotou":"54",
                "Wuhai":"55",
                "Cifeng":"56",
                "Tongliao":"57",
                "Wulanchabumeng":"58",
                "Xilinguolemeng":"59",
                "Hulunbeier":"60",
                "Eerduosi":"61",
                "Bayannaoer":"62",
                "Alashan":"63",
                "Xingan":"64",
                "Eerguna":"65",
                "Huolinguole":"66",
                "Manzhouli":"67",
                "Yakeshi":"68",
                "Zhalantun":"69",
                "Genhe":"70"
            }
        },
        "Shanxi":{
            code: "050",
            cities: {
                "Taiyuan":"36",
                "Datong":"37",
                "Yangquan":"38",
                "Changzhi":"39",
                "Jincheng":"40",
                "Shuozhou":"41",
                "Jinzhong":"42",
                "Xinzhou":"43",
                "Lvliang":"44",
                "Linfen":"45",
                "Yuncheng":"46",
                "Jiexiu":"47",
                "Yuanping":"48",
                "Hejin":"49",
                "Yongji":"50",
                "Houma":"51",
                "Huozhou":"52"
            }
        },
        "Heibei":{
            code: "060",
            cities: {
                "Shijiazhuang":"25",
                "Handan":"26",
                "Xingtai":"27",
                "Baoding":"28",
                "Zhangjiakou":"29",
                "Chengde":"30",
                "Tangshan":"31",
                "Langfang":"32",
                "Cangzhou":"33",
                "Hengshui":"34",
                "Qinhuangdao":"35"
            }
        },
        "Liaoning":{
            code: "070",
            cities: {
                "Shenyang":"71",
                "Dalian":"72",
                "Anshan":"73",
                "Fushun":"74",
                "Benxi":"75",
                "Dandong":"76",
                "Jinzhou":"77",
                "Huludao":"78",
                "Yingkou":"79",
                "Panjin":"80",
                "Fuxin":"81",
                "Tieling":"82",
                "Liaoyang":"83",
                "Chaoyang":"84"
            }
        },
        "Jilin":{
            code: "080",
            cities: {
                "Changchun":"85",
                "Jilin":"86",
                "Siping":"87",
                "Liaoyuan":"88",
                "Tonghua":"89",
                "Baishan":"90",
                "Songyuan":"91",
                "Baicheng":"92",
                "Yanbianchaoxianzu":"93"
            }
        },
        "Heilongjiang":{
            code: "090",
            cities: {
                "Haerbin":"94",
                "Qiqihaer":"95",
                "Hegang":"96",
                "Shuangyashan":"97",
                "Jixi":"98",
                "Daqing":"99",
                "Yichun":"100",
                "Mudanjiang":"101",
                "Jiamusi":"102",
                "Qitaihe":"103",
                "Heihe":"104",
                "Suihua":"105",
                "Daxinganling":"106"
            }
        },
        "Jiangsu":{
            code: "100",
            cities: {
                "Nanjing":"107",
                "Wuxi":"108",
                "Zhenjiang":"109",
                "Nantong":"110",
                "Yangzhou":"111",
                "Yancheng":"112",
                "Xuzhou":"113",
                "Huaian":"114",
                "Lianyungang":"115",
                "Changzhou":"116",
                "Suzhou":"117",
                "Taizhou":"118",
                "Suqian":"119"
            }
        },
        "Anhui":{
            code: "110",
            cities: {
                "Hefei":"132",
                "Huainan":"133",
                "Huaibei":"134",
                "Wuhu":"135",
                "Tongling":"136",
                "Bengbu":"137",
                "Maanshan":"138",
                "Anqing":"139",
                "Huangshan":"140",
                "Chuzhou":"141",
                "Fuyang":"142",
                "Bozhou":"143",
                "Suzhou4":"144",
                "Chaohu":"145",
                "Liuan":"146",
                "Xuanzhou":"147",
                "Chizhou":"148",
                "Ningguo":"149"
            }
        },
        "Shandong":{
            code: "120",
            cities: {
                "Jinan":"177",
                "Qingdao":"178",
                "Zibo":"179",
                "Zaozhuang":"180",
                "Weifang":"181",
                "Dongying":"182",
                "Yantai":"183",
                "Jining":"184",
                "Weihai":"185",
                "Taian":"186",
                "Rizhao":"187",
                "Laiwu":"188",
                "Dezhou":"189",
                "Linyi":"190",
                "Liaocheng":"191",
                "Binzhou":"192",
                "Heze":"193"
            }
        },
        "Zhejiang":{
            code: "130",
            cities: {
                "Hangzhou":"120",
                "Ningbo":"121",
                "Wenzhou":"122",
                "Jiaxing":"123",
                "Huzhou":"124",
                "Shaoxing":"125",
                "Jinhua":"126",
                "Quzhou":"127",
                "Zhoushan":"128",
                "Taizhou":"129",
                "Lishui":"130",
                "Longquan":"131"
            }
        },
        "Jiangxi":{
            code: "140",
            cities: {
                "Nanchang":"159",
                "Jingdezhen":"160",
                "Pingxiang":"161",
                "Xinyu":"162",
                "Jiujiang":"163",
                "Yingtan":"164",
                "Ganzhou":"165",
                "Yichun":"166",
                "Shangrao":"167",
                "Fuzhou":"168",
                "Jian":"169",
                "Ruijin":"170",
                "Nankang":"171",
                "Fengcheng":"172",
                "Zhangshu":"173",
                "Gaoan":"174",
                "Dexing":"175",
                "Jinggangshan":"176"
            }
        },
        "Fujian":{
            code: "150",
            cities: {
                "Fuzhou":"150",
                "Xiamen":"151",
                "Sanming":"152",
                "Putian":"153",
                "Quanzhou":"154",
                "Nanping":"155",
                "Zhangzhou":"156",
                "Longyan":"157",
                "Ningde":"158"
            }
        },
        "Hunan":{
            code: "160",
            cities: {
                "Changsha":"230",
                "Zhuzhou":"231",
                "Xiangtan":"232",
                "Hengyang":"233",
                "Shaoyang":"234",
                "Yueyang":"235",
                "Changde":"236",
                "Zhangjiajie":"237",
                "Chenzhou":"238",
                "Yiyang":"239",
                "Yongzhou":"240",
                "Huaihua":"241",
                "Loudi":"242",
                "Xiangxitujiazumiaozu":"243",
                "Lengshuijiang":"244",
                "Lianyuan":"245"
            }
        },
        "Hubei":{
            code: "170",
            cities: {
                "Wuhan":"213",
                "Huangshi":"214",
                "Xiangfan":"215",
                "Jingzhou":"217",
                "Yichang":"218",
                "Jingmen":"219",
                "Ezhou":"220",
                "Xiaogan":"221",
                "Xianning":"222",
                "Huanggang":"223",
                "Suizhou":"224",
                "Enshitujiazumiaozu":"225",
                "Xiantao":"226",
                "Tianmen":"227",
                "Qianjiang":"228",
                "Shennongjialinqu":"229",
                "Shiyan":"390"
            }
        },
        "Henan":{
            code: "180",
            cities: {
                "Zhengzhou":"194",
                "Kaifeng":"195",
                "Luoyang":"196",
                "Pingdingshan":"197",
                "Jiaozuo":"198",
                "Hebi":"199",
                "Xinxiang":"200",
                "Anyang":"201",
                "Puyang":"202",
                "Xuchang":"203",
                "Luohe":"204",
                "Sanmenxia":"205",
                "Nanyang":"206",
                "Shangqiu":"207",
                "Xinyang":"208",
                "Zhoukou":"209",
                "Zhumadian":"210",
                "Jiyuan":"211",
                "Xiangcheng":"212"
            }
        },
        "Guangdong":{
            code: "190",
            cities: {
                "Guangzhou":"246",
                "Shenzhen":"247",
                "Zhuhai":"248",
                "Shaoguan":"249",
                "Shantou":"250",
                "Heyuan":"252",
                "Meizhou":"253",
                "Huizhou":"254",
                "Shanwei":"255",
                "Dongguan":"256",
                "Zhongshan":"257",
                "Jiangmen":"258",
                "Foshan":"259",
                "Yangjiang":"260",
                "Zhanjiang":"261",
                "Maoming":"262",
                "Zhaoqing":"263",
                "Yunfu":"264",
                "Qingyuan":"265",
                "Chaozhou":"266",
                "Jieyang":"267"
            }
        },
        "Hainan":{
            code: "200",
            cities: {
                "Haikou":"6",
                "Sanya":"7",
                "Wuzhishan":"8",
                "Qionghai":"9",
                "Danzhou":"10",
                "Qiongshan":"11",
                "Wenchang":"12",
                "Wanning":"13",
                "Dongfang":"14",
                "Chengmai":"15",
                "Dingan":"16",
                "Tunchang":"17",
                "Lingao":"18",
                "Baishalizu":"19",
                "Changjianglizu":"20",
                "Ledonglizu":"21",
                "Lingshuilizu":"22",
                "Qiongzhonglizu":"23",
                "Baotinglizu":"24"
            }
        },
        "Guangxi":{
            code: "210",
            cities: {
                "Nanning":"268",
                "Liuzhou":"269",
                "Guilin":"270",
                "Wuzhou":"271",
                "Beihai":"272",
                "Fangchenggang":"273",
                "Qinzhou":"274",
                "Guigang":"275",
                "Yulin":"276",
                "NanningRegion":"277",
                "LiuzhouRegion":"278",
                "Hezhou":"279",
                "Baise":"280",
                "Hechi":"281"
            }
        },
        "Guizhou":{
            code: "220",
            cities: {
                "Guiyang":"305",
                "Liupanshui":"306",
                "Zunyi":"307",
                "Tongren":"308",
                "Bijie":"309",
                "Anshun":"310",
                "Qianxinanbuyizumiaozu":"311",
                "Qiandongnanmiaozutongzu":"312",
                "Qiannanbuyizumiaozu":"313"
            }
        },
        "Sichuan":{
            code: "230",
            cities: {
                "Chengdu":"282",
                "Zigong":"283",
                "Panzhihua":"284",
                "Luzhou":"285",
                "Deyang":"286",
                "Mianyang":"287",
                "Guangyuan":"288",
                "Suining":"289",
                "Neijiang":"290",
                "Leshan":"291",
                "Nanchong":"292",
                "Yibin":"293",
                "Guangan":"294",
                "Dazhou":"295",
                "Ziyang":"296",
                "Bazhong":"297",
                "Yaan":"298",
                "Meishan":"299",
                "Abazangzuqiang":"300",
                "Ganzizangzu":"301",
                "Liangshanyizu":"302",
                "Huaying":"303",
                "Jianyang":"304"
            }
        },
        "Yunnan":{
            code: "240",
            cities: {
                "Kunming":"314",
                "Qujing":"315",
                "Yuxi":"316",
                "Zhaotong":"317",
                "Lincang":"318",
                "Lijiang":"319",
                "Simao":"320",
                "Baoshan":"321",
                "Wenshanzhuangzumiaozu":"322",
                "Honghehanizuyizu":"323",
                "Xishuangbannadaizu":"324",
                "Chuxiongyizu":"325",
                "Dalibaizu":"326",
                "Dehongdaizujingpozu":"327",
                "Nujianglisuzu":"328",
                "Diqingzangzu":"329"
            }
        },
        "Shaanxi":{
            code: "250",
            cities: {
                "Xi'an":"337",
                "Tongchuan":"338",
                "Baoji":"339",
                "Xianyang":"340",
                "Weinan":"341",
                "Yanan":"342",
                "Hanzhong":"343",
                "Yulin":"344",
                "Ankang":"345",
                "Shangluo":"346"
            }
        },
        "Gansu":{
            code: "260",
            cities: {
                "Lanzhou":"347",
                "Jinchang":"348",
                "Baiyin":"349",
                "Tianshui":"350",
                "Jiayuguan":"351",
                "Dingxi":"352",
                "Pingliang":"353",
                "Wuwei":"354",
                "Qingyang":"355",
                "Longnan":"356",
                "Zhangye":"357",
                "Jiuquan":"358",
                "Gannanzangzu":"359",
                "Linxiahuizu":"360"
            }
        },
        "Ningxia":{
            code: "270",
            cities: {
                "Yinchuan":"369",
                "Shizuishan":"370",
                "Wuzhong":"371",
                "Guyuan":"372",
                "Qingtongxia":"373",
                "Lingwu":"374"
            }
        },
        "Qinghai":{
            code: "280",
            cities: {
                "Xining":"361",
                "Haidong":"362",
                "Haibeizangzu":"363",
                "Huangnanzangzu":"364",
                "Hainanzangzu":"365",
                "Guoluozangzu":"366",
                "Yushuzangzu":"367",
                "Haiximengguzangzu":"368"
            }
        },
        "Xinjiang":{
            code: "290",
            cities: {
                "Wulumuqi":"375",
                "Kelamayi":"376",
                "Tulufan":"377",
                "Hami":"378",
                "Hetian":"379",
                "Akesu":"380",
                "Kashi":"381",
                "Kezilesukeerkezi":"382",
                "Bayinguolengmenggu":"383",
                "Boertamenggu":"384",
                "Changjihuizu":"385",
                "Yilihasake":"386",
                "Tacheng":"387",
                "Aletai":"388",
                "Shihezi":"389"
            }
        },
        "Xizang":{
            code: "300",
            cities: {
                "Lasa":"330",
                "Changdou":"331",
                "Naqu":"332",
                "Shanxi":"333",
                "Ali":"334",
                "Rikaze":"335",
                "Linzhi":"336"
            }
        },
        "Chongqing":{
            code: "320",
            cities: {
                "Chongqing":"5"
            }
        }
    };
})();