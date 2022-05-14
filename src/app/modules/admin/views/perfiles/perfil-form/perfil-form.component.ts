import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';


@Component({
    selector: 'perfil-form',
    templateUrl: './perfil-form.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PerfilFormComponent implements OnInit {

    @ViewChild('perfilNgForm') perfilNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    perfilForm: FormGroup;
    showAlert: boolean = false;
    perfil_id: number = 0;
    title: string = '';
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
        private router: Router, private actRoute: ActivatedRoute) {
        this.perfil_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit() {



        this.perfilForm = this._formBuilder.group({
            correo: ['', [Validators.required]],
            nombre: ['', Validators.required],
            apellidoPaterno: ['', Validators.required],
            telefono: ['', Validators.required],
        });
        this.title = "Editar Perfil";
        //Es Edicion
        if (this.perfil_id > 0) {
            this.title = "Editar Perfil";

            //Buscar datos por id de registro y despues setear valores
            this.perfilForm.controls.correo.setValue("test@correo.com");
            this.perfilForm.controls.nombre.setValue("Nombre");
            this.perfilForm.controls.apellidoPaterno.setValue("Apellido");
            this.perfilForm.controls.telefono.setValue("00-00-00-00");
        }


    }

    /**
    * GUardar info
    */
    guardar(): void {
        // Return if the form is invalid
        if (this.perfilForm.invalid) {
            return;
        }

        // Disable the form
        this.perfilForm.disable();


        // Sign up
        this.alert = {
            type: 'success',
            message: 'El perfil fue guardado con exito.'
        };
        // Hide the alert
        this.showAlert = true;

        setTimeout(() => {
            this.perfilForm.enable();
            this.showAlert = false;
            this.router.navigate(['/pages/perfiles/lista']);
        }, 3000);

    }

    regresar(): void {
        this.perfilForm.reset();
        this.router.navigate(['/pages/perfiles/lista']);
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
