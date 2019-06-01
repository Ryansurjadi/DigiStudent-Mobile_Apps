import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Dosendetail } from '../../Dosendetail';
/**
 * Generated class for the DetaildosenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detaildosen',
  templateUrl: 'detaildosen.html',
})
export class DetaildosenPage {

  ID: any;
  datadosen: Dosendetail[];
  constructor(public navParams: NavParams, public viewCtrl: ViewController, public alerCtrl: AlertController, public restProvider: RestProvider) {
    this.ID = navParams.get('ID');
    //console.log(this.ID);
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getJadwalDosen(this.ID)
        .subscribe(data => {
          this.datadosen = data['data'];
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
