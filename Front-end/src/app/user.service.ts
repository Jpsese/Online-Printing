import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private userLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor() { 
  }

  setUserLoggedIn(){
    this.userLoggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  getUserLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.userLoggedIn.toString());
  }
}