import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }



  get(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/category")
  }

  getOne(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/category/${id}`)
  }
  create(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/category", data)
  }
  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/category/${id}`, data)
  }
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/category/${id}`)
  }


  private productByCategory = new BehaviorSubject<any>(null);


  setProductByCategory(item: any) {
    this.getOne(item._id).subscribe(({ data }) => {
      this.productByCategory.next(data.books);
    })
  }

  getProductByCategory() {
    return this.productByCategory.asObservable();
  }
}
