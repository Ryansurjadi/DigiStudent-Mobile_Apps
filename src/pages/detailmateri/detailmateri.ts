import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Pertemuan } from '../../Pertemuan';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



@IonicPage()
@Component({
  selector: 'page-detailmateri',
  templateUrl: 'detailmateri.html',
})
export class DetailmateriPage {

  judul: any;
  dataPertemuan: Pertemuan[];
  params: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, public alerCtrl: AlertController
    , private transfer: FileTransfer, private file: File) {

    this.params = this.navParams.get('Id_kelas');
  }



  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getPertemuan(this.params)
        .subscribe(data => {
          this.dataPertemuan = data['data'];
          if (this.dataPertemuan != null) {
            this.judul = data['data'][0].Matakuliah;
          } else {
            this.judul = 'Pertemuan';
          }
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

  download(matkul, id_kelas, pertemuan, namafile) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    //const url = 'http://localhost/Digistudent/download/download_materi/' + id_kelas + '/' + pertemuan;
    const url = 'http://digitalstudent.ryansurjadi.com/Download/download_materi/' + id_kelas + '/' + pertemuan;
    const file = matkul + '_pertemuan_' + pertemuan + '-' + namafile.replace(/\//g, '_').slice(40);
    const dir = this.file.externalRootDirectory + '/Download/Materi/' + file;
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
      title: 'Gagal',
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
