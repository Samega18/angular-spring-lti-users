import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Role, User } from 'src/app/types/types-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userData: User = {name: "", username: "", roles: [{id: 0, name: ""},]}
  isAdmin = false;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit(){
    this.userData = await this.authService.getDataUser();
    this.userData.roles[0].name == 'ROLE_ADMIN' ? this.isAdmin = true : this.isAdmin = false
  }

}
