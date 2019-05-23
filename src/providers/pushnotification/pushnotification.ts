import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from "ionic-angular";

@Injectable()
export class PushnotificationProvider {


  constructor(public http: HttpClient, public oneSignal: OneSignal, private platform: Platform) {
    console.log('Hello PushnotificationProvider Provider');
  }

  init() {

    this.oneSignal.startInit('31d5c798-f745-423e-a4b3-478c01c49631', '909714652765');
    // this.oneSignal.setSubscription(true);


    this.oneSignal.handleNotificationReceived()
      .subscribe(data => {
        console.log(data);
      },

        () => {
          // do something when notification is received
          console.log('Notification recivied');
        });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      console.log('Notification opened');
    });

    this.oneSignal.endInit();
  }

  sendTag(uuid, level) {
    console.log(uuid + " " + level);
    this.oneSignal.sendTags({
      UUID: uuid,
      Level: level
    });
    // let OneSignal = window["plugins"].OneSignal;
    // console.log(uuid + " " + level);
    // OneSignal.sendTags({
    //   UUID: uuid,
    //   Level: level
    // });
  }

  // init() {
  //   let OneSignal = window["plugins"].OneSignal;

  //   OneSignal
  //     .startInit('31d5c798-f745-423e-a4b3-478c01c49631', '909714652765')
  //     .inFocusDisplaying(OneSignal.OSInFocusDisplayOption.Notification)
  //     .handleNotificationOpened(function (jsonData) {
  //       console.log('OPENED');
  //     })
  //     .handleNotificationReceived(function (jsonData) {
  //       console.log('RECEIVED');
  //     })
  //     .endInit();
  // }
}
