<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $db = new mysqli("p:localhost", "root", "", "online_printing");
    class Upload implements JsonSerializable{ 
        private $id;
        private $fileName;
        private $size;
        private $type;
        private $upload_status;
        private $date;
        private $time;
        private $user_name;
        private $amount;
        public function __construct($id, $fileName, $upload_status, $date, $time, $name, $amount){
            $this->id = $id;
            $this->fileName = $fileName;
            $this->upload_status = $upload_status;
            $this->date = $date;
            $this->time = $time;
            $this->name = $name;
            $this->amount = $amount;
        }

            public function jsonSerialize(){
                return [
                    'id' => $this->id,
                    'filename' => $this->fileName,
                    'uploadstatus' => $this->upload_status,
                    'date' => $this->date,
                    'time' => $this->time,
                    'name' => $this->name,
                    'amount' => $this->amount
                ];
            }
    }
    $upload = [];

    $query = "SELECT idupload, file_name, upload_status, date, time, concat(last_name,', ', first_name) as name, amount
    FROM online_printing.upload join user using(user_name) 
    WHERE upload_status = 'P' ORDER by RIGHT(date,4), SUBSTRING(date, 4,2), DATE, TIME;";
    $stmt = $db->stmt_init();
    $stmt->prepare($query);
    $stmt->execute();
    $stmt->bind_result($id, $fileName, $upload_status, $date, $time, $name, $amount);
    while($stmt->fetch()){
        $a = new Upload($id, $fileName, $upload_status, $date, $time, $name, $amount);
        $upload[] = $a;
    }

    echo json_encode($upload);
    $stmt->close();