import { Component, Input } from '@angular/core';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  styleUrls: ['./reporte-mensual.component.css']
})
export class ReporteMensualComponent {
  constructor(private dataService: DataService) { }
  ecografiasReportadas1: Ecografia[] = [];
  fechaHasta: any;
  fechaDesde: any;
  semanaElegida: string = '';
  quincenas: any[] = ['1er Quincena', '2da Quincena']
  anios: any[] = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
  meses: any[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  mes: any = '';
  anio: any;
  ecografista: string = '';
  cantidadTotal: any;
  cantidadMercadoPago: number = 0;
  cantidadEfectivo: number = 0;
  informesSinRealizar: any;
  contadorMP = 0;
  contadorEF = 0;
  mesParaMuestra: any = ' ';
  @Input()
  mostrarReporteSemanal: boolean = false;
  ecografistas: any[] = ['Todas', 'Marina', 'Ornela', 'Emilce', 'Santiago', 'Laura', 'Lucero', 'Yanina'];
  porcentajePorEcografista = 0;
  porcentaje = 0;
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  displayedColumns: string[] = ['nombreEcografista', 'fecha', 'monto', 'metodoPago', 'apellido', 'nombreMascota', 'estadoInforme', 'derivante'];


  generarReportes() {

    this.dataService.traerReporteMensual(this.dataService.elegirMesParaService(this.mes), this.anio, this.ecografista).then(data => {
      let ecografiasParaTabla: any = [];
      this.ecografiasReportadas1 = [];
      for (let ecografia of data) {
        if (ecografia.montoHorasExtra && ecografia.montoHorasExtra.stringValue !== 'Si') {
          this.ecografiasReportadas1.push(ecografia)
          ecografiasParaTabla.push({
            numero: ecografia.numero.stringValue,
            mes: ecografia.mes.stringValue,
            anio: ecografia.anio.stringValue,
            tipo: ecografia.tipo.stringValue,
            nombreEcografista: ecografia.nombreEcografista.stringValue,
            fecha: ecografia.fecha.stringValue,
            monto: ecografia.monto.stringValue,
            montoTra: ecografia.montoEfectivo.stringValue,
            metodoPago: ecografia.metodoPago.stringValue,
            apellido: ecografia.apellido.stringValue,
            nombreDuenio: ecografia.nombreDuenio.stringValue,
            nombreMascota: ecografia.nombreMascota.stringValue,
            realizada: ecografia.realizada.booleanValue,
            estadoInforme: ecografia.estadoInforme.stringValue,
            derivante: ecografia.derivante.stringValue,
            dia: ecografia.dia.IntegerValue
          })
        }
      }
      this.dataSource = ecografiasParaTabla;
      this.porcentajePorEcografista = this.getPorcentaje();
    });

  }
  getPorcentaje(): any {
    let cantPorcentaje = 0;
    let cantEF =0, cantDeb=0, cantCred=0,cantTransf=0;
    for (let eco of this.ecografiasReportadas1) {
      if (eco.metodoPago.stringValue === 'Efectivo' && eco.montoEfectivo && eco.montoEfectivo.stringValue !== '') {
        cantPorcentaje += Number(eco.montoEfectivo.stringValue) * this.getValorParaPorcentaje();
        cantEF +=1;
      }

      if (eco.metodoPago.stringValue === 'Transferencia' && eco.montoTransferencia && eco.montoTransferencia.stringValue !== '') {
        cantPorcentaje += (Number(eco.montoTransferencia.stringValue) * this.getPorcentajeImpuestoTransfODebito()) * this.getValorParaPorcentaje();
        cantTransf +=1;
      }

      if (eco.metodoPago.stringValue === 'Débito' && eco.montoDebito && eco.montoDebito.stringValue !== '') {
        cantPorcentaje += (Number(eco.montoDebito.stringValue) * this.getPorcentajeImpuestoTransfODebito()) * this.getValorParaPorcentaje();
        cantDeb +=1;
      }

      if ((eco.metodoPago.stringValue === 'Crédito' || eco.metodoPago.stringValue === 'Mercado Pago') && eco.montoMercadoPago && eco.montoMercadoPago.stringValue !== '') {
        cantPorcentaje += ((Number(eco.montoMercadoPago.stringValue)!== 0? Number(eco.montoMercadoPago.stringValue) :Number(eco.monto.stringValue) ) * this.getPorcentajeImpuestoMercadoPago()) * this.getValorParaPorcentaje();
        cantCred += 1;
      }

      console.log(cantPorcentaje)
      //Metodo de pago multiple.
      if (eco.metodoPago.stringValue === 'Otro') {
        if (eco.montoEfectivo && eco.montoEfectivo !== undefined && eco.montoEfectivo.stringValue !== '') {
          cantPorcentaje += Number(eco.montoEfectivo.stringValue) * this.getValorParaPorcentaje();
        }

        if (eco.montoTransferencia && eco.montoTransferencia !== undefined && eco.montoTransferencia.stringValue !== '') {
          cantPorcentaje += (Number(eco.montoTransferencia.stringValue) * this.getPorcentajeImpuestoTransfODebito()) * this.getValorParaPorcentaje();
        }

        if (eco.montoDebito && eco.montoDebito !== undefined && eco.montoDebito.stringValue !== '') {
          cantPorcentaje += (Number(eco.montoDebito.stringValue) * this.getPorcentajeImpuestoTransfODebito()) * this.getValorParaPorcentaje();
        }

        if (eco.montoMercadoPago && eco.montoMercadoPago !== undefined && eco.montoMercadoPago.stringValue !== '') {
          cantPorcentaje += (Number(eco.montoMercadoPago.stringValue) * this.getPorcentajeImpuestoMercadoPago()) * this.getValorParaPorcentaje();
        }
      }

      if (eco.metodoPago.stringValue === '' || !eco.metodoPago.stringValue || eco.metodoPago.stringValue === undefined || eco.metodoPago.stringValue === ' ') {
        console.log('Se encontro por lo menos una ecografia sin metodo de pago', eco.apellido.stringValue, eco.fecha.stringValue)
      }
    }
    return cantPorcentaje;
  }
  getPorcentajeImpuestoTransfODebito() {
    return 0.9; // Transferencias o debito, 10% menos.
  }
  getPorcentajeImpuestoMercadoPago() {
    return 0.85; // Credito, por base guardado como monto mercado pago, se le resta el 15%
  }

  getPorcentajePorEcografista() {
    if (this.ecografista === 'Ornela') {
      return '30'
    } else if (this.ecografista === 'Emilce') {
      return '22'
    } else if (this.ecografista === 'Laura') {
      return '35'
    } else if (this.ecografista === 'Santiago') {
      return '22'
    } else if (this.ecografista === 'Yanina') {
      return '22'
    } else if (this.ecografista === 'Lucero') {
      return '22'
    } else if (this.ecografista === '') {
      return '0'
    } else {
      return '100'
    }
  }
  getValorParaPorcentaje() {
    if (this.ecografista === 'Ornela') {
      return 0.3
    } else if (this.ecografista === 'Laura') {
      return 0.35
    } else if (this.ecografista === 'Emilce' || this.ecografista === 'Santiago' || this.ecografista === 'Yanina' || this.ecografista === 'Lucero') {
      return 0.22
    } else {
      return 1
    }
  }

  getCantidadTotal(index: any) {
    if (this.ecografiasReportadas1) {
      return this.ecografiasReportadas1.length
    } else {
      return 0
    }
  }

  seleccionEcorafista(ecografista: any) {
    if (this.ecografistas.includes(ecografista)) {
      this.ecografista = ecografista;
    }
  }
  getNombreEcografista() {
    return 'Ecografista'
  }
  getEcografistaName() {
    if (this.ecografistas.includes(this.ecografista)) {
      return this.ecografista
    } else {
      return ''
    }
  }

  seleccionAnios(anio: any) {
    this.anio = anio;
  }

  seleccionMes(mes: any) {
    this.mes = mes;
    this.mesParaMuestra = mes;
  }
}

