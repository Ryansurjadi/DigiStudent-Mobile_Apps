import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NotifikasiPage } from '../notifikasi/notifikasi';
import { SkripsiPage } from '../skripsi/skripsi';
import { JadwalPage } from '../jadwal/jadwal';
import { DetailpengumumanPage } from '../detailpengumuman/detailpengumuman';

import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Pengumuman } from '../../Pengumuman';
import { MateriPage } from '../materi/materi';
import { NotesPage } from '../notes/notes';
import { LoginPage } from '../login/login';

import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { DosenPage } from '../dosen/dosen';

@IonicPage()
@Component({
  selector: 'page-beranda',
  templateUrl: 'beranda.html',
})
export class BerandaPage {

  judul: any;
  params: any;
  dataPengumuman: Pengumuman[];
  connected: Subscription;
  disconnected: Subscription;
  state: any;
  loading: any;
  level: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, public alerCtrl: AlertController,
    public modalCtrl: ModalController, private toast: ToastController,
    private network: Network, private loadingCtrl: LoadingController,
    public storage: Storage, public appCtrl: App) {
    // this.listenConnection();
    this.loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });

    this.storage.get('Level').then((val) => {
      this.level = val;
    });

    this.judul = "Digital Student"
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getPengumuman()
        .subscribe(data => {
          this.dataPengumuman = data['data'];
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
    }, 300);

  }


  goToNotifikasi() {
    this.navCtrl.push(NotifikasiPage);
  }

  goToSkripsi() {
    this.navCtrl.push(SkripsiPage)
  }

  goToDosen() {
    this.navCtrl.push(DosenPage)
  }

  goToNotes() {
    this.navCtrl.push(NotesPage)
  }

  logout() {
    this.storage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  goToJadwal() {
    this.navCtrl.push(JadwalPage)
  }

  goToMateri() {
    this.navCtrl.push(MateriPage)
  }

  openDetailPengumuman(params) {
    const modal = this.modalCtrl.create(DetailpengumumanPage, { ID: params });
    modal.present();
    // console.log(params);
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

  listenConnection() {
    this.network.onchange()
      .subscribe(data => {
        this.displayNetworkUpdate(data.type);
        console.log(data.type);
      }, error => console.error(error));
  }

  displayNetworkUpdate(connectionState: string) {

    this.toast.create({
      message: 'Koneksi Anda  Sekarang ' + connectionState,
      duration: 3000
    }).present();
  }

}
