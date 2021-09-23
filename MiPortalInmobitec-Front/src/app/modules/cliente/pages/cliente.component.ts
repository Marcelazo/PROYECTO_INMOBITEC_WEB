import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogComponent } from '../shared/cliente-dialog/cliente-dialog.component';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = [
    'nro_doc',
    'nombre',
    'ape_pat',
    'ape_mat',
    'direccion',
    'telefono',
    'actions'


  ];

  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clientes :Cliente[] = [];
  constructor(private ClienteService:ClienteService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Cliente>([]);
   }

  ngOnInit(): void {
    this.loadUnidadMedida();
  }

  private loadUnidadMedida(){
    this.ClienteService.getAll().subscribe((res:Cliente[])=>{
      console.log(res);
      this.clientes = res;
      this.dataSource.data = this.clientes.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  openClienteDialog(){
    const data: Cliente = Cliente.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditClient(e: MouseEvent, clienteData: Cliente): void {
    e.stopPropagation();
    this.openDialog('update', clienteData);
  }

  //---------------------
  private openDialog(action: string, cliente: Cliente, disableClose = false): void {
    this.dialog.open(ClienteDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        cliente,
        onAddCliente: (result: Cliente) => {
          this.clientes.push(result);
          this.dataSource.data = this.clientes.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateCliente: (result: Cliente) => {
          this.clientes = this.clientes
            .map((value: Cliente) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.clientes.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }
}
