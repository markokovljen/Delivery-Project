import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {

  constructor(private authService:AuthenticationService,
              private alertify:AlertifyService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin(loginForm:NgForm){
      this.authService.authUser(loginForm.value).subscribe(
        (response:any)=>{
          const user=response;
          console.log(user);
          localStorage.setItem('id',user.id);
          localStorage.setItem('token',user.token);
          localStorage.setItem('email',user.email);
          localStorage.setItem('role',user.role);
          this.alertify.success('Login Successuful');
          if(user.role == 'administrator')
            this.router.navigate(['dashboard']);
          else if(user.role == 'user')
            this.router.navigate(['dashboard/user']);
          else if(user.role == 'deliverer'){
            this.router.navigate(['dashboard/deliverer']);
          }
        }, error => {
          this.alertify.error('Invalid email or password')
        }
      )
  }

}
