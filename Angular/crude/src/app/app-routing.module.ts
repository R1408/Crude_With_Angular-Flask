import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayuserComponent } from './displayuser/displayuser.component'
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes = [
  {path: '', redirectTo: 'displayUsers', pathMatch: 'full'},
  {path: 'displayUsers', component: DisplayuserComponent},
  {path: 'addUser', component: AdduserComponent},
  {path: 'editUser/:id', component: EdituserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
