import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailnotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailnotes',
  templateUrl: 'detailnotes.html',
})
export class DetailnotesPage {

  title: any;
  description: any;
  date: any;

  constructor(public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.date = this.navParams.get('item').date;
  }

}
