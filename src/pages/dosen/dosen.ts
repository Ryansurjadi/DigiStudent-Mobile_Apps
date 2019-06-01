import { Component } from '@angular/core';
import { NavController, IonicPage,, LoadingController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Dosen } from '../../Dosen';
import { DetaildosenPage } from '../detaildosen/detaildosen';



@IonicPage()
@Component({
  selector: 'page-dosen',
  templateUrl: 'dosen.html',
})
export class DosenPage {
  dataDosen: Dosen[];
  judul: string;
  keyword: any = { Nama: '' };
  loading: any;
  params: any;


  constructor(public navCtrl: NavController, public restProvider: RestProvider,
    public alerCtrl: AlertController, public modalCtrl: ModalController,
    private loadingCtrl: LoadingController) {
    this.judul = "Dosen"

    this.loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getDosen()
        .subscribe(data => {
          this.dataDosen = data['data'];
          this.loading.dismiss();
        },
          error => {
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

  goToDetail(params) {
    const modal = this.modalCtrl.create(DetaildosenPage, { ID: params });
    modal.present();
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
