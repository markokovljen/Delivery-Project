import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  role!:string;

  constructor(private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(localStorage.getItem('token') != null){

      this.role = localStorage.getItem('role')!;

      if(this.role.includes(next.data['role1']) ||
         this.role.includes(next.data['role2']) ||
         this.role.includes(next.data['role3'])){
          return true;
      }
      else {
        this.router.navigate(['user/login']);
      }
      return false;
    }
    else {
      this.router.navigate(['user/login']);
      return false;
    }
  }


}
