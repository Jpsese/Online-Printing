import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  forms: FormGroup;
  post: any;
  username: string;
  password: string;
  constructor(private fb: FormBuilder, private http: Http, private router:Router, private adminUser: AdminService) { 
    this.forms = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  addPost(post){
    this.username = post.username;
    this.password = post.password
    this.http.post(`http://localhost/api/admin/adminlogin.php`,{
      username: this.username,
      password: this.password
    }).subscribe((data:any) => {
      let jsonResponse = data.json();
      if(jsonResponse.status == true){
        this.adminUser.setAdminLoggedIn();
        localStorage.setItem('adminusername', jsonResponse.username);
        this.router.navigate(['admin/home']);
      }
    })
  }


}
