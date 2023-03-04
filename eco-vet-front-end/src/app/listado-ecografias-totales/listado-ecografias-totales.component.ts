import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';
import { ExcelService } from '../service/excel.service';
const ExcelJS = require('exceljs');
@Component({
  selector: 'app-listado-ecografias-totales',
  templateUrl: './listado-ecografias-totales.component.html',
  styleUrls: ['./listado-ecografias-totales.component.css']
})
export class ListadoEcografiasTotalesComponent implements AfterViewInit,OnInit {
  constructor(private modalService: BsModalService,private dataService:DataService, private excelService:ExcelService){  }
  modalRef?: BsModalRef | null;
  ecografiaSeleccionada:any;
  displayedColumns: string[] = [/*'numero',*/ 'fecha','apellido','nombreMascota','derivante', 'tipo', 'nombreEcografista','estadoInforme','monto','metodoPago'];
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  meses:any[]=[ 'Enero', 'Febrero','Marzo', 'Abril','Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  mes:any ;
  montoEfectivoDelDia:any=0;
  diasDiarios = ['Ayer','Hoy']
  dia:any='Hoy';
  numeroDiaSeleccionado:any= ((new Date()).getDate());
  mesParaExcel= this.numeroDiaSeleccionado.getMonth;
  @ViewChild('editarEcografia') editorEcografia: any;

  @ViewChild('exportacionExcel') cargaExcel: any;

  soloCasosEspeciales:boolean=false;

  filtrarPorCasosEspeciales(){
    this.soloCasosEspeciales = !this.soloCasosEspeciales;
    let ecosFiltradas:any=[];
    if(this.soloCasosEspeciales){
      for(let ecos of this.dataSource){
        let eco :any= ecos;
        if(eco.casoEspecial==='Si'){
          ecosFiltradas.push(eco)
        }
        this.dataSource = ecosFiltradas;
      }
    } else {
      this.listarEcografias();
    }
  }

  modificarRow(ecografia:any){
    this.ecografiaSeleccionada = ecografia;
    this.modalRef = this.modalService.show(this.editorEcografia, { id: 2, class: 'modal-lg' });
    // this.uploadData();
    let e :any= document.getElementsByClassName('modal-content')[0];
    e.style.width='70%'
    e.style.marginLeft='16%'
  }
  ngAfterViewInit(): void {
    // let elements :any = document.getElementsByClassName('mdc-data-table__row');
    // console.log(elements)
    // for (let index = 0; index < elements.length; index++) {
    //   const element = elements[index];
    //   element.style = '25px'
    // }
  }
  seleccionMes(mes:any){
    this.mes = mes;
    this.uploadData();
  }
  seleccionDiaCierreCaja(dia:any){
    this.dia = dia;
    this.montoEfectivoDelDia=0;
    let ayer= ((new Date()).getDate())-1;
    let hoy =((new Date()).getDate());
    if(dia==='Hoy'){
      this.numeroDiaSeleccionado=hoy;
    } else {
      this.numeroDiaSeleccionado = ayer;
    }
    for(let ecos of this.dataSource){
      let eco :any= ecos;
      if(eco.fecha[0]==='0' && eco.fecha[1]===this.numeroDiaSeleccionado.toString() ){
        this.montoEfectivoDelDia += Number(eco.montoEfectivo);
      } else if(eco.fecha.substring(0,2)===this.numeroDiaSeleccionado.toString()){
        this.montoEfectivoDelDia += Number(eco.montoEfectivo);
      }
    }
  }

  elegirMes(mes:string) {
    if(mes==='0'){
     return  'Enero'
    } else if(mes==='1'){
     return  'Febrero'
    }else if(mes==='2'){
     return  'Marzo'
    } else if(mes==='3'){
     return   'Abril'
    } else if(mes==='4'){
     return  'Mayo'
    } else if(mes==='5'){
     return  'Junio'
    } else if(mes==='6'){
     return  'Julio'
    } else if(mes==='7'){
     return  'Agosto'
    } else if(mes==='8'){
     return  'Septiembre'
    } else if(mes==='9'){
     return  'Octubre'
    } else if(mes==='10'){
     return  'Noviembre'
    } else if(mes==='11'){
     return  'Diciembre'
    } else {
      return '';
    }
  }

  elegirMesParaService(mes:any):any {
    if(mes==='Enero'){
      return  '01'
     } else if(mes==='Febrero'){
      return  '02'
     }else if(mes==='Marzo'){
      return  '03'
     } else if(mes==='Abril'){
      return   '04'
     } else if(mes==='Mayo'){
      return  '05'
     } else if(mes=== 'Junio'){
      return  '06'
     } else if(mes==='Julio'){
      return  '07'
     } else if(mes==='Agosto'){
      return  '08'
     } else if(mes==='Septiembre'){
      return  '09'
     } else if(mes==='Octubre'){
      return  '10'
     } else if(mes==='Noviembre'){
      return  '11'
     } else if(mes=== 'Diciembre'){
      return  '12'
     }
  }

  async actualizarListado(value:any){
    this.listarEcografias();
  }
  ngOnInit(): void {
    let date :Date= new Date()
    this.mes =  this.elegirMes(date.getMonth().toString());
    this.uploadData();
  }
  ngOnChanges(changes:SimpleChanges){
  }

  uploadData(){
    this.listarEcografias()
  }

  exportarExcel(){
    this.modalRef = this.modalService.show(this.cargaExcel, { id: 3, class: 'modal-lg' });
  }
  cancelarExcel(){
      //Se le pasa el id del modal a cerrar al hide.
      this.modalService.hide(3);
  }

  async exportarDataExcel(){
    this.excelService.exportarExcel(this.dataSource,this.elegirMes((new Date()).getMonth().toString()))
  }

  async listarEcografias(){
    debugger;
    this.montoEfectivoDelDia = 0;
    await this.dataService.traerTodasLasEcografias(this.elegirMesParaService(this.mes)).then((data:any)=>{
      data.sort((a:any,b:any) =>{
        if(a.fecha < b.fecha) return 1
        else if(a.fecha > b.fecha) return -1
        else return 0
      })
      for(let eco of data){
        eco.fecha = this.getFechaParseada(eco.fecha);
        if(eco.fecha[0]==='0' && eco.fecha[1]===this.numeroDiaSeleccionado.toString() ){
          this.montoEfectivoDelDia += Number(eco.montoEfectivo);
        } else if(eco.fecha.substring(0,2)===this.numeroDiaSeleccionado.toString()){
          this.montoEfectivoDelDia += Number(eco.montoEfectivo);
        }
      }
      this.dataSource = data;
    })
  }
  montoEfectivo(eco: any) {
    return eco.montoEfectivo
  }
  getFechaParseada(fecha: any): any {
      let mes:any = fecha.toString().substring(5,7)
      let anio:any = fecha.toString().substring(0,4)
      let dia :any = fecha.toString().substring(8,10)
      return dia+'-'+mes+'-'+anio;
  }
  closeModal(){
    //Se le pasa el id del modal a cerrar al hide.
    this.modalService.hide(2);
  }
}
