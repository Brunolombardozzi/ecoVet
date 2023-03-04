import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataService } from '../service/data.service';

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
  actulizarListadoEcos = new EventEmitter<any>();
  ecografistas:any[]=['Marina','Ornela','Emilce','Santiago','Laura'];
  metodosPago:any[] = ['Efectivo','Mercado Pago','Transferencia','Otro'];
  placeHolder='Seleccione Ecografista'
  montoMP:any='';
  montoEF:any='';
  montoTR:any='';
  observaciones:any='';
  casoEspecial:any='';
  respCasoEsp:any[]=['Si','No']
  constructor(private dataService:DataService) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

    this.tipoEcografia = this.ecografiaSeleccionada.tipo;
    this.nombreEcografista = this.ecografiaSeleccionada.nombreEcografista;
    // console.log(this.getFechaParseada(this.ecografiaSeleccionada.fecha))
    this.fecha= this.getFechaParseada(this.ecografiaSeleccionada.fecha)
    this.monto = this.ecografiaSeleccionada.monto
    this.metodoPago = this.ecografiaSeleccionada.metodoPago
    this.apellido = this.ecografiaSeleccionada.apellido
    this.nombreDuenio = this.ecografiaSeleccionada.nombreDuenio
    this.nombreMascota = this.ecografiaSeleccionada.nombreMascota
    if(this.ecografiaSeleccionada.montoEfectivo && this.ecografiaSeleccionada.montoMercadoPago &&this.ecografiaSeleccionada.montoTransferencia){
      this.montoEF = this.ecografiaSeleccionada.montoEfectivo;
      this.montoTR = this.ecografiaSeleccionada.montoTransferencia;
      this.montoMP = this.ecografiaSeleccionada.montoMercadoPago;
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
  }
  actualizarEcografia(){
    if(this.metodoPago==='Otro'){
      this.monto = (Number(this.montoEF) + Number(this.montoMP) + Number(this.montoTR)).toString();
    }
    if(this.metodoPago==='Efectivo'){
      this.montoEF = this.monto;
    } else if(this.metodoPago==='Mercado Pago'){
      this.montoMP = this.monto;
    } else if(this.metodoPago==='Transferencia'){
      this.montoTR = this.monto;
    }
    let metodoPagoFijado;
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
       dia : Number(this.fecha.substring(8,10)),
       hora : 1,
       observaciones : this.observaciones,
       casoEspecial : this.casoEspecial
      }
    this.dataService.actualizarEcografia(eco,this)
    this.actulizarListadoEcos.emit(1);
    // this.dataService.traerTodasLasEcografias(this.fecha.substring(5,7)).then((data:any)=>{
    //   ecografiasActualizadas = data;
    //   for(let eco of ecografiasActualizadas){
    //     eco.fecha = this.getFechaParaMuestra(eco.fecha);
    //   }
    // });
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
  eliminarEcografia(){
    this.dataService.eliminarEcografia(this.ecografiaSeleccionada.numero,this);
    this.actulizarListadoEcos.emit(this.dataService.traerTodasLasEcografias(this.fecha.substring(5,7)));
  }
  seleccionEcorafista(ecografista:any){
    this.nombreEcografista = ecografista;
  }
  seleccionMetodoPago(metodoPago:any){
    this.metodoPago = metodoPago;
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
