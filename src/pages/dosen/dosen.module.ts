import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosenPage } from './dosen';
import { FilterPipe } from 'ngx-filter-pipe';
@NgModule({
  declarations: [
    DosenPage,
  ],
  imports: [
    IonicPageModule.forChild(DosenPage),
    FilterPipe
  ],
})
export class DosenPageModule { }
