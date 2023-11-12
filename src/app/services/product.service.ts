import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  get ():Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/book`)
  }
  getOne (id:string):Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/book/${id}`)
  }
  query ({_sort = "createdAt",
  _order = "asc",
  _page = 1,
  _limit = 99,}):Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/book?_sort=${_sort}&_order=${_order}&_page=${_page}&_limit=${_limit}`)
  }
  create (data:any):Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/book",data)
  }
  search (data:any):Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/search-book", data)
  }
  update (id:string,data:any):Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/book/${id}`,data)
  }
  delete (id:string):Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/book/${id}`)
  }

}
