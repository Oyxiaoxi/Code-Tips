# 从移动端 click 到摇一摇

### 以前听到前辈们说移动端尽量不要使用click，click会比较迟钝，能用touchstart还是用touchstart。但是用touchstart会有一个问题，用户在滑动页面的时候要是不小心碰到了相关元素也会触发touchstart，所以两者都有缺点。那怎么办呢？

## 首先为什么移动端的click会迟钝呢？从谷歌的开发者文档《300ms tap delay, gone away》可以找到答案：

>For many years, mobile browsers applied a 300-350ms delay between touchend and click while they waited to see if this was going to be a double-tap or not, since double-tap was a gesture to zoom into text.


