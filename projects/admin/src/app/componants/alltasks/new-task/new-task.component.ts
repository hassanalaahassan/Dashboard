import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Tasks } from '../../../interface/tasks';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit{


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Tasks,
    private _TasksService:TasksService,
    private _ToastrService:ToastrService,
    public MatDialog:MatDialog,
    public dialog:MatDialogRef<NewTaskComponent>,
    private _UsersService:UsersService

    ){
      this.storeData()
    }

    isLoading:boolean=false

  users:any=[
    // {name:'test1',id:'65f58c141e7ee2a02d6c9221'},
    // {name:'test2',id:'65f58c9f1e7ee2a02d6c9224'},
    // {name:'test3',id:'65f58cb41e7ee2a02d6c9227'},
    // {name:'hassan',id:'66117139b4bbcdc4f4b4b641'}
  ]

  newTask:FormGroup=new FormGroup({
    title:new FormControl(this.data?.title||'',[Validators.required,Validators.minLength(4)]),
    userId:new FormControl(this.data?.userId?._id||'',[Validators.required]),
    image:new FormControl(this.data?.image||'',[Validators.required]),
    description:new FormControl(this.data?.description||'',[Validators.required]),
    deadline:new FormControl(this.data ? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '',[Validators.required]),
  })

  imageName:string=''
  firstvalues:any

  ngOnInit(): void {
    this.firstvalues = this.newTask.value
  }

  handelNewTaskForm():void{

      let newForm =this.convertForm()
      if(this.newTask.valid){
        this.isLoading=true
        this._TasksService.createTask(newForm).subscribe({
          next:(response)=>{
            this.isLoading=false
            this._ToastrService.success(response.massage,'Success')
            this.dialog.close(true);
          }
        })

      }
  }
  storeData():void{
    this._UsersService.users.subscribe({
      next:(response)=>{
        this.users = response
      }
    })
  }

  convertForm():any{
    let date = moment(this.newTask.value['deadline']).format('DD-MM-YYYY')
    let newFormData = new FormData()
    Object.entries(this.newTask.value).forEach(([key ,value]:any) => {

      if(key == 'deadline'){
        newFormData.append(key,date)
      }
      else
      {
        newFormData.append(key,value)
      }
    });
    return newFormData
      // newFormData.append('title',this.newTask.value['title'])
      // newFormData.append('userid',this.newTask.value['userid'])
      // newFormData.append('image',this.newTask.value['image'])
      // newFormData.append('description',this.newTask.value['description'])
      // newFormData.append('deadline',this.newTask.value['deadline'])
  }

  getImageName(event:any):void{
    this.imageName=event.target.files[0].name
    this.newTask.get('image')?.setValue(event.target.files[0])
  }

  update():void{
    let newForm =this.convertForm()
      if(this.newTask.valid){
        this.isLoading=true
        this._TasksService.updateTask(newForm,this.data._id).subscribe({
          next:(response)=>{

            this.isLoading=false
            this._ToastrService.success(response.massage,'Success')
            this.dialog.close(true);
          }
        })

      }
  }

  confirmation():any{
    let flag = false
    Object.keys(this.newTask.value).forEach((key)=>{
      if(this.newTask.value[key] !== this.firstvalues[key]){
        flag=true
      }
    })
    if(flag){
     const dialogRef = this.MatDialog.open(ConfirmComponent , {
      width: '800px ',
      disableClose:true
     })
    }else{
      this.dialog.close();
    }
  }

}
