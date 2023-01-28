import { Component, Input } from '@angular/core';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-reporte-quincena',
  templateUrl: './reporte-quincena.component.html',
  styleUrls: ['./reporte-quincena.component.css']
})
export class ReporteQuincenaComponent {

  constructor(private dataService:DataService){}
  ecografiasReportadas2:Ecografia[]=[];
  ecografiasReportadas1:Ecografia[]=[];
  fechaHasta:any;
  fechaDesde:any;
  semanaElegida:string='';
  quincenas:any[]=['1er Quincena','2da Quincena']
  mes:any;
  anio:any;
  ecografista:string='';
  cantidadTotal:any;
  cantidadMercadoPago:number=0;
  cantidadEfectivo:number=0;
  informesSinRealizar:any;
  contadorMP = 0;
  contadorEF = 0;
  @Input()
  mostrarReporteSemanal:boolean=false;
  generarReportes(){

    this.dataService.traerReporteQuincena(this.mes,this.anio,this.ecografista).then(data=>{
        this.ecografiasReportadas1 = [];
        this.ecografiasReportadas2 = [];
        for(let ecografia of data){
          if(ecografia.dia.integerValue <= 15){
            this.ecografiasReportadas1.push(ecografia)
          } else {
            this.ecografiasReportadas2.push(ecografia)
          }
        }
      });
  }
  getPorcentaje(porcentaje:any,index:any){
    let cantPorcentaje=0;
    if(index===1){
      for(let eco of this.ecografiasReportadas1){
        cantPorcentaje += Number(eco.monto.stringValue) * porcentaje;
      }
    } else {
      for(let eco of this.ecografiasReportadas2){
        cantPorcentaje += Number(eco.monto.stringValue) * porcentaje;
      }
    }
    return cantPorcentaje;
  }
  getCantidadTotal(index:any){
    if(index===1){
      return this.ecografiasReportadas1.length
    } else {
      return this.ecografiasReportadas2.length
    }
  }
}
