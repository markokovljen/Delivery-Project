import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors,ValidatorFn, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!:RegisterRequest;
  userSubmitted!:boolean;
  administratorUser!:boolean;

  constructor(private fb: FormBuilder,
              private alertify : AlertifyService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm=this.fb.group({
      userName:[null,Validators.required],
      firstName:[null,Validators.required],
      lastName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      confirmPassword:[null,Validators.required],
      address:[null,[Validators.required]],
      dateOfBirth:[null],
      role:['user'],
      id:[0]
    },{
      validators:this.checkPasswords
    })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : {
       notSame: true
    }
 }

  onSubmit(){

    this.userSubmitted=true;

    if(this.registrationForm.valid){
      this.applyUser();
      console.log(this.user);
      this.authService.sendRegisterRequest(this.user).subscribe(()=>
      {

        if(this.user.role == 'user')
          this.alertify.success('Congrats, you are successfully send registeration request.');
        else if(this.user.role == 'deliverer'){
          this.alertify.success('Congrats, you are successfully send verification request.');
        }
        else {
          this.alertify.success('Congrats, you are successfully send admin request.');
        }
       this.onReset();
      },error=>{
        this.alertify.error('Provide all inputs valid!');
      })
    }
    else{
      this.alertify.error('Provide all inputs valid!')
    }

  }

  applyUser(){
    this.user={
    userName: this.userName.value,
    firstName:this.firstName.value,
    lastName:this.lastName.value,
    email:this.email.value,
    password:this.password.value,
    confirmPassword:this.confirmPassword.value,
    address: this.address.value,
    dateOfBirth:this.dateOfBirth.value,
    role: this.role.value,
    id : 0
    }
  }

  onReset(){
    this.userSubmitted=false;
    this.registrationForm.reset();

  }

  isAdministrator(){
    let myBool=(localStorage.getItem('isadministrator')?.toLowerCase()==='true');
    this.administratorUser=myBool;
    return this.administratorUser;
  }



  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get firstName(){
    return this.registrationForm.get('firstName') as FormControl;
  }

  get lastName(){
    return this.registrationForm.get('lastName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get address(){
    return this.registrationForm.get('address') as FormControl;
  }
  get dateOfBirth(){
    return this.registrationForm.get('dateOfBirth') as FormControl;
  }
  get role(){
    return this.registrationForm.get('role') as FormControl;
  }

}
