import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import {StudentService} from '../student.service';
import { MatSidenav} from '@angular/material';
@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {

  constructor(private router:Router, private studentService:StudentService) { }
  u:any={};
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  ngOnInit() 
  {
    this.u=localStorage.getItem('user');
    if(this.u==null)
    {
      alert('Debes iniciar sesión para acceder a este contenido');
      this.router.navigate(['/login']);
    }
  }


  logout()
  {
    this.studentService.logout();
    this.router.navigate(['/login']);
  }

}
