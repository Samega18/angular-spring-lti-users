import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService
  ) {}

  private name: string = 'Samuel Afonso';
  private username: string = 'Samega0';
  private password: string = '123456';
  private password2: string = '123456';

  changeName = (value: string) =>{
    this.name = value;
  }

  changeUsername = (value: string) =>{
    this.username = value;
  }

  changePassword = (value: string) =>{
    this.password = value;
  }

  changePassword2 = (value: string) =>{
    this.password2 = value;
  }

  resquestRegister = () =>{

    if(this.name.length <= 2 || this.name.length >= 100){
      window.alert("O nome deve ter entre 2 e 100 letras");
    } else if(this.username.length <= 2 || this.username.length >= 20){
      window.alert("O username deve ter entre 2 e 20 letras");
    } else if(this.password.length <= 2 || this.password.length >= 30){
      window.alert("A senha deve ter entre 2 e 30 letras");
    } else if(this.password != this.password2 ){
      window.alert("Suas senhas estão diferentes");
    } else {
      this.authService
        .signUp({
          name: this.name,
          username: this.username,
          password: this.password,
          role: [ null ],
        })
      }
    }

}
