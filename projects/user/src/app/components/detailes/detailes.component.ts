import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTaskService } from '../../services/user-task.service';
import { Task } from '../../interface/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.scss']
})
export class DetailesComponent {

  taskId:any
  myTask:Task= {} as Task
  constructor(private _ActivatedRoute:ActivatedRoute ,private _UserTaskService:UserTaskService,private _Router:Router,private _ToastrService:ToastrService){
    _ActivatedRoute.paramMap.subscribe({
      next:(response)=>{
        this.taskId = response.get('id')
      }

    })
  }

  ngOnInit(): void {
    this.getTaskDetailes(this.taskId)
  }

  getTaskDetailes(id:any):void{

    this._UserTaskService.detailes(id).subscribe({
      next:(response)=>{
        this.myTask = response.tasks
        console.log(this.myTask);
      }
    })

  }
  complete(elment:Task):void{
    const id = {
      id:elment._id
    }
    this._UserTaskService.changeStatus(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.massage)
        this._Router.navigate(['/user-task'])
      }
    })

    }


}
