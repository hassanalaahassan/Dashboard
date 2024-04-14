import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  term:string=''
  users:any[]=[]
  constructor(
    private _UsersService:UsersService,
    private _ToastrService:ToastrService
  ){
    this.storeData()
  }
  ngOnInit(): void {
    this.allUsers()
  }
  allUsers():void{
    const filter:any ={
      page:1,
      limit:10,
      name:''
    }
    this._UsersService.allUsers(filter)
  }
  storeData():void{
    this._UsersService.users.subscribe({
      next:(response)=>{
        this.users = response
      }
    })
  }
  deleteTisUesr(id:any):void{
    this._UsersService.deleteUser(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.massage)
        this.allUsers()

      }
    })
  }
  updateUser(user:any):void{
    const model = {
      id:user._id,
      status:user.status
    }
    this._UsersService.changeStatus(model).subscribe({
      next:(response)=>{
        this.allUsers()
        this._ToastrService.success(response.massage)
        console.log(response);

      }
    })
  }
}
