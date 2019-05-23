import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Materi } from '../../Materi';
import { DetailmateriPage } from '../detailmateri/detailmateri';


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
  params: any = '535150005'

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
    public alerCtrl: AlertController) {
    this.judul = "Materi"
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
    this.initialRequest();
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
