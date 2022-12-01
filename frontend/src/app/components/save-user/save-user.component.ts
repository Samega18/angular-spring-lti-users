import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/types-data';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent {

  constructor(
    private authService: AuthService
  ) {}

  user: User = {id: null,name: "", username: "", password: "", roles: [{id: 0, name: "ROLE_USER"}]}

  private name: string = 'Samuel Afonso';
  private username: string = 'Samega0';
  private password: string = '123456';
  private password2: string = '123456';
  roleSelect = 'ROLE_USER';
  isActive = false;

  openEditor = () =>{
    this.isActive = true;
  }

  closeEditor = () =>{
    this.isActive = false;
  }

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

  handleSelectChange = (value : string) => {
    this.roleSelect = value;
  }

  resquestSave = () =>{

    if(this.name.length <= 2 || this.name.length >= 100){
      window.alert("O nome deve ter entre 2 e 100 letras");
    } else if(this.username.length <= 2 || this.username.length >= 20){
      window.alert("O username deve ter entre 2 e 20 letras");
    } else if(this.password.length <= 2 || this.password.length >= 30){
      window.alert("A senha deve ter entre 2 e 30 letras");
    } else if(this.password != this.password2 ){
      window.alert("Suas senhas estão diferentes");
    } else {

      this.user.name = this.name;
      this.user.username = this.username;
      this.user.password = this.password;

      // if(this.roleSelect == "ROLE_ADMIN"){
      //   //@ts-ignore
      //   this.user.roles[0].id = 1;
      // } else {
      //   //@ts-ignore
      //   this.user.roles[0].id = 2;
      // }

      this.user.roles = null;

      if(this.roleSelect == "ROLE_ADMIN"){
        this.authService
        .saveUser(this.user, 'admin')
      }else{
        this.authService
        .saveUser(this.user, 'user')
      }

    }

  }

}
