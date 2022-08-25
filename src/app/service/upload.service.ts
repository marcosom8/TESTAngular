import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  getInfo(_path: string){
    return this.http.get(_path, {responseType:'text'});
  }
  
}
