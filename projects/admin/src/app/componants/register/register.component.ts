import { Component } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService){
  }
  registerForm:FormGroup=new FormGroup({
    email:new FormControl('', [RxwebValidators.required(),RxwebValidators.email()]),
    password:new FormControl('', [RxwebValidators.required(),RxwebValidators.password({validation:{minLength: 6}})]),
    username:new FormControl('', [RxwebValidators.required()]),
    role:new FormControl('admin'),
  })

  hundelRegisterForm():void{

  //   if(this.registerForm.valid){
  //     console.log(this.registerForm.value);

  //     this._AuthService.registerAuth(this.registerForm.value).subscribe({
  //       next:(response)=>{
  //         console.log(response);
  //       }
  //     })
  //  }


  }

}
