# js代码片段
经常会遇到使用的片段，如果每次都去网上搜索的话，会浪费很多的时间，因此在这里把常用的代码总结一下！

### 1.js操作cookie

```javascript
var cookie = {
    //写cookies
    setCookie: function (name, value) {
        var Days = 365;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    //读取cookies
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },

    //删除cookies， name可以为字符串('username')或数组(['username', 'password', ...])
    delCookie: function (name) {
        var delItem = function (item) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = cookie.getCookie(item);
            if (cval !== null) document.cookie = item + "=" + cval + ";expires=" + exp.toGMTString();
        }

        if (typeof name === 'string') {
            delItem(name);
        } else {
            for (var i = 0, len = name.length; i < len; i++) {
                delItem(name[i]);
            }
        }
    }
}
```

### 2.js字符串翻转

```javascript
var str = "abcdefg";
var revs = str.split("").reverse().join("");
console.log(revs);
```

### 3.js产生随机数字
```javascript
function getRanNum(){
    return (''+Math.random()).slice(-6); // Math.random().toString().slice(-6)
}
```

### 4.radio-checkbox-select
jquery对radio, checkbox的input标签和select标签的操作

#### input[type=radio] 的操作

```javascript
// boolean, 判断radio是否有被选中的元素
$('#myradio input[type=radio]').is(':checked');

// 设置radio选中某个元素
$('#myradio input:eq(1)').prop('checked', true);

// 设置radio取消选中某个元素
$('#myradio input:eq(1)').prop('checked', false);

// 获取选中的radio的值
var val = $('#myradio input[type=radio]:checked').val();
```

#### input[type=checkbox] 的操作
```javascript
// 判断复选框是否选中
var bool = $('#mycheckbox input[type=checkbox]').is(':checked') ;

// 全选，所有的checkbox都添加上checked属性
$('#checkall').click(function(){
    $('#like input[type=checkbox]').prop('checked', true);
})

// 反选，判断当前的checkbox是否被选中，若被选中则设置checked属性为false，否则设置checked属性为true
$('#reverse').click(function(){
    $('#like input[type=checkbox]').each(function(){
        if($(this).is(':checked')){
            $(this).prop('checked', false);
        }else{
            $(this).prop('checked', true);
        }
    })
})

// 取消选中，去掉所有checkbox的checked属性
$('#deleteall').click(function(){
    $('#like input[type=checkbox]').prop('checked', false);
})

// 获取选中的值
$('#getcheckval').click(function(){
    var result = [];
    $('#mycheckbox input[type=checkbox]:checked').each(function(){
        result.push( $(this).val() );
    })
    console.log(result);
})
```

#### select标签
```javascript
// 获取select选中的value值，给select一个id，直接使用`val()`获取就行
$('#province').val()
```

### 5.requestAnimationFrame 的兼容性处理
```javascript
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());
```

### 6.获取鼠标移动的方向
我们一定遇见过鼠标从哪个地方进入到某div中，遮罩就从哪个方向出现，鼠标从哪个地方离开这个div，遮罩就从哪个方向消失。整个动画实现的基础就是获取鼠标移动的方向。
```javascript
/*
 * 获取元素移动的方向
 * @param  $element  元素的jQuery对象
 * @param  event     事件对象
 * @return direction 返回一个数字：0:上，1:右，2:下，3:左
 **/
function getDirection($element, event) {
    var w = $element.width(),
        h = $element.height(),
        x = (event.pageX - $element.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
        y = (event.pageY - $element.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
        direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

    return direction;
}

$('#content').on('mouseenter', function(event){
    console.log( 'enter: '+ getDirection($(this), event) );
}).on('mouseleave', function(event){
    console.log( 'leave: '+getDirection($(this), event) );
})
```

### 7.扩展String中的format

* 对String原型进行扩展: String.prototype.methodName=function...
* 正则表达式： /{(\d+)}/g ；取"{0}"这种格式的占位符，并对里面的数字放入子组
* js 的 replace 方法有一种重载, string.format(regex , function(group0【匹配项】,group1【子组第一个】...){ //code... }) ；对于每次匹配到的一个占位符，都从参数相应的位置取得替换项。

```javascript
String.prototype.format = function () {
    var args = arguments;
    var reg = /\{(\d+)\}/g;
    return this.replace(reg, function (g0, g1) {
        return args[+g1] || '';
    });
};
//用法：
"hello {0},your age is {1},so {0}'s age is {1}".format("tom",12);
//"hello tom,your age is 12,so tom's age is 12"
```

若不想在String的类型上进行拓展，也可以这样修改：

```javascript   
var tool = {
    format : function(str){
        var args = arguments;
	    var reg = /\{(\d+)\}/g;
	    return str.replace(reg, function (g0, g1) {
	    	g1++;

	        return args[+g1] || '';
	    });
    }
}

tool.format("hello {0},your age is {1},so {0}'s age is {1}", "tom", 12);
// "hello tom,your age is 12,so tom's age is 12"
```

### 8.html字段转换函数
```javascript
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"};                      
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
    }); 
}
```

### 9.js产生随机字符串
```javascript
Math.random().toString(36).substr(2);
```

### 10.检测浏览器是否支持fixed
```javascript
function isSupportFixed() {
    var userAgent = window.navigator.userAgent, 
        ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
        ios5below = ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) < 5),
        operaMini = /Opera Mini/i.test(userAgent),
        body = document.body,
        div, isFixed;

    div = document.createElement('div');
    div.style.cssText = 'display:none;position:fixed;z-index:100;';
    body.appendChild(div);
    isFixed = window.getComputedStyle(div).position != 'fixed';
    body.removeChild(div);
    div = null;

    return !!(isFixed || ios5below || operaMini);
}
```

### 11.解析url中的参数
用于解析当前URL中带的参数，如 http://www.xiabingbao.com/javascript/2015/01/30/geturl-param/?a=1&b=wenzi
```javascript   
function parseUrl(search, name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = url.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
parseUrl(window.location.search, 'id');
```

### 12. jQuery回到顶部
回到顶部有不少的方法，没有缓冲效果的话，先在顶部放置一个a标签，然后给回到顶部的链接一个#:
```html
// 顶部标签
<a id="top"></a>

// 回到顶部的按钮
<a href="#top">回到顶部</a>
```

如果需要缓冲效果的话，可以使用jQuery中的animate:
```javascript   
$('body,html').animate({scrollTop:0}, 500);
```

### 13.时间格式化
```javascript   
//格式化日期
Date.prototype.Format = function (fmt) {
    var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds()             //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}
```

使用：

```javascript
var date = new Date();
console.log(date.Format("yyyy年MM月dd日 hh:mm:ss.S")); 
console.log(date.Format("yyyy-MM-dd hh:mm:ss")); 
console.log(date.Format("yy-MM-dd hh:mm:ss")); 
console.log(date.Format("yy-M-d hh:mm:ss")); 
```

### 14.校验正则集合
```javascript
真实姓名或昵称: 
/^[\u4e00-\u9fa5a-zA-Z0-9]+$/g.test($name.val())

身份证号码：
/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test($IdCard.val())

手机号码：
/^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}$/.test($phone.val())

匹配手机号码和带区号的电话号码：
/^((0\d{2,3}-\d{5,8})|((13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}))$/.test($phone.val())

电子邮箱：
/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/.test($email.val())

有效的金额：
/^[0-9]{1,6}([.][0-9]{1,2})?$/.test($money.val())

6-16位字母、数字或字符组合的登录密码：
/^((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!$~%^&*])|(?=.*\d)(?=.*[#@!$~%^&*]))[a-z\d#@!$~%^&*]{6,16}$/i.test($pwd.val())
```