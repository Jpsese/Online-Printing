import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './admin.service';

@Injectable()
export class AuthadminGuard implements CanActivate {
  constructor(private adminUser: AdminService, private router: Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.adminUser.getAdminLoggedIn() == false){
        this.router.navigate(['admin']);
      }
    return this.adminUser.getAdminLoggedIn();
  }
}
