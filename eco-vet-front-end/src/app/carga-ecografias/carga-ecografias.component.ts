import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { collection, getDocs, getFirestore,addDoc } from 'firebase/firestore/lite';
import { DataService } from '../service/data.service';
import { Ecografia } from '../model/ecografia';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


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
  fecha:any= new Date();
  monto:string='';
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
  metodosPago:any[] = ['Efectivo','Mercado Pago','Transfer./Debito'];
  placeHolder='Seleccione Ecografista'
  constructor(private dataService:DataService) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  guardarEcografia(){
    let nuevaEco :any = {
    apellido  : this.apellido,
     derivante  : this.derivante,
     estadoInforme  : this.estadoInforme,
     fecha  : this.fecha,
     metodoPago  : this.metodoPago,
     monto  : this.monto,
     nombreDuenio  : this.nombreDuenio,
     nombreEcografista  : this.nombreEcografista,
     nombreMascota  : this.nombreMascota,
     numero  : 0,
     realizada  : this.realizada,
     tipo  : this.tipoEcografia,
     mes : this.fecha.substring(5,7),
     anio : this.fecha.substring(0,4),
     dia : Number(this.fecha.substring(8,6))
    }
    this.dataService.cargarNuevaEcografia(nuevaEco,this)
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
      return 'Seleccione Ecografista'
  }
  getMetodoPago(){
      return 'Seleccione Metodo Pago'
  }
}
