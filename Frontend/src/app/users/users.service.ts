import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AuthData } from '../auth/auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private users: AuthData[] = [];
private usersUpdated = new Subject<AuthData[]>();

  constructor(private http: HttpClient) { }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getAllUsers() {
    this.http.get<{message: string, users: AuthData[]}>('http://localhost:3000/api/user/getUsers')
        .subscribe((usersData) => {
            this.users = usersData.users;
            this.usersUpdated.next([...this.users]);
        });
  }
}
