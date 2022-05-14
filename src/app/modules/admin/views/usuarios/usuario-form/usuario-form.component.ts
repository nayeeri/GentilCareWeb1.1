import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { RoleService } from 'app/interfaces/roles/role.service';
import { EnumMenuNavService } from 'model/menu';
import { UsuarioService } from '../../../../../interfaces/usuarios/usuario.service';
import { UsersDto, RequestUser, ColaUserDto } from '../../../../../interfaces/usuarios/usuarios.interface';
import { RolesDto } from '../../../../../interfaces/roles/role.interface';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserFormComponent implements OnInit {

    @ViewChild('ngForm') signUpNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    ngForm: FormGroup;
    showAlert: boolean = false;
    isEdit: boolean = false;
    userSelect: UsersDto = null;
    title: string = '';
    paginaActual = EnumMenuNavService.estudio;
    usuarioId: number = 0;
    roles: RolesDto[];
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _roleService: RoleService
    ){
        this.usuarioId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.initCatalog();
        if(this.usuarioId > 0){
            this._usuarioService.get(this.usuarioId).subscribe((result)=>{
                this.initForm(result);
                this.userSelect = result;
            });
        }else{
            this.initForm(null);
            this.userSelect = {} as UsersDto;
        }
    }

    initCatalog(): void{
        Promise.all([
            firstValueFrom(this._roleService.gets())
        ]).then((response: any) =>{
            console.log(response[0]);
            this.roles = response[0];
        });
    }

    initForm(user: UsersDto): void{
        //Es Edicion
        if (user) {
            this.title = 'Editar Usuario';
            this.isEdit = true;
            this.ngForm = this._formBuilder.group({
                correo: [user.email, [Validators.required, Validators.email]],
                nombre: [user.nombre],
                apellidoPaterno: [user.a_P],
                apellidoMaterno: [user.a_M],
                fechaNacimiento: [user.fecha_nac],
                sexo: [user.sexo],
                numeroCelular: [user.cellphone, Validators.required],
                rol: [user.auth.roles.rolesId],
                password: ['']
            });
        }else{
            this.title = 'Nuevo Usuario';
            this.isEdit = false;
            this.ngForm = this._formBuilder.group({
                correo: ['', [Validators.required, Validators.email]],
                nombre: ['', Validators.required],
                apellidoPaterno: ['', Validators.required],
                apellidoMaterno: ['', Validators.required],
                fechaNacimiento: ['', Validators.required],
                sexo: ['', Validators.required],
                numeroCelular: ['', Validators.required],
                rol: ['', Validators.required],
            });
        }
    }

    save(): void {

        // Return if the form is invalid
        if (this.ngForm.invalid) {
            return;
        }

        if(this.isEdit){
            this.ngForm.disable();

            const updateUser = {} as UsersDto;
            updateUser.email = this.ngForm.controls['correo'].value;
            updateUser.cellphone = this.ngForm.controls['numeroCelular'].value;
            updateUser.password = this.ngForm.controls['password'].value;

            this._usuarioService.update(updateUser, this.usuarioId).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El usuario fue actualizado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.ngForm.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/usuarios/lista']);
                }, 1500);
            });
        }else{
            // Disable the form
            this.ngForm.disable();

            const newUser = {} as RequestUser;
            newUser.cola = {} as ColaUserDto;
            newUser.cola.calle = '';
            newUser.cola.ciudad = '';
            newUser.cola.colonia = '';
            newUser.cola.cp = '';
            newUser.cola.estado = '';
            newUser.cola.exterior = '';
            newUser.cola.municipio = '';
            newUser.data = {} as UsersDto;
            newUser.data.nombre = this.ngForm.controls['nombre'].value;
            newUser.data.a_P = this.ngForm.controls['apellidoPaterno'].value;
            newUser.data.a_M = this.ngForm.controls['apellidoMaterno'].value;
            newUser.data.email = this.ngForm.controls['correo'].value;
            newUser.data.fecha_nac = this.ngForm.controls['fechaNacimiento'].value;
            newUser.data.sexo = this.ngForm.controls['sexo'].value;
            newUser.data.tel_part = this.ngForm.controls['numeroCelular'].value;


            this._usuarioService.addData(newUser).subscribe((response) => {
                // Sign up
                this.alert = {
                    type: 'success',
                    message: 'El usuario fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.ngForm.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/usuarios/lista']);
                }, 1500);
            });
        }
    }

}
