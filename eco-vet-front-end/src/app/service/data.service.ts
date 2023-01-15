
import { Injectable,  } from "@angular/core";
import { Observable } from "rxjs";
import { Ecografia } from "../model/ecografia";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore , addDoc, collection} from "firebase/firestore";

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

    itemsCollection? : any;
    items?:Observable<any>;
    constructor(){
    }

    cargarNuevaEcografia(ecografia:Ecografia,componenteCarga:any){
      try {
        const docRef:any = addDoc(collection(db, "ecografia"),ecografia);
        console.log("Se guardo correctamente la ecografia de id:", ecografia.nombreMascota);
        componenteCarga.parent.closeModal();
        return new Observable();
      } catch (e) {
        console.error("Error al guardar la ecografia", e);
        return new Observable();
      }
    }


    async traerTodasLasEcografias(){
      let ecografias:Ecografia[]=[];
      const querySnapshot = await getDocs(collection(db, "ecografia"));
      querySnapshot.forEach((doc:any) => {
        let ecografia:any = doc._document.data.value.mapValue.fields;
        ecografias.push({
          numero: ecografia.numero.integerValue,
          tipo: ecografia.tipo.stringValue,
          nombreEcografista: ecografia.nombreEcografista.stringValue,
          fecha: ecografia.fecha.stringValue,
          monto: ecografia.monto.integerValue,
          metodoPago:ecografia.metodoPago.stringValue,
          apellido:ecografia.apellido.stringValue,
          nombreDuenio:ecografia.nombreDuenio.stringValue,
          nombreMascota:ecografia.nombreMascota.stringValue,
          realizada:ecografia.realizada.booleanValue,
          estadoInforme:ecografia.estadoInforme.stringValue,
          derivante:ecografia.derivante.stringValue
        })
      });
      return ecografias;
    }


  }

// GUARDA EN CACHE CON FIRESTORE LITE.

// export class DataService {

//   itemsCollection? : AngularFirestoreCollection<Ecografia>;
//   items?:Observable<any>;
//   constructor(private db: AngularFirestore){
//     this.db.collection<Ecografia>('ecografia').snapshotChanges().subscribe((items:any)=>{
//       if(items && items.length !=0){
//         console.log(items[0].payload._delegate.doc._document.data.value.mapValue.fields)
//       }
//     })
//     this.db.collection<Ecografia>('ecografia').valueChanges().subscribe((items:any)=>{
//       if(items && items.length !=0){
//         console.log(items)
//       } else {
//         console.log('No hay ecografias para mostrar')
//       }
//     })
//   }

//   cargarEcografia(ecografia:Ecografia){
//     this.db.collection('ecografia').doc().set(ecografia);
//   this.db.collection('ecografia').get().subscribe(data=>{
//       console.log(data)
//     })
//   }
// }
