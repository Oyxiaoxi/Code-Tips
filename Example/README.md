# js代码片段

## 常用代码总结

我们会遇到经常使用的片段，如果每次都去网上搜索的话，会浪费很多的时间，因此在这里把常用的代码总结一下！

### js操作cookie

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

### js字符串翻转

```javascript
var str = "abcdefg";
var revs = str.split("").reverse().join("");
console.log(revs);
```

### js产生随机数字
```javascript
function getRanNum(){
    return (''+Math.random()).slice(-6); // Math.random().toString().slice(-6)
}
```

### radio-checkbox-select
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

### requestAnimationFrame 的兼容性处理
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

### 获取鼠标移动的方向
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