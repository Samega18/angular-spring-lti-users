import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/types-data';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  userData: User = {name: "", username: "", roles: [{id: 0, name: ""},]}
  isAdmin = false;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit(){
    this.userData = await this.authService.getDataUser();
  }

}
