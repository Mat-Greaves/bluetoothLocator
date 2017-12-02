import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../providers/objects/objects';
import { LocatorPage } from '../locator/locator';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the UserSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-select',
  templateUrl: 'user-select.html',
})
export class UserSelectPage {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {
  }

  ionViewWillEnter() {
    this.usersCollection = this.afs.collection('users');
    this.users = this.usersCollection.valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSelectPage');
  }

  friendButtonOnClick(user: any) {
    this.navCtrl.push(MenuPage, { user: user});
  }
}
