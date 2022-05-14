import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';



@Component({
    selector: 'conferencia-list',
    templateUrl: './conferencia-list.component.html',
    styleUrls: ['./conferencia-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConferenciaListComponent implements OnInit {



    displayedColumns: string[] = ['' ];

    dataSource:any = [];
    registro_id: number = 0;
    user: any
    role: string = '';

    /**
     * Constructor
     */
    constructor(private router: Router, private actRoute: ActivatedRoute, private _fuseConfirmationService: FuseConfirmationService) {
        this.registro_id = this.actRoute.snapshot.params.id;
    }


    ngOnInit() {
       
        this.user = JSON.parse(localStorage.getItem('usuario'));
        this.role = this.user.role.role;
    }

    ngAfterViewInit() {

    }
    regresar(): void {
        
        this.router.navigate(['/pages/agendas/lista']);
    }

}
