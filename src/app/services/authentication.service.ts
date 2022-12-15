import { Injectable } from '@angular/core';
import { RegisterRequest, UserForLogin, UserForModify } from '../model/user';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl=environment.baseUrl;

  setOptions(){
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+localStorage.getItem('token')
      })
    }
    return httpOptions;
  }

  constructor(private http:HttpClient) { }

  authUser(user:UserForLogin){
      return this.http.post(this.baseUrl+'/user/login',user,this.setOptions());
  }

  registerUser(user:RegisterRequest){
      return this.http.post(this.baseUrl+'/user/register',user,this.setOptions());
  }

  sendRegisterRequest(user:RegisterRequest){
    return this.http.post(this.baseUrl+'/user/sendregisterrequest',user,this.setOptions());
  }

  getAllRegistrationRequest() : Observable<RegisterRequest[]>{
    return this.http.get<RegisterRequest[]>(this.baseUrl+'/user/list',this.setOptions())
  }

  rejectRegisterRequest(id:number){
    return this.http.delete(this.baseUrl+'/user/deleteregisterrequest/'+id.toString(),this.setOptions());
  }

  getUser(username:string){
    return this.http.get(this.baseUrl+'/user/user/'+username,this.setOptions());
  }

  modifyProfile(username:string,userforModify:UserForModify){
    return this.http.put(this.baseUrl+'/user/user/'+username,userforModify,this.setOptions());
  }

}
