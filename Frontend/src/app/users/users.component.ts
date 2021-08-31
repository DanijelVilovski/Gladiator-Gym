import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { AuthData } from '../auth/auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: AuthData[] = [];
  private usersSub: Subscription = new Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers();
    this.usersSub = this.usersService.getUsersUpdateListener()
    .subscribe((users: AuthData[]) => { 
      console.log(users);
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}
