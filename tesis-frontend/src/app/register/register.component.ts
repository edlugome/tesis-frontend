import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {Student} from '../modelos';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordValidator} from '../password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private studentService:StudentService, private fb:FormBuilder) { }

  newStudent:Student;
  formulario:FormGroup;

  ngOnInit() 
  {
    this.newStudent=new Student();
    this.formulario= this.fb.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'cedula':[null, Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(9)])],
      'email':[null, Validators.compose([Validators.required,Validators.email])],
      'password':[null, Validators.compose([Validators.required,Validators.minLength(8)])],
      'confirmPassword':[null, Validators.compose([Validators.required,Validators.minLength(8)])],
      'telefono':[null, Validators.required]
    },
  {
   validator:PasswordValidator.MatchPassword 
  });

    
  }

  register(student)
  {
    this.newStudent.nombre=student.nombre;
    this.newStudent.apellido=student.apellido;
    this.newStudent.cedula=student.cedula;
    this.newStudent.email=student.email;
    this.newStudent.telefono=student.telefono;
    //console.log(this.newStudent);
    this.studentService.register(this.newStudent);
  }



}
