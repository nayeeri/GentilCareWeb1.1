import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';
import { EspecialidadsDto, RequestEspecialidadsDto } from '../../../../../interfaces/especialidades/especialidad.interface';
import { EspecialidadService } from '../../../../../interfaces/especialidades/especialidad.service';

@Component({
    selector: 'app-especialidad-form',
    templateUrl: './especialidad-form.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EspecialidadFormComponent implements OnInit {


    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    isEdit: boolean = false;
    title: string = '';
    especialidadSelect: EspecialidadsDto = null;
    especialidadId: number = 0;
    paginaActual = EnumMenuNavService.especialidad;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _especialidadService: EspecialidadService
    ){
        this.especialidadId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        if(this.especialidadId > 0){
            this._especialidadService.get(this.especialidadId).subscribe((result: any) => {
                this.especialidadSelect = result.especialidad;
                this.initForm(result.especialidad);
            });
        }else{
            this.especialidadSelect = {} as EspecialidadsDto;
            this.initForm(null);
        }
    }

    initForm(especialidadDto: EspecialidadsDto): void {
        //Es Edicion
        if (this.especialidadId > 0) {
            this.title = 'Editar especialidad';
            this.isEdit = true;
            //Buscar datos por id de registro y despues setear valores
            this.form_ =  this._formBuilder.group({
                nombre: [especialidadDto.especialidad, Validators.required],
                costo: [especialidadDto.costo, Validators.required]
            });
        }else{
            this.title = 'Nueva especialidad';
            this.isEdit = false;
            this.form_ =  this._formBuilder.group({
                nombre: ['', Validators.required],
                costo: ['', Validators.required]
            });
        }
    }

    /*** GUardar info*/
    save(): void {
        // Return if the form is invalid
        if (this.form_.invalid) {
            return;
        }

        if(this.isEdit){
            this.form_.disable();
            const updateEspecialidad = {} as EspecialidadsDto;
            updateEspecialidad.especialidad = this.form_.controls['nombre'].value;
            updateEspecialidad.costo = parseFloat(this.form_.controls['costo'].value);

            this._especialidadService.update(updateEspecialidad, this.especialidadId).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'La especialidad fue actualizado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/especialidades/lista']);
                }, 1500);
            });
        }else{
            // Disable the form
            this.form_.disable();

            const addEspecialidad = {} as RequestEspecialidadsDto;
            addEspecialidad.data = {} as EspecialidadsDto;
            addEspecialidad.data.especialidad = this.form_.controls['nombre'].value;
            addEspecialidad.data.costo = parseFloat(this.form_.controls['costo'].value);

            this._especialidadService.create(addEspecialidad).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'La especialidad fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/especialidades/lista']);
                }, 1500);
            });
        }
    }

}
