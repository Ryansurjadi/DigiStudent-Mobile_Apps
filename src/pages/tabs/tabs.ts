import { Component } from '@angular/core';

import { BerandaPage } from '../beranda/beranda';
import { DokumenPage } from '../dokumen/dokumen';
import { KuliahPage } from '../kuliah/kuliah';
import { ProfilPage } from '../profil/profil';

import { Storage } from '@ionic/storage';
import { Events, NavController, Platform, LoadingController } from 'ionic-angular';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BerandaPage;
  tab2Root = KuliahPage;
  tab3Root = DokumenPage;
  tab4Root = ProfilPage;
  level: any;

  constructor(public storage: Storage, events: Events, public navCtrl: NavController,
    public platform: Platform, private loadingCtrl: LoadingController) {
    console.log('jalan');
    this.storage.get('Level').then((val) => {
      this.level = val;
      console.log('sudah jalan');
      console.log(this.level);
    });
    platform.registerBackButtonAction(() => {
      platform.exitApp();
    });

  }

  // init() {
  //   this.storage.get('Level').then((val) => {
  //     this.level = val;
  //     console.log('sudah jalan');
  //     console.log(this.level);
  //   });
  // }

  // ionViewWillEnter() {
  //   let loading = this.loadingCtrl.create();

  //   loading.present();

  //   setTimeout(() => {
  //     loading.dismiss();
  //     this.init();
  //   }, 500);}
}

