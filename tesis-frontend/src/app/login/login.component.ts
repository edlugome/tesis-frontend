import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private studentService:StudentService, private fb:FormBuilder) { }

  userL:User;
  u:any={};
  loginForm:FormGroup;
  show:boolean=false;

  ngOnInit() 
  {
    this.loginForm=this.fb.group({
      'username':[null,Validators.required],
      'password':[null,Validators.required]
    });

    this.u=JSON.parse(localStorage.getItem('user'));
    console.log(this.u);
    if(this.u!=null)
    {
      this.navigate(this.u);
    }
    this.userL=new User();
  }

  login(user:any)
  {
    this.show=true;
    this.userL.username=user.username;
    this.userL.password=user.password;

    this.studentService.login(this.userL)
    .then(res=>
      {
        this.HandleRes(res);
      })
    .catch(error=>
      {
        this.handleError(error);
      });

    
  }

  handleError(error: any)
  {
    alert('Usuario o contraseña incorrectos.');
    this.show=false;
  }

  gotoRegister()
  {
    let link=['/project-register'];
    this.router.navigate(link);
  }

  HandleRes(res)
  {
    if(res==null)
    {
      return;
    }
    else
    {
      if(res['user_type']===0)
      {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/studentdashboard']);
      }
    }
  }

  navigate(user)
  {
    if(user['user_type']===0)
    {
      this.router.navigate(['/studentdashboard']);
    }
  }

}



