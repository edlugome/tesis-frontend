//Modules
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { 
  MatInputModule, 
  MatButtonModule,
  MatCardModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatSelectModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule ,
  MatCheckboxModule,
  MatSliderModule,
  MatSlideToggleModule,
  MAT_DATE_LOCALE,
  MatProgressBarModule
} from '@angular/material';
import { NgProgressModule } from 'ngx-progressbar';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { ProfeDashboardComponent } from './profe-dashboard/profe-dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProjectRegisterComponent } from './project-register/project-register.component';

import {StudentService} from './student.service';
import { RegisterComponent } from './register/register.component';
//Hammer (?)
import 'hammerjs';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StudentdashboardComponent,
    ProfeDashboardComponent,
    ToolbarComponent,
    ProjectRegisterComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSnackBarModule, MatSidenavModule,
    MatSelectModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,
    NgProgressModule,
    MatProgressBarModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-VE'},
  StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
