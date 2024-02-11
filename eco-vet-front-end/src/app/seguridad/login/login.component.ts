import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnChanges {
  constructor(private dataService:DataService){}
  usuario:any;
  contrasenia:string='';
  @Input()
  viewAlert:boolean=false;

  @Output()
  vistaLogin = new EventEmitter<any>();
  @Output()
  vistaCargaOReportes = new EventEmitter<any>();
  ngOnChanges(changes:SimpleChanges){

  }
  acceder(){
    let contraseniaReportes:any;
    let contraseniaCarga:any;
    this.dataService.traerContrasenias().then(data=>{
      if(data){
        contraseniaCarga = data[0];
        contraseniaReportes = data[1]
      }
      if(this.contrasenia===contraseniaCarga.valor.stringValue){
        this.vistaCargaOReportes.emit(1);
        this.vistaLogin.emit(1);
      } else if(this.contrasenia===contraseniaReportes.valor.stringValue){
        this.vistaCargaOReportes.emit(0);
        this.vistaLogin.emit(1);
      } else {
        this.viewAlert = true;
      }
    })
  }

  alert(){
    this.viewAlert = false
  }
}
