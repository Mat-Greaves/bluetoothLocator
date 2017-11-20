import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Friend } from '../../providers/objects/objects';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.friend = navParams.get('friend');
    this.distance = Math.floor(Math.random() * 30);
  }

  // private getDistance() {
  //   this.distance = Observable
  //     .interval(1000)
  //     .mergeMapTo(this.fetchDistance())
  //     .map(res => res.json())
  // }
  //
  // private fetchDistance() {
  //   return {
  //     distance: Math.floor(Math.random() * 30)
  //   }
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LocatorPage');
  }
}
