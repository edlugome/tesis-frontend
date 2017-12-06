export class Student
{
    nombre:string;
    cedula:string;
    apellido:string;
    email:string;
    telefono:string;
}

export class Project
{
    titulo:string;
    sede:number;
    estudiantes:Student[];
    campo:number;
    programa:Programa;
    planteamiento:string;
    justificacion:string;
    fecha_ini:Date;
    fecha_fin:Date;
    protocolo:number;
    empresa:Empresa[];
    tutorA:number;
    tutorM:number;
    codigo:string;
}

export class Campo
{
    codigo:number;
    nombre:string;
}

export class Sede
{
    nombre:string;
    codigo:number;
    viewValue:string;
}


export class Programa
{
    nombre:string;
    codigo:number;
    viewValue:string;
}

export class Protocolo
{
    nombre:string;
    codigo:number;
}

export class Profesor
{
    id:number;
    nombre:string;
    apellido:string;
    cedula:number;
    email:string;
    telefono:string;
    linea:number;
    profesion:number;
}

export class Info
{
    sedes:Sede[];
    protocolo:Protocolo[];
    lineas:Campo[];
    programa:Programa[];
    profesores:Profesor[];
}

export class Empresa
{
    nombre:string;
    email:string;
    telefono:string;
    direccion:string;
    nombreTutor:string;
    apellidoTutor:string;
    correoTutor:string;
    telefonoTutor:string;
    
}
