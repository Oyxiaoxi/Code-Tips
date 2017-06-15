# 从本地上传文件到服务器

## 插件官网
[ UploadIfy ](http://www.uploadify.com/)

## UploadIfy 使用详解
``` html
<input type="file" name="file_upload" id="file_upload" /> 
<div id="file_queue">未选择任何稿件</div>   
```

``` javascript
$("#file_upload").uploadify({
    'width': 80,
    'height': 30,
    'buttonText': '选择文件',
    'multi': false, // 多文件上传
    'fileSizeLimit': '20MB', // 上传文件大小
    'swf': '/uploadify.swf', // 上传Flash控制
    'uploader': '/uploadify.php', // 上传php控制
    'checkExisting': '/check-exists.php', // 检测文件是否重复
    'formData': { "action": "upload", "sid": "" }, //上传时传递数据
    'uploadLimit': 1, // 默认值999，上传的最大文件数
    'queueSizeLimit': 1, // 默认值999，容纳文件队列的最大数
    'fileTypeExts': '*.doc;*.docx;*.xls;*.xlsx;*.pdf;*.ppt;*.txt;*.wpt;*.wps;*.dot', //默认值*.*，定义可以上传的文件类型
    'fileTypeDesc': '文档类型',
    'queueID': 'file_queue', // 上传队列
    // 在 Uploadify 初始化后触发
    'onInit':function(instance) {
        alert('The queue ID is ' + instance.settings.queueID);
    },
    // 上传成功
    'onUploadSuccess': function (file, data, response) {
        //console.log(file.name + "\n\n" + response + "\n\n" + data);
        if (response == true) {
            $("#draUpload2").val("http://www.xxxx.com" + data);
            layer.alert('文件上传成功');
            $("#file_queue").text('已成功上传 【' + file.name + ' 】文件')
        } else {
            layer.alert('上传文件类型错误，允许上传的文件格式有:*.doc;*.docx;*.xls;*.xlsx;*.pdf;*.ppt;*.txt;*.wpt;*.wps;*.dot' + "\n" + file.name + " 上传失败，文件名不合法！")
        }
    },
    'onSelect': function (event, queueID, fileObj) {
        console.log(event, queueID, fileObj);
    },
    // 选择文件错误
    'onSelectError': function (file, errorCode, errorMsg, errorString) {
        switch (errorCode) {
            case -100:
                layer.alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                break;
            case -110:
                layer.alert("大小超限，请调整后重新上传");
                break;
            case -120:
                layer.alert("文件 [" + file.name + "] 大小异常！");
                break;
            case -130:
                layer.alert('上传文件类型错误，允许上传的文件格式有:*.doc;*.docx;*.xls;*.xlsx;*.pdf;*.ppt;*.txt;*.wpt;*.wps;*.dot' + "\n" + file.name + " 上传失败，文件名不合法！");
                break;
        }
    },
    // 浏览器有兼容性的flash版本时实触发
    'onFallback': function () {
        layer.alert('浏览器的FLASH版本不兼容,请安装FLASH插件，或更换支持FLASH插件的浏览器。');
    },
    'onQueueComplete': function (queueData) {
        if (queueData == false) {
            layer.alert('阿哦，似乎您没有将上传的文件填加进来，你重新上传文件再做尝试。')
        }
    },
    'onUploadError': function (file, errorCode, errorMsg, errorString) {
        console.log(file, errorCode, errorMsg, errorString);
    }
});
```

## Bug
上传文件队列错误，一直未得到解决。不知道是方法问题还是结构问题，在努力解决中...



