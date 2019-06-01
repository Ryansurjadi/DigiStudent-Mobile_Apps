import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';

import { Jadwal_kuliah } from '../../Jadwal_kuliah';
import { Jadwal_ujian } from '../../Jadwal_ujian';

import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-jadwal',
  templateUrl: 'jadwal.html',
})
export class JadwalPage {

  dataJadwalKuliah: any;
  dataJadwalKuliah_senin: Jadwal_kuliah[];
  dataJadwalKuliah_selasa: Jadwal_kuliah[];
  dataJadwalKuliah_rabu: Jadwal_kuliah[];
  dataJadwalKuliah_kamis: Jadwal_kuliah[];
  dataJadwalKuliah_jumat: Jadwal_kuliah[];
  dataJadwalKuliah_sabtu: Jadwal_kuliah[];

  dataJadwalUjian: Jadwal_ujian[];

  judul: any;
  jadwal: string;
  params: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, public alerCtrl: AlertController,
    private storage: Storage, private loadingCtrl: LoadingController) {
    this.judul = "Jadwal"
    this.jadwal = "kuliah"
    storage.get('NIM').then((val) => {
      this.params = val;
    });
  }

  initialRequest_JadwalKuliah() {
    return new Promise((resolve, reject) => {
      this.restProvider.getJadwalkuliah(this.params)
        .subscribe(data => {
          this.dataJadwalKuliah_senin = data['data'].senin;
          this.dataJadwalKuliah_selasa = data['data'].selasa;
          this.dataJadwalKuliah_rabu = data['data'].rabu;
          this.dataJadwalKuliah_kamis = data['data'].kamis;
          this.dataJadwalKuliah_jumat = data['data'].jumat;
          this.dataJadwalKuliah_sabtu = data['data'].sabtu;
        },
          error => {
            this.show404();
          },
          () => resolve("good")
        );
    });
  }

  initialRequest_JadwalUjian() {
    return new Promise((resolve, reject) => {
      this.restProvider.getJadwalujian(this.params)
        .subscribe(data => {
          this.dataJadwalUjian = data['data'];
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
      this.initialRequest_JadwalKuliah();
      this.initialRequest_JadwalUjian();
    }, 500);

  }

  doRefreshkuliah(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.initialRequest_JadwalKuliah();
      refresher.complete();
    }, 2000);
  }

  doRefreshujian(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.initialRequest_JadwalUjian();
      refresher.complete();
    }, 2000);
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
