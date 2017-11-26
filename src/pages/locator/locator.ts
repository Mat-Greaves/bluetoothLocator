import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Friend } from '../../providers/objects/objects';
import { Beacon } from '../../providers/objects/objects';
import { Observable } from "rxjs/Observable";
import { NgZone } from '@angular/core'
import { IBeacon } from '@ionic-native/ibeacon';
import { BeaconProvider } from '../../providers/beacon/beacon'
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
  beacons: Beacon[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone,
  public platform: Platform, public beaconProvider: BeaconProvider, public events: Events ) {
    this.friend = navParams.get('friend');
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.beaconProvider.initialise().then((isInitialised) => {
        if (isInitialised) {
        this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
    // update the UI with the beacon list
    console.log(data);
    this.zone.run(() => {
    this.beacons = [];
    let beaconList = data.beacons;
    beaconList.forEach((beacon) => {
      let beaconObject = new Beacon(beacon);
      this.beacons.push(beaconObject);
    });

  });

});
}
}
