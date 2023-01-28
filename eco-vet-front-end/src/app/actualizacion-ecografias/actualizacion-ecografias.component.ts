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
  metodoPago:any;
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
  metodosPago:any[] = ['Efectivo','Mercado Pago','Transfer./Debito'];
  placeHolder='Seleccione Ecografista'
  constructor(private dataService:DataService) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.tipoEcografia = this.ecografiaSeleccionada.tipo;
    this.nombreEcografista = this.ecografiaSeleccionada.nombreEcografista;
    this.fecha = this.ecografiaSeleccionada.fecha
    this.monto = this.ecografiaSeleccionada.monto
    this.metodoPago = this.ecografiaSeleccionada.metodoPago
    this.apellido = this.ecografiaSeleccionada.apellido
    this.nombreDuenio = this.ecografiaSeleccionada.nombreDuenio
    this.nombreMascota = this.ecografiaSeleccionada.nombreMascota
    if(this.ecografiaSeleccionada.realizada == 'Si'){
      this.realizada = true;
    } else {
      this.realizada = false;
    }
    this.estadoInforme = this.ecografiaSeleccionada.estadoInforme
    this.derivante = this.ecografiaSeleccionada.derivante
  }
  actualizarEcografia(){
    let ecografiasActualizadas:any;
    let eco :any = {
      apellido  : this.apellido,
       derivante  : this.derivante,
       estadoInforme  : this.estadoInforme,
       fecha  : this.fecha,
       metodoPago  : this.metodoPago,
       monto  : this.monto,
       nombreDuenio  : this.nombreDuenio,
       nombreEcografista  : this.nombreEcografista,
       nombreMascota  : this.nombreMascota,
       numero  : this.ecografiaSeleccionada.numero,
       realizada  : this.realizada,
       tipo  : this.tipoEcografia,
       mes : this.fecha.substring(5,7),
       anio : this.fecha.substring(0,4),
       dia : Number(this.fecha.substring(8,10))
      }
    this.dataService.actualizarEcografia(eco,this)
    ecografiasActualizadas= this.dataService.traerTodasLasEcografias();
    this.actulizarListadoEcos.emit(ecografiasActualizadas);
  }
  cancelarCarga(){
    this.parent?.closeModal();
  }
  seleccionEcorafista(ecografista:any){
    this.nombreEcografista = ecografista;
  }
  seleccionMetodoPago(metodoPago:any){
    this.metodoPago = metodoPago;
  }
  getNombreEcografista(){
    return 'Seleccione Ecografista'
  }
  getMetodoPago(){
    return 'Seleccione Metodo Pago'
  }
}
