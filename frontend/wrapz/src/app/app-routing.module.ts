import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./components/auth/auth.module').then((m)=>m.LoginlandingModule),},
  {path:'home' , loadChildren:()=>import('./components/loginlanding/loginlanding.module').then((m)=>m.LoginlandingModule),},
  {path:'adminhome',loadChildren:()=>import('./components/admin/admin.module').then((m)=>m.adminModule),}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
