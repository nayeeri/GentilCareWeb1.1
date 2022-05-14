import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';
import { RolesDto, RequestRoles } from '../../../../../interfaces/roles/role.interface';
import { RoleService } from '../../../../../interfaces/roles/role.service';

@Component({
    selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RolFormComponent implements OnInit {

    @ViewChild('ngForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    ngForm: FormGroup;
    showAlert: boolean = false;
    isEdit: boolean = false;
    title: string = '';
    paginaActual = EnumMenuNavService.estudio;
    usuarioId: number = 0;
    rolSelect: RolesDto = null;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _rolService: RoleService
    ){
        this.usuarioId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        if(this.usuarioId > 0){
            this.isEdit = true;
            this._rolService.get(this.usuarioId).subscribe((result) => {
                this.initForm(result);
                this.rolSelect = result;
            });
        }else{
            this.isEdit = false;
            this.initForm(null);
            this.rolSelect = {} as RolesDto;
        }
    }

    initForm(rol: RolesDto): void {

        //Es Edicion
        if (rol) {
            this.title = 'Editar Rol';

            //Buscar datos por id de registro y despues setear valores
            this.ngForm = this._formBuilder.group({
                nombre: [rol.role, Validators.required],
            });
        }else{
            this.ngForm = this._formBuilder.group({
                nombre: ['', Validators.required],
            });

            this.title = 'Nuevo Rol';
        }
    }

    save(): void {

        // Return if the form is invalid
        if (this.ngForm.invalid) {
            return;
        }

        if(this.isEdit){

        }else{
            // Disable the form
            this.ngForm.disable();

            const newRole = {} as RequestRoles;
            newRole.data = {} as RolesDto;
            newRole.data.rol = this.ngForm.controls['nombre'].value;

            this._rolService.add(newRole).subscribe((result) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El rol fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.ngForm.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/roles/lista']);
                }, 1500);
            });
        }
    }

    }
