import {Component, OnInit} from '@angular/core';
import {UserModel, UserResponse} from '../../model/user.model';
import {UserListService} from '../../service/user-list.service';
import {take} from 'rxjs';
import {Role} from "../../model/roles.enum";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public allRoles = Role;
  dataSource = new MatTableDataSource<UserModel>([]);
  allUsers: UserModel[] = [];

  displayedColumns: string[] = ['name', 'surname', 'email', 'role'];

  constructor(private readonly userListService: UserListService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  public loadAllUsers() {
    this.userListService.getUsers()
      .pipe(take(1))
      .subscribe(response => {
        this.allUsers = response.map(singleResponse => this.mapToUserModel(singleResponse));
        this.dataSource.data = this.allUsers;
      });
  }

  public mapToUserModel(userResponse: UserResponse): UserModel {
    return {
      email: userResponse.email,
      name: userResponse.first_name,
      surname: userResponse.last_name,
      role: this.mapRole(userResponse.roles)
    }
  }

  public mapRole(roles: string[]): string {
    return roles.includes("ADMIN") ? 'Pracownik' : 'Student'
  }
}
