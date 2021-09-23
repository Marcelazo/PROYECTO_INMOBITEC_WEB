import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadMedidaService } from '../../../services/unidad-medida.service';
import { UnidadMedida } from '../../../models/unidad-medida';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UnidadMedidaDialogComponent } from '../shared/unidad-medida-dialog/unidad-medida-dialog.component';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent implements OnInit {

  displayedColumns: string[] = [
    'nombre',
    'simbolo',
    'descripcion',
    'orden',
    'estado',
    'actions'

  ];

  dataSource: MatTableDataSource<UnidadMedida>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  unidadMedidas :UnidadMedida[] = [];
  constructor(private unidadMedidaService:UnidadMedidaService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<UnidadMedida>([]);
   }

  ngOnInit(): void {
    this.loadUnidadMedida();
  }


  openUnidadMedidaDialog(){
    const data: UnidadMedida = UnidadMedida.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditUnidadMedida(e: MouseEvent, unidadMedidaData: UnidadMedida): void {
    e.stopPropagation();
    this.openDialog('update', unidadMedidaData);
  }


  private loadUnidadMedida(){
    this.unidadMedidaService.getAll().subscribe((res:UnidadMedida[])=>{
      console.log(res);
      this.unidadMedidas = res;
      this.dataSource.data = this.unidadMedidas.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  private openDialog(action: string, unidad_medida: UnidadMedida, disableClose = false): void {
    this.dialog.open(UnidadMedidaDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        unidad_medida,
        onAddUnidadMedida: (result: UnidadMedida) => {
          this.unidadMedidas.push(result);
          this.dataSource.data = this.unidadMedidas.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateUnidadMedida: (result: UnidadMedida) => {
          this.unidadMedidas = this.unidadMedidas
            .map((value: UnidadMedida) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.unidadMedidas.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }

}
