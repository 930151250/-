<?php
require "conn.php";

//检测用户名
if(isset($_POST['checkphone'])){
    $phonenumber=$_POST['checkphone'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from register where username='$phonenumber'");

    if($result->fetch_assoc()){//存在
        echo '1';//1
    }else{//不存在
        echo '0';//空隙
    }

}




//前端用户点击了submit按钮。接收前端传入表单的值。
if(isset($_POST['submit'])){
    $phone=$_POST['phone'];
    $pass=sha1($_POST['password']);//加密
    //添加数据库
    $conn->query("insert register values(null,'$phone','$pass',NOW())");

    //php的跳转
    header('location:http://localhost/js1907/huawei/src/login.html');
}else{
    exit('输入有误');
}