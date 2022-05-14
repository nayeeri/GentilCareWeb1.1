import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';

@Component({
  selector: 'app-usuario-servicio-form',
  templateUrl: './usuario-servicio-form.component.html',
  styleUrls: ['./usuario-servicio-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UsuarioServicioFormComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    title: string = '';
    estudioId: number = 0;
    paginaActual = EnumMenuNavService.estudio;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute
    ){
        this.estudioId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {

        this.form_ =  this._formBuilder.group({
            motivo: ['', [Validators.required]],
            apellidoPaterno: ['', Validators.required],
            apellidoMaterno: ['', Validators.required],
            parentezco: ['', Validators.required],
            fechaNacimiento: ['', Validators.required],
            sexo: ['', Validators.required],
        });
        this.title = '';
        if (this.estudioId > 0) {
            this.title = '';
            this.form_.controls.motivo.setValue('');
        };
    }

    /*** GUardar info    */
    save(): void {
        // Return if the form is invalid
        if (this.form_.invalid) {
            return;
        }
    }

}
