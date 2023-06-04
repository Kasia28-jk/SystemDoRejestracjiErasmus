import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../model/user-response';
import { UserListService } from '../../service/user-list.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent  implements OnInit 
{
  constructor(private userListService: UserListService) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  users : UserResponse[] = [];

  public loadUsers()
  {
    this.userListService.getUsers()
      .subscribe(response => {
        this.users = response;
        console.log(this.users);
      });
  }
}
