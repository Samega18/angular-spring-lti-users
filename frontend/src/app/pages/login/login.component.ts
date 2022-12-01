import { Component, ViewChild } from '@angular/core';
import { InputInitialComponent } from 'src/app/components/input-initial/input-initial.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

  constructor(
    private authService: AuthService
  ) {}

  private username: string = 'Samega';
  private password: string = '123456';

  changeUsername = (value: string) =>{
    this.username = value;
  }

  changePassword = (value: string) =>{
    this.password = value;
  }

  resquestLogin = () =>{

    if(this.username.length <= 2 || this.username.length >= 20){
      window.alert("O Username deve ter entre 2 e 20 letras")
    } else if(this.password.length <= 2 || this.password.length >= 30){
      window.alert("A senha deve ter entre 2 e 30 letras")
    } else {
      this.authService
        .signIn({
          username: this.username,
          password: this.password,
        })
      }
    }

}
