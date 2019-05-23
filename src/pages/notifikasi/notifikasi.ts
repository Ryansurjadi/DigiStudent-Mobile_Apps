import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
//import { DatePipe } from '@angular/common';

import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Notifikasi } from '../../Notifikasi';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NotifikasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifikasi',
  templateUrl: 'notifikasi.html',
})
export class NotifikasiPage {

  dataNotifikasi: Notifikasi[];
  term: string;
  judul: any;
  uuid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
    public alerCtrl: AlertController, private storage: Storage, private loadingCtrl: LoadingController) {
    this.judul = "Notifikasi"
    storage.get('UUID').then((val) => {
      this.uuid = val;
    });

  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getNotifikasi(this.uuid)
        .subscribe(data => {
          this.dataNotifikasi = data['data'];
          console.log(data['data']);
        },
          error => {
            this.show404();
          },
          () => resolve("good")
        );
    });
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: ' Mengambil Data ...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.initialRequest();
    }, 500);
  }

  ionViewDidEnter() {
    return new Promise((resolve, reject) => {
      this.restProvider.getChangeNotifikasi(this.uuid)
        .subscribe(data => {
          this.dataNotifikasi = data['data'];
          //console.log('value change' + data['data']);
        },
          error => {
            this.show404();
          },
          () => resolve("good")
        );
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.initialRequest();
      refresher.complete();
    }, 2000);
  }

  ionViewDidLeave() {

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  show404() {
    const alert = this.alerCtrl.create({
      title: 'Error',
      subTitle: 'Terjadi Masalah, Silakan Buka Kembali Aplikasi ',
      buttons: ['OK']
    });
    alert.present();
  }
}
