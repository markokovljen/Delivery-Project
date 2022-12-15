import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { UserForModify } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss']
})
export class ModifyProfileComponent implements OnInit {

  userSubmitted!:boolean;
  modifyForm!:FormGroup;
  profile!:UserForModify;

  constructor(private authService:AuthenticationService,
              private alertify:AlertifyService,
              private route:ActivatedRoute,
              private fb:FormBuilder,) { }

  ngOnInit() {
    this.initForm()
    const propUsername=this.route.snapshot.params['email'];
    this.authService.getUser(String(propUsername)).subscribe((data : any)=>{
      this.profile = data;
      this.updateModifyForm()
    })


  }

  initForm(){
    this.modifyForm = new FormGroup({
       userName : new FormControl(),
       firstName : new FormControl(),
       lastName : new FormControl(),
       address : new FormControl(),
       dateOfBirth : new FormControl(),
    })
  }

  updateModifyForm(){
    this.modifyForm=this.fb.group({
      userName:[this.profile.userName,Validators.required],
      firstName:[this.profile.firstName,Validators.required],
      lastName:[this.profile.lastName,Validators.required],
      address:[this.profile.address,Validators.required],
      dateOfBirth:[this.profile.dateOfBirth,Validators.required],
    })
  }

  onSubmit(){
    this.userSubmitted=true;
    if(this.modifyForm.valid){
      this.applyModifyProfile();
      const propUsername=this.route.snapshot.params['email'];
      this.authService.modifyProfile(propUsername,this.profile).subscribe(()=>
    {
      this.alertify.success('Congrats, you are successfully modifed your profile')
    })
    }
  }

  applyModifyProfile(){
    this.profile={
      userName:this.userName.value,
      firstName:this.firstName.value,
      lastName:this.lastName.value,
      address: this.address.value,
      dateOfBirth:this.dateOfBirth.value
    }
  }

  get userName(){
    return this.modifyForm.get('userName') as FormControl;
  }

  get firstName(){
    return this.modifyForm.get('firstName') as FormControl;
  }

  get lastName(){
    return this.modifyForm.get('lastName') as FormControl;
  }
  get address(){
    return this.modifyForm.get('address') as FormControl;
  }
  get dateOfBirth(){
    return this.modifyForm.get('dateOfBirth') as FormControl;
  }

}
