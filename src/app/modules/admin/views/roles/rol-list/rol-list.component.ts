import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { RolesDto } from '../../../../../interfaces/roles/role.interface';
import { RoleService } from '../../../../../interfaces/roles/role.service';
import { firstValueFrom } from 'rxjs';
@Component({
    selector: 'rol-list',
    templateUrl: './rol-list.component.html',
    styleUrls: ['./rol-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RolListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    length = 0;
    pageSize = 5;
    currentPage = 0;
    usuarioId: number = 0;
    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['rol', 'borrar'];
    dataSource = new MatTableDataSource<RolesDto>();
    roles: RolesDto[];
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _roleService: RoleService
    ) {}

    ngOnInit(): void {
        this.initCatalog();
    }

    initCatalog(): void {
        Promise.all([
            firstValueFrom(this._roleService.gets())
        ]).then((response) =>{
            this.dataSource.data = response[0];
        });
    }

    ngAfterViewInit(): void {
        this.pageSize = 5;
        this.currentPage = 0;
        this.length = this.dataSource.data.length;
        this.dataSource.paginator = this.paginator;
    }

    detalleRegistro(id: number): void {
        this.router.navigate(['/pages/roles/registro/' + id]);
    }

    eliminarRegistro(rol: RolesDto): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Rol',
            message: `¿Está seguro de que desea eliminar este role ${rol.role}?`,
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
                this._roleService.delete(rol.rolesId).subscribe((response) => {
                    this.initCatalog();
                });
            }
        });
    }
}
