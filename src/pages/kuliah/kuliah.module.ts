import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KuliahPage } from './kuliah';

@NgModule({
  declarations: [
    KuliahPage,
  ],
  imports: [
    IonicPageModule.forChild(KuliahPage),
  ],
})
export class KuliahPageModule {}
