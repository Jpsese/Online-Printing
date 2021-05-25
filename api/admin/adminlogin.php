<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    $_GET = json_decode(file_get_contents('php://input'), true);
    class Users{}
    $u = new Users();
    if(isset($_GET)){
        $userName = mysqli_real_escape_string($db, $_GET['username']);
        $password = mysqli_real_escape_string($db, $_GET['password']);
    
    
            $query = "SELECT admin_user from admin WHERE admin_user = ? AND admin_password = ?";
            $stmt = $db->stmt_init();
            $stmt->prepare($query);
            $stmt->bind_param("ss" ,$userName, $password);
    
            $stmt->execute();

            $stmt->bind_result($username);
            $numberOfRows = $stmt->fetch();
            if($numberOfRows == 1){
                while($stmt->fetch()){

                }
                $u->username = $username;
                $u->status = true;
                $stmt->close();
                
                $myJSON = json_encode($u);
                
                echo $myJSON;
            }else{
            echo "false";
            }

    }
?>