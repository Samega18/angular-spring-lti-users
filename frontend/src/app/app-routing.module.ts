import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminGuard } from './shared/admin.guard';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: NavigatePageComponent,
    children:[
        { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
        { path: 'home', pathMatch: 'full', component: HomeComponent },
        { path: 'account', pathMatch: 'full', component: AccountComponent },
        { path: 'users', pathMatch: 'full', component: UsersComponent, canActivate: [AdminGuard]},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
