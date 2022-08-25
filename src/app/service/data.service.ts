import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  url:string = "http://localhost:18337/api/User";

  getUsers(){
    return this.http.get(this.url);
  }

  addUsers(user: User):Observable<User>{
    return this.http.post<User>(this.url, user);
  }

  updateUsers(uid:number, user: User):Observable<User>{
    return this.http.put<User>(this.url + `?uid=${uid}`, user);
  }

  removeUser(id:number){
    return this.http.delete(this.url + `?uid=${id}`);
  }

  uploadCsv(_file: any):Observable<any>{
    return this.http.post<any>(`${this.url}/Upload`, _file);
  }

}
