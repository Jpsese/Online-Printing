<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$db = new mysqli("p:localhost", "root", "", "online_printing");
$_POST = json_decode(file_get_contents('php://input'), true);
class Upload implements JsonSerializable{ 
    private $id;
    private $data;
    private $fileName;
    private $size;
    private $type;
    private $upload_status;
    private $date;
    private $time;
    private $user_name;
    private $amount;
    public function __construct($id, $data, $fileName, $size, $type, $upload_status, $date, $time, $amount){
        $this->id = $id;
        $this->data = $data;
        $this->fileName = $fileName;
        $this->size = $size;
        $this->type = $type;
        $this->upload_status = $upload_status;
        $this->date = $date;
        $this->time = $time;
        $this->amount = $amount;
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
                'amount' => $this->amount
            ];
        }
}
$upload = [];

$userName = $_POST['username'];
$stmt = $db->stmt_init();
$stmt->prepare("select * from upload where user_name = ? AND upload_status = 'P'");
$stmt->bind_param("s", $userName);
$stmt->execute();
$stmt->bind_result($id, $data, $fileName, $size, $type, $upload_status, $date, $time, $user_name, $amount);
while($stmt->fetch()){
    $a = new Upload($id, $data, $fileName, $size, $type, $upload_status, $date, $time, $amount);
    $upload[] = $a;
}

echo json_encode($upload);
$stmt->close();