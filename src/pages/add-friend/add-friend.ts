import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Friend } from '../../providers/objects/objects';

const iconList = ['beer', 'bonfire', 'color-palette', 'flask', 'flower', 'glasses'];

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {
  friendsCollection: AngularFirestoreCollection<Friend>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('friendsCollection'));
    this.friendsCollection = navParams.get('friendsCollection');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
  }

  saveOnClick(username: string) {
    this.friendsCollection.add({
      friendName: username,
      icon: iconList[Math.floor(Math.random() * iconList.length)],
    });
    this.navCtrl.pop();
  }
}
