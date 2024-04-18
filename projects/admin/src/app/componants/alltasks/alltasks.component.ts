import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from './new-task/new-task.component';
import { ToastrService } from 'ngx-toastr';
import { Tasks } from './../../interface/tasks';
import {FormGroup, FormControl} from '@angular/forms';
import * as moment from 'moment';
import { UsersService } from '../../services/users.service';




@Component({
  selector: 'app-alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.scss'],
  template: `
    <ul>
      <li *ngFor="let item of collection | paginate: { itemsPerPage: 10, currentPage: p }"> ... </li>
    </ul>

    <pagination-controls (pageChange)="p = $event"></pagination-controls>
    `
})
export class AlltasksComponent implements OnInit {

  constructor(
    private _TasksService:TasksService,
    public   dialog:MatDialog,
    private _ToastrService:ToastrService,
    private _UsersService:UsersService
  ){
    this.storeData()
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  page: number = 1;
  allTasks:Tasks[]=[]
  term:string=""
  filteration:any={
    page:this.page,
    limit:10
  }

  users:any[]=[]

  status:any=[
    {name:'Complete',id:1},
    {name:'In-Progress',id:1}
  ]

  ngOnInit(): void {
    this.getTasks()
    this.allUsers()
  }

  allUsers():void{
    this._UsersService.allUsers()
    // .subscribe({
    //   next:(response)=>{
    //     this.users = response.users
    //   }
    // })
  }
  storeData():void{
    this._UsersService.users.subscribe({
      next:(response)=>{
        this.users = response

      }
    })
  }
  getTasks():void{

    this._TasksService.getAllTasks(this.filteration).subscribe({
      next:(response)=>{
        this.allTasks=this.filterTasks(response.tasks)
      }
    })
  }
  filterTasks(tasks:Tasks[]):any{
    // let arr = tasks.map((task)=> task.userId!=null)
    let arr = tasks.filter((task)=>task.userId!=null)
    return arr
  }

  openWindow(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width:'800PX',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe({
      next:(response)=>{
        if(response){
          this.getTasks()
        }
      }
    })
  }
  removeTask(id:any):void{

    this._TasksService.deleteTask(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.massage)
        this.getTasks()
      }
    })
  }
  updateTask(task:Tasks){
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width:'800PX',
      data:task,
      disableClose:true
    });
    dialogRef.afterClosed().subscribe({
      next:(response)=>{
        if(response){
          this.getTasks()
        }
      }
    })
  }
  userSelected(event:any):void{
    this.page=1
    this.filteration['page']=1
    this.filteration['userId'] =event.value
    this.getTasks()
  }
  statusSelected(event:any):void{
    this.page=1
    this.filteration['page']=1
    this.filteration['status'] = event.value
    this.getTasks()
  }
  selectDate(event:any,type:string):void{
    this.page=1
    this.filteration['page']=1
    let date = moment(event.value).format('DD/MM/YYYY')
    this.filteration[type] = date
    if(type == 'toDate' && this.filteration['toDate']!=='Invalid date'){
      this.getTasks()
    }
  }
  pageChanged(event:any):void{

    this.page=event
    this.getTasks()
  }

}
