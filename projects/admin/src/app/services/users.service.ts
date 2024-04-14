import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }
  users:BehaviorSubject<any>=new BehaviorSubject([])
  getAllUsers(filter?:any):Observable<any>{
    if(filter){
      let params=new HttpParams
    Object.entries(filter).forEach(([key,value]:any)=>{
      if(value){
        params = params.append(key,value)
      }
    })
    return this._HttpClient.get(environment.baseApi.replace('tasks','auth') + `/users`,{params})
    }
    else
    {
      return this._HttpClient.get(environment.baseApi.replace('tasks','auth') + `/users`)
    }

  }
  deleteUser(id:any):Observable<any>{
      return this._HttpClient.delete(environment.baseApi.replace('tasks','auth') + `/user/`+id)
  }
  changeStatus(model:any):Observable<any>{
      return this._HttpClient.put(environment.baseApi.replace('tasks','auth') + `/user-status`,model)
  }
  allUsers(model?:any):void{
    this.getAllUsers(model).subscribe({
      next:(response)=>{
        this.users.next(
          response.users
        )
      }
    })
  }
}
