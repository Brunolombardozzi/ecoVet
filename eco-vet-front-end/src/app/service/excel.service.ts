

import { Injectable,  } from "@angular/core";
// import { Workbook } from "exceljs";
import * as fs from 'file-saver'

const EXCEL_EXTENSION = '.xlsx'
const EXCEL_TYPE = 'application/vnd:openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
@Injectable({
  providedIn: 'root',
})
export class ExcelService {
    constructor(){
    }

    // exportarExcel(ecografias:any[],mes:any){
    //   const workbook = new Workbook();
    //   workbook.creator = 'Me';
    //   workbook.lastModifiedBy = 'Her';
    //   workbook.created = new Date(2023, 2, 10);
    //   workbook.modified = new Date();
    //   workbook.lastPrinted = new Date(2023, 2, 9);

    //   const worksheet = workbook.addWorksheet('Ecografias de' + mes);
    //   //CABECERA
    //   worksheet.addRow([/*'numero',*/ 'Fecha','Apellido','Mascota','Derivante', 'Tipo', 'Ecografista','Informe','Monto','Metodo de Pago','Dueño','Monto EF','Monto TR','Monto MP']);

    //   //ECOGRAFIAS

    //   for(let ecografiaSeleccionada of ecografias){
    //     let valoresEcografia:any[]=[];
    //     valoresEcografia.push(ecografiaSeleccionada.fecha)
    //     valoresEcografia.push(ecografiaSeleccionada.apellido)
    //     valoresEcografia.push(ecografiaSeleccionada.nombreMascota)
    //     valoresEcografia.push(ecografiaSeleccionada.derivante)
    //      valoresEcografia.push(ecografiaSeleccionada.tipo)
    //      valoresEcografia.push(ecografiaSeleccionada.nombreEcografista)
    //      valoresEcografia.push(ecografiaSeleccionada.estadoInforme)
    //      valoresEcografia.push(ecografiaSeleccionada.monto)
    //      valoresEcografia.push(ecografiaSeleccionada.metodoPago)
    //      valoresEcografia.push(ecografiaSeleccionada.nombreDuenio)
    //      valoresEcografia.push(ecografiaSeleccionada.montoEfectivo)
    //      valoresEcografia.push(ecografiaSeleccionada.montoTransferencia)
    //      valoresEcografia.push(ecografiaSeleccionada.montoMercadoPago)
    //     worksheet.addRow(valoresEcografia);
    //   }


    //   workbook.xlsx.writeBuffer().then((data:any)=>{
    //     const blob = new Blob([data],{type:EXCEL_TYPE});
    //     fs.saveAs(blob,'ecografias_'+ mes+ (new Date()).toString() + EXCEL_EXTENSION)
    //   });

    // }
  }
