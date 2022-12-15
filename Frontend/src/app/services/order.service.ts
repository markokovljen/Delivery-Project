import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, OrderResponseDto } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

getPendingDelivererOrders(id : number) : Observable<OrderResponseDto[]>{
  return this.http.get<OrderResponseDto[]>(this.baseUrl+`/order/list/deliverer/${id}`,this.setOptions())
}

addOrder(order:Order){
  return this.http.post(this.baseUrl+'/order/add',order,this.setOptions())
}

takeOrder(delivererId: number, orderId: number){
  return this.http.put(this.baseUrl+'/order/deliverer/take/'+delivererId.toString()+'/'+orderId.toString(),"",this.setOptions());
}

getCurrentOrdersForDeliverer(delivererId : number) : Observable<OrderResponseDto[]>{
  return this.http.get<OrderResponseDto[]>(this.baseUrl+`/order/deliverer/currentorder/${delivererId}`,this.setOptions())
}

getCurrentOrdersForUser(userId : number) : Observable<OrderResponseDto[]>{
  return this.http.get<OrderResponseDto[]>(this.baseUrl+`/order/user/currentorder/${userId}`,this.setOptions())
}

getOrdersForAdmin() : Observable<OrderResponseDto[]>{
  return this.http.get<OrderResponseDto[]>(this.baseUrl+'/order/admin/currentorder',this.setOptions())
}

updateCurrentOrderDeliverer(delivererId: number){
  return this.http.put(this.baseUrl+'/order/deliverer/updatecurrentorder/'+delivererId.toString(),"",this.setOptions());
}

updateCurrentOrderUser(userId: number){
  return this.http.put(this.baseUrl+'/order/user/updatecurrentorder/'+userId.toString(),"",this.setOptions());
}


}
