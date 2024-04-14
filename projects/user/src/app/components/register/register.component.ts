import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService,
    private _Router:Router
  ){
  }
  registerForm:FormGroup=new FormGroup({
    email:new FormControl('', [RxwebValidators.required(),RxwebValidators.email()]),
    password:new FormControl('', [RxwebValidators.required(),RxwebValidators.password({validation:{minLength: 6}})]),
    username:new FormControl('', [RxwebValidators.required()]),
    role:new FormControl('user'),
  })

  hundelRegisterForm():void{

    if(this.registerForm.valid){
      this._AuthService.registerAuth(this.registerForm.value).subscribe({
        next:(response)=>{
          if(response.token){
            this._Router.navigate(['/login'])
          }
        }
      })
   }
  }
}

