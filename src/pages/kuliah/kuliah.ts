import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JadwalPage } from '../jadwal/jadwal';
import { SkripsiPage } from '../skripsi/skripsi';
import { DosenPage } from '../dosen/dosen';
import { MateriPage } from '../materi/materi';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KuliahPage');
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
}
