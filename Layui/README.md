# Layui
官网[http://www.layui.com/]

### 示例 -> 

```html
<input type="text" id="Time" name="time" placeholder="请输入您要预约的时间" onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD'})"/>
```

```javascript
// 初始化
layui.use('layer', function () {
    var layer = layui.layer;
});

// 点击 input 框选择日期
layui.use('laydate', function () {
    var laydate = layui.laydate;
});
```