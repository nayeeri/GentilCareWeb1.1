import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
    selector     : 'servicios',
    templateUrl  : './servicios.component.html',
    styleUrls: ['./servicios.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServiciosComponent
{

    @ViewChild('servicioForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    servicioForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router)
    {
    }

    /**
 * On init
 */
    ngOnInit(): void {
        // Create the form
        this.servicioForm = this._formBuilder.group({
            correo: ['', [Validators.required, Validators.email]],
            consulta: ['', Validators.required],
            nombre: ['', Validators.required],
          
            apellidoPaterno: ['', Validators.required],
            apellidoMaterno: ['', Validators.required],
            numeroCelular: ['', Validators.required],
            sexo: ['', Validators.required],
            motivo: ['', Validators.required],
            fechaConsulta: ['', Validators.required],
        }
        );
    }

    validate(): void {
        // Do nothing if the form is invalid
        if (this.servicioForm.invalid) {
            return;
        }

        // Disable the form
        this.servicioForm.disable();

        

        // Sign up
        this.alert = {
            type: 'success',
            message: 'Su servicio fue agendado.'
        };
        // Hide the alert
        this.showAlert = true;

        setTimeout(() => {                           
            this.servicioForm.enable();
            this.showAlert = false;
        }, 1000);

    }

    numberOnly(event, maxLength): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (event.target.value.length == maxLength) return false;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    setFechaCita(event: MatDatepickerInputEvent<Date>)
    {
        if(event.value){
            this.servicioForm.controls.fechaConsulta.setValue(event.value);
        }
    }



}
