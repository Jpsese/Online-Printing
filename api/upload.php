<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    $_POST = json_decode(file_get_contents('php://input'), true);

    if(isset($_POST)){
        session_start();
        $size = $_POST['size'];
        if($_POST['size'] == 1){
            $size = "Short";
        }else if($_POST['size'] == 2){
            $size = "A4";
        }else if($_POST['size'] == 3){
            $size = "Long";
        }else if($_POST['size'] == 4){
            $size = "Legal";
        }

        if($_POST['type'] == 'A'){
            $type = "Colored";
        }else{
            $type = "Not Colored";
        }
        $id = $_POST['id'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $query = "UPDATE `online_printing`.`upload` SET `size`=?, `type`=?, `date`=?, `time`=? WHERE `idupload`=?;";
        $stmt = $db->stmt_init();
        $stmt->prepare($query);
        $stmt->bind_param("ssssi" , $size, $type, $date, $time, $id);
        $stmt->execute();

    }



