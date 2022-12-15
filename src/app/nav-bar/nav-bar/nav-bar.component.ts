import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  loggedinUser!: string;
  administratorUser!:boolean;
  dashboardLink! : string;

  constructor(private alertify: AlertifyService,
              private router:Router) { }

  ngOnInit() {

  }

  loggedin(){
    let role = localStorage.getItem('role')!
    if(role == 'administrator')
      this.dashboardLink = 'dashboard'
    else if(role == 'user')
      this.dashboardLink = 'dashboard/user'
    else if(role == 'deliverer')
      this.dashboardLink = 'dashboard/deliverer'

    this.loggedinUser = localStorage.getItem('email')!;
    return this.loggedinUser;
  }

  isAdministrator(){
    let administrator=localStorage.getItem('role');
    if(administrator == 'administrator')
      return administrator;
    else
    return null;
  }

  isDeliverer(){
    let deliverer=localStorage.getItem('role');
    if(deliverer == 'deliverer')
      return deliverer;
    else
    return null;
  }

  isUser(){
    let user=localStorage.getItem('role');
    if(user == 'user')
      return user;
    else
    return null;
  }

  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isadministrator');
    this.alertify.success("You are logged out!");
    this.router.navigate(['/user/login']);
  }

}
