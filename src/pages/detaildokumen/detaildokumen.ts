import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Dokumen } from '../../Dokumen';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-detaildokumen',
  templateUrl: 'detaildokumen.html',
})
export class DetaildokumenPage {
  ID: any;
  dataDokumen: Dokumen[];

  constructor(public navParams: NavParams, public viewCtrl: ViewController,
    public alerCtrl: AlertController, public restProvider: RestProvider,
    private transfer: FileTransfer, private file: File) {
    this.ID = navParams.get('ID');
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getDokumenDetail(this.ID)
        .subscribe(data => {
          this.dataDokumen = data['data'];
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
    this.initialRequest();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  download(id_dokumen, namafile) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    //const url = 'http://localhost/Digistudent/download/download_materi/' + id_kelas + '/' + pertemuan;
    const url = 'http://digitalstudent.ryansurjadi.com/Download/download_dokumen/' + id_dokumen;
    const file = 'Dokumen-' + namafile.replace(/\//g, '_').slice(10);
    const dir = this.file.externalRootDirectory + '/Download/' + file;
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
      subTitle: 'File Gagal di Unduh, Silakan Coba Kembali ',
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
