import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocatorPage } from '../locator/locator';
import { ManagePage } from '../manage/manage';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  findButtonOnClick(user: any) {
    this.navCtrl.push(LocatorPage, { user: user});
  }

  manageButtonOnClick(user: any) {
    this.navCtrl.push(ManagePage, { user: user});
  }
}
