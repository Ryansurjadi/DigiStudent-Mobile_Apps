import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddnotesPage } from './addnotes';

@NgModule({
  declarations: [
    AddnotesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddnotesPage),
  ],
})
export class AddnotesPageModule {}
