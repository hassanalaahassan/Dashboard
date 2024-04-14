import { Component, OnDestroy } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _AuthService:AuthService,
    private _Router:Router
    ){}

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('', [RxwebValidators.required(),RxwebValidators.email()]),
    password:new FormControl('', [RxwebValidators.required(),RxwebValidators.password({validation:{minLength: 6}})]),
    role:new FormControl('user')
  })
  hundelLoginForm():void{
    if(this.loginForm.valid){
      this._AuthService.loginAuth(this.loginForm.value).subscribe({
        next:(response)=>{
          localStorage.setItem('userToken','Bearer '+ response.token)
          this._AuthService.adminToken
          this._Router.navigate(['/user-task'])
        }
      })
    }
  }
}
