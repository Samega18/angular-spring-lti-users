import { Injectable } from '@angular/core';
import { User, UserPage } from '../types/types-data';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';

import { Router } from '@angular/router';

import { baseUrl } from 'src/env/env.dev';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = baseUrl;
  headerAuth = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
  headerJSON = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: { name: string, username: string, password: string, role: string[] | null []}){

    return this.http
    .post<any>(`${this.endpoint}/user/register`, user,  { headers: this.headerJSON })
    .subscribe((res: any) => {
      return res;
    },

    (err) => {this.handleError(err)}

    );
  }

  // Sign-in
  signIn(user: {username: string, password: string}) {
    const body = new HttpParams()
    .set('username', user.username)
    .set('password', user.password);

    return this.http
      .post<any>(`${this.endpoint}/user/login`, body, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .subscribe((res: any) => {

        localStorage.setItem('access_token', res.access_token);
        this.getUserProfile(res.access_token, true);
      },

      (err) => {this.handleError(err)}

      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getDataUser() {
    return JSON.parse(`${localStorage.getItem('data_user')}`);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null || authToken !== undefined|| authToken !== '' ? true : false;
  }

  get isAdm(): boolean {
    let authToken:User = JSON.parse(`${localStorage.getItem('data_user')}`);
    //@ts-ignore
    return authToken.roles[0].name == "ROLE_ADMIN" ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('data_user');
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(token: string, login: boolean){
    let api = `${this.endpoint}/user/get-user-token?token=${token}`;
    return this.http.get(api, { headers: this.headerJSON }).subscribe((res: any) => {
      localStorage.setItem('data_user', JSON.stringify(res));

      if(login){

        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 100);
      }
    },

    (err) => {this.handleError(err)}

    );
  }

  findUsers(pageNumber: number, findBy: string, valueSearch: string): Observable<UserPage>{
    let api = `${this.endpoint}/user/get-all/${findBy}?size=12&page=${pageNumber}&sort=id&content=${valueSearch}`;
    return this.http.get<UserPage>(api, {headers: this.headerAuth });
  }

  // Sign-up
  updateUser(user: User, roleName: string){

    return this.http
    .post<any>(`${this.endpoint}/user/update?role=${roleName}`, user,  { headers: this.headerJSON })
    .subscribe((res: any) => {
      this.router.navigate(['login']);
    },

    (err) => {this.handleError(err)}

    );
  }

  deleteUser(user: User){

    return this.http
    .post<any>(`${this.endpoint}/user/delete`, user,  { headers: this.headerJSON })
    .subscribe((res: any) => {
      this.router.navigate(['login']);
    },

    (err) => {this.handleError(err)}

    );
  }

  saveUser(user: User, roleName: string){

    return this.http
    .post<any>(`${this.endpoint}/user/save?role=${roleName}`, user,  { headers: this.headerJSON })
    .subscribe((res: any) => {

    },

    (err) => {this.handleError(err)}

    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';

    if(error.status == 409){
      window.alert("Esse usuário já existe")
    } else if(error.status == 404){
      window.alert("Não foi encontrado esse usuário")
    }

    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
