import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';
import { MedicamentoDto, RequestAddMedicamentoDto } from '../../../../../interfaces/medicamentos/medicament.interface';
import { MedicamentoService } from '../../../../../interfaces/medicamentos/medicamente.service';

@Component({
  selector: 'app-medicamento-form',
    templateUrl: './medicamento-form.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MedicamentoFormComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    isEdit: boolean = false;
    title: string = '';
    medicamentoId: number = 0;
    medicamentoSelect: MedicamentoDto = null;
    paginaActual = EnumMenuNavService.estudio;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activate: ActivatedRoute,
        private _medicamentoService: MedicamentoService
    ){
        this.medicamentoId = this._activate.snapshot.params.id;
    }

    ngOnInit(): void {
        if(this.medicamentoId > 0){

        }else{
            this.initForm(null);
            this.medicamentoSelect = {} as MedicamentoDto;
        }
    }

    initForm(medicamentoDto: MedicamentoDto): void {

        if(medicamentoDto){
            this.title = 'Editar medicamento';
            this.isEdit = true;
            this.form_ =  this._formBuilder.group({
                nombre: [medicamentoDto.nombre_quimico, Validators.required],
                farmaco: [medicamentoDto.farmaco, Validators.required],
                descripcion: [medicamentoDto.descripcion, Validators.required],
                presentacion: [medicamentoDto.presentacion, Validators.required],
                costo: [medicamentoDto.costo, Validators.required],
                existencia: [medicamentoDto.existencia]
            });
        }else{
            this.title = 'Nuevo medicamento';
            this.isEdit = false;
            this.form_ =  this._formBuilder.group({
                nombre: ['', Validators.required],
                farmaco: ['', Validators.required],
                descripcion: ['', Validators.required],
                presentacion: ['', Validators.required],
                costo: ['', Validators.required],
                existencia: [true, Validators.required]
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
        }else{
            // Disable the form
            this.form_.disable();

            const addMedicamento = {} as RequestAddMedicamentoDto;
            addMedicamento.data = {} as MedicamentoDto;
            addMedicamento.data.farmaco = this.form_.controls['farmaco'].value;
            addMedicamento.data.nombre_quimico = this.form_.controls['nombre'].value;
            addMedicamento.data.descripcion = this.form_.controls['descripcion'].value;
            addMedicamento.data.presentacion = this.form_.controls['presentacion'].value;
            addMedicamento.data.costo = this.form_.controls['costo'].value;
            addMedicamento.data.existencia = this.form_.controls['existencia'].value;

            this._medicamentoService.create(addMedicamento).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El medicamento fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this._router.navigate(['/pages/medicamentos/lista']);
                }, 1500);
            });
        }
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if(charCode === 46){
            return true;
        } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

}
