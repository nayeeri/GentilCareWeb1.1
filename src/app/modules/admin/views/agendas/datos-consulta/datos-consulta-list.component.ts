import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';



@Component({
    selector: 'datos-consulta-list',
    templateUrl: './datos-consulta-list.component.html',
    styleUrls: ['./datos-consulta-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatosConsultaListComponent implements OnInit {



    displayedColumnsPrincipal: string[] = ['fecha', 'motivo'];
    displayedColumnsSignos: string[] = ['frecuenciaCardiaca', 'frecuenciaRespiratoria', 'glucosa', 'temperatura', 'saturacion'];
    displayedColumnsInter: string[] = ['cardioVascular', 'aparatoRespiratorio', 'PielTegumentos', 'sintomasGenerales', 'esfera_Psiquica', 'sistemaDigestivo',
        'sistemaEndocrino', 'sistemaHematopoyetico', 'sistemaMusculoEsqueletico', 'sistemaNervioso'];
    displayedColumnsEstudio: string[] = ['no', 'nombre', 'detalle'];
    dataSourcePrincipal:any = [];
    dataSourceInter: any = [];
    dataSourceSignos: any = [];
    dataSourceEstudio: any = [];
    registro_id: number = 0;

    /**
     * Constructor
     */
    constructor(private router: Router, private actRoute: ActivatedRoute, private _fuseConfirmationService: FuseConfirmationService) {
        this.registro_id = this.actRoute.snapshot.params.id;
    }


    ngOnInit() {
        this.dataSourcePrincipal = [
            { id: 1, fecha: '04/Mayo/2022', motivo: 'X',  },
            { id: 2, fecha: '04/Mayo/2022', motivo: 'X',  },
        ];
    }

    ngAfterViewInit() {

    }
    regresar(): void {
        
        this.router.navigate(['/pages/agendas/lista']);
    }

}
