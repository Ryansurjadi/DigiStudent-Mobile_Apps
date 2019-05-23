import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Storage } from '@ionic/storage';

import { LoginPage } from "../pages/login/login";
import { TabsPage } from '../pages/tabs/tabs';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  logged: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    androidPermissions: AndroidPermissions, private storage: Storage, private pushnotification: PushnotificationProvider) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.styleLightContent();
        androidPermissions.requestPermissions(
          [
            androidPermissions.PERMISSION.CAMERA,
            androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            androidPermissions.PERMISSION.ACCESS_NOTIFICATION_POLICY,
            androidPermissions.PERMISSION.BIND_NOTIFICATION_LISTENER_SERVICE
          ]
        );

      }
      pushnotification.init();
      splashScreen.hide();


      this.storage.get('Logged').then((val) => {
        this.logged = val;
        console.log(this.logged);
        if (this.logged == true || this.logged == 'true') {
          this.rootPage = TabsPage;
        } else if (this.logged == null || this.logged == '') {
          this.rootPage = LoginPage;
        }
      });


    });
  }


}
