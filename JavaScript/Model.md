# 今天遇到一个问题，需要动态填加内容，于是就有了这个办法：

## 先造一个轮子 Templets
```javascript
var Model = function(a,b,c){
    // 先赋值
    this.color = a;
    this.tel = b;
    this.qq = c;
    // 创建 style

    this.setStyle = function(){
        var headStyle = document.createElement("style");
        headStyle.innerHTML = "*{margin:0;padding:0;border:none;outline:none;}\n";
        headStyle.innerHTML += "a{text-decoration:none;}\n";
        headStyle.innerHTML += ".fixBox{height:50px;position:fixed;top:0;left:0;width:100%;z-index:999;background-color:#333;opacity:0.8;}\n";
        headStyle.innerHTML += ".fixBox .fixIndex{float:left;line-height:16px;color:#CCC;background-color:#666;width:16px;text-align:center;padding:9px;font-size:12px;font-weight:bold;box-sizing:content-box;}\n";
        headStyle.innerHTML += ".fixBox ul{list-style:none; display:flex;}\n";
        headStyle.innerHTML += ".fixBox ul li{width:33.3%;height:50px;}\n";
        headStyle.innerHTML += ".fixBox ul li a{ width:70%;height:30px;line-height:30px;background:#" + this.color + ";color:#FFF;display:block;text-align:center;margin:10px auto;font-size:14px;font-weight:bold;border-radius:5px;}\n";
        headStyle.innerHTML += ".tool_h50{height:50px;}\n";
        document.getElementsByTagName("body")[0].appendChild(headStyle);
    }

    this.setHtml = function(){
        var setHtml = document.createElement("div");
        setHtml.className = "fixBox";
        setHtml.innerHTML = "<a href=\"/\" class=\"fixIndex\">首页<\/a>\n";
        var setUl = document.createElement("ul");
        setUl.innerHTML += "   <li><a href=\"tel:" + this.tel + "\">Tell<\/a><\/li>\n";
        setUl.innerHTML += "   <li><a href=\"http://wpa.qq.com/msgrd?v=3&uin=" + this.qq + "&menu=yes\">Tencent<\/a><\/li>\n";
        setUl.innerHTML += "   <li><a href=\"javascript:openZoosUrl();\">Chat<\/a><\/li>\n";
        setHtml.appendChild(setUl);
        document.getElementsByTagName("body")[0].appendChild(setHtml);
    }

    this.setStyle();
    this.setHtml();
} 
```

## 调用
```javascript
$(function(){
	var demo = new Model("EA5271","xxxxxx","xxxxxxx ");
	$("body").css({"marginTop":"50px"})
})
```
