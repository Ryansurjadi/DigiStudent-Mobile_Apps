import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { AddnotesPage } from '../addnotes/addnotes';
import { DetailnotesPage } from '../detailnotes/detailnotes';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',

})
export class NotesPage {
  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public Data: DataProvider) {
    this.Data.getNotes().then((notes) => {
      if (notes) {
        this.items = notes;
        console.log(this.items);
      }
    });
  }

  addNotes() {

    let addModal = this.modalCtrl.create(AddnotesPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveNotes(item);
      }

    });

    addModal.present();

  }

  saveNotes(item) {
    console.log(item);
    this.items.push(item);
    this.Data.saveNote(this.items);
  }

  viewNotesDetail(item) {
    console.log(item);
    this.navCtrl.push(DetailnotesPage, {
      item: item
    });
  }
  removeNotes(item) {
    for (var i = 0; i < this.items.length; i++) {

      if (this.items[i] == item) {
        this.items.splice(i, 1);
        //console.log(this.items[i].title);
        this.Data.saveNote(this.items);
      }

    }
  }

}
