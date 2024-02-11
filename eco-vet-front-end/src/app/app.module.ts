import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CargaEcografiasComponent } from './carga-ecografias/carga-ecografias.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule} from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { ActualizacionEcografiasComponent } from './actualizacion-ecografias/actualizacion-ecografias.component'
import { DataService } from './service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule, Routes } from '@angular/router';
import { ListadoEcografiasTotalesComponent } from './listado-ecografias-totales/listado-ecografias-totales.component';
import { ReporteMensualComponent } from './reporte-mensual/reporte-mensual.component';
import { ReporteDiarioComponent } from './reporte-diario/reporte-diario.component';
import { LoginComponent } from './seguridad/login/login.component';
import { ReporteQuincenaComponent } from './reporte-quincena/reporte-quincena.component';
import { ReporteHorasExtraComponent } from './reporte-horas-extra/reporte-horas-extra.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { FileSaverModule } from 'ngx-filesaver';

const routes: Routes  = [
  { path: 'reporte-diario', component: ReporteDiarioComponent},
  { path: 'listado-ecografias', component: ListadoEcografiasTotalesComponent},
  { path: 'reporte-mensual', component: ReporteMensualComponent},
  { path: 'login', component: LoginComponent},
  { path: 'reporte-quincena', component: ReporteQuincenaComponent},
  { path: 'reporte-horas-extra', component: ReporteHorasExtraComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CargaEcografiasComponent,
    NavBarComponent,
    ActualizacionEcografiasComponent,
    ListadoEcografiasTotalesComponent,
    ReporteMensualComponent,
    ReporteDiarioComponent,
    LoginComponent,
    ReporteQuincenaComponent,
    ReporteHorasExtraComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    MatDialogModule,
    ModalModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxDatatableModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
