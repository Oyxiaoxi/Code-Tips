# Ajax

``` javascript
$.ajax({
    type: 'POST',
    url: '/archives_add.php',
    data: $('#Draft').serializeArray(),
    dataType: 'json',
    success: function (data) {
        var jsonData = eval(data);
        if (jsonData.status == 1) {
            //layer.alert('OK，投稿成功，请牢记您的投稿编号<br/>' + jsonData.no);
            layer.open({
                title: '稿件查询',
                content: 'OK，投稿成功，请牢记您的投稿编号<br/>' + jsonData.no
            });
            setTimeout(function () {
                document.getElementById("Draft").reset();
            }, 2000);
        } else {
            alert('出错了哦。请尝试重新提交信息')
        }
    }
});
```

## 投稿ID
投稿成功以后，返回投稿ID