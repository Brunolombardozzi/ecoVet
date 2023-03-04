import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { doc } from 'firebase/firestore';
import { data } from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from '../app.component';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  template: 'passed in {{ data.name }}'
})

export class NavBarComponent implements OnInit{
  modalRef?: BsModalRef | null;
  @ViewChild('cargaEcografia') cargaEcografia: any;
  @Input()
  parent?: AppComponent;
  @Input()
  muestraMenu: any;
  @Output()
  actulizarListadoEcos = new EventEmitter<any>();
  @Output()
  ocultarListado = new EventEmitter<any>();
  mostrarCargaEcografias:boolean=true;
  mostrarReporteMensual:boolean=false;
  mostrarReporteDiario:boolean=true;
  mostrarReporteQuincena=false;

  constructor(private modalService: BsModalService,private dataService:DataService) {}
  ngOnInit(): void {
    if(this.muestraMenu === 1){
      this.mostrarCargaEcografias = true;
      this.mostrarReporteMensual = false;
      this.mostrarReporteDiario = true;
    } else if(this.muestraMenu === 0) {
      this.mostrarCargaEcografias = false;
      this.mostrarReporteMensual = true;
      this.mostrarReporteDiario = true;
    }
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }

  closeModal(){
    this.modalService.hide(1);
  }

  cargarEcografia(){
    // this.ocultarListado.emit(1);  OCULTAR?
    this.modalRef = this.modalService.show(this.cargaEcografia, { id: 1, class: 'modal-lg' });
    let e :any= document.getElementsByClassName('modal-content')[0];
    e.style.width='70%'
    e.style.marginLeft='16%'
  }

  actualizarListado(ecografias:any){
    this.ocultarListado.emit(true);
  }

  ocultarLista(){
    this.ocultarListado.emit(false);
  }

  mostrarListado(){
    this.ocultarListado.emit(true);
  }

}
