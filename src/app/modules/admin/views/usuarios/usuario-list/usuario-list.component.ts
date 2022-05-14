import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UsuarioService } from '../../../../../interfaces/usuarios/usuario.service';
import { firstValueFrom } from 'rxjs';
import { UsersDto } from '../../../../../interfaces/usuarios/usuarios.interface';



@Component({
    selector: 'usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    length = 0;
    pageSize = 5;
    currentPage = 0;
    usuarioId: number = 0;
    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['email', 'usuario', 'nombre', 'celular', 'editar', 'borrar'];
    dataSource = new MatTableDataSource<UsersDto>();

    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.initCatalog();
    }

    initCatalog(): void {
        Promise.all([
            firstValueFrom(this._usuarioService.gets())
        ]).then((response) =>{
            this.dataSource.data = response[0];
            console.log(response[0]);
        });
    }

    ngAfterViewInit(): void {
        this.length = this.dataSource.data.length;
        this.pageSize = 5;
        this.currentPage = 0;
        this.dataSource.paginator = this.paginator;
    }

    detalleRegistro(id: number): void {
        this.router.navigate(['/pages/usuarios/registro/' + id]);
    }

    eliminarRegistro(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Usuario',
            message: '¿Está seguro de que desea eliminar este registro?',
            actions: {
                confirm: {
                    label: 'Eliminar'
                },
                 cancel: {
                    label: 'Cancelar'
                }
            }
        });
        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
                this._usuarioService.delete(id).subscribe((response) => {
                    this.initCatalog();
                });
            }
        });
    }
}
