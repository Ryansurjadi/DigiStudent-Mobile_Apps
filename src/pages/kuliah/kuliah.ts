import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { JadwalPage } from '../jadwal/jadwal';
import { SkripsiPage } from '../skripsi/skripsi';
import { DosenPage } from '../dosen/dosen';
import { MateriPage } from '../materi/materi';
import { TugasPage } from '../tugas/tugas';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Listtugas } from '../../Listtugas';
/**
 * Generated class for the KuliahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kuliah',
  templateUrl: 'kuliah.html',
})
export class KuliahPage {
  params: any;
  dataList: Listtugas[];
  type: any = 'todo';

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
    public alerCtrl: AlertController, private storage: Storage, private loadingCtrl: LoadingController) {
    storage.get('NIM').then((val) => {
      this.params = val;
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getListTugas(this.params, this.type)
        .subscribe(data => {
          this.dataList = data['data'];
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

  goToJadwal() {
    this.navCtrl.push(JadwalPage)
  }

  goToSkripsi() {
    this.navCtrl.push(SkripsiPage)
  }

  goToDosen() {
    this.navCtrl.push(DosenPage)
  }

  goToMateri() {
    this.navCtrl.push(MateriPage)
  }

  goToTugas() {
    this.navCtrl.push(TugasPage)
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
