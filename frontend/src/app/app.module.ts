import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CheckboxInitialComponent } from './components/checkbox-initial/checkbox-initial.component';
import { ButtonInitialComponent } from './components/button-initial/button-initial.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InputInitialComponent } from './components/input-initial/input-initial.component';
import { AuthInterceptor } from './services/auth-config.interceptor';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { InputSelect2Component } from './components/input-select2/input-select2.component';
import { SaveUserComponent } from './components/save-user/save-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SideBarComponent,
    NavigatePageComponent,
    HomeComponent,
    AccountComponent,
    UsersComponent,

    InputInitialComponent,
    CheckboxInitialComponent,
    ButtonInitialComponent,
    EditUserComponent,
    InputSelectComponent,
    PaginationComponent,
    ButtonIconComponent,
    InputSelect2Component,
    SaveUserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
