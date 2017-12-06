import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import{FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Student, Project, Sede, Programa, Campo, Protocolo, Profesor, Empresa } from '../modelos';
import {StudentService} from '../student.service';
import { PasswordValidator} from '../password-validator';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-project-register',
  templateUrl: './project-register.component.html',
  styleUrls: ['./project-register.component.css']
})
export class ProjectRegisterComponent implements OnInit, DoCheck{

  constructor(private studentService:StudentService, private fb:FormBuilder, public ngProgress: NgProgress, private router:Router) 
  {
    this.project=new Project();
    this.newProyecto=new Project();
    this.project.estudiantes=[];
    this.project.empresa=[];
    this.createForm();
    this.setEstudiantes(this.project.estudiantes);
    this.setEmpresa(this.project.empresa);
  }

  ngDoCheck()
  {
    if(this.formProyecto.controls['programa'].value['codigo']==1 && this.estudiantes.controls.length>2)
    {
      this.deleteStudent();
    }
  }
  
  newProyecto:Project;
  sedes:Sede[];
  formProyecto:FormGroup;
  nameChangeLog: string[] = [];
  programas:Programa[];
  campos:Campo[];
  protocolos:Protocolo[];
  profesores:Profesor[];
  tutorError:string;
  fechaError:string;
  @Input() project:Project;
  

    ngOnInit()
    {
      this.addStudent();
      this.getData();
    }
    
    public get empresa():FormArray
    {
      return this.formProyecto.get('empresa') as FormArray;
    }

    public get estudiantes(): FormArray {
      return this.formProyecto.get('estudiantes') as FormArray;
    };
    

    stringGen(len)
    {
        var text = '';
    
        var charset = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        for( var i=0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));
    
        return text;
    }

    submit(proyecto:any)
    {

      this.ngProgress.start();

      this.newProyecto.campo=proyecto.campo;
      this.newProyecto.planteamiento=proyecto.planteamiento;
      this.newProyecto.empresa=proyecto.empresa;
      this.newProyecto.estudiantes=proyecto.estudiantes;
      this.newProyecto.fecha_fin=proyecto.fecha_fin;
      this.newProyecto.fecha_ini=proyecto.fecha_ini;
      this.newProyecto.justificacion=proyecto.justificacion;
      this.newProyecto.protocolo=proyecto.protocolo;
      this.newProyecto.sede=proyecto.sede;
      this.newProyecto.titulo=proyecto.titulo;
      this.newProyecto.tutorA=proyecto.tutorA;
      this.newProyecto.tutorM=proyecto.tutorM;
      this.newProyecto.programa=proyecto.programa;
      this.newProyecto.codigo=proyecto.programa.viewValue + '-' + this.stringGen(5);
      
      this.studentService.registrarProyecto(this.newProyecto)
      .then(res=>
        {
          if(res)
          {
            this.studentService.downloadPdf(this.newProyecto)
            .subscribe(data  => {
               saveAs(data, this.newProyecto.codigo+'.pdf')
              },
               error => console.log(error._body));
            //this.router.navigate(['/login']);
          }
          
          this.ngProgress.done();
        });
    }

    getData()
    { 
      this.studentService.getInfo()
      .then(info=>
        {
          this.sedes=info['Sedes'];
          this.programas=info['Programas'];
          this.profesores=info['Profesores'];
          this.protocolos=info['Protocolos'];
          this.campos=info['Lineas'];
        }
      );
    }

    createForm() {
      this.formProyecto = this.fb.group({
        'programa':['', Validators.required],
        'sede':['', Validators.required],
        'titulo':['', Validators.required],
        'campo':['', Validators.required],
        'planteamiento':['', Validators.required],
        'justificacion':['', Validators.required],
        'estudiantes':this.fb.array([]),
        'fecha_ini': [null, Validators.required],
        'fecha_fin':[null, Validators.required],
        'empresa':this.fb.array([]),
        'protocolo':['', Validators.required],
        'tutorA':[null, Validators.required],
        'tutorM':[null, Validators.required]
      },
    {
      validator: PasswordValidator.date
    });
    }

    setEstudiantes(estudiantes: Student[]) {
      const addressFGs = estudiantes.map(address => this.fb.group(address));
      const addressFormArray = this.fb.array(addressFGs);
      this.formProyecto.setControl('estudiantes', addressFormArray);
    }

    setEmpresa(empresa: Empresa[]) {
      const addressFGs = empresa.map(address => this.fb.group(address));
      const addressFormArray = this.fb.array(addressFGs);
      this.formProyecto.setControl('empresa', addressFormArray);
    }

    addStudent()
    {
      this.estudiantes.push(this.createStudent());
    }

    addEmpresa()
    {
      this.empresa.push(this.createEmpresa());
    }
    deleteStudent()
    {
      this.estudiantes.removeAt(this.estudiantes.length-1);
    }

    deleteEmpresa()
    {
      this.empresa.removeAt(this.empresa.length-1);
    }

    createEmpresa(): FormGroup
    {
      return this.fb.group({
        nombre: ['', Validators.required],
        nombreTutor: ['', Validators.required],
        apellidoTutor: ['', Validators.required],
        emailTutor: ['', Validators.compose([Validators.required, Validators.email])],
        telefonoTutor:['', Validators.required],
        direccion: ['', Validators.required],
        email:['',  Validators.compose([Validators.required, Validators.email])],
        telefono:['', Validators.required]
      });
    }
    
    createStudent() :  FormGroup {
      return this.fb.group({
              nombre: ['', Validators.required],
              apellido: ['', Validators.required],
              cedula: [null, Validators.required],
              email:['',  Validators.compose([Validators.required, Validators.email])],
              telefono:['', Validators.required]
  
      });
  }

  tutorVal()
  {
    if(this.formProyecto.controls['tutorA'].touched && this.formProyecto.controls['tutorM'].touched && (this.formProyecto.controls['tutorA'].value===null || this.formProyecto.controls['tutorM'].value===null))
    {
      this.tutorError='Debes indicar un tutor académico y metodológico.';
      return true;
    }
    else if(this.formProyecto.controls['tutorA'].touched && this.formProyecto.controls['tutorM'].touched && this.formProyecto.controls['tutorA'].value===this.formProyecto.controls['tutorM'].value)
    {

      this.tutorError='El tutor académico y el tutor metodológico no pueden ser la misma persona.';
      return true;
    }
    else
    {
      return false;
    }
  }

  fechaVal()
  {
    if(this.formProyecto.controls['fecha_fin'].touched && this.formProyecto.controls['fecha_ini'].touched && (this.formProyecto.controls['fecha_ini'].value===null || this.formProyecto.controls['fecha_fin'].value===null))
    {
      console.log('vacios');
      this.fechaError='Debes indicar la fecha de inicio y la fecha de finalización del proyecto';
      return true;
    }

    else if(this.formProyecto.controls['fecha_fin'].touched && this.formProyecto.controls['fecha_ini'].touched && new Date(this.formProyecto.controls['fecha_fin'].value) <= new Date(this.formProyecto.controls['fecha_ini'].value))
    {
      this.fechaError='La fecha de inicio no puede ser mayor o igual a la fecha de finalización.';
      return true;
    }
    else
    {
      return false;
    }
  }


}
