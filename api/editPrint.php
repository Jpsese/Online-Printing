<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    class A{ }
    $a = new A();
    $_POST = json_decode(file_get_contents('php://input'), true);

        $id = $_POST['id'];
        $amount = $_POST['amount'];

            $query = "UPDATE `online_printing`.`upload` SET `upload_status`='P', `amount` = ? WHERE `idupload`=?;";
            $stmt = $db->stmt_init();
            $stmt->prepare($query);
            $stmt->bind_param("ii", $amount, $id);
            $stmt->execute();
