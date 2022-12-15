import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl=environment.baseUrl;

constructor(private http:HttpClient) { }

setOptions(){
  const httpOptions={
    headers:new HttpHeaders({
      Authorization:'Bearer '+localStorage.getItem('token')
    })
  }
  return httpOptions;
}


getAllProductes() : Observable<Product[]>{
  return this.http.get<Product[]>(this.baseUrl+'/product/list')
}

addProduct(product:Product){
  return this.http.post(this.baseUrl+'/product/add',product,this.setOptions())
}

}
