<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    
    $size = " ";
    $type = " ";
    $date = " ";
    $time = " ";
    $username = $_POST['username'];
    $fileName = $_FILES['file']['name'];

    $data = addslashes(file_get_contents($_FILES['file']['tmp_name']));
    $null = null;
    $query = "INSERT INTO upload(user_upload, file_name, size, type, date, time, user_name) VALUES(?,?,?,?,?,?,?)";
    $stmt = $db->stmt_init();
    $stmt->prepare($query);
    $stmt->bind_param("bssssss" ,$null, $fileName, $size, $type, $date, $time, $username);
    $stmt->send_long_data(0, file_get_contents($_FILES['file']['tmp_name']));
    $stmt->execute();
    $query = "SELECT max(idupload) FROM upload;";
    $stmt = $db->stmt_init();
    $stmt->prepare($query);
    $stmt->execute();
    $stmt->bind_result($ID);
        while($stmt->fetch()){
            $idNumber = $ID;
        }
    class A{ }
    $a = new A();
    $a->id = $idNumber;
    $a->status = true;
    echo json_encode($a);