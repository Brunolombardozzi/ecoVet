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
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  displayedColumns: string[] = ['nombreEcografista', 'fecha','monto','metodoPago','apellido','nombreMascota','realizada','estadoInforme','derivante'];
  generarReportes(){

    this.dataService.traerReporteMensual(this.mes,this.anio,this.ecografista).then(data=>{
        this.elegirMes();
        let ecografiasParaTabla:any=[];
        this.ecografiasReportadas1 = [];
        for(let ecografia of data){
            this.ecografiasReportadas1.push(ecografia)
            ecografiasParaTabla.push({
                numero: ecografia.numero.stringValue,
                mes: ecografia.mes.stringValue,
                anio: ecografia.anio.stringValue,
                tipo: ecografia.tipo.stringValue,
                nombreEcografista: ecografia.nombreEcografista.stringValue,
                fecha: ecografia.fecha.stringValue,
                monto: ecografia.monto.stringValue,
                metodoPago:ecografia.metodoPago.stringValue,
                apellido:ecografia.apellido.stringValue,
                nombreDuenio:ecografia.nombreDuenio.stringValue,
                nombreMascota:ecografia.nombreMascota.stringValue,
                realizada:ecografia.realizada.booleanValue,
                estadoInforme:ecografia.estadoInforme.stringValue,
                derivante:ecografia.derivante.stringValue,
                dia:ecografia.dia.IntegerValue
              })
        }
        this.dataSource = ecografiasParaTabla;
        this.porcentajePorEcografista = this.getPorcentaje();
      });

  }
  getPorcentaje(){
    debugger

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
    } else if(this.ecografista === '') {
      return ''
    } else {
      return '100%'
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
      this.mesParaMuestra =  'Enero'
    } else if(this.mes==='2'){
      this.mesParaMuestra =  'Febrero'
    }else if(this.mes==='3'){
      this.mesParaMuestra =  'Marzo'
    } else if(this.mes==='4'){
      this.mesParaMuestra =   'Abril'
    } else if(this.mes==='5'){
      this.mesParaMuestra =  'Mayo'
    } else if(this.mes==='6'){
      this.mesParaMuestra =  'Junio'
    } else if(this.mes==='7'){
      this.mesParaMuestra =  'Julio'
    } else if(this.mes==='8'){
      this.mesParaMuestra =  'Agosto'
    } else if(this.mes==='9'){
      this.mesParaMuestra =  'Septiembre'
    } else if(this.mes==='10'){
      this.mesParaMuestra =  'Octubre'
    } else if(this.mes==='11'){
      this.mesParaMuestra =   'Noviembre'
    } else if(this.mes==='12'){
      this.mesParaMuestra =  'Diciembre'
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
modificarRow(ecografia:any){
// console.log(1)
}
}

