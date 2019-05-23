import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  Inputemail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alerCtrl: AlertController, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  submit() {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      formData.set('email', this.Inputemail);
      this.restProvider.postPassword(formData)
        .subscribe(data => {
          if (data['Status'] === '200') {
            this.show200();
          }
          else if (data['Status'] === '204') {
            this.show204();
          }
          else if (data['Status'] === '404') {
            this.show_404();
          }
        },
          error => {
            this.show404();
          },
          () => resolve("good")
        );
    });
  }

  back() {
    this.navCtrl.pop();
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

  show_404() {
    const alert = this.alerCtrl.create({
      title: 'Gagal',
      subTitle: 'Email Tidak Terdaftar !',
      buttons: ['OK']
    });
    alert.present();
  }

  show204() {
    const alert = this.alerCtrl.create({
      title: 'Gagal',
      subTitle: 'Email Gagal di Kirim ',
      buttons: ['OK']
    });
    alert.present();
  }

  show200() {
    const alert = this.alerCtrl.create({
      title: 'Berhasil',
      subTitle: 'Silahkan Cek Email Anda !',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }
}
