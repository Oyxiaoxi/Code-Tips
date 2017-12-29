## 移动端如何强制页面横屏
### 1. 初终
> 用户竖屏打开时，而且没开启手机里的横屏模式，还要逼用户去开启.
>+ Android的微信就没有横屏模式，而ios的微信能开启横屏模式。
>+ 解决办法就是在竖屏模式下，写一个横屏的div，然后设置rotate正（负）90度，把他旋转过来；而且如果用户切到横屏时，需要把rotate复原，要求也能正常展现。

### 2. CSS 实现
> 把main这个div在竖屏模式下横过来，横屏状态下不变。
```css
@media screen and (orientation: portrait) {
    .main {
        -webkit-transform:rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
        width: 100vh;
        height: 100vh;
        /*去掉overflow 微信显示正常，但是浏览器有问题，竖屏时强制横屏缩小*/
        overflow: hidden;
    }
}

@media screen and (orientation: landscape) {
    .main {
        -webkit-transform:rotate(0);
        -moz-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0)
    }
}

-- 但是有个问题是在横屏模式下，利用css旋转90度后，宽和高不好控制。

width: 100vh;
height: 100vh;
```

### 3. js计算宽高、对齐、旋转
```javascript
-- 在portrait下，旋转到横屏后宽和高会有问题。

var width = document.documentElement.clientWidth;
var height =  document.documentElement.clientHeight;
if( width < height ){
  $print =  $('#print');
  $print.width(height);
  $print.height(width);
  $print.css('top',  (height-width)/2);
  $print.css('left',  0-(height-width)/2 );
  $print.css('transform' , 'rotate(90deg)');
  $print.css('transform-origin' , '50% 50%');
}

-- 需要注意的是transform-origin是50% 50%,旋转90deg后，还需要重新设置top和left将其对齐。
```

### 4. 最终方案
```javascript
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
      
    window.addEventListener(evt, function() {
        console.log(evt);
        var width = document.documentElement.clientWidth;
         var height =  document.documentElement.clientHeight;
          $print =  $('#print');
         if( width > height ){
           
            $print.width(width);
            $print.height(height);
            $print.css('top',  0 );
            $print.css('left',  0 );
            $print.css('transform' , 'none');
            $print.css('transform-origin' , '50% 50%');
         }
         else{
            $print.width(height);
            $print.height(width);
            $print.css('top',  (height-width)/2 );
            $print.css('left',  0-(height-width)/2 );
            $print.css('transform' , 'rotate(90deg)');
            $print.css('transform-origin' , '50% 50%');
         }
        
    }, false);
```

### 5. 完整代码
```javascript
/**
 * 横竖屏
 * @param {Object}
 */
function changeOrientation($print) {  
  var width = document.documentElement.clientWidth;
  var height =  document.documentElement.clientHeight;
  if(width < height) {
	  $print.width(height);
	  $print.height(width);
	  $print.css('top',  (height - width) / 2 );
	  $print.css('left',  0 - (height - width) / 2 );
	  $print.css('transform', 'rotate(90deg)');
	  $print.css('transform-origin', '50% 50%');
  } 
 
  var evt = "onorientationchange" in window ? "orientationchange" : "resize";
      
      window.addEventListener(evt, function() {

	  setTimeout(function() {
	      var width = document.documentElement.clientWidth;
	      var height =  document.documentElement.clientHeight;
	      // 刷新城市的宽度
	      initCityWidth();
	      // 初始化每个气泡和自行车碰撞的距离
	      cityCrashDistanceArr = initCityCrashDistance();
	
		if( width > height ){
			$print.width(width);
			$print.height(height);
			$print.css('top',  0 );
			$print.css('left',  0 );
			$print.css('transform' , 'none');
			$print.css('transform-origin' , '50% 50%');
		 }
		 else {
		  $print.width(height);
			$print.height(width);
			$print.css('top',  (height-width)/2 );
			$print.css('left',  0-(height-width)/2 );
			$print.css('transform' , 'rotate(90deg)');
			$print.css('transform-origin' , '50% 50%');
		 }
	}, 300);	
   }, false);
}
```