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
  ecografista:any='Ecografista';
  fecha:any = new Date;
  cantidadTotal:any=0;
  cantidadMercadoPago:number=0;
  cantidadEfectivo:number=0;
  cantidadTransferencia:number=0;
  informesSinRealizar:any;
  contadorMP = 0;
  contadorEF = 0;
  contadorTR = 0;
  ecografistas:any[]=['Marina','Ornela','Emilce','Santiago','Laura'];
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  displayedColumns: string[] = ['nombreEcografista', 'fecha','monto','metodoPago','apellido','nombreMascota','estadoInforme','derivante'];
  generarReportes(){
    this.dataService.traerReporteDiario(this.fecha,this.ecografista).then(data=>{
      this.ecografiasReportadas = data;
      this.cantidadTotal = this.ecografiasReportadas.length
      let ecografiasParaTabla:any=[];
        for(let ecografia of data){
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
        ecografiasParaTabla.sort((a:any,b:any) =>{
          if(a.fecha < b.fecha) return 1
          else if(a.fecha > b.fecha) return -1
          else return 0
        })
        this.dataSource = ecografiasParaTabla;
      this.calcularMontosSegunMetodoPago();
    });
  }
  calcularMontosSegunMetodoPago() {
    this.contadorMP = 0;
    this.contadorEF = 0;
    this.cantidadMercadoPago=0;
    this.cantidadEfectivo=0;
    for(let ecografia of this.ecografiasReportadas){
      if(ecografia.metodoPago.stringValue==='Mercado Pago'){
        this.contadorMP+=1;
        this.cantidadMercadoPago += Number(ecografia.monto.stringValue);
      } else if(ecografia.metodoPago.stringValue === 'Efectivo'){
        this.contadorEF+=1
        this.cantidadEfectivo += Number(ecografia.monto.stringValue);
      }else if(ecografia.metodoPago.stringValue === 'Transferencia'){
        this.contadorTR+=1
        this.cantidadTransferencia += Number(ecografia.monto.stringValue);
      }
    }
  }
  seleccionEcorafista(ecografista:any){
    this.ecografista = ecografista;
  }
  getNombreEcografista(){
      return 'Ecografista'
  }
  modificarRow(ecografia:any){
    // console.log(1)
    }
}

