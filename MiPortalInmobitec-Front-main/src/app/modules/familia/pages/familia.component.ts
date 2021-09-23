import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FamiliaDialogComponent } from '../shared/familia-dialog.component';
import { Familia } from 'src/app/models/familia';
import { FamiliaService } from 'src/app/services/familia.service';


@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.scss']
})
export class FamiliaComponent implements OnInit {

  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'orden',
    'estado',
    'actions'

  ];

  dataSource: MatTableDataSource<Familia>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  familias :Familia[] = [];
  constructor(private familiaService:FamiliaService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Familia>([]);
   }

  ngOnInit(): void {
    this.loadFamilia();
  }

  openFamiliaDialog(){
    const data: Familia = Familia.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditFamilia(e: MouseEvent, familiaData: Familia): void {
    e.stopPropagation();
    this.openDialog('update', familiaData);
  }

  private loadFamilia(){
    this.familiaService.getAll().subscribe((res:Familia[])=>{
      console.log(res);
      this.familias = res;
      this.dataSource.data = this.familias.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  // ------------------
  private openDialog(action: string, familia: Familia, disableClose = false): void {
    this.dialog.open(FamiliaDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        familia,
        onAddFamilia: (result: Familia) => {
          this.familias.push(result);
          this.dataSource.data = this.familias.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateFamilia: (result: Familia) => {
          this.familias = this.familias
            .map((value: Familia) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.familias.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }


}
