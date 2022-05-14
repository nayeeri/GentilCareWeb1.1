import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';



@Component({
    selector: 'direccion-form',
    templateUrl: './direccion-form.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AddressFormComponent implements OnInit {

    @ViewChild('addressNgForm') addressNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    addressForm: FormGroup;
    showAlert: boolean = false;
    direccion_id: number = 0;
    title: string = '';
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
        private router: Router, private actRoute: ActivatedRoute) {
        this.direccion_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit() {



        this.addressForm = this._formBuilder.group({
            calle: ['', [Validators.required]],
            noExterior: ['', Validators.required],
            colonia: ['', Validators.required],
            municipio: ['', Validators.required],
            ciudad: ['', Validators.required],
            estado: ['', Validators.required],
            codigoPostal: ['', Validators.required],
        });
        this.title = "Nueva Dirección";
        //Es Edicion
        if (this.direccion_id > 0) {
            this.title = "Editar Dirección";

            //Buscar datos por id de registro y despues setear valores
            this.addressForm.controls.calle.setValue("Calle");
            this.addressForm.controls.noExterior.setValue("00");
            this.addressForm.controls.colonia.setValue("Colonia");
            this.addressForm.controls.municipio.setValue("Municipio");
            this.addressForm.controls.ciudad.setValue("Ciudad");
            this.addressForm.controls.estado.setValue("Estado");
            this.addressForm.controls.codigoPostal.setValue("00000");
        }


    }

    /**
    * GUardar info
    */
    guardar(): void {
        // Return if the form is invalid
        if (this.addressForm.invalid) {
            return;
        }

        // Disable the form
        this.addressForm.disable();


        // Sign up
        this.alert = {
            type: 'success',
            message: 'La Dirección fue guardada con exito.'
        };
        // Hide the alert
        this.showAlert = true;

        setTimeout(() => {
            this.addressForm.enable();
            this.showAlert = false;
            this.router.navigate(['/pages/direcciones/lista']);
        }, 3000);

    }

    regresar(): void {
        this.addressForm.reset();
        this.router.navigate(['/pages/direcciones/lista']);
    }

    numberOnly(event, maxLength): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (event.target.value.length == maxLength) return false;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }


}
