import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from "../pages/login/login";
import { ForgotpasswordPage } from "../pages/forgotpassword/forgotpassword";
import { BerandaPage } from '../pages/beranda/beranda';
import { NotifikasiPage } from '../pages/notifikasi/notifikasi';
import { DetailpengumumanPage } from '../pages/detailpengumuman/detailpengumuman';
import { DokumenPage } from "../pages/dokumen/dokumen";
import { DetaildokumenPage } from '../pages/detaildokumen/detaildokumen';

import { KuliahPage } from '../pages/kuliah/kuliah';
import { JadwalPage } from '../pages/jadwal/jadwal';
import { MateriPage } from '../pages/materi/materi';
import { DetailmateriPage } from "../pages/detailmateri/detailmateri";
import { TugasPage } from '../pages/tugas/tugas';
import { DetailtugasPage } from "../pages/detailtugas/detailtugas";
import { DosenPage } from '../pages/dosen/dosen';
import { SkripsiPage } from '../pages/skripsi/skripsi';

import { ProfilPage } from '../pages/profil/profil';
import { TabsPage } from '../pages/tabs/tabs';

import { NotesPage } from "../pages/notes/notes";
import { AddnotesPage } from "../pages/addnotes/addnotes";
import { DetailnotesPage } from "../pages/detailnotes/detailnotes";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RestProvider } from '../providers/rest/rest';
import { DataProvider } from '../providers/data/data';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OneSignal } from "@ionic-native/onesignal";
import { Network } from '@ionic-native/network';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    LoginPage, ForgotpasswordPage,
    BerandaPage, NotifikasiPage, DetailpengumumanPage,
    DokumenPage, DetaildokumenPage,
    KuliahPage,
    JadwalPage, MateriPage, DetailmateriPage, TugasPage, DetailtugasPage,
    DosenPage, SkripsiPage,
    ProfilPage,
    TabsPage,
    NotesPage, AddnotesPage, DetailnotesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule, FilterPipeModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, ForgotpasswordPage,
    BerandaPage, NotifikasiPage, DetailpengumumanPage,
    DokumenPage, DetaildokumenPage,
    KuliahPage,
    JadwalPage, MateriPage, DetailmateriPage, TugasPage, DetailtugasPage,
    DosenPage, SkripsiPage,
    ProfilPage,
    TabsPage,
    NotesPage, AddnotesPage, DetailnotesPage
  ],
  providers: [
    OneSignal, Network, AndroidPermissions,
    File, FileTransfer, FileTransferObject,
    Camera,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    DataProvider,
    PushnotificationProvider
  ]
})
export class AppModule { }
