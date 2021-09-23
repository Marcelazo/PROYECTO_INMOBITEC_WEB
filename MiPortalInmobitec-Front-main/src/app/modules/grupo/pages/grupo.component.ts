import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Grupo } from '../../../models/grupo';
import { GrupoService } from '../../../services/grupo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GrupoDialogComponent } from '../shared/grupo-dialog/grupo-dialog.component';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {


  displayedColumns: string[] = [
    'clase_id',
    'nombre',
    'descripcion',
    'orden',
    'actions'
];

  dataSource: MatTableDataSource<Grupo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  grupos :Grupo[] = [];
  constructor(private grupoService:GrupoService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Grupo>([]);
   }

  ngOnInit(): void {
    this.loadGrupo();
  }

  openGrupoDialog(){
    const data: Grupo = Grupo.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditGrupo(e: MouseEvent, grupoData: Grupo): void {
    e.stopPropagation();
    this.openDialog('update', grupoData);
  }


  private loadGrupo(){
    this.grupoService.getAll().subscribe((res:Grupo[])=>{
      console.log(res);
      this.grupos = res;
      this.dataSource.data = this.grupos.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  // ----------------------------------

  private openDialog(action: string, grupo: Grupo, disableClose = false): void {
    this.dialog.open(GrupoDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        grupo,
        onAddGrupo: (result: Grupo) => {
          this.grupos.push(result);
          this.dataSource.data = this.grupos.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateGrupo: (result: Grupo) => {
          this.grupos = this.grupos
            .map((value: Grupo) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.grupos.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }

}
