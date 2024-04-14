import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  constructor(private _HttpClient:HttpClient) { }

  getUserTasks(id:string,taskParams:any):Observable<any>{
    let params = new HttpParams()
    Object.entries(taskParams).forEach(([key,value]:any)=>{
      params = params.append(key,value)
    })

    return this._HttpClient.get(environment.baseApi + '/user-tasks/' + id ,{params})
  }
  changeStatus(id:object):Observable<any>{
    return this._HttpClient.put(environment.baseApi + '/complete/' , id )
  }
  detailes(id:object):Observable<any>{
    return this._HttpClient.get(environment.baseApi + '/task/' + id )
  }

}
