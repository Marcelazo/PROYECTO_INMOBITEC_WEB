import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MarcaDialogComponent } from '../shared/marca-dialog/marca-dialog.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {


  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'orden',
    'estado',
    'actions'

  ];

  dataSource: MatTableDataSource<Marca>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  marcas :Marca[] = [];
  constructor(private marcaService:MarcaService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Marca>([]);
   }

  ngOnInit(): void {
    this.loadMarca();
  }


  openMarcaDialog(){
    const data: Marca = Marca.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditMarca(e: MouseEvent, marcaData: Marca): void {
    e.stopPropagation();
    this.openDialog('update', marcaData);
  }

  private loadMarca(){
    this.marcaService.getAll().subscribe((res:Marca[])=>{
      console.log(res);
      this.marcas = res;
      this.dataSource.data = this.marcas.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  // ----------------------------------

  private openDialog(action: string, marca: Marca, disableClose = false): void {
    this.dialog.open(MarcaDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        marca,
        onAddMarca: (result: Marca) => {
          this.marcas.push(result);
          this.dataSource.data = this.marcas.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateMarca: (result: Marca) => {
          this.marcas = this.marcas
            .map((value: Marca) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.marcas.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }


}
