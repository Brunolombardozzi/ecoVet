import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-actualizacion-ecografias',
  templateUrl: './actualizacion-ecografias.component.html',
  styleUrls: ['./actualizacion-ecografias.component.css']
})
export class ActualizacionEcografiasComponent  implements OnChanges {

  @Input()
  parent?: AppComponent;
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
  constructor() {}
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
  guardarEcografia(){
    console.log('Se corrigio correctamente la ecografia de: ' + this.nombreMascota);
  }
  cancelarCarga(){
    this.parent?.closeModal();
  }
}
