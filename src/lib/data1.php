<?php
//把数据库的数据渲染到页面
    require "conn.php";//引入数据库连接
    $result=$conn->query("select * from content2");
    $arrdata=array();

    for($i=0;$i<$result->num_rows;$i++){
        $arrdata[$i]=$result->fetch_assoc();
    }

    echo json_encode($arrdata);
    
