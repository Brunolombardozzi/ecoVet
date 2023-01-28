
import { Injectable,  } from "@angular/core";
import { Observable } from "rxjs";
import { Ecografia } from "../model/ecografia";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore , addDoc, collection,doc, setDoc, query, where, collectionGroup} from "firebase/firestore";
const a = initializeApp({
  apiKey: 'AIzaSyB6WwldrMPAcp9-7MgXR03qmNGD1tuesU4',
  authDomain: 'eco-vet.firebaseapp.com',
  projectId: 'eco-vet'
});

const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class DataService {
    constructor(){
    }

    cargarNuevaEcografia(ecografia:Ecografia,componenteCarga:any){
      try {
        const docRef:any = addDoc(collection(db, "ecografia"),ecografia);
        componenteCarga.parent.closeModal();
        return new Observable();
      } catch (e) {
        console.error("Error al guardar la ecografia", e);
        return new Observable();
      }
    }

    async actualizarEcografia(ecografia:Ecografia,componenteActualizacion:any){
      try {
        // await setDoc(doc(db, "ecografia", ecografia.numero), ecografia);
        await setDoc(doc(db, "contraseniaCarga", ecografia.numero), {
          valor:'clivet24'
        });
        await setDoc(doc(db, "contraseniaReportes", ecografia.numero), {
          valor:'reportes123'
        });
        console.log("Se actualizo correctamente la ecografia de ", ecografia.nombreMascota);
        componenteActualizacion.parent.closeModal();
      } catch (e) {
        console.error("Error al actualizar la ecografia", e);
      }
    }

    async traerTodasLasEcografias(){
      let ecografias:Ecografia[]=[];
      const querySnapshot = await getDocs(collection(db, "ecografia"));
      querySnapshot.forEach((doc:any) => {
        let ecografia:any = doc._document.data.value.mapValue.fields;
        ecografias.push({
          numero: doc.id,
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
      });
      return ecografias;
    }
      async traerReporteDiario(fecha:any,ecografista:any){
        let ecografias:Ecografia[]=[];
        const ecografiasCollection = collection(db, "ecografia");
        const q = query(ecografiasCollection, where("nombreEcografista", "==", ecografista),where("fecha","==",fecha));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc:any) => {
          debugger
          let ecografia:any = doc._document.data.value.mapValue.fields;
          ecografias.push(ecografia)
        });
        return ecografias;
      }

      async traerReporteMensual(mes:string,anio:string,ecografista:string){
        if(mes.length===1){
          mes = '0' + mes;
        }
        let ecografias:Ecografia[]=[];
        const ecografiasCollection = collection(db, 'ecografia');
        const q = query(ecografiasCollection,where("anio","==",anio),where("mes","==",mes),where("nombreEcografista","==",ecografista));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc:any) => {
          let ecografia:any = doc._document.data.value.mapValue.fields;
          ecografias.push(ecografia)
        });
        return ecografias;
      }


      async traerReporteQuincena(mes:string,anio:string,ecografista:string){
        if(mes.length===1){
          mes = '0' + mes;
        }
        let ecografias:Ecografia[]=[];
        const ecografiasCollection = collection(db, 'ecografia');
        const q = query(ecografiasCollection,where("anio","==",anio),where("mes","==",mes),where("nombreEcografista","==",ecografista));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc:any) => {
          let ecografia:any = doc._document.data.value.mapValue.fields;
          ecografias.push(ecografia)
        });
        return ecografias;
      }

      async traerContrasenias(){
        let ecografias:Ecografia[]=[];
        let contraseniaCarga;
        let contraseniaReportes;
        const querySnapshot = await getDocs(collection(db, "contraseniaReportes"));
        querySnapshot.forEach((doc:any) => {
          contraseniaReportes = doc._document.data.value.mapValue.fields;
        });
        const querySnapshot1 = await getDocs(collection(db, "contraseniaCarga"));
        querySnapshot1.forEach((doc:any) => {
          contraseniaCarga = doc._document.data.value.mapValue.fields;
        });
        return [contraseniaCarga,contraseniaReportes];
      }

  }
