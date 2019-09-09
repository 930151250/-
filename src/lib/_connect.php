<?php

header("content-type:text/html;charset=utf-8");
$mysql_conf = array(
    'host'=>'127.0.0.1:3306',
    'db'=>'huawei',
    'db_user'=>'root',
    'db_pwd'=>''
);

$mysqli = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pwd']);

if($mysqli->connect_errno){
    die("连接错误".$mysqli->connect_error);//诊断连接错误
}

$mysqli->query("set names 'utf8';"); //编码设置

$select_db = $mysqli->select_db($mysql_conf['db']); //选择数据库

if(!$select_db){
    die('选择数据库错误'.$mysqli->error);
}

?>