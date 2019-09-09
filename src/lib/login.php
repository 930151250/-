<?php
require "conn.php";

if(isset($_POST['user']) && isset($_POST['pass'])){
    $user=$_POST['user'];
    $pass=sha1($_POST['pass']);

    $result=$conn->query("select * from huawei where username='$user' and password='$pass' ");

    if($result->fetch_assoc()){//匹配成功
        //echo true;//这里 匹配成功之后 跳转
        header('http://localhost/js1907/huawei/src/index1.html');
    }else{
        echo false;
    }

}