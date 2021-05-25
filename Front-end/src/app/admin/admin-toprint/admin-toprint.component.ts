import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';
@Component({
  selector: 'app-admin-toprint',
  templateUrl: './admin-toprint.component.html',
  styleUrls: ['./admin-toprint.component.css']
})
export class AdminToprintComponent implements OnInit {
  uId: any;
  query: any;
  print: any;
  forms: FormGroup;
  paid: any;
  approve: any;
  cancelled;
  forms2: FormGroup;
  constructor(private http: Http, private routes: Router, private fb: FormBuilder) { 
    this.forms = fb.group({
      'query': [null, Validators.required] 
    })
    this.forms2 = fb.group({
      'amount': [null, Validators.required]
    })
    this.getData();
    this.getPrintedData();
    this.getCancelledData();
    this.getPaidData();
  }

  ngOnInit() {
    
  }

  cancelUpload(id){
    this.http.post(`http://localhost/api/editfile.php`,{
      id: id,
      status: "cancel"
    }).subscribe((data: any) => {
      let jsonResponse = data.json();
      if(jsonResponse.status == true){
        this.getData();
        this.getCancelledData();
      }
    })
  }
  
  getPrintId(id){
    this.uId = id;
  }

  printUpload(post,id){

    this.http.post(`http://localhost/api/editPrint.php`,{
      id: this.uId,
      amount: post.amount
    }).subscribe((data: any) => {
      console.log(data);
    })
    this.getData();
    this.getPrintedData();
    
  }

  paidUpload(id){
    this.http.post(`http://localhost/api/editfile.php`,{
      id: id,
      status: "paid"
    }).subscribe((data: any) => {
      console.log(data);
      let jsonResponse = data.json();
      if(jsonResponse.status == true){

        this.getPrintedData();
        this.getPaidData();
      }
    })
  }

  deleteUpload(id){
    this.http.post(`http://localhost/api/editfile.php`,{
      id: id,
      status: "delete"
    }).subscribe((data: any) => {
      console.log(data);
      let jsonResponse = data.json();
      if(jsonResponse.status == true){
        this.getCancelledData();
        this.getPaidData();
      }
    })
  }

  addPost(post){
    this.query = post.query;
    this.getPrintedData();
  }

  getData(){
    this.http.post(`http://localhost/api/admin/showprint.php`,{
    }).subscribe((data:any) =>{
      this.print = data.json();
    })
  }

  getPrintedData(){
    this.http.get(`http://localhost/api/admin/showprinted.php`).subscribe((data:any) =>{
      if(this.query){
        this.http.post(`http://localhost/api/admin/search.php`,{
          query: this.query
        }).subscribe((data:any) =>{
          this.paid = data.json();
        });
      }else{
          this.paid = data.json();
      }
    })
  }

  getPaidData(){
    this.http.get(`http://localhost/api/admin/showpaid.php`).subscribe((data:any) =>{
      this.approve = data.json();
      console.log(data);
    })
  }

  getCancelledData(){
    this.http.get(`http://localhost/api/admin/showcancel.php`).subscribe((data:any) =>{
      this.cancelled = data.json();
    })
  }

  onSubmit(form: NgForm){
    console.log(form.value.amount);

    this.closeModal();
  }


  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


}


