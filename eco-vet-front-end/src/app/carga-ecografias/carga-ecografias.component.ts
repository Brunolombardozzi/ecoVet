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
  fecha:any='';
  monto:any='';
  metodoPago:any='';
  apellido:any='';
  nombreDuenio:any='';
  nombreMascota:any='';
  realizada:boolean =false;
  estadoInforme:string ='';
  derivante:any='';
  constructor(private dataService:DataService) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  guardarEcografia(){
    let ecografiasActualizadas:any;
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
     numero  : 5,
     realizada  : this.realizada,
     tipo  : this.tipoEcografia,
    }
    this.dataService.cargarNuevaEcografia(nuevaEco,this)
    ecografiasActualizadas= this.dataService.traerTodasLasEcografias();
    this.actulizarListadoEcos.emit(ecografiasActualizadas);
  }
  cancelarCarga(){
    this.parent?.closeModal();
  }
}
