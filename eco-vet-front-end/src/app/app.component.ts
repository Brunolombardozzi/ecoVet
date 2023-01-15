import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ecografia } from './model/ecografia';
import { DataService } from './service/data.service';

var ELEMENT_DATA: Ecografia[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnChanges{
  modalRef?: BsModalRef | null;
  ecografiaSeleccionada:any;
  displayedColumns: string[] = [/*'numero',*/ 'tipo', 'nombreEcografista', 'fecha','monto','metodoPago','apellido','nombreDuenio','nombreMascota','realizada','estadoInforme','derivante'];
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  @ViewChild('editarEcografia') editorEcografia: any;
  constructor(private modalService: BsModalService,private dataService:DataService){}
  ngOnInit(): void {
    this.uploadData();
  }
  ngOnChanges(changes:SimpleChanges){
  }

  uploadData(){
    this.listarEcografias()
  }

  closeModal(){
    //Se le pasa el id del modal a cerrar al hide.
    this.modalService.hide(2);
  }
  modificarRow(ecografia:any){
    this.ecografiaSeleccionada = ecografia;
    this.modalRef = this.modalService.show(this.editorEcografia, { id: 2, class: 'modal-lg' });
  }
  listarEcografias(){
    this.dataService.traerTodasLasEcografias().then((data:any)=>{
      this.dataSource = data;
    })
  }

  async actualizarListado(ecografias:any){
    ecografias.then((data:any)=>{
      console.log(data)
      this.dataSource = data;
    })
  }
}
