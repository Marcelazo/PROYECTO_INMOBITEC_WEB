import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clase } from '../../../models/clase';
import { ClaseService } from '../../../services/clase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClaseDialogComponent } from '../shared/clase-dialog/clase-dialog.component';


@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit {

  displayedColumns: string[] = [
    'familia_id',
    'nombre',
    'descripcion',
    'orden',
    'estado',
    'actions'
];
  dataSource: MatTableDataSource<Clase>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clases :Clase[] = [];
  constructor(private claseService:ClaseService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Clase>([]);
   }

  ngOnInit(): void {
    this.loadClase();
  }

  openClaseDialog(){
    const data: Clase = Clase.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditClase(e: MouseEvent, claseData: Clase): void {
    e.stopPropagation();
    this.openDialog('update', claseData);
  }

  private loadClase(){
    this.claseService.getAll().subscribe((res:Clase[])=>{
      //console.log(res);
      this.clases = res;
      this.dataSource.data = this.clases.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  private openDialog(action: string, clase: Clase, disableClose = false): void {
    this.dialog.open(ClaseDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        clase,
        onAddClase: (result: Clase) => {
          this.clases.push(result);
          this.dataSource.data = this.clases.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateClase: (result: Clase) => {
          this.clases = this.clases
            .map((value: Clase) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.clases.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }

}//endClass
