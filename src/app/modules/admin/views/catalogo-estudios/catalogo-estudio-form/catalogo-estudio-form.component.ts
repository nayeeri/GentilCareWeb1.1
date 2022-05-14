import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';

@Component({
  selector: 'app-estudio-form',
    templateUrl: './catalogo-estudio-form.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CatalogoEstudioFormComponent implements OnInit {


    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    title: string = '';
    estudio_id: number = 0;
    paginaActual = EnumMenuNavService.estudio;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute
    ){
        this.estudio_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit() {
       
        

        this.form_ =  this._formBuilder.group({
            carpeta: ['', [Validators.required]],
            subCarpeta: ['', Validators.required],
        });
        this.title = "Nuevo Estudio";
        if (this.estudio_id > 0) {
            this.title = 'Editar Estudio';
            this.form_.controls.carpeta.setValue("");
            this.form_.controls.subCarpeta.setValue("nombre");
        } 

    }

    /**
    * GUardar info
    */
    save(): void {
        // Return if the form is invalid
        if (this.form_.invalid) {
            return;
        }

        // Disable the form
        this.form_.disable();

        // Sign up
        this.alert = {
            type: 'success',
            message: 'La carpeta fue guardada con exito.'
        };
        // Hide the alert
        this.showAlert = true;

        setTimeout(() => {
            this.form_.enable();
            this.showAlert = false;
        }, 3000);
    }


}
