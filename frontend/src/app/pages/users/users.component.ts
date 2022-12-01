import { Component, OnInit, ViewChild } from '@angular/core';
import { EditUserComponent } from 'src/app/components/edit-user/edit-user.component';
import { SaveUserComponent } from 'src/app/components/save-user/save-user.component';
import { AuthService } from 'src/app/services/auth.service';
import { Role, User, UserPage } from 'src/app/types/types-data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  @ViewChild("EditUserComponent") editUser: EditUserComponent;
  @ViewChild("SaveUserComponent") saveUser: SaveUserComponent;

  valueSearch: string = '';
  pageNumber = 0;
  findBy = 'id';

  page: UserPage = {
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size:12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  };

  // users: User[] = [{name: "Samuel", username: "Samega", roles: [{id: 0, name: "ROLE_ADMIN"}]},
  // {name: "Samuel2", username: "Samega2", roles: [{id: 0, name: "ROLE_ADMIN"}]},
  // {name: "Samuel3", username: "Samega3", roles: [{id: 1, name: "ROLE_USER"}]},
  // {name: "Samuel4", username: "Samega4", roles: [{id: 1, name: "ROLE_USER"}]}
  // ];
  // user:User;

  constructor(
    private authService: AuthService
  ) {
    this.page = {} as UserPage;
  }

  getNewUsers(){
    this.authService.findUsers(this.pageNumber, this.findBy, this.valueSearch).subscribe(response => {

      this.page.number = response?.number;
      this.page.empty = response?.empty;
      this.page.numberOfElements = response?.numberOfElements;
      this.page.size = response?.size;
      this.page.first = response?.first;
      this.page.last = response?.last;
      this.page.totalElements = response?.totalElements;
      this.page.totalPages = response?.totalPages;
      this.page.content = response?.content?.map((item: any) => {
        var user = {} as User;
        user.id = item?.id;
        user.name = item?.name;
        user.username = item?.username;
        user.roles = item?.roles.length == 0 ? [{id: 0, name: ""}] : item?.roles;
        return user;
      });

      console.log(this.page);

    });
  }

  ngOnInit(){

    this.getNewUsers();

  }

  changeValueSearch = (value: string) =>{
    this.valueSearch = value;
  }

  keyEnterPress = () =>{
    this.getNewUsers();
  }

  openEditUser = (user:User) =>{
    this.editUser.userData = user;
    this.editUser.roleName = user.roles[0].name || "Não especificado";
    this.editUser.openEditor();
  }

  openSaveUser = () =>{
    this.saveUser.openEditor();
  }

  handlePageChange = (newPageNumber : number) => {
    this.pageNumber = newPageNumber;
    this.getNewUsers();
  }

  handleSelectChange = (value : string) => {
    this.findBy = value;
  }



}
