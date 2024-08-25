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
  ecografiasReportadas1:Ecografia[]=[];
  fechaHasta:any;
  fechaDesde:any;
  semanaElegida:string='';
  quincenas:any[]=['1er Quincena','2da Quincena']
  anios:any[]=['2023','2024','2025','2026','2027','2028','2029','2030']
  meses:any[]=[ 'Enero', 'Febrero','Marzo', 'Abril','Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
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
  ecografistas:any[]=['Todas','Marina','Ornela','Emilce','Santiago','Laura','Yanina'];
  porcentajePorEcografista=0;
  porcentaje=0;
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  displayedColumns: string[] = ['nombreEcografista', 'fecha','monto','metodoPago','apellido','nombreMascota','estadoInforme','derivante'];
  metodosPago:any[] = ['Efectivo','Transferencia','Débito', 'Crédito','Otro'];
  metodoPago:any='';

  generarReportes(){

    this.dataService.traerReporteMensual(this.dataService.elegirMesParaService(this.mes),this.anio,this.ecografista, this.metodoPago).then(data=>{
        let ecografiasParaTabla:any=[];
        this.ecografiasReportadas1 = [];
        for(let ecografia of data){
          if(ecografia.montoHorasExtra && ecografia.montoHorasExtra.stringValue !== 'Si'){
            this.ecografiasReportadas1.push(ecografia)
            ecografiasParaTabla.push({
                numero: ecografia.numero.stringValue,
                mes: ecografia.mes.stringValue,
                anio: ecografia.anio.stringValue,
                tipo: ecografia.tipo.stringValue,
                nombreEcografista: ecografia.nombreEcografista.stringValue,
                fecha: ecografia.fecha.stringValue,
                monto: ecografia.monto.stringValue,
                montoTra:ecografia.montoEfectivo.stringValue,
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
        }
        this.dataSource = ecografiasParaTabla;
      });

  }

  getCantidadTotal(index:any){
    if(this.ecografiasReportadas1){
      return this.ecografiasReportadas1.length
    } else {
      return 0
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

seleccionAnios(anio:any){
  this.anio = anio;
}

seleccionMes(mes:any){
  this.mes = mes;
  this.mesParaMuestra = mes;
}
getMetodoPago(){
  return 'Metodo Pago'
}
seleccionMetodoPago(metodoPago:any){
this.metodoPago = metodoPago;
}
}

