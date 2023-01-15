import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes ,ActivatedRoute} from '@angular/router';
import { AppComponent } from './app.component';
import { CargaEcografiasComponent } from './carga-ecografias/carga-ecografias.component';

const routes: Routes = [
  { path: 'carga-ecografias', component: CargaEcografiasComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
