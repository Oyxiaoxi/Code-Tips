# RegExps

### 示例 -> 使用方法
```javascript
// 判断姓名
if (isNull(strName)) {
    alert('请输入您的称呼！');
    $('#name').focus();
    return false;
} else {
    if (checkQuote(strName)) {
        alert("姓名不得包含特殊字符！");
        $("#name").focus();
        return false;
    }
}

// 判断电话号码
if (isNull(strTell)) {
    alert('请输入电话！');
    $('#tell').focus();
    return false;
} else {
    if (isMobile(strTell) == false) {
        alert("请输入正确的电话号码！");
        $("#tell").focus();
        return false;
    }
}
```
