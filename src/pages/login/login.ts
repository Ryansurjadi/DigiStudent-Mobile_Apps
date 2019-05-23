import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Users } from '../../Users';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';

import { PushnotificationProvider } from '../../providers/pushnotification/pushnotification';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  Inputemail: string;
  Inputpassword: string;
  dataUser: Users[];
  level: any;
  uuid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, public alerCtrl: AlertController,
    private storage: Storage, public loadingCtrl: LoadingController,
    public push: PushnotificationProvider) {
  }

  login() {
    return new Promise((resolve, reject) => {
      this.restProvider.Auth(this.Inputemail, this.Inputpassword)
        .subscribe(data => {
          if (data['status'] != '200') {
            this.show204();
          } else {
            this.dataUser = data['data'][0];
            if (this.dataUser['Level'] === 'Mahasiswa') {
              this.storage.set('UUID', this.dataUser['UUID']);
              this.storage.set('Nama', this.dataUser['Nama']);
              this.storage.set('NIM', this.dataUser['NIM']);
              this.storage.set('Id_prodi', this.dataUser['Id_prodi']);
              this.storage.set('Level', this.dataUser['Level']);
              this.storage.set('Logged', 'true');

              let loading = this.loadingCtrl.create({
                content: 'Autentikasi ...'
              });

              loading.present();

              setTimeout(() => {
                loading.dismiss();
                console.log(this.dataUser['UUID'] + " " + this.dataUser['Level']);
                this.push.sendTag(this.dataUser['UUID'], this.dataUser['Level']);
                this.navCtrl.push(TabsPage);
              }, 500);
            }
            else if (this.dataUser['Level'] === 'Dosen') {
              this.storage.set('UUID', this.dataUser['UUID']);
              this.storage.set('Nama', this.dataUser['Nama']);
              this.storage.set('Nid', this.dataUser['Nid']);
              this.storage.set('Id_prodi', this.dataUser['Id_prodi']);
              this.storage.set('Level', this.dataUser['Level']);
              this.storage.set('Logged', true);

              let loading = this.loadingCtrl.create({
                content: 'Autentikasi ...'
              });

              loading.present();

              setTimeout(() => {
                loading.dismiss();
                console.log(this.dataUser['UUID'] + " " + this.dataUser['Level']);
                this.push.sendTag(this.dataUser['UUID'], this.dataUser['Level']);
                this.navCtrl.push(TabsPage);
              }, 500);
            }
          }
        },
          error => {
            this.show404();
          },
          () => resolve("good")
        );
    });

  }

  forgot() {
    this.navCtrl.push(ForgotpasswordPage);
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

  show204() {
    const alert = this.alerCtrl.create({
      title: 'Gagal',
      subTitle: 'Email atau Password Tidak Terdaftar',
      buttons: ['OK']
    });
    alert.present();
  }
}
