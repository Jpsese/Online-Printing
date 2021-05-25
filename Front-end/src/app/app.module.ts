import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { UserLoginComponent } from './user-login/user-login.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthguardGuard } from './authguard.guard';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { ShowUploadComponent } from './show-upload/show-upload.component';


import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes:Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthguardGuard],
    component: HomepageComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'upload',
    canActivate: [AuthguardGuard],
    component: UploadFileComponent
  },
  {
    path: 'show',
    canActivate: [AuthguardGuard],
    component: ShowUploadComponent
  },
  {
    path: 'Logout',
    canActivate: [AuthguardGuard],
    component: LogoutComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UploadFileComponent,
    NavbarComponent,
    ShowUploadComponent,
    LogoutComponent,
    HomeComponent,
    HomepageComponent,

  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AdminModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthguardGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
