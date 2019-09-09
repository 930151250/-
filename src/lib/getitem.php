<?php
    include('./_connect.php');

    $id = $_REQUEST['id'];

    $sql = "select * from content3 where sid = $id";

    $res = $mysqli->query($sql);

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;

    $mysqli->close();
?>