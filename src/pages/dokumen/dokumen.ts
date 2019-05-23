import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Dokumen } from '../../Dokumen';
import { DetaildokumenPage } from '../detaildokumen/detaildokumen';

@IonicPage()

@Component({
  selector: 'page-dokumen',
  templateUrl: 'dokumen.html',
})
export class DokumenPage {
  dataDokumen: Dokumen[];
  keyword: any = { Judul: '' };
  judul: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, public alerCtrl: AlertController,
    public modalCtrl: ModalController, private loadingCtrl: LoadingController) {
    this.judul = "Dokumen"
    this.loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getDokumen()
        .subscribe(data => {
          this.dataDokumen = data['data'];
          this.loading.dismiss();
        },
          error => {
            this.loading.dismiss();
            this.show404();
          },
          () => resolve("good")
        );
    });
  }

  ionViewWillEnter() {
    this.loading.present();
    this.initialRequest();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.initialRequest();
      refresher.complete();
    }, 2000);
  }

  openDetailDokumen(params) {
    const modal = this.modalCtrl.create(DetaildokumenPage, { ID: params });
    modal.present();
    // console.log(params);
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
