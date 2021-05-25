import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
@Component({
  selector: 'app-show-upload',
  templateUrl: './show-upload.component.html',
  styleUrls: ['./show-upload.component.css']
})
export class ShowUploadComponent implements OnInit {


  constructor(private http: Http) {
    this.getFiles();
    this.getPrintedFiles();
    this.getPaidFiles();
    this.getCancelFiles();
   }

  files:any;
  id: any;
  filesPrinted:any;
  filesPaid:any;
  filesCancel: any;
  ngOnInit() {
  }

  getFiles(){
    this.http.post(`http://localhost/api/showupload.php`,{
      username: localStorage.getItem('username').toString()
    }).subscribe((data:any) => {
      let jsonResponse = data.json();
      this.files = data.json();
    })
    
  }

  getPrintedFiles(){
    this.http.post(`http://localhost/api/showprinted.php`,{
      username: localStorage.getItem('username').toString()
    }).subscribe((data:any) => {
      let jsonResponse = data.json();
      this.filesPrinted = data.json();

    });
  }

  getPaidFiles(){
    this.http.post(`http://localhost/api/showpaid.php`, {
      username: localStorage.getItem('username').toString()
    }).subscribe((data:any) =>{
      this.filesPaid = data.json();
      console.log(data);
    })
  }

  cancelUpload(id){
    this.http.post(`http://localhost/api/editfile.php`,{
      id: id,
      status: "cancel"
    }).subscribe((data: any) => {
      let jsonResponse = data.json();
      if(jsonResponse.status == true){
        this.getFiles();
        this.getCancelFiles();
      }
    })
  }

  deleteFile(id){
    this.http.post(`http://localhost/api/editfile.php`,{
      id: id,
      status: "delete"
    }).subscribe((data: any) => {
      console.log("success");
      let jsonResponse = data.json();
      if(jsonResponse.status == true){
        this.getFiles();
        this.getPrintedFiles();
        this.getPaidFiles();
        this.getCancelFiles();
      }
    })
  }

  getCancelFiles(){
    this.http.post(`http://localhost/api/showcancel.php`,{
      username: localStorage.getItem('username').toString()
    }).subscribe((data:any) =>{
      this.filesCancel = data.json();
    })
  }


}
