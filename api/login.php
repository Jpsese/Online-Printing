<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    $_GET = json_decode(file_get_contents('php://input'), true);
    class Users{}
    $u = new Users();
    session_start();
    if(isset($_GET)){
        $userName = mysqli_real_escape_string($db, $_GET['username']);
        $password = mysqli_real_escape_string($db, $_GET['password']);
    
    
            $query = "SELECT concat(first_name,' ',last_name) as name, user_name from user WHERE user_name = ? AND password = ?";
            $stmt = $db->stmt_init();
            $stmt->prepare($query);
            $stmt->bind_param("ss" ,$userName, $password);
    
            $stmt->execute();

            $stmt->bind_result($name,$username);
            $numberOfRows = $stmt->fetch();
            if($numberOfRows == 1){
                while($stmt->fetch()){

                }
                $u->name = $name;
                $u->username = $username;
                $u->status = true;
                $stmt->close();
                
                $_SESSION['name'] = $name; 
                $_SESSION['username'] = $userName;

                $myJSON = json_encode($u);
                
                echo $myJSON;
            }else{
            echo "false";
            }

    }
?>