import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ArticuloDialogComponent } from '../shared/articulo-dialog/articulo-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'observacion',
    'valor_costo',
    'valor_venta',
    'modelo',
    'actions'


  ];

  dataSource: MatTableDataSource<Articulo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  articulos:Articulo[] = [];
  constructor(private articuloService:ArticuloService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Articulo>([]);
   }

  ngOnInit(): void {
    this.loadArticulo();
  }

  openArticuloDialog(){
    const data: Articulo = Articulo.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditArticulo(e: MouseEvent, articuloData: Articulo): void {
    e.stopPropagation();
    this.openDialog('update', articuloData);
  }

  private loadArticulo(){
    this.articuloService.getAll().subscribe((res:Articulo[])=>{
      console.log(res);
      this.articulos = res;
      this.dataSource.data = this.articulos.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  // ----------------------------------

  private openDialog(action: string, articulo: Articulo, disableClose = false): void {
    this.dialog.open(ArticuloDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        articulo,
        onAddArticulo: (result: Articulo) => {
          this.articulos.push(result);
          this.dataSource.data = this.articulos.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateArticulo: (result: Articulo) => {
          this.articulos = this.articulos
            .map((value: Articulo) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.articulos.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }


}
