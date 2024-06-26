import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componants/login/login.component';
import { RegisterComponent } from './componants/register/register.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AlltasksComponent } from './componants/alltasks/alltasks.component';
import { UsersComponent } from './componants/users/users.component';
import { BlankComponent } from './layout/blank/blank.component';
import { loginGuard } from './guard/login.guard';
import { ErrorComponent } from './componants/error/error.component';

const routes: Routes = [

  {path:'',canActivate:[loginGuard],component:BlankComponent,children:[
    {path:'all-tasks',component:AlltasksComponent,title:'All-Tasks'},
    {path:'users',component:UsersComponent,title:'Users'},
    {path:'',component:ErrorComponent,title:'404'}
  ]},
 {path:'',component:AuthComponent,children:[
  {path:'login',component:LoginComponent,title:'Admin'},
  // {path:'register',component:RegisterComponent,title:'register'},
  // {path:'',component:ErrorComponent,title:'404'}
    {path:'',redirectTo:'login',pathMatch:'full'},

 ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
