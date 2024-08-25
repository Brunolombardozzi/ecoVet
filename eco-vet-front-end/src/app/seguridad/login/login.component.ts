import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnChanges {
  constructor(private dataService:DataService, private router: Router){}
  email:any;
  contrasenia:string='';
  @Input()
  viewAlert:boolean=false;

  @Output()
  vistaLogin = new EventEmitter<any>();
  @Output()
  vistaCargaOReportes = new EventEmitter<any>();
  ngOnChanges(changes:SimpleChanges){

  }
  accederPorCorreo(){
    this.dataService.loginPorCorreo(this.email, this.contrasenia)
    .then((userData:any) => {
      this.evaluarCorreosAdminParaMenu();
      console.log('Sesion iniciada correctamente');
    })
    .catch((error:any) => {
      console.error('Error al iniciar sesión:');
    });


  }
  evaluarCorreosAdminParaMenu():any {
    let correos:any = [];
    let adminAuth = false;
    this.dataService.traerCorreos().then((data:any) =>{
      for(let correo of data) {
        correos.push(correo.correo.stringValue)
      }
      for(let correo of correos) {
        if(correo.toString() === this.dataService.userData.email){
          adminAuth = true;
          this.dataService.setAdminMenu(true);
        }
      }
      if(adminAuth){
        this.vistaCargaOReportes.emit(0);
      }else {
        this.vistaCargaOReportes.emit(1);
      }
      this.dataService.verEstadoUsuario()
    });
  }

  alert(){
    this.viewAlert = false
  }
}
