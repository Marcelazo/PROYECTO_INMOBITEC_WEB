import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { Proyecto } from '../../../models/proyecto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProyectoDialogComponent } from '../shared/proyecto-dialog/proyecto-dialog.component';
import { GaleriaDialogComponent } from '../shared/galeria-dialog/galeria-dialog.component';
import { Galeria } from 'src/app/models/galeria';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'img_logo',
    'img_principal',
    'departamento_id',
    'provincia_id',
    'distrito_id',
    // 'estado',
    'actions'

  ];

  dataSource: MatTableDataSource<Proyecto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  proyectos :Proyecto[] = [];
  constructor(private proyectoService:ProyectoService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Proyecto>([]);
   }

  ngOnInit(): void {
    this.loadProyecto();
  // console.log(this.imagen_logo("GM31S3V2JK20210409211724.jpg"));
  }


  openProyectoDialog(){
    const data: Proyecto = Proyecto.empty();
    this.openDialog('create', data, true);
  }

  handleClickEditProyecto(e: MouseEvent, ProyectoData: Proyecto): void {
    e.stopPropagation();
    this.openDialog('update', ProyectoData);
  }

  handleClickEditGaleria(e: MouseEvent, ProyectoData: Proyecto,GaleriaData: Galeria): void {
    e.stopPropagation();
    this.openDialogGaleria('update', ProyectoData,GaleriaData);
  }


  private loadProyecto(){
    this.proyectoService.list().subscribe((res:Proyecto[])=>{
      this.proyectos = res;
      this.dataSource.data = this.proyectos.slice();
        this.dataSource._updateChangeSubscription();
    },(error)=>{
      console.error(error)
    })
  }

  imagen_logo(element:Proyecto){
    return this.proyectoService.file_logo(element.img_logo);
  }

  imagen_principal(element:Proyecto){
    return this.proyectoService.file_principal(element.img_principal);
  }

  private openDialog(action: string, proyecto: Proyecto, disableClose = false): void {
    this.dialog.open(ProyectoDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        proyecto,
        onAddProyecto: (result: Proyecto) => {
          this.proyectos.push(result);
          this.dataSource.data = this.proyectos.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateProyecto: (result: Proyecto) => {
          this.proyectos = this.proyectos
            .map((value: Proyecto) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.proyectos.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }

  private openDialogGaleria(action: string, proyecto: Proyecto, galeria: Galeria, disableClose = false): void {
    this.dialog.open(GaleriaDialogComponent, {
      minWidth: '760px',
      disableClose,
      data: {
        action,
        galeria,
        proyecto,
        onAddProyecto: (result: Proyecto) => {
          this.proyectos.push(result);
          this.dataSource.data = this.proyectos.slice();
          this.dataSource._updateChangeSubscription();
        },
        onUpdateProyecto: (result: Proyecto) => {
          this.proyectos = this.proyectos
            .map((value: Proyecto) => (value.id === result.id ? result : value))
            .slice();
          this.dataSource.data = this.proyectos.slice();
          this.dataSource._updateChangeSubscription();
        },
      },
    });
  }

}
