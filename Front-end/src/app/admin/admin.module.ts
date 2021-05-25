import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';


import { AdminCancelComponent } from './admin-cancel/admin-cancel.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPayComponent } from './admin-pay/admin-pay.component';
import { AdminPrintComponent } from './admin-print/admin-print.component';
import { AdminToprintComponent } from './admin-toprint/admin-toprint.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';
import { AuthadminGuard } from './authadmin.guard';



@NgModule({
    declarations: [
        AdminCancelComponent,
        AdminLogoutComponent,
        AdminLoginComponent,
        AdminPayComponent,
        AdminPrintComponent,
        AdminToprintComponent,
    ],
    imports: [
        BrowserModule,
        MaterializeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AdminRoutingModule


    ],
    providers: [AdminService, AuthadminGuard ],
    bootstrap: [ ]
})

export class AdminModule{ }