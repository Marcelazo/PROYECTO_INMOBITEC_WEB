import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from '../../../models/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorDialogComponent } from '../shared/proveedor-dialog/proveedor-dialog.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  displayedColumns: string[] = [
    'ruc',
    'nombre',
    'direccion',
    'telefono',
    'email',
    'actions'
  ];


  dataSource: MatTableDataSource<Proveedor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  proveedores :Proveedor[] = [];
  constructor(private proveedorService:ProveedorService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Proveedor>([]);
   }

  ngOnInit(): void {
    this.loadProveedor();
  }

  private loadProveedor(){
    this.proveedorService.getAll().subscribe((res:Proveedor[])=>{
      console.log(res);
      this.proveedores = res;
      this.dataSource.data = this.proveedores.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  openProveedorDialog(){
    const data: Proveedor = Proveedor.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditProveedor(e: MouseEvent, proveedorData: Proveedor): void {
    e.stopPropagation();
    this.openDialog('update', proveedorData);
  }

  //---------------------
  private openDialog(action: string, proveedor: Proveedor, disableClose = false): void {
    this.dialog.open(ProveedorDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        proveedor,
        onAddProveedor: (result: Proveedor) => {
          this.proveedores.push(result);
          this.dataSource.data = this.proveedores.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateProveedor: (result: Proveedor) => {
          this.proveedores = this.proveedores
            .map((value: Proveedor) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.proveedores.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }

}
