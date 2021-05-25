import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  private adminLoggedIn = JSON.parse(localStorage.getItem('adminloggedIn') || 'false');

  constructor() { 
  }

  setAdminLoggedIn(){
    this.adminLoggedIn = true;
    localStorage.setItem('adminloggedIn', 'true');
  }

  getAdminLoggedIn(){
    return JSON.parse(localStorage.getItem('adminloggedIn') || this.adminLoggedIn.toString());
  }
}
