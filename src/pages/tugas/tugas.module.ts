import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TugasPage } from './tugas';

@NgModule({
  declarations: [
    TugasPage,
  ],
  imports: [
    IonicPageModule.forChild(TugasPage),
  ],
})
export class TugasPageModule {}
