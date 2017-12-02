import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocateFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locate-friend',
  templateUrl: 'locate-friend.html',
})
export class LocateFriendPage {
    friend: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.friend = navParams.get('friend');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocateFriendPage');
  }

}
