import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrls: ['./admin-logout.component.css']
})
export class AdminLogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    localStorage.removeItem('adminusername');
    localStorage.removeItem('adminloggedIn');
    this.router.navigate(['admin']);
  }

}
