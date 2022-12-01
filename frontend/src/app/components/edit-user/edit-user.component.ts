import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/types-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  @Output() eventClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  roleSelect = '';
  userData:User = {name: "", username: "", roles: [{id: 0, name: ""}]};
  userUpdated: User = {id: 0,name: "", username: "", roles: [{id: 0, name: ""}]};
  roleName = '';
  isActive = false;


  changeName = (value: string) =>{
    this.userUpdated.name = value;
  }

  openEditor = () =>{
    this.isActive = true;
  }

  closeEditor = () =>{
    this.isActive = false;

    setTimeout(() => {
      this.eventClick.emit();
    }, 300);
  }

  handleSelectChange = (value : string) => {
    this.roleSelect = value;
  }

  updateUser = () =>{

    this.userUpdated.id = this.userData.id;
    this.userUpdated.username = this.userData.username;
    this.userUpdated.password = this.userData.password;

    if(this.userUpdated.name == ""){
      this.userUpdated.name = this.userData.name;
    }

    if(this.roleSelect = ''){
      //@ts-ignore
      this.roleName = this.userData.roles[0].name;
    }else{
      this.roleName = this.roleSelect;
    }

    if(this.userUpdated.name.length <= 2 || this.userUpdated.name.length >= 100){
      window.alert("O nome deve ter entre 2 e 100 letras");
      window.alert(this.userUpdated.name)
    } else if(this.userUpdated.username.length <= 2 || this.userUpdated.username.length >= 20){
      window.alert("O Username deve ter entre 2 e 20 letras");
      window.alert(this.userUpdated.username)
    } else {
      this.authService
        .updateUser(this.userUpdated, this.roleName)
        console.log(this.userUpdated)
        this.closeEditor();
    }

  }

  removeUser = () =>{

    this.userUpdated.id = this.userData.id;
    this.userUpdated.username = this.userData.username;
    this.userUpdated.password = this.userData.password;

    if(this.userUpdated.name == ""){
      this.userUpdated.name = this.userData.name;
    }

    if(this.roleSelect = ''){
      //@ts-ignore
      this.roleName = this.userData.roles[0].name;
    }else{
      this.roleName = this.roleSelect;
    }

    if(this.userUpdated.name.length <= 2 || this.userUpdated.name.length >= 100){
      window.alert("O nome deve ter entre 2 e 100 letras");
      window.alert(this.userUpdated.name)
    } else if(this.userUpdated.username.length <= 2 || this.userUpdated.username.length >= 20){
      window.alert("O Username deve ter entre 2 e 20 letras");
      window.alert(this.userUpdated.username)
    } else {
      this.authService
        .deleteUser(this.userUpdated)
        this.closeEditor();
    }

  }


}
