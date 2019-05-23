import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Tugas } from '../../Tugas';
import { DetailtugasPage } from '../detailtugas/detailtugas';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tugas',
  templateUrl: 'tugas.html',
})
export class TugasPage {

  dataTugas: Tugas[];

  judul: any;
  params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
    public alerCtrl: AlertController, private storage: Storage, private loadingCtrl: LoadingController) {
    this.judul = "Tugas"

    storage.get('NIM').then((val) => {
      this.params = val;
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getTugas(this.params)
        .subscribe(data => {
          this.dataTugas = data['data'];
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
    this.navCtrl.push(DetailtugasPage, { Id_kelas: id });
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
