import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { collection, getDocs, getFirestore,addDoc } from 'firebase/firestore/lite';
import { DataService } from '../service/data.service';
import { Ecografia } from '../model/ecografia';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-carga-ecografias',
  templateUrl: './carga-ecografias.component.html',
  styleUrls: ['./carga-ecografias.component.css']
})
export class CargaEcografiasComponent implements OnInit,OnChanges{

  @Input()
  parent?: NavBarComponent;
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
      console.log(changes)

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
    let nuevaEco :Ecografia = {
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
     numero  : '',
     realizada  : this.realizada,
     tipo  : this.tipoEcografia,
     mes : this.fecha.substring(5,7),
     anio : this.fecha.substring(0,4),
     dia : Number(this.fecha.substring(8,6)),
     observaciones : this.observaciones,
     casoEspecial : this.casoEspecial
    }
    this.dataService.cargarNuevaEcografia(nuevaEco,this);
    this.actulizarListadoEcos.emit(1);
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
      return 'Ecografista'
  }
  getMetodoPago(){
      return 'Metodo Pago'
  }
}
