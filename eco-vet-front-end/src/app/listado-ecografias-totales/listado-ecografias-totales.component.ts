import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ecografia } from '../model/ecografia';
import { DataService } from '../service/data.service';
import { ExcelService } from '../service/excel.service';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
// const ExcelJS = require('exceljs');
@Component({
  selector: 'app-listado-ecografias-totales',
  templateUrl: './listado-ecografias-totales.component.html',
  styleUrls: ['./listado-ecografias-totales.component.css']
})
export class ListadoEcografiasTotalesComponent implements OnInit {
  constructor(private modalService: BsModalService,private dataService:DataService, private excelService:ExcelService){

   }
  showSpinner:boolean = false;
  SelectionType = SelectionType;
  modalRef?: BsModalRef | null;
  ecografiaSeleccionada:any;
  displayedColumns: any[] = [
    // { name: 'numero', prop: 'numero' ,width:  100},
    { name: 'fecha', prop: 'Fecha' ,width:   125 ,headerTemplate: '<input (input)="filtrarPorColumna(\'id\', $event.target.value)" placeholder="Filtrar ID">'},
    {  name: 'id', prop: 'ID',width:    125 },
    { name: 'apellido', prop: 'Apellido',width:    125 },
    { name: 'nombreMascota', prop: 'Nombre Mascota',width:    125 },
    { name: 'derivante', prop: 'Derivante' ,width:    125},
    { name: 'tipo', prop: 'Tipo' ,width:    125},
    { name: 'nombreEcografista', prop: 'nombreEcografista' ,width:   125},
    { name: 'estadoInforme', prop: 'Estado Informe',width:    125 },
    { name: 'monto', prop: 'Monto',width:   125 },
    { name: 'metodoPago', prop: 'Metodo Pago' ,width:    125},
    { name: 'observaciones', prop: 'Observaciones',width:    125 },
  ];
  dataSource = [];
  clickedRows = new Set<Ecografia>();
  meses:any[]=[ 'Enero', 'Febrero','Marzo', 'Abril','Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  mes:any ;
  fecha:any;
  montoEfectivoDelDia:any=0;
  diasDiarios = ['Ayer','Hoy']
  dia:any='Hoy';
  numeroDiaSeleccionado:any= ((new Date()).getDay) + '/' +((new Date()).getMonth) + ((new Date()).getUTCFullYear);
  mesParaExcel= this.numeroDiaSeleccionado.getMonth;
  @ViewChild('editarEcografia') editorEcografia: any;

  @ViewChild('exportacionExcel') cargaExcel: any;

  @ViewChild('eliminarEco') eliminarEco: any;
  soloCasosEspeciales:boolean=false;

  @ViewChild('cargaEcografia') cargaEcografia: any;

  selected :any=null;

  getValue(column:any) {
    if(column.prop ==='nombreEcografista') {
      return 'Ecografista'
    } else if( column.prop === 'nombreMascota') {
      return 'Mascota'
    } else if( column.prop === 'estadoInforme') {
      return 'Informe'
    } else if( column.prop === 'observaciones') {
      return 'Obersv.'
    } else {
      return column.name;
    }
  }

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
  seleccionMes(mes:any){
    this.mes = mes;
    this.uploadData();
  }

  seleccionFecha(){

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

  actualizarListado(value:any){
    this.listarEcografias();
  }
  ngOnInit(): void {
    let date :Date= new Date()
    this.mes =  this.dataService.elegirMes(date.getMonth().toString());

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.fecha = formattedDate;
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
    // this.excelService.exportarExcel(this.dataSource,this.dataService.elegirMes((new Date()).getMonth().toString()))
  }

  async listarEcografias(){
    this.montoEfectivoDelDia = 0;
    let ecografiasConDia:any[]=[];
    let ecografiasFiltradas:any=[];
    this.showSpinner = true
    await this.dataService.traerTodasLasEcografias(this.fecha).then((data:any)=>{
      for(let eco of data){
        ecografiasConDia.push(eco)
        eco.fecha = this.getFechaParaService(eco.fecha);
        this.montoEfectivoDelDia += Number(eco.montoEfectivo);

      }


      ecografiasConDia.sort((a:any,b:any) =>{
        if(Number(a.dia) < Number(b.dia)) return 1
        else if(Number(a.dia) > Number(b.dia)) return -1
        else if(Number(a.hora) < Number(b.hora)) return 1
        else if(Number(a.hora) > Number(b.hora)) return -1
        else if(Number(a.minutos) < Number(b.minutos)) return 1
        else if(Number(a.minutos) > Number(b.minutos)) return -1
        else if(Number(a.segundos) < Number(b.segundos)) return 1
        else if(Number(a.segundos) > Number(b.segundos)) return -1
        else return 0;
      })
      for(let eco of ecografiasConDia){
        ecografiasFiltradas.push(eco)
      }
      this.dataSource = ecografiasFiltradas;
      this.showSpinner = false
    })
  }
  montoEfectivo(eco: any) {
    return eco.montoEfectivo
  }
  getFechaParaService(fecha: any): any {
      let mes:any = fecha.toString().substring(5,7)
      let anio:any = fecha.toString().substring(0,4)
      let dia :any = fecha.toString().substring(8,10)
      return dia+'-'+mes+'-'+anio;
  }
  closeModal(){
    //Se le pasa el id del modal a cerrar al hide.
    this.modalService.hide(2);
  }


  closeModalCarga(){
    this.modalService.hide(3);
  }

  cargarEcografia(){
    // this.ocultarListado.emit(1);  OCULTAR?
    this.modalRef = this.modalService.show(this.cargaEcografia, { id: 3, class: 'modal-lg' });
    let e :any= document.getElementsByClassName('modal-content')[0];
    e.style.width='70%'
    e.style.marginLeft='16%'
  }

  customMessages = {
    emptyMessage: 'No hay Ecografias para el dia seleccionado.',
  };
}
