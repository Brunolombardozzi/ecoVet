import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
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

export class NavBarComponent{
  modalRef?: BsModalRef | null;
  @ViewChild('cargaEcografia') cargaEcografia: any;
  @Input()
  parent?: AppComponent;
  @Output()
  actulizarListadoEcos = new EventEmitter<any>();

  constructor(private modalService: BsModalService,private dataService:DataService) {}
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
    this.modalRef = this.modalService.show(this.cargaEcografia, { id: 1, class: 'modal-lg' });
  }
  mostrarReportes(){
  }
  actualizarListado(ecografias:any){
    console.log(ecografias)
    this.actulizarListadoEcos.emit(ecografias)
  }
}
