import { Component, Input } from '@angular/core';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  styleUrls: ['./reporte-mensual.component.css']
})
export class ReporteMensualComponent {
  constructor(private dataService:DataService){}
  ecografiasReportadas1:Ecografia[]=[];
  fechaHasta:any;
  fechaDesde:any;
  semanaElegida:string='';
  quincenas:any[]=['1er Quincena','2da Quincena']
  mes:any='';
  anio:any;
  ecografista:string='';
  cantidadTotal:any;
  cantidadMercadoPago:number=0;
  cantidadEfectivo:number=0;
  informesSinRealizar:any;
  contadorMP = 0;
  contadorEF = 0;
  mesParaMuestra:any = ' ';
  @Input()
  mostrarReporteSemanal:boolean=false;
  ecografistas:any[]=['Marina','Ornela','Emilce','Santiago','Laura'];
  porcentajePorEcografista=0;
  porcentaje=0;
  generarReportes(){

    this.dataService.traerReporteMensual(this.mes,this.anio,this.ecografista).then(data=>{
        this.elegirMes();
        this.ecografiasReportadas1 = [];
        for(let ecografia of data){
          console.log(ecografia)
            this.ecografiasReportadas1.push(ecografia)
        }
        this.porcentajePorEcografista = this.getPorcentaje(1,1);
        this.ecografista = this.getPorcentajePorEcografista();
      });
  }
  getPorcentaje(porcentaje:any,index:any){
    let cantPorcentaje=0;
      for(let eco of this.ecografiasReportadas1){
        if(eco.metodoPago.stringValue==='Mercado Pago'){ //PORCENTAJE CON IMPUESTO MERCADO PAGO
          cantPorcentaje += (Number(eco.monto.stringValue) * this.getPorcentajeImpuestoMercadoPago()) * this.getValorParaPorcentaje();
        } else if(eco.metodoPago.stringValue==='Efectivo'){ //PORCENTAJE SIN IMPUESTO MERCADO PAGO
          cantPorcentaje += Number(eco.monto.stringValue) * this.getValorParaPorcentaje();
        }
    }
    return cantPorcentaje;
  }
  getPorcentajeImpuestoMercadoPago() {
    return 0.9; //Devuelve el monto menos el 10%
  }

  getPorcentajePorEcografista(){
    if(this.ecografista ==='Ornela'){
      return '30%'
    }  else if(this.ecografista === 'Emilce') {
      return '22%'
    } else if(this.ecografista === 'Laura') {
      return '35%'
    } else if(this.ecografista === 'Santiago') {
      return '22%'
    } else {
      return '%'
    }
  }
  getValorParaPorcentaje(){
    if(this.ecografista ==='Ornela'){
      return 0.3
    }  else if(this.ecografista === 'Laura') {
      return 0.22
    } else if(this.ecografista === 'Emilce' ||this.ecografista === 'Santiago') {
      return 0.22
    } else {
      return 1
    }
  }

  getCantidadTotal(index:any){
    if(this.ecografiasReportadas1){
      return this.ecografiasReportadas1.length
    } else {
      return 0
    }
  }
  elegirMes() {
    if(this.mes==='1'){
      this.mesParaMuestra =' de ' + 'Enero'
    } else if(this.mes==='2'){
      this.mesParaMuestra =' de ' + 'Febrero'
    }else if(this.mes==='3'){
      this.mesParaMuestra =' de ' + 'Marzo'
    } else if(this.mes==='4'){
      this.mesParaMuestra =' de ' + 'Abril'
    } else if(this.mes==='5'){
      this.mesParaMuestra =' de ' + 'Mayo'
    } else if(this.mes==='6'){
      this.mesParaMuestra =' de ' + 'Junio'
    } else if(this.mes==='7'){
      this.mesParaMuestra =' de ' + 'Julio'
    } else if(this.mes==='8'){
      this.mesParaMuestra =' de ' + 'Agosto'
    } else if(this.mes==='9'){
      this.mesParaMuestra =' de ' + 'Septiembre'
    } else if(this.mes==='10'){
      this.mesParaMuestra =' de ' + 'Octubre'
    } else if(this.mes==='11'){
      this.mesParaMuestra = ' de ' +'Noviembre'
    } else if(this.mes==='12'){
      this.mesParaMuestra = ' de ' +'Diciembre'
    }
  }
  seleccionEcorafista(ecografista:any){
    if(this.ecografistas.includes(ecografista)){
      this.ecografista = ecografista;
    }
  }
  getNombreEcografista(){
    return 'Ecografista'
}
getEcografistaName(){
  if(this.ecografistas.includes(this.ecografista)){
    return this.ecografista
  } else {
    return ''
  }
}
}

