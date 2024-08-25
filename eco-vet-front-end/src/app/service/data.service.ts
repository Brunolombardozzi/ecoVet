
import { Injectable, NgZone, } from "@angular/core";
import { Observable } from "rxjs";
import { Ecografia } from "../model/ecografia";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, addDoc, collection, doc, setDoc, query, where, deleteDoc } from "firebase/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
const a = initializeApp(environment.firebaseConfig);

const db = getFirestore();


@Injectable({
  providedIn: 'root',
})
export class DataService {
  userData: any;
  adminMenu: boolean = false;
  private readonly FIRST_VISIT_KEY = 'first_visit';

  constructor(private firebaseAuthService: AngularFireAuth, private router: Router, private ngZone: NgZone) {
    this.firebaseAuthService.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null')
      }
    })
  }

  setAdminMenu(valor: any) {
    this.adminMenu = valor;
  }

  async traerCorreos() {
    let correos: any[] = [];
    const querySnapshot = await getDocs(collection(db, "correosAdmin"));
    querySnapshot.forEach((doc: any) => {
      correos.push(doc._document.data.value.mapValue.fields);
    });
    return correos;
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  loginPorCorreo(email: string, password: string): boolean | any {
    return this.firebaseAuthService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
      })
      .catch((error) => {
        alert('Contrasena o Email incorrectos')
      })
  }

  verEstadoUsuario() {
    this.firebaseAuthService.authState.subscribe((userState) => {
      debugger
      userState && this.ngZone.run(() => this.router.navigate(['listado-ecografias']))
    })
  }

  userLoggeado(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  logOut() {
    debugger
    return this.firebaseAuthService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  cargarNuevaEcografia(ecografia: Ecografia, componenteCarga: any) {
    try {
      const docRef: any = addDoc(collection(db, "ecografia"), ecografia);
      componenteCarga.parent.closeModal();
      return new Observable();
    } catch (e) {
      console.error("Error al guardar la ecografia", e);
      return new Observable();
    }
  }

  async actualizarEcografia(ecografia: Ecografia, componenteActualizacion: any) {
    try {
      debugger
      await setDoc(doc(db, "ecografia", ecografia.numero), ecografia);
      componenteActualizacion.parent.closeModal();
    } catch (e) {
      console.error("Error al actualizar la ecografia", e);
    }
  }

  async traerTodasLasEcografias(fecha: string) {
    let ecografias: Ecografia[] = [];
    const ecografiasCollection = collection(db, "ecografia");
    const q = query(ecografiasCollection, where("fecha", "==", fecha));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      let ecografia: any = doc._document.data.value.mapValue.fields;


      ecografias.push({
        numero: doc.id,
        mes: ecografia.mes.stringValue,
        anio: ecografia.anio.stringValue,
        tipo: ecografia.tipo.stringValue,
        nombreEcografista: ecografia.nombreEcografista.stringValue,
        fecha: ecografia.fecha.stringValue,
        monto: ecografia.monto.stringValue,
        montoEfectivo: ecografia.montoEfectivo.stringValue,
        montoMercadoPago: ecografia.montoMercadoPago.stringValue,
        montoTransferencia: ecografia.montoTransferencia.stringValue,
        metodoPago: ecografia.metodoPago.stringValue,
        apellido: ecografia.apellido.stringValue,
        nombreDuenio: ecografia.nombreDuenio.stringValue,
        nombreMascota: ecografia.nombreMascota.stringValue,
        realizada: ecografia.realizada.booleanValue,
        estadoInforme: ecografia.estadoInforme.stringValue,
        derivante: ecografia.derivante.stringValue,
        dia: ecografia.dia.stringValue,
        casoEspecial: ecografia.casoEspecial.stringValue,
        observaciones: ecografia.observaciones.stringValue,
        minutos: ecografia.minutos.stringValue,
        hora: ecografia.hora.stringValue,
        segundos: ecografia.segundos.stringValue,
        montoHorasExtra: ecografia.montoHorasExtra.stringValue,
        id: ecografia.id ? ecografia.id.stringValue : '',
        montoDebito: ecografia.montoDebito ? ecografia.montoDebito.stringValue : ''
      })

    });
    return ecografias;
  }
  async traerReporteDiario(fecha: any, ecografista: any) {
    let ecografias: Ecografia[] = [];
    const ecografiasCollection = collection(db, "ecografia");
    const q = query(ecografiasCollection, where("fecha", "==", fecha));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      let ecografia: any = doc._document.data.value.mapValue.fields;
      ecografias.push(ecografia)
    });
    return ecografias;
  }

  async traerReporteMensual(mes: string, anio: string, ecografista: string, metodoPago?: string) {
    if (mes.length === 1) {
      mes = '0' + mes;
    }
    let ecografias: Ecografia[] = [];
    const ecografiasCollection = collection(db, 'ecografia');
    let q = null;
    if (ecografista !== 'Todas' && !metodoPago) {
      q = query(ecografiasCollection, where("anio", "==", anio), where("mes", "==", mes), where("nombreEcografista", "==", ecografista));
    } else if (ecografista !== 'Todas' && metodoPago) {
      q = query(ecografiasCollection, where("anio", "==", anio), where("mes", "==", mes), where("nombreEcografista", "==", ecografista), where("metodoPago","==",metodoPago));
    } else if (ecografista === 'Todas' && !metodoPago) {
      q = query(ecografiasCollection, where("anio", "==", anio), where("mes", "==", mes));
    } else if (ecografista === 'Todas' && metodoPago) {
      q = query(ecografiasCollection, where("anio", "==", anio), where("mes", "==", mes), where("metodoPago","==",metodoPago));
    }
    if(q){
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        let ecografia: any = doc._document.data.value.mapValue.fields;
        ecografias.push(ecografia)
      });
    }
    return ecografias;
  }

  async eliminarEcografia(id: string, componenteActualizacion: any) {
    await deleteDoc(doc(db, "ecografia", id));
    componenteActualizacion.parent.closeModal();
    componenteActualizacion.cerrarPopUpEliminar();
  }

  // elegirMes(mes:any):any {
  //   mes = mes.toString()
  //   if(mes==='0'){
  //     return  '01'
  //   } else if(mes==='1'){
  //     return  '02'
  //   } else if(mes==='2'){
  //     return  '03'
  //   }else if(mes==='3'){
  //     return  '04'
  //   } else if(mes==='4'){
  //     return   '05'
  //   } else if(mes==='5'){
  //     return  '06'
  //   } else if(mes==='6'){
  //     return  '07'
  //   } else if(mes==='7'){
  //     return  '08'
  //   } else if(mes==='8'){
  //     return  '09'
  //   } else if(mes==='9'){
  //     return  '10'
  //   } else if(mes==='10'){
  //     return  '11'
  //   } else if(mes==='11'){
  //     return   '12'
  //   }
  // }


  async traerReporteQuincena(mes: string, anio: string, ecografista: string) {
    if (mes.length === 1) {
      mes = '0' + mes;
    }
    let ecografias: Ecografia[] = [];
    const ecografiasCollection = collection(db, 'ecografia');
    const q = query(ecografiasCollection, where("anio", "==", anio), where("mes", "==", mes), where("nombreEcografista", "==", ecografista));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      let ecografia: any = doc._document.data.value.mapValue.fields;
      ecografias.push(ecografia)
    });
    return ecografias;
  }

  async traerContrasenias() {
    let ecografias: Ecografia[] = [];
    let contraseniaCarga;
    let contraseniaReportes;
    const querySnapshot = await getDocs(collection(db, "contraseniaReportes"));
    querySnapshot.forEach((doc: any) => {
      contraseniaReportes = doc._document.data.value.mapValue.fields;
    });
    const querySnapshot1 = await getDocs(collection(db, "contraseniaCarga"));
    querySnapshot1.forEach((doc: any) => {
      contraseniaCarga = doc._document.data.value.mapValue.fields;
    });
    return [contraseniaCarga, contraseniaReportes];
  }


  elegirMes(mes: string) {
    if (mes === '0') {
      return 'Enero'
    } else if (mes === '1') {
      return 'Febrero'
    } else if (mes === '2') {
      return 'Marzo'
    } else if (mes === '3') {
      return 'Abril'
    } else if (mes === '4') {
      return 'Mayo'
    } else if (mes === '5') {
      return 'Junio'
    } else if (mes === '6') {
      return 'Julio'
    } else if (mes === '7') {
      return 'Agosto'
    } else if (mes === '8') {
      return 'Septiembre'
    } else if (mes === '9') {
      return 'Octubre'
    } else if (mes === '10') {
      return 'Noviembre'
    } else if (mes === '11') {
      return 'Diciembre'
    } else {
      return '';
    }
  }

  elegirMesParaService(mes: any): any {
    if (mes === 'Enero') {
      return '01'
    } else if (mes === 'Febrero') {
      return '02'
    } else if (mes === 'Marzo') {
      return '03'
    } else if (mes === 'Abril') {
      return '04'
    } else if (mes === 'Mayo') {
      return '05'
    } else if (mes === 'Junio') {
      return '06'
    } else if (mes === 'Julio') {
      return '07'
    } else if (mes === 'Agosto') {
      return '08'
    } else if (mes === 'Septiembre') {
      return '09'
    } else if (mes === 'Octubre') {
      return '10'
    } else if (mes === 'Noviembre') {
      return '11'
    } else if (mes === 'Diciembre') {
      return '12'
    }
  }



}
