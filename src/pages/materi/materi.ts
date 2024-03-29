import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Materi } from '../../Materi';
import { DetailmateriPage } from '../detailmateri/detailmateri';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MateriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materi',
  templateUrl: 'materi.html',
  // providers: [FileTransfer, FileTransferObject, File]
})
export class MateriPage {

  dataMateri: Materi[];

  judul: any;
  params: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
    public alerCtrl: AlertController, private storage: Storage, private loadingCtrl: LoadingController) {
    this.judul = "Materi"
    storage.get('NIM').then((val) => {
      this.params = val;
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getMateri(this.params)
        .subscribe(data => {
          this.dataMateri = data['data'];
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

  goToPertemuan(id) {
    this.navCtrl.push(DetailmateriPage, { Id_kelas: id });
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
