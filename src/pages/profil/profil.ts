import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  reload: any;
  judul: string;
  dataUser: any;
  dataProfil: any;
  uuid: any
  dataPost: any;
  responses: any;
  level: any;
  loading: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, public alerCtrl: AlertController,
    private camera: Camera, public storage: Storage, public events: Events,
    private loadingCtrl: LoadingController, public appCtrl: App) {
    this.judul = "Profil";
    storage.get('UUID').then((val) => {
      this.uuid = val;
      console.log(this.uuid);
    });
    storage.get('Level').then((val) => {
      this.level = val;
      console.log(this.level);
    });
  }

  initialRequest() {
    return new Promise((resolve, reject) => {
      this.restProvider.getUserProfil(this.uuid, this.level).subscribe(data => {
        console.log(data);
        // console.log(data['status']);
        if (data['status'] == "200") {
          this.dataUser = data['data']['user'][0];
          this.dataProfil = data['data']['profil'][0];
          console.log(this.dataProfil);
          // this.loading.dismiss();
          // this.loading = null;
          // console.log(this.dataUser);
        } else if (data['status'] == "404") {
          // this.loading.dismiss();
          // this.loading = null;
          this.show404();
        }
      },
        error => {
          // this.loading.dismiss();
          this.loading = null;
          this.show404();
        },
        () => resolve("good")
      );
    });
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Mengambil Data Profil ...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.initialRequest();
    }, 2000);

  }

  updateFotoGallery() {
    const options: CameraOptions = {
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation: true,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let formData: FormData = new FormData();
      formData.set('userFile', base64Image);
      formData.set('UUID', this.uuid);

      return new Promise((resolve, reject) => {
        this.restProvider.postFotoProfil(formData)
          .subscribe(data => {
            this.responses = data['status'];
            if (this.responses != '200') {
              this.show201()
            } else {
              this.show200();
            }
          },
            error => {
              this.show404();
            },
            () => resolve("good")
          );
      });
    }, err => { });
  }

  updateFotoCamera() {
    const options: CameraOptions = {
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation: true,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let formData: FormData = new FormData();
      formData.set('userFile', base64Image);
      formData.set('UUID', this.uuid);

      return new Promise((resolve, reject) => {
        this.restProvider.postFotoProfil(formData)
          .subscribe(data => {
            this.responses = data['status'];
            if (this.responses != '200') {
              this.show201()
            } else {
              this.show200();
            }
          },
            error => {
              this.show404();
            },
            () => resolve("good")
          );
      });
    }, err => { });
  }

  showConfirm() {
    const confirm = this.alerCtrl.create({
      title: 'Ubah Foto Profil',
      buttons: [
        {
          text: 'Kamera',
          handler: () => {
            this.updateFotoCamera();
          }
        },
        {
          text: 'Galeri',
          handler: () => {
            this.updateFotoGallery();
          }
        }
      ]
    });
    confirm.present();
  }

  logout() {
    this.storage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage)
    // this.events.publish('user:logout');
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  show404() {
    const alert = this.alerCtrl.create({
      title: 'Galat',
      subTitle: 'Terjadi Masalah, Silahkan Buka Kembali Aplikasi',
      buttons: ['OK']
    });
    alert.present();
  }

  show201() {
    const alert = this.alerCtrl.create({
      title: 'Gagal',
      subTitle: 'Foto Gagal di Ubah !',
      buttons: ['OK']
    });
    alert.present();
  }

  show200() {
    const alert = this.alerCtrl.create({
      title: 'Berhasil',
      subTitle: 'Foto Berhasil di Ubah !',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.ionViewWillEnter();
          }
        }
      ]
    });
    alert.present();
  }

}
