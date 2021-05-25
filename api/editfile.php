<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    class A{ }
    $a = new A();
    $_POST = json_decode(file_get_contents('php://input'), true);
    if(isset($_POST)){
        $id = $_POST['id'];
        $status = $_POST['status'];
        if($status == "cancel"){
            $query = "UPDATE `online_printing`.`upload` SET `upload_status`='C' WHERE `idupload`=?;";

        }else if($status == "delete"){
            $query = "DELETE FROM `upload` WHERE `idupload`=?;";
        }else if($status == "paid"){
            $query = "UPDATE `online_printing`.`upload` SET `upload_status`='PY' WHERE `idupload`=?;";
        }
        $a->status = true;
        echo json_encode($a);
        $stmt = $db->stmt_init();
        $stmt->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }