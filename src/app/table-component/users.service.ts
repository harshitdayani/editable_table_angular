import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Users } from './users.model';


@Injectable({
    providedIn: "root"
})
export class UsersService{

    constructor(private http: HttpClient) {
         var obj: Users;
         this.getJSON().subscribe(data => obj=data, error => console.log(error));
    }
    public getJSON(): Observable<Users> {
         return this.http.get<Users>("assets/users_data.json");

     }
}