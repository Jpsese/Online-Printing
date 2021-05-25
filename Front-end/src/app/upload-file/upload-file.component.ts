import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  birthDateActions = new EventEmitter<string|MaterializeAction>();
  birthTimeActions = new EventEmitter<string|MaterializeAction>();
  @ViewChild("fileinput") fileinput;
  forms: FormGroup;
  post: any;
  fileToUpload;
  fileupload;
  group1: string = '';
  group2: string = '';
  date: string = '';
  time: string = '';
  id: number;
  json: any;
  constructor(private fb: FormBuilder, private http: Http, private router: Router) { 

    this.forms = fb.group({
      'fileupload': [null, Validators.required],
      'group1': [null, Validators.required],
      'group2': [null, Validators.required],
      'date': [null, Validators.required],
      'time': [null, Validators.required]
    });
  }

  ngOnInit() {

  }


  addFile(event): void{
    let elem = event.target;
    this.fileToUpload = new FormData();
    this.fileToUpload.append('file', elem.files[0]);
    this.fileToUpload.append('username', localStorage.getItem('username').toString());
  }

  // addFile(event): void{
  //   this.fileupload = this.fileinput.nativeElement;
  //   this.fileToUpload = this.fileupload.files[0];
  //   let a = new FormData();
  //   a.append('file', this.fileToUpload);
  //   console.log(a);
  //   console.log(this.fileToUpload);
  // }

  addPost(post){

    this.group1 = post.group1;
    this.group2 = post.group2;
    this.date = post.date;
    this.time = post.time;

    this.http.post(`http://localhost/api/file.php`, this.fileToUpload).subscribe(
      (data:any) => {
        console.log(data);
        this.json = data.json();
        this.id = this.json.id;
        if(this.json.status == true){
          this.http.post(`http://localhost/api/upload.php`,
          {
           id: this.id, 
           size: this.group1,
           type: this.group2,
           date: this.date,
           time: this.time
         }).subscribe(
           (data:any) => {
             this.router.navigate(['show']);  
           });
  
        }
      });
      



    // this.http.post(`http://localhost/online-printing/upload.php`,
    //  {
    //   id: this.id, 
    //   size: this.group1,
    //   type: this.group2,
    //   date: this.date,
    //   time: this.time
    // }).subscribe(
    //   (data:any) => {
    //     console.log(data);        
    //   });

  }

  openDatePicker() {
      //actions are open or close
      this.birthDateActions.emit({action: "pickadate", params: ["open"]});
  }


  openTimePicker() {
      //actions are show or hide
      this.birthTimeActions.emit({action: "pickatime", params: ["show"]});
  }
}
