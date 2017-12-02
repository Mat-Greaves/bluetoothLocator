import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocatorPage } from '../locator/locator';
import { AddFriendPage } from '../add-friend/add-friend';

import { Friend } from '../../providers/objects/objects'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friendsCollection: AngularFirestoreCollection<Friend>;
  friends: Observable<any[]>;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {

  }

  ionViewWillEnter() {
    this.friendsCollection = this.afs.collection('friends');
    this.friends = this.friendsCollection.valueChanges()
  }

  friendButtonOnClick(friend: Friend) {
    this.navCtrl.push(LocatorPage, { friend : friend});
  }

  addButtonOnCick() {
    this.navCtrl.push(AddFriendPage, { friendsCollection: this.friendsCollection })
  }
}
