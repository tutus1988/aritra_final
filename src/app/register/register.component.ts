import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  pswd: AbstractControl;
  gender: AbstractControl;
  subject: AbstractControl;

  userList: Array<any> = [];
  preparedData: Array<any> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private formbuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerform = formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      pswd: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      gender: ['',Validators.required]
    });
    this.name = this.registerform.controls['name'];
    this.email = this.registerform.controls['email'];
    this.pswd = this.registerform.controls['pswd'];
    this.gender = this.registerform.controls['gender'];
   }

  ngOnInit() {
    this.userService.currentMessage.subscribe(data => {
      console.log('Remaining data.....',data);
      if(data){
        let newData = JSON.parse(data);
        console.log('',newData);
        this.preparedData = newData;
      }
    });
  }

  register(){
    if(this.registerform.value.name && this.registerform.value.email
      && this.registerform.value.pswd && this.registerform.value.pswd){
      let sendData = {
        name: this.registerform.value.name,
        email: this.registerform.value.email,
        pswd: this.registerform.value.pswd,
        gender: this.registerform.value.gender
      }
      // this.userService.changeMessage(JSON.stringify(sendData));

      //Extra
      this.userList.push(sendData);
      console.log('Data pushed......',this.userList);

      if(this.preparedData && this.preparedData.length > 0){
        console.log("prepared in if......",this.preparedData);
        this.preparedData.push(sendData);
        this.userService.changeMessage(JSON.stringify(this.preparedData));
        this.router.navigate(['contact']);
      }else{
        console.log('Prepared in else.... ', this.preparedData);
        this.userService.changeMessage(JSON.stringify(this.userList));
        this.router.navigate(['contact']);
      }
      // this.router.navigate(['contact']);
    }else{
      this.userService.alertForWarning("Please Fillup All Fields","Warning!");
    }
  }
}
