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
        public function __construct($id, $fileName, $size, $type, $upload_status, $date, $time, $name){
            $this->id = $id;
            $this->fileName = $fileName;
            $this->size = $size;
            $this->type = $type;
            $this->upload_status = $upload_status;
            $this->date = $date;
            $this->time = $time;
            $this->name = $name;
        }

            public function jsonSerialize(){
                return [
                    'id' => $this->id,
                    'filename' => $this->fileName,
                    'size' => $this->size,
                    'type' => $this->type,
                    'uploadstatus' => $this->upload_status,
                    'date' => $this->date,
                    'time' => $this->time,
                    'name' => $this->name
                ];
            }
    }
    $upload = [];

    $query = "SELECT idupload, file_name, size, type, upload_status, date, time, concat(last_name,', ', first_name) as name
    FROM online_printing.upload join user using(user_name) 
    WHERE upload_status = 'NP' ORDER by RIGHT(date,4), SUBSTRING(date, 4,2), DATE, TIME;";
    $stmt = $db->stmt_init();
    $stmt->prepare($query);
    $stmt->execute();
    $stmt->bind_result($id, $fileName, $size, $type, $upload_status, $date, $time, $name);
    while($stmt->fetch()){
        $a = new Upload($id, $fileName, $size, $type, $upload_status, $date, $time, $name);
        $upload[] = $a;
    }

    echo json_encode($upload);
    $stmt->close();