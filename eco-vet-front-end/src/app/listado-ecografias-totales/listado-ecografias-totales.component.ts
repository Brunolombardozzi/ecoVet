import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-listado-ecografias-totales',
  templateUrl: './listado-ecografias-totales.component.html',
  styleUrls: ['./listado-ecografias-totales.component.css']
})
export class ListadoEcografiasTotalesComponent {
  constructor(private modalService: BsModalService,private dataService:DataService){  }
  modalRef?: BsModalRef | null;
  ecografiaSeleccionada:any;
  displayedColumns: string[] = [/*'numero',*/ 'tipo', 'nombreEcografista', 'fecha','monto','metodoPago','apellido','nombreDuenio','nombreMascota','realizada','estadoInforme','derivante'];
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  @ViewChild('editarEcografia') editorEcografia: any;
  modificarRow(ecografia:any){
    this.ecografiaSeleccionada = ecografia;
    this.modalRef = this.modalService.show(this.editorEcografia, { id: 2, class: 'modal-lg' });
  }

  async actualizarListado(ecografias:any){
    ecografias.then((data:any)=>{
      this.dataSource = data;
    })
  }
  ngOnInit(): void {
    this.uploadData();
  }
  ngOnChanges(changes:SimpleChanges){
  }

  uploadData(){
    this.listarEcografias()
  }
  listarEcografias(){
    this.dataService.traerTodasLasEcografias().then((data:any)=>{
      this.dataSource = data;
    })
  }
  closeModal(){
    //Se le pasa el id del modal a cerrar al hide.
    this.modalService.hide(2);
  }
}
