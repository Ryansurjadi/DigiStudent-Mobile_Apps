import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Skripsi } from '../../Skripsi';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



@Component({
  selector: 'page-skripsi',
  templateUrl: 'skripsi.html'
})
export class SkripsiPage {

  dataSkripsi: Skripsi[];
  keyword: any = { Mahasiswa: '' };
  judul_page: any;
  loading: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider,
    public alerCtrl: AlertController, private transfer: FileTransfer, private file: File,
    private loadingCtrl: LoadingController) {
    this.judul_page = "Skripsi"

    this.loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getSkripsi()
        .subscribe(data => {
          this.dataSkripsi = data['data'];
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

  download(id_skripsi, namafile) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    //const url = 'http://localhost/Digistudent/download/download_materi/' + id_kelas + '/' + pertemuan;
    const url = 'http://digitalstudent.ryansurjadi.com/Download/download_skripsi/' + id_skripsi;
    const file = 'Skripsi-' + namafile.replace(/\//g, '_').slice(10);
    const dir = this.file.externalRootDirectory + '/Download/Skripsi' + file;
    fileTransfer.download(url, dir, true).then((entry) => {
      // console.log('download complete: ' + entry.toURL());
      // console.log('download complete: ' + dir);
      this.showDownloadCompleted(file);
    }, (error) => {
      // handle error
      this.showDownloadError();
    });
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

  showDownloadError() {
    const alert = this.alerCtrl.create({
      title: 'Gagal',
      subTitle: 'Terjadi Masalah, Silakan Coba Kembali ',
      buttons: ['OK']
    });
    alert.present();
  }

  showDownloadCompleted(params) {
    const alert = this.alerCtrl.create({
      title: 'Sukses',
      subTitle: 'File Berhasil Di Unduh ke Folder Download...',
      message: 'Nama File : ' + params,
      buttons: ['OK']
    });
    alert.present();
  }

}
