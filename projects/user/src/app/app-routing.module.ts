import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankComponent } from './layout/blank/blank.component';
import { UserTaskComponent } from './components/user-task/user-task.component';
import { authGuard } from './guard/auth.guard';
import { DetailesComponent } from './components/detailes/detailes.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:'',component:AuthComponent,children:[
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    // {path:'',component:ErrorComponent,title:'404'},

  ]},
  {path:'',canActivate:[authGuard],component:BlankComponent,children:[
    {path:'user-task',component:UserTaskComponent,title:'Tasks'},
    {path:'detailes/:id',component:DetailesComponent,title:'Task-Detailes'},
    {path:'**',component:ErrorComponent,title:'404'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
