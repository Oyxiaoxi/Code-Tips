layui.use('laydate', function () {
    var laydate = layui.laydate;
});
layui.use('layer', function () {
    var layer = layui.layer;
});

function verifyForm() {
    var fname = $('#fname').val();
    var ftell = $('#ftell').val();
    var ftime = $('#ftime').val();
    var fmessage = $('#fmessage').val();
    var nameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
    var telReg = /^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}$/;
    if (fname == '') {
        layer.alert('请输入您的称呼');
        return false;
    }
    if (!nameReg.test(fname)) {
        layer.alert('请输入您正确的称呼');
        return false;
    }
    if (ftell == '') {
        layer.alert('请输入您的电话号码');
        return false;
    }
    if (ftell.length != 11) {
        layer.alert('请输入您的11位电话号码');
        return false;
    }
    if (!telReg.test(ftell) || !telReg.test(ftell)) {
        layer.alert('请输入正确的11位手机号码!');
        return false;
    }
    if (ftime == '') {
        layer.alert('请选择您的预约时间!');
        return false;
    }
    var data = $('#mailForm').serialize();

    $.ajax({
        type: "post",
        url: "./mail/sendMail.php",
        data: data,
        success: function (data) {
            console.log(data);
            var obj = JSON.parse(data);
            layer.alert(obj.message);
            setTimeout(function(){
                document.getElementById("mailForm").reset();
            },2000)
        }
    });
}