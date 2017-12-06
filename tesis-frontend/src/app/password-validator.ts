import {AbstractControl} from '@angular/forms';
export class PasswordValidator
{
    fecha_ini:Date;

    asd()
    {
    
    }

    static MatchPassword(AC: AbstractControl) 
    {
       let password = AC.get('password').value; 
       let confirmPassword = AC.get('confirmPassword').value; 
        if(password != confirmPassword) 
        {
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } 
        else 
        {
            
            return null
        }
    }

    static date(AC: AbstractControl)
    {

        let fecha_ini=new Date(AC.get('fecha_ini').value);
        let fecha_fin=new Date(AC.get('fecha_fin').value);

        let tutorA=AC.get('tutorA').value;
        let tutorM=AC.get('tutorM').value;

        if(fecha_ini>=fecha_fin)
        {
            AC.get('fecha_fin').setErrors({date:true});
        }
        else
        {
            AC.get('fecha_fin').setErrors(null);
        }

        
        if(tutorA===tutorM)
        {
            AC.get('tutorA').setErrors({date:true});
            AC.get('tutorM').setErrors({date:true});
        }
        else
        {
            AC.get('tutorA').setErrors(null);
            AC.get('tutorM').setErrors(null);
        }
    }


    /*static required(AC: AbstractControl) 
    {

        let nombre=AC.get('contextualizacion').value;
        let apellido=AC.get('justificacion').value;
        let nombreT = AC.get('contextualizacion').touched;
        let apellidoT = AC.get('justificacion').touched; 

       
        if(nombre===null && apellido === null && nombreT && apellidoT) 
        {
            console.log(':D');
            AC.get('justificacion').setErrors( {required: true} )
        }
        else
        {
            return null; 
        }
        
    }*/
}