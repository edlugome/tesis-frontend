import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent} from '../register/register.component';
import { StudentdashboardComponent} from '../studentdashboard/studentdashboard.component';
import { ProfeDashboardComponent} from '../profe-dashboard/profe-dashboard.component';
import { ProjectRegisterComponent} from '../project-register/project-register.component';
import { ProjectComponent} from '../project/project.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'studentdashboard', component: StudentdashboardComponent},
  { path: 'profedashboard', component: ProfeDashboardComponent},
  { path: 'project-register', component: ProjectRegisterComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}