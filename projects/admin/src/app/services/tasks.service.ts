import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Tasks } from '../interface/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _HttpClient:HttpClient) { }



  getAllTasks (filteration:any):Observable<any>{
    let params = new HttpParams()
    Object.entries(filteration).forEach(([key,value]:any)=>{
    if(value){
      params = params.append(key,value)
    }
  })
    return this._HttpClient.get(environment.baseApi + `/all-tasks`,{params})
  }
  createTask(data:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi + `/add-task`,data)
  }
  deleteTask(id:any):Observable<any>{
    return this._HttpClient.delete(environment.baseApi + `/delete-task/${id}`)
  }
  updateTask(task:Tasks,id:any):Observable<any>{
    return this._HttpClient.put(environment.baseApi + `/edit-task/${id}`,task)
  }
 
}
