import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  forms: FormGroup;
  post: any;
  username: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private http: Http, private router:Router, private user: UserService, private httpClient: HttpClient) { 
    this.forms = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  addPost(post){
    this.username = post.username;
    this.password = post.password;
    this.http.post(`http://localhost/api/login.php`,{

      username: this.username,
      password: this.password
    }).subscribe(
      (data:any) => {
      let jsonResponse = data.json();
      if(jsonResponse.status == true){
        this.user.setUserLoggedIn();
        localStorage.setItem('name', jsonResponse.name);
        localStorage.setItem('username', jsonResponse.username);
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {
  }

}
