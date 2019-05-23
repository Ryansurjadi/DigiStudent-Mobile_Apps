import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DokumenPage } from './dokumen';

@NgModule({
  declarations: [
    DokumenPage,
  ],
  imports: [
    IonicPageModule.forChild(DokumenPage),
  ],
})
export class DokumenPageModule {}
