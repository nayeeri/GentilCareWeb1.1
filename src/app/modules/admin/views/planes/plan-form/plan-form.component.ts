import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { PlanService } from '../../../../../interfaces/planes/plan.service';
import { PlanDto, RequestAddPlanesDto } from '../../../../../interfaces/planes/plan.interface';
import { ServiciosService } from 'app/interfaces/servicios/servicios.service';
import { firstValueFrom } from 'rxjs';
import { ServicioDTO } from '../../../../../interfaces/servicios/servicio.interface';


@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PlanFormComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    plan: PlanDto = null;
    showAlert: boolean = false;
    isEdit: boolean = false;
    title: string = '';
    selectService: ServicioDTO[] = [];
    servicios: ServicioDTO[] = null;
    servicioId: number = 0;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _planService: PlanService,
        private _servicioService: ServiciosService
    ){
        this.servicioId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.initCatalog();
        if (this.servicioId > 0) {
            this._planService.get(this.servicioId).subscribe((result: PlanDto) => {
                this.plan = result;
                this.initForm(result);
                result.servicios.map((item) =>{
                    this.selectService.push(item);
                });
            });
        }
        else{
            this.initForm(null);
        }
    }

    initForm(plan: PlanDto): void{
       if(plan){
            this.title = 'Editar Plan';
            this.isEdit = true;
            this.form_ =  this._formBuilder.group({
                nombre: [plan.nombre, Validators.required],
                descripcion: [plan.descripcion, Validators.required],
                costo: [plan.costo, Validators.required]
            });
        }else{
            this.title = 'Nuevo Plan';
            this.isEdit = false;
            this.plan =  {} as PlanDto;
            this.form_ =  this._formBuilder.group({
                nombre: ['', Validators.required],
                descripcion: ['', Validators.required],
                costo: ['', Validators.required]
            });
        }
    }

    initCatalog(): void{
        Promise.all([
            firstValueFrom(this._servicioService.gets())
        ]).then((result: any) => {
            this.servicios = result[0].lista;
            console.log(result[0]);
        });
    }

    setCheck(event, data: ServicioDTO): void{
        if(event){
            this.selectService.push(data);
        }else{
            this.selectService = this.selectService.filter( e => e.serviciosId !== data.serviciosId);
        }
    }

    /**  * GUardar info n*/
    save(): void {
        // Return if the form is invalid
        if (this.form_.invalid) {
            return;
        }

        if(this.isEdit){

        }else{
            const newPlan = {} as RequestAddPlanesDto;
            newPlan.data = {} as PlanDto;
            newPlan.data.costo = parseFloat(this.form_.controls['costo'].value);
            newPlan.data.nombre = this.form_.controls['nombre'].value;
            newPlan.data.descripcion = this.form_.controls['descripcion'].value;
            newPlan.data.servicios = this.selectService;

            this._planService.create(newPlan).subscribe((result) => {
                this.alert = {
                    type: 'success',
                    message: 'El plan fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/planes/lista']);
                }, 1500);
            });
        }
    }

    getChecked(servicioDto: ServicioDTO): boolean{
        if(servicioDto){
            const result = this.selectService.find(e => e.serviciosId === servicioDto.serviciosId);
            if(result){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
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
