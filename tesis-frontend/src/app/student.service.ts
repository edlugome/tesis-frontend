import { Injectable } from '@angular/core';
import {Http, Headers, ResponseContentType} from '@angular/http'; 
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {User} from './user';
import { saveAs } from 'file-saver/FileSaver';
import { Sede, Campo, Protocolo, Student, Programa, Profesor, Info, Project} from './modelos';

@Injectable()
export class StudentService {

  constructor(private http:Http) { }
  baseUrl:string='http://localhost/tesis-api/public/';
  profeUrl:string='http://localhost/tesis-api/public/profesores';
  loginUrl:string='http://localhost/tesis-api/public/login';
  url:string='http://localhost/tesis-api/public/students/add';
  sedesUrl:string='http://localhost/tesis-api/public/sedes';
  progUrl:string='http://localhost/tesis-api/public/programas';
  camposUrl:string='http://localhost/tesis-api/public/campos';
  protoUrl:string='http://localhost/tesis-api/public/protocolos';
  infoUrl:string='http://localhost/tesis-api/public/info';
  registrarProyectoUrl:string='http://localhost/tesis-api/public/registrarProyecto';
  pdfUrl:string='http://localhost/tesis-api/public/pdf';
  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});

  register(student:Student)
  {
    this.http.post(this.url, JSON.stringify(student), {headers:this.headers})
    .toPromise()
    .then(res =>  res.json().data as Student)
    .catch(this.handleError);
  }

  login(user:User)
  {
    if(user==null)
    {
      return;
    }

    return this.http.post(this.loginUrl, JSON.stringify(user), {headers:this.headers})
    .toPromise()
    .then(response=>response.json() as User)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error._body); 
    return Promise.reject(error.message || error);
  }

  HandleResponse(res:any)
  {
    if(res.status===210)
    {
      alert('usuario o contraseña incorrectos');
    }
  }

  logout()
  {
    localStorage.removeItem('user');
  }

  getSedes()
  {
    return this.http.get(this.sedesUrl)
    .toPromise()
    .then(response=>response.json() as Sede[])
    .catch(this.handleError);
  }

  getProgramas()
  {
    return this.http.get(this.progUrl)
    .toPromise()
    .then(response=>response.json() as Programa[])
    .catch(this.handleError);
  }

  getCampos()
  {
    return this.http.get(this.camposUrl)
    .toPromise()
    .then(response=>response.json() as Campo[])
    .catch(this.handleError);
  }

  getProtocolos()
  {
    return this.http.get(this.protoUrl)
    .toPromise()
    .then(response=>response.json() as Protocolo[])
    .catch(this.handleError);
  }

  getProfes()
  {
    return this.http.get(this.profeUrl)
    .toPromise()
    .then(response=>response.json() as Profesor[])
    .catch(this.handleError);
  }

  getInfo()
  {
    return this.http.get(this.infoUrl)
    .toPromise()
    .then(response=>response.json() as Info)
    .catch(this.handleError);
  }

  registrarProyecto(proyecto:Project): Promise<Project>
  {
    return this.http.post(this.registrarProyectoUrl, JSON.stringify(proyecto), {headers:this.headers})
    .toPromise()
    .then(response=>this.HandleRes(response))
    .catch(this.handleError);
  }

  HandleRes(res:any)
  {
    switch(res.status)
    {
      case 201:
        alert(res.json()['success']);
        return true;
      default:
        alert(res.json()['error']);
        return false;
    }
  }

  /*downloadPDF(data:any)
  {
    const headers = new Headers();
    headers.append('Accept', 'application/pdf');
    this.http.post(this.pdfUrl, data, {headers:headers})
    .toPromise()
    .then(response=>this.download(response));
  }

  download(response)
  {
    const blob = new Blob([], { type: 'application/pdf' });
    saveAs(blob, 'PlanillaInscripcion.pdf');
  }*/

  downloadPdf(data:any) 
  {
    return this.http.post(this.pdfUrl, data, { responseType: ResponseContentType.Blob })
    .map(res => res.blob());
  }

}
