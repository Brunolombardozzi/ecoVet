import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-actualizacion-ecografias',
  templateUrl: './actualizacion-ecografias.component.html',
  styleUrls: ['./actualizacion-ecografias.component.css']
})
export class ActualizacionEcografiasComponent  implements OnChanges {

  @Input()
  parent?: any;
  tipoEcografia:any;
  nombreEcografista:any;
  fecha:any;
  monto:any;
  metodoPago:any='';
  apellido:any;
  nombreDuenio:any;
  nombreMascota:any;
  realizada:boolean=false;
  estadoInforme:string='';
  derivante:any;
  @Input()
  ecografiaSeleccionada:any;
  @Output()
  actulizarListadoEcos:any = new EventEmitter<any>();
  ecografistas:any[]=['Marina','Ornela','Emilce','Santiago','Laura','Yanina'];
  metodosPago:any[] = ['Efectivo','Mercado Pago','Transferencia','Otro'];
  placeHolder='Seleccione Ecografista'
  montoMP:any='';
  montoEF:any='';
  montoTR:any='';
  observaciones:any='';
  casoEspecial:any='';
  respCasoEsp:any[]=['Si','No']
  montoHorasExtra:any='';
  ecoHoraExtra:any='';
  respEcoHoraExtra:any[]=['Si','No']
  modalRef?: BsModalRef | null;
  @ViewChild('eliminarEco') eliminarEco: any;
  constructor(private dataService:DataService,private modalService: BsModalService) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.tipoEcografia = this.ecografiaSeleccionada.tipo;
    this.nombreEcografista = this.ecografiaSeleccionada.nombreEcografista;
    this.fecha= this.getFechaParseada(this.ecografiaSeleccionada.fecha)
    this.monto = this.ecografiaSeleccionada.monto
    this.metodoPago = this.ecografiaSeleccionada.metodoPago
    this.apellido = this.ecografiaSeleccionada.apellido
    this.nombreDuenio = this.ecografiaSeleccionada.nombreDuenio
    this.nombreMascota = this.ecografiaSeleccionada.nombreMascota
    if(this.ecografiaSeleccionada.montoEfectivo ){
      this.montoEF = this.ecografiaSeleccionada.montoEfectivo;
    }
    if(this.ecografiaSeleccionada.montoMercadoPago) {
      this.montoMP = this.ecografiaSeleccionada.montoMercadoPago;
    }

    if(this.ecografiaSeleccionada.montoTransferencia) {
      this.montoTR = this.ecografiaSeleccionada.montoTransferencia;
    }
    if(this.ecografiaSeleccionada.casoEspecial){
      this.casoEspecial = this.ecografiaSeleccionada.casoEspecial
    }
    if(this.ecografiaSeleccionada.observaciones){
      this.observaciones = this.ecografiaSeleccionada.observaciones
    }
    if(this.ecografiaSeleccionada.realizada == 'Si'){
      this.realizada = true;
    } else {
      this.realizada = false;
    }
    this.estadoInforme = this.ecografiaSeleccionada.estadoInforme
    this.derivante = this.ecografiaSeleccionada.derivante
    if(this.ecografiaSeleccionada.montoHorasExtra) {
      this.ecoHoraExtra = this.ecografiaSeleccionada.montoHorasExtra
    }
  }
  actualizarEcografia(){
    if(this.metodoPago==='Otro'){
      this.monto = (Number(this.montoEF) + Number(this.montoMP) + Number(this.montoTR)).toString();
    }else {
      this.montoEF = 0;
      this.montoMP = 0;
      this.montoTR = 0;
      if(this.metodoPago==='Efectivo'){
        this.montoEF = this.monto;
      } else if(this.metodoPago==='Mercado Pago'){
        this.montoMP = this.monto;
      } else if(this.metodoPago==='Transferencia'){
        this.montoTR = this.monto;
      }
    }
    if(!this.metodoPago && this.metodoPago === undefined) {
      this.metodoPago = ' '
    }
    let eco :any = {
      apellido  : this.apellido,
       derivante  : this.derivante,
       estadoInforme  : this.estadoInforme,
       fecha  : this.fecha,
       metodoPago  : this.metodoPago,
       monto  : this.monto.toString(),
       montoEfectivo : this.montoEF.toString(),
       montoMercadoPago : this.montoMP.toString(),
       montoTransferencia: this.montoTR.toString(),
       nombreDuenio  : this.nombreDuenio,
       nombreEcografista  : this.nombreEcografista,
       nombreMascota  : this.nombreMascota,
       numero  : this.ecografiaSeleccionada.numero,
       realizada  : this.realizada,
       tipo  : this.tipoEcografia,
       mes : this.fecha.substring(5,7),
       anio : this.fecha.substring(0,4),
       dia : Number(this.fecha.substring(8,10)).toString(),
       hora : this.ecografiaSeleccionada.hora,
       minutos : this.ecografiaSeleccionada.minutos,
       observaciones : this.observaciones,
       casoEspecial : this.casoEspecial,
       segundos : this.ecografiaSeleccionada.segundos,
       montoHorasExtra : this.ecoHoraExtra
      }
    this.dataService.actualizarEcografia(eco,this)
    this.actulizarListadoEcos.emit(1);
  }

  getFechaParaMuestra(fecha: any): any {
    let mes:any = fecha.toString().substring(5,7)
    let anio:any = fecha.toString().substring(0,4)
    let dia :any = fecha.toString().substring(8,10)
    return dia+'-'+mes+'-'+anio;
}
  getFechaParseada(fecha: any): any {
    let mes:any = fecha.toString().substring(3,5)
    let anio:any = fecha.toString().substring(6,10)
    let dia :any = fecha.toString().substring(0,2)
    return anio+'-'+mes+'-'+dia;
}

  cancelarCarga(){
    this.parent?.closeModal();
  }
  async eliminarEcografia(){
    await this.dataService.eliminarEcografia(this.ecografiaSeleccionada.numero,this);
    this.actulizarListadoEcos.emit(1);
  }
  eliminarEcografiaPopUp(){
    this.cancelarCarga();
    this.modalRef = this.modalService.show(this.eliminarEco, { id: 10, class: 'modal-lg' });
  }
  cerrarPopUpEliminar(){
    this.modalService.hide(10);
  }

  seleccionEcorafista(ecografista:any){
    this.nombreEcografista = ecografista;
  }
  seleccionMetodoPago(metodoPago:any){
    this.metodoPago = metodoPago;
  }
  seleccionHoraExtra(horaExtra:any){
    this.ecoHoraExtra = horaExtra;
  }
  getNombreEcografista(){
    return 'Ecografista'
  }
  getMetodoPago(){
    return 'Metodo Pago'
  }
  seleccionCasoEspecial(resp:any){
    this.casoEspecial = resp;
  }
}
