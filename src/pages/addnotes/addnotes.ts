import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the AddnotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addnotes',
  templateUrl: 'addnotes.html',
  providers: [DatePipe]
})
export class AddnotesPage {

  title: string;
  description: string;
  currentDate: string;

  constructor(public navCtrl: NavController, public view: ViewController, public datePipe: DatePipe) {

  }

  saveItem() {
    const now = Date.now();
    this.currentDate = this.datePipe.transform(now, 'MMM d, y');
    let newNotes = {
      title: this.title,
      description: this.description,
      date: this.currentDate
    };

    this.view.dismiss(newNotes);

  }

  close() {
    this.view.dismiss();
  }

}
