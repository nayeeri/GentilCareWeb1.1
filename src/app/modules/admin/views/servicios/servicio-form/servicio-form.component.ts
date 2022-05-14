import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';
import { ServicioDTO, RequestAddServicios } from '../../../../../interfaces/servicios/servicio.interface';
import { ServiciosService } from '../../../../../interfaces/servicios/servicios.service';
import { RolesDto } from '../../../../../interfaces/roles/role.interface';

@Component({
    selector: 'app-servicio-form',
    templateUrl: './servicio-form.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ServicioFormComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    title: string = '';
    servicioSelect: ServicioDTO = null;
    isEdit: boolean = false;
    servicioId: number = 0;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _servicioService: ServiciosService
    ){
        this.servicioId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        if(this.servicioId > 0){
            this._servicioService.get(this.servicioId).subscribe((result: any) => {
                this.servicioSelect = result.servicio;
                this.initForm(result.servicio);
            });
        }else{
            this.servicioSelect = {} as ServicioDTO;
            this.initForm(null);
        }
    }

    initForm(servicio: ServicioDTO): void {
        if (servicio) {
            this.title = 'Editar Servicio';
            this.isEdit = true;
            this.form_ =  this._formBuilder.group({
                nombre: [servicio.nombre, Validators.required],
                descripcion: [servicio.descripcion, Validators.required],
                costo: [servicio.costo, Validators.required],
            });
        }else{
            this.title = 'Nuevo Servicio';
            this.isEdit = false;
            this.form_ =  this._formBuilder.group({
                nombre: ['', Validators.required],
                descripcion: ['', Validators.required],
                costo: ['', Validators.required],
            });
        }
    }

    /*** GUardar info */
    save(): void {

        if(this.isEdit){
            this.form_.disable();
            const updateServicio = {} as ServicioDTO;
            updateServicio.nombre = this.form_.controls['nombre'].value;
            updateServicio.costo = this.form_.controls['costo'].value;
            updateServicio.descripcion = this.form_.controls['descripcion'].value;

            this._servicioService.update(updateServicio, this.servicioId).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El servicio fue actualizado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/servicios/lista']);
                }, 1500);
            });
        }else{
            // Disable the form
            this.form_.disable();

            const addServicio = {} as RequestAddServicios;
            addServicio.data = {} as ServicioDTO;
            addServicio.data.nombre = this.form_.controls['nombre'].value;
            addServicio.data.costo = this.form_.controls['costo'].value;
            addServicio.data.descripcion = this.form_.controls['descripcion'].value;

            this._servicioService.create(addServicio).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El servicio fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/servicios/lista']);
                }, 1500);
            });
        }
    }

}
