import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Ecografia } from '../model/ecografia';


@Component({
  selector: 'app-reporte-diario',
  templateUrl: './reporte-diario.component.html',
  styleUrls: ['./reporte-diario.component.css']
})
export class ReporteDiarioComponent {

  ecografiasReportadas:Ecografia[]=[];
  constructor(private dataService:DataService){}
  // mes:any;
  // anio:any;
  ecografista:any;
  fecha:any = new Date;
  cantidadTotal:any;
  cantidadMercadoPago:number=0;
  cantidadEfectivo:number=0;
  informesSinRealizar:any;
  contadorMP = 0;
  contadorEF = 0;

  generarReportes(){
    this.dataService.traerReporteDiario(this.fecha,this.ecografista).then(data=>{
      this.ecografiasReportadas = data;
      this.cantidadTotal = this.ecografiasReportadas.length
      this.calcularMontosSegunMetodoPago();
    });
  }
  calcularMontosSegunMetodoPago() {
    this.contadorMP = 0;
    this.contadorEF = 0;
    this.cantidadMercadoPago=0;
    this.cantidadEfectivo=0;
    for(let ecografia of this.ecografiasReportadas){
      if(ecografia.metodoPago.stringValue==='Mercado pago'){
        this.contadorMP+=1;
        this.cantidadMercadoPago += Number(ecografia.monto.stringValue);
      } else if(ecografia.metodoPago.stringValue === 'Efectivo'){
        this.contadorEF+=1
        this.cantidadEfectivo += Number(ecografia.monto.stringValue);
      }
    }
  }
}

