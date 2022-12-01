import { Component } from '@angular/core';
import { Router,  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isAdm = false;
  widthBar = '50px';
  rotateIcon = '0deg';

  colorHome = '#81D8F7';
  colorAccount = '#C4C4CC';
  colorUsers = '#C4C4CC';

  changeColorGroup = () =>{

    setTimeout(() => {

      if(this.router.url == '/dashboard/home'){
        this.colorHome = '#81D8F7';
        this.colorAccount = '#C4C4CC';
        this.colorUsers = '#C4C4CC';

      }else if(this.router.url == '/dashboard/account'){
        this.colorHome = '#C4C4CC';
        this.colorAccount = '#81D8F7';
        this.colorUsers = '#C4C4CC';

      }else if(this.router.url == '/dashboard/users'){
        this.colorHome = '#C4C4CC';
        this.colorAccount = '#C4C4CC';
        this.colorUsers = '#81D8F7';
      }

    }, 100);

  }

  ngOnInit() {

    this.isAdm = this.authService.isAdm;
    this.changeColorGroup();

  }

  changeWidthBar = () =>{

    if(this.widthBar == '50px'){
      this.widthBar = '100px'
      this.rotateIcon = '180deg';
    }else{
      this.widthBar = '50px';
      this.rotateIcon = '0deg';
    }

  }

  logOut = () =>{
    this.authService.doLogout();
  }

}
