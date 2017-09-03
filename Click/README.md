# 从移动端 click 到摇一摇

### 以前听到前辈们说移动端尽量不要使用click，click会比较迟钝，能用touchstart还是用touchstart。但是用touchstart会有一个问题，用户在滑动页面的时候要是不小心碰到了相关元素也会触发touchstart，所以两者都有缺点。那怎么办呢？

### 首先为什么移动端的click会迟钝呢？从谷歌的开发者文档《300ms tap delay, gone away》可以找到答案：

>For many years, mobile browsers applied a 300-350ms delay between touchend and click while they waited to see if this was going to be a double-tap or not, since double-tap was a gesture to zoom into text.

#### 大意是说因为移动端要判断是否是双击，所以单击之后不能够立刻触发click，要等300ms，直到确认不是双击了才触发click。所以就导致了click有延迟。
#### 更为重要的是，文档里面还提到在2014年的Chrome 32版本已经把这个延迟去掉了，如果有一个meta标签：

```html
<meta name="viewport" content="width=device-width">
```

### 即把viewport设置成设备的实际像素，那么就不会有这300ms的延迟，并且这个举动受到了IE/Firefox/Safari(IOS 9.3)的支持，也就是说现在的移动端开发可以不用顾虑click会比较迟钝的问题。

#### 如果设置initial-scale=1.0，在chrome上是可以生效，但是Safari不会：
```html
<meta name="viewport" content="initial-scale=1.0">
```

### 还有第三种办法就是设置CSS：
```css
html{
    touch-action: manipulation;
}
```

>+ 这样也可以取消掉300ms的延迟，Chrome和Safari都可以生效。
>+ click是在什么时候触发的呢？来研究一下click/touch事件的触发先后顺序。

## 1. click/touch触发顺序
```html
<!DOCType html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0">
</head>
<body>
    <div id="target" style="margin-top:20px;width:200px;height:200px;background-color:#ccc">hello, world</div>
    <script>
    !function(){
        var target = document.getElementById("target");
        var body = document.querySelector("body");
        var touchstartBeginTime = 0;
        function log(event){
            if(event.type === "touchstart") touchstartBeginTime = Date.now();
            console.log(event.type, Date.now() - touchstartBeginTime);
        }
        target.onclick = log;
        target.ontouchstart = log;
        target.ontouchend = log;
        target.ontouchmove = log;
        target.onmouseover = log;
        target.onmousedown = log;
        target.onmouseup = log;
    }();*/
    </script>
</body>
</html>
```

```bash
[Log] touchstart – 0 (192.168.1.184, line 18)
[Log] touchend – 19 (192.168.1.184, line 18)
[Log] mouseover – 408 (192.168.1.184, line 18)
[Log] mousedown – 409 (192.168.1.184, line 18)
[Log] mouseup – 412 (192.168.1.184, line 18)
[Log] click – 412 (192.168.1.184, line 18)
```
> 可以看到click事件是在最后触发的，并且还看到300ms的延迟，实际的执行延迟要比这个大，因为浏览器的内核运行也需要消耗时间。
> 加上标签，300ms的延迟没有了。
> 知道了click是在touchend之后触发的，现在我们来尝试一下实现一个tap事件。

## 2. tap事件的实现
> 有两个库，一个是zepto，另一个是fastclick，它们都可以解决点击延迟的问题。其中，zepto有一个自定义事件tap，它是一个没有延迟的click事件。而fastclick是在touchend之后生成一个click事件，并立即触发这个click，再取消原本的click事件。这两者的原理都是一样的，都是在touchend之后触发，一个是触发它自己定义的tap事件，一个是触发原生click。

##### 这里有一个关键的问题，就是touchend之后不能够每次都触发tap，因为有可能用户是在上下滑并不是在点击，不然的话直接监听touchstart就好了。所以怎么判定用户是点击还是在上下滑呢？Zepto是用的位移偏差，即记录下touchstart的时候的初始位移，然后用touchend的时候的位移减掉初始位移的偏差，如果这个差值在30以内，则认为用户是点击，大于30则认为是滑动。而fastclick是用的时间偏差，分别记录touchstart和touchend的时间戳，如果它们的时间差大于700毫秒，则认为是滑动操作，否则是点击操作。

### 如chrome://setting页，它是用html写的。在这个里面有一个 touch_handler.js ，它里面封装了一些移动端的手势实现如tap，tap是根据时间位移判断是否要触发tap，如下所示：

```javascript
TouchHandler.TIME_FOR_LONG_PRESS_ = 500;
```

### 定义的时间为长时间按压long press的时间阈值为500ms，在touchstart里面启动一个计时器：
```javascript
this.longPressTimeout_ = window.setTimeout(this.onLongPress_.bind(this), TouchHandler.TIME_FOR_LONG_PRESS_);

onLongPress_: function() {
  this.disableTap_ = true;
}
```

### 如果超过了阈值500ms，就把一个标志位disableTap_设置为true，然后在touchend里面，这个flag为true就不会触发tap：
```javascript
if (!this.disableTap_)
    this.dispatchEvent_(TouchHandler.EventType.TAP, touch);
```

### 相对于fastclick用两个时间戳的方式，我感觉源码的实现更为复杂，因为要启动一个计时器。

### 现在我们来实现一个按位移偏差判断的tap。

### 要实现一个自定义事件，有两种方式，第一种是像jQuery/Zepto一样，自己封装一个事件机制，第二种是调用原生的document.createEvent，然后再执行div.dispatchEvent(event)，这里我们使用第一种。

### 为此先写一个选择器。如下代码所示：
```javascript
var $ = function(selector){
    var dom = null;
    if(typeof selector === "string"){
        dom = document.querySelectorAll(selector);
    }else if(selector instanceof HTMLElement){
        dom = selector;
    }
    return new $Element(dom);
}
window.$ = $;
```

> 选择器的名称用$，它是一个函数，传进来的参数为选择器或者dom元素，如果是字符串的选择器，则调用querySelectorAll去获取dom元素，如果它已经是一个dom则不用处理，最后返回一个$Element的封装的实例

### 实现这个$Element
```javascript
class $Element{
    constructor(_doms){
        var doms = _doms.constructor === Array || _doms.constructor === NodeList ?
                   _doms : [_doms];
        this.doms = doms;
        this.init();
        for(var i = 0; i < doms.length; i++){
            this[i] = doms[i];
            if(!doms[i].listeners){
                doms[i].listeners = {}; 
            }   
        }
    }
}
```

> $Element的构造函数里面，先判断参数的类型，如果它不是一个数组或者是用querySelectorAll返回的NodeList类型，则构造一个dom数组。然后给这些dom对象添加一个listeners的属性，用来存放事件的回调函数。注意这里不是一个好的实践，因为一般不推荐给原生对象添加东西。

### 第8行代码比较有趣，把this当作一个数组，dom元素当作这个数组的元素。这样就可以通过索引获取dom元素：
```javascript
var value = $("input")[0].value;
```
> 但是它又不是一个数组，它没有数组的sort/indexOf等函数，它是一个$Element实例，另一方面它又有length，可以通过index获取元素，所以它是一个伪数组，这样你就知道了arguments实例、jQuery对象这种伪数组是怎么来的。

### 上面代码还调了一个init，这个init函数用来添加tap事件：
```javascript
init(){
    for(var i = 0; i < this.doms.length; i++){
        if(!this.doms[i].listeners){
            this.initTapEvent(this.doms[i]);
        }       
    }
}
```
### 在说tap事件之前，需要提供事件绑定和触发的api
```javascript
on(eventType, callback){
    for(var i = 0; i < this.doms.length; i++){
        var dom = this.doms[i];
        if(!dom.listeners[eventType]){
            dom.listeners[eventType] = [];
        }       
        dom.listeners[eventType].push(callback);
    }
}
```
### on函数会给dom的listeners属性添加相应事件的回调，每种事件类型都用一个数组存储。而触发的代码如下所示：
```javascript
trigger(eventType, event){ 
    for(var i = 0; i < this.doms.length; i++){
        $Element.dispatchEvent(this.doms[i], eventType, event); 
    }
}
static dispatchEvent(dom, eventType, event){ 
    var listeners = dom.listeners[eventType];
    if(listeners){
        for(var i = 0; i < listeners.length; i++){
            listeners[i].call(dom, event); 
        }       
    }
}
```
> 根据不同的事件类型去取回调函数的数组，依次执行

### 怎么添加一个tap事件，即上面的initTapEvent函数，如下代码所示：
```javascript
initTapEvent(dom){ 
    var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    dom.addEventListener("touchstart", function(event){

    });
    dom.addEventListener("touchmove", function(event){

    });
    dom.addEventListener("touchend", function(event){

    });
}
```

### 思路是这样的，在touchstart的时候记录x1和y1的位置：
```javascript
dom.addEventListener("touchstart", function(event){
    var touch = event.touches[0];
    x1 = x2 = touch.pageX;
    y1 = y2 = touch.pageY;
});
```
> 如果你用两根手指的话，那么event.touches.length就是2，如果是3根则为3，进而分别获得到每根手指的位置，由于我们是单点，所以就获取第一个手指的位置即可。pageX/pageY是相当于当前html页面的位置，而clientX和clientY是相对于视图窗口的位置。

### 然后在touchmove的时候获取到最新的移动位置
```javascript
dom.addEventListener("touchmove", function(event){
    var touch = event.touches[0];
    x2 = touch.pageX;
    y2 = touch.pageY;
});
```

### 最后touchend的时候，比较位移偏差：
```javascript
dom.addEventListener("touchend", function(event){
    if(Math.abs(x2 - x1) < 10 && Math.abs(y2 - y1) < 10){
        $Element.dispatchEvent(dom, "tap", new $Event(x1, y1));
    }
    y2 = x2 = 0;
});
```

### 如果两者的位移差小于10，则认为是tap事件，并触发这个事件。这里封装了一个自定义事件：
```javascript
class $Event{
    constructor(pageX, pageY){
        this.pageX = pageX;
        this.pageY = pageY;
    }   
}
```

### 然后就可以使用这个tap事件了，如下代码所示：
```javascript
$("#target").on("tap", function(event){
    console.log("tap", event.pageX, event.pageY);
});
```

### 再比较一下tap和原生click的触发时间的差别，需要给自定义事件添加一个click：
```javascript
dom.addEventListener("click", function(event){
    $Element.dispatchEvent(dom, "click", new $Event(event.pageX, event.pageY));
});
```

### 接着用一个tapTime记录下时间
```javascript
var tapTime = 0;
$("div").on("tap", function(event){ 
    console.log("tap", event.pageX, event.pageY);
    tapTime = Date.now();
});

$("div").on("click", function(event){
    console.log("time diff", Date.now() - tapTime);
});
```

> click会大概慢20ms，可能是因为它前面还要触发mouse的事件。
### 这样我们就实现了一个自定义tap事件，是自己封装了一个事件机制，fastclick是使用原生的Event，如下fastclick的源码，在touchend的回调函数里面执




