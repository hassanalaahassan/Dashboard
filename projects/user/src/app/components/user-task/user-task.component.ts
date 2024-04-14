import { Component, OnInit } from '@angular/core';
import { UserTaskService } from '../../services/user-task.service';
import { Task } from '../../interface/task';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.scss'],

})
export class UserTaskComponent implements OnInit {

  constructor( private _UserTaskService:UserTaskService,
    private _ToastrService:ToastrService
  ){
  }
  page:number=1
  Data:any
  selectedStatus:string="In-Progress"
  allTasks:Task[]=[]




  ngOnInit(): void {
    this.decodeUserData()
    this.getTasks()
  }



  decodeUserData():void{
    const token:string = JSON.stringify(localStorage.getItem('userToken'))
    let userData:any = JSON.parse(window.atob(token.split('.')[1]))
    this.Data = userData
  }



  getTasks():void{
    let params : object ={
      page:this.page,
      limit:10,
      status:this.selectedStatus
    }
    this._UserTaskService.getUserTasks(this.Data.userId,params).subscribe({
      next:(response)=>{
        this.allTasks=response.tasks
      }
    })
  }




  pageChanged(event:any):void{

    this.page=event

    // this.getTasks()
  }

  complete(elment:Task):void{
  const id = {
    id:elment._id
  }
  this._UserTaskService.changeStatus(id).subscribe({
    next:(response)=>{
      this._ToastrService.success(response.massage)
      this.getTasks()
    }
  })

  }

}
