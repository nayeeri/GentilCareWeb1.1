import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EnumMenuNavService } from 'model/menu';
import { ProveedorService } from '../../../../../interfaces/proveedores/proveedor.service';
import { ProveedorDto, ResponseProveedorOne, RequestAddProveedorDto } from '../../../../../interfaces/proveedores/proveedor.interface';
import { AddressesDto } from '../../../../../interfaces/direcciones/direccion.interface';

@Component({
  selector: 'app-proveedor-form',
    templateUrl: './proveedor-form.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProveedorFormComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    form_: FormGroup;
    showAlert: boolean = false;
    title: string = '';
    paginaActual = EnumMenuNavService.estudio;
    proveedorId: number = 0;
    isEdit: boolean = false;
    proveedor: ProveedorDto = null;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private actRoute: ActivatedRoute,
        private _proveedorService: ProveedorService
    ) {
        this.proveedorId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        if (this.proveedorId > 0) {
            this._proveedorService.get(this.proveedorId).subscribe((result: ResponseProveedorOne) => {
                this.proveedor = result.provedor;
                this.initForm(result.provedor);
            });
        }
        else{
            this.proveedor = {} as ProveedorDto;
            this.initForm(null);
        }
    }

    initForm(proveedorDto: ProveedorDto): void {
        //Es Edicion
        if (proveedorDto) {
            this.title = 'Editar proveedor';
            this.isEdit= true;
            this.form_ =  this._formBuilder.group({
                email: [proveedorDto.email, [Validators.required]],
                nombre: [proveedorDto.provedor, Validators.required],
                calle: [proveedorDto.address.calle, Validators.required],
                noExterior: [proveedorDto.address.exterior, Validators.required],
                colonia: [proveedorDto.address.colonia, Validators.required],
                municipio: [proveedorDto.address.municipio, Validators.required],
                ciudad: [proveedorDto.address.ciudad, Validators.required],
                estado: [proveedorDto.address.estado, Validators.required],
                cp: [proveedorDto.address.cp, Validators.required],
                telefonoContacto: [proveedorDto.cellphone, Validators.required],
                costo: [proveedorDto.costo, Validators.required]
            });

        }else{
            this.form_ =  this._formBuilder.group({
                email: ['', [Validators.required]],
                nombre: ['', Validators.required],
                calle: ['', Validators.required],
                noExterior: ['', Validators.required],
                colonia: ['', Validators.required],
                municipio: ['', Validators.required],
                ciudad: ['', Validators.required],
                estado: ['', Validators.required],
                cp: ['', Validators.required],
                telefonoContacto: ['', Validators.required],
                costo: ['', Validators.required]
            });
            this.isEdit = false;
            this.title = 'Nuevo Proveedor';
        }
    }

    /*** GUardar info */
    save(): void {
        // Return if the form is invalid
        if (this.form_.invalid) {
            return;
        }

        if(this.isEdit){
            const updateProveedor = {} as ProveedorDto;
            updateProveedor.address = {} as AddressesDto;
            updateProveedor.costo = parseFloat(this.form_.controls['costo'].value);
            updateProveedor.email = this.form_.controls['email'].value;
            updateProveedor.provedor = this.form_.controls['nombre'].value;
            updateProveedor.address.calle = this.form_.controls['calle'].value;
            updateProveedor.address.exterior = this.form_.controls['noExterior'].value;
            updateProveedor.address.colonia = this.form_.controls['colonia'].value;
            updateProveedor.address.municipio = this.form_.controls['municipio'].value;
            updateProveedor.address.ciudad = this.form_.controls['ciudad'].value;
            updateProveedor.address.estado = this.form_.controls['estado'].value;
            updateProveedor.address.cp = this.form_.controls['cp'].value;
            updateProveedor.cellphone = this.form_.controls['telefonoContacto'].value;

            this._proveedorService.update(updateProveedor, this.proveedorId).subscribe((result) => {
                this.alert = {
                    type: 'success',
                    message: 'El proveedor fue actualizado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/proveedores/lista']);
                }, 1500);
            });
        }else{
            const newProveedor = {} as RequestAddProveedorDto;
            newProveedor.data = {} as ProveedorDto;
            newProveedor.data.address = {} as AddressesDto;
            newProveedor.data.costo = parseFloat(this.form_.controls['costo'].value);
            newProveedor.data.email = this.form_.controls['email'].value;
            newProveedor.data.provedor = this.form_.controls['nombre'].value;
            newProveedor.data.address.calle = this.form_.controls['calle'].value;
            newProveedor.data.address.exterior = this.form_.controls['noExterior'].value;
            newProveedor.data.address.colonia = this.form_.controls['colonia'].value;
            newProveedor.data.address.municipio = this.form_.controls['municipio'].value;
            newProveedor.data.address.ciudad = this.form_.controls['ciudad'].value;
            newProveedor.data.address.estado = this.form_.controls['estado'].value;
            newProveedor.data.address.cp = this.form_.controls['cp'].value;
            newProveedor.data.cellphone = this.form_.controls['telefonoContacto'].value;

            this._proveedorService.create(newProveedor).subscribe((result) => {
                this.alert = {
                    type: 'success',
                    message: 'El proveedor fue guardado con exito.'
                };
                // Hide the alert
                this.showAlert = true;

                setTimeout(() => {
                    this.form_.enable();
                    this.showAlert = false;
                    this.router.navigate(['/pages/proveedores/lista']);
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
