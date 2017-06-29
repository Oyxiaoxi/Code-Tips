<?php
    header("Content-Type:text/html;charset=utf-8");
    require "class.phpmailer.php";
    $fname = $_POST["fname"];
    $fgenre = $_POST["fgenre"];
    $ftell = $_POST["ftell"];
    $fmessage = $_POST["fmessage"];
    $ftime = $_POST["ftime"];
    if($fname==''){
        $prompt = "请正确填写预约信息";
    }else{
        $mail = new PHPMailer(true);
        $mail->CharSet = "utf-8";
        $address = "xxxxxxx@qq.com";//收件人地址
        $mail->IsSMTP();
        $mail->Host = "smtp.163.com";
        $mail->SMTPAuth = true;
        $mail->Username = ""; //发件人账号
        $mail->Password = ""; //发件人密码
        $mail->Port = 25;//邮箱服务器端口号
        $mail->From = "xxxxxx@163.com";  //发件人地址
        $mail->FromName = "Online Reservations";
        $mail->AddAddress("$address","在线预约");
        $mail->IsHTML(true);
        $mail->Subject = "You have a new short message, please pay attention to check!";
        $mail->Body = "<style type='text/css'>table{width:400px;border-collapse:collapse;}table tr {text-align:center;}table tr td{width:50%;border:1px #0066ff solid;}</style>
        <table><tr><td colspan='2'>免费预约</td></tr><tr><td>类型</td><td>".$fgenre."</td></tr><tr><td>姓名</td><td>".$fname."</td></tr><tr><td>电话</td><td>".$ftell."</td></tr><tr><td>留言</td><td>".$fmessage."</td></tr><tr><td>预约时间</td><td>".$ftime."</td></tr><tr><td>表单所在网页</td><td>".$_SERVER["HTTP_REFERER"]."</td></tr><tr><td>表单所在网页</td><td>".$_SERVER['REMOTE_ADDR']."</td></tr></table>"; //邮件内容，上面设置HTML，则可以是HTML
        if($mail->Send()){
            getRes(1,"预约成功，请保持电话畅通。");
        }else{
            getRes(0,"申请失败，请尝试联系在线客服为您安排学习时间。");
        }
    }
    function getRes($a,$mes){
        $res=array("status"=>$a,"message"=>$mes);		
        echo json_encode($res);
        exit;
    }
?>

