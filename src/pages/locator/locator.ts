import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Friend } from '../../providers/objects/objects';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';
import { BLE } from '@ionic-native/BLE';

/**
 * Generated class for the LocatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locator',
  templateUrl: 'locator.html',
})
export class LocatorPage {
  friend: Friend;
  distance: any;

  devices: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ble: BLE) {
    this.devices = ble.startScan([]);
    this.friend = navParams.get('friend');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocatorPage');

  }

}
