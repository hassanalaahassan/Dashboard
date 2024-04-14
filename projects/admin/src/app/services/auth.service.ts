import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../interface/register';
import { Login } from '../interface/login';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('adminToken')){
      this.activeToken.next(JSON.stringify(localStorage.getItem('adminToken')))
    }
  }

  activeToken:BehaviorSubject<string>= new BehaviorSubject('')

  adminToken():void{
    let token:string = JSON.stringify(localStorage.getItem('adminToken'))
    this.activeToken.next(token)
  }

  loginAuth(data:Login):Observable<any>{
    return this._HttpClient.post( environment.baseApi.replace('tasks','auth')+ `/login`,data)
  }
  // registerAuth(data:Register):Observable<any>{
  //   return this._HttpClient.post(`https://my-crud-hmi4.onrender.com/auth/createAccount`,data)
  // }



}
