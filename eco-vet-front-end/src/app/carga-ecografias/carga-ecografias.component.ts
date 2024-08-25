import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { DataService } from '../service/data.service';
import { Ecografia } from '../model/ecografia';
import { ListadoEcografiasTotalesComponent } from '../listado-ecografias-totales/listado-ecografias-totales.component';


@Component({
  selector: 'app-carga-ecografias',
  templateUrl: './carga-ecografias.component.html',
  styleUrls: ['./carga-ecografias.component.css']
})
export class CargaEcografiasComponent implements OnInit,OnChanges{

  @Input()
  parent?: ListadoEcografiasTotalesComponent;
  @Output()
  actulizarListadoEcos = new EventEmitter<any>();
  tipoEcografia:any='';
  nombreEcografista:any='';
  fecha:any=  this.getFecha();
  monto:string='';
  @Input()
  metodoPago:any='';
  apellido:any='';
  nombreDuenio:any='';
  nombreMascota:any='';
  realizada:boolean =false;
  estadoInforme:string ='';
  derivante:any='';
  mes:any='';
  anio:any='';
  ecografistas:any[]=['Marina','Ornela','Emilce','Santiago','Laura','Yanina'];
  metodosPago:any[] = ['Efectivo','Transferencia','Débito', 'Crédito','Otro'];
  placeHolder='Seleccione Ecografista'
  montoCRED:any='';
  montoEF:any='';
  montoTR:any='';
  montoDEB:any = '';
  observaciones:any='';
  casoEspecial:any='';
  respCasoEsp:any[]=['Si','No']
  ecoHoraExtra:any='No';
  respEcoHoraExtra:any[]=['Si','No']
  id:any='';
  constructor(private dataService:DataService) {}
  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

  getFecha(): any {
    return new Date().getDate();
  }
  seleccionCasoEspecial(resp:any){
    this.casoEspecial = resp;
  }
  guardarEcografia(){
    debugger
    if(this.metodoPago==='Otro'){
      this.monto = (Number(this.montoEF) + Number(this.montoCRED) + Number(this.montoTR) + Number(this.montoDEB)).toString();
    } else {
      this.montoEF = 0;
      this.montoCRED = 0;
      this.montoTR = 0;
      this.montoDEB = 0;
      if(this.metodoPago==='Efectivo'){
        this.montoEF = this.monto;
      } else if(this.metodoPago==='Crédito'){
        this.montoCRED = this.monto;
      } else if(this.metodoPago==='Transferencia'){
        this.montoTR = this.monto;
      } else if(this.metodoPago==='Débito'){
        this.montoDEB = this.monto;
      }
    }
    let nuevaEco :Ecografia = {
      apellido  : this.apellido,
      derivante  : this.derivante,
      estadoInforme  : this.estadoInforme,
     fecha  : this.fecha,
     metodoPago  : this.metodoPago,
     monto  : this.monto.toString(),
     montoEfectivo : this.montoEF.toString(),
     montoMercadoPago : this.montoCRED.toString(),
     montoTransferencia: this.montoTR.toString(),
     montoDebito: this.montoDEB.toString(),
     nombreDuenio  : this.nombreDuenio,
     nombreEcografista  : this.nombreEcografista,
     nombreMascota  : this.nombreMascota,
     numero  : '',
     realizada  : this.realizada,
     tipo  : this.tipoEcografia,
     mes : this.fecha.substring(5,7),
     anio : this.fecha.substring(0,4),
     dia : (Number(this.fecha.substring(8,10))).toString(),
     observaciones : this.observaciones,
     casoEspecial : this.casoEspecial,
     hora : (new Date).getHours().toString(),
     minutos : (new Date).getMinutes().toString(),
     segundos : (new Date).getSeconds().toString(),
     montoHorasExtra : this.ecoHoraExtra,
     id : this.id
    }
    this.dataService.cargarNuevaEcografia(nuevaEco,this);
    this.actulizarListadoEcos.emit(1);
    this.parent?.closeModalCarga();
  }
  cancelarCarga(){
    this.parent?.closeModalCarga();
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
}
