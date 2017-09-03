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


