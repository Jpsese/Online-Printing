<?php
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $stmt = $db->stmt_init();
        $stmt->prepare("select idupload, user_upload, file_name from upload where idupload = $id");
        $stmt->execute();
        $stmt->bind_result($uploadid, $uploadFile, $uploadName);


        while($stmt->fetch()){
            $file = $uploadName;
            $content = $uploadFile;
        }

        header("Content-type: application/octet-stream");
        header("Content-Disposition: attachment; filename = $file");
        header('Pragma: public');
        ob_clean();
        flush();
        echo $content;
        exit;
    }