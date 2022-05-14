import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';
import { EstudiosDto, EstudiosService } from '../../../../../interfaces/estudios';
import { RequestEstudiosDto } from '../../../../../interfaces/estudios/estudio.interface';

@Component({
  selector: 'app-estudio-form',
  templateUrl: './estudio-form.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EstudioFormComponent implements OnInit {


    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    isEdit: boolean = false;
    title: string = '';
    estudioId: number = 0;
    estudioSelect: EstudiosDto = null;
    paginaActual = EnumMenuNavService.estudio;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _estudioService: EstudiosService
    ){
        this.estudioId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        if (this.estudioId > 0) {
            this._estudioService.get(this.estudioId).subscribe((response: any) =>{
                this.estudioSelect = response.estudio;
                this.initForm(response.estudio);
            });
        }else{
            this.estudioSelect = {} as EstudiosDto;
            this.initForm(null);
        }
    }

    initForm(estudioDto: EstudiosDto): void {
        if (estudioDto) {
            this.title = 'Editar Estudio';
            this.isEdit = true;
            this.form_ =  this._formBuilder.group({
                identificador: [estudioDto.identificador, [Validators.required]],
                estudio: [estudioDto.estudio, Validators.required],
                descripcion: [estudioDto.descripcion, Validators.required]
            });
            this.form_.controls.identificador.disable();
        }else{
            this.title = 'Nuevo Estudio';
            this.isEdit = false;
            this.form_ =  this._formBuilder.group({
                identificador: ['', [Validators.required]],
                estudio: ['', Validators.required],
                descripcion: ['', Validators.required]
            });
        }
    }

    /*** GUardar info */
    save(): void {
        // Return if the form is invalid
        if (this.form_.invalid) {
            return;
        }

        if(this.isEdit){
            this.form_.disable();
            const updateServicio = {} as EstudiosDto;
            updateServicio.estudio = this.form_.controls['estudio'].value;
            updateServicio.identificador = this.form_.controls['identificador'].value;
            updateServicio.descripcion = this.form_.controls['descripcion'].value;

            this._estudioService.update(updateServicio, this.estudioId).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El estudio fue actualizado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/estudios/lista']);
                }, 1500);
            });
        }else{
            // Disable the form
            this.form_.disable();

            const addEstudio = {} as RequestEstudiosDto;
            addEstudio.data = {} as EstudiosDto;
            addEstudio.data.estudio = this.form_.controls['estudio'].value;
            addEstudio.data.identificador = this.form_.controls['identificador'].value;
            addEstudio.data.descripcion = this.form_.controls['descripcion'].value;

            this._estudioService.create(addEstudio).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El estudio fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/estudios/lista']);
                }, 1500);
            });
        }
    }


}
