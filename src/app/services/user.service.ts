import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUser ():Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/user ")
  }
  signin (data:any):Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/signin",data)
  }
  signup (data:any):Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/signup`,data)
  }
  capquyen (data:any):Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/capquyen`,data)
  }

}
