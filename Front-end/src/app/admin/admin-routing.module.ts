import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCancelComponent } from './admin-cancel/admin-cancel.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPayComponent } from './admin-pay/admin-pay.component';
import { AdminPrintComponent } from './admin-print/admin-print.component';
import { AdminToprintComponent } from './admin-toprint/admin-toprint.component';
import { AuthadminGuard } from './authadmin.guard';
const routes: Routes = [{
  path: 'admin',
  component: AdminLoginComponent,
},
{
    path: 'admin/home',
    canActivate: [AuthadminGuard],
    component: AdminToprintComponent
},
{
    path: 'admin/print',
    canActivate: [AuthadminGuard],
    component: AdminPrintComponent
},
{
    path: 'admin/pay',
    canActivate: [AuthadminGuard],
    component: AdminPayComponent
},
{
    path: 'admin/cancel',
    canActivate: [AuthadminGuard],
    component: AdminCancelComponent
},
{
    path: 'admin/logout',
    canActivate: [AuthadminGuard],
    component: AdminLogoutComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }