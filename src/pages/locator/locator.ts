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

import { LocateFriendPage } from '../locate-friend/locate-friend';

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
  friendBeacons: Beacon[] = [];
  user: any;
  me: any;
  beaconRegion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone,
  public platform: Platform, public beaconProvider: BeaconProvider, public events: Events ) {
    this.user = navParams.get('user');
    this.beaconRegion = {
      uuid: 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA',
      major: this.user.details.major,
      minor: this.user.details.minor
    }
    console.log(this.user.friends)
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.beaconProvider.initialise().then((isInitialised) => {
        if (isInitialised) {
        this.listenToBeaconEvents();
        }
      });
    })
    .then( () => {
      this.beaconProvider.startAdvertising(this.beaconRegion);
    });
  }

  getStatus() {
    setTimeout( () => {
      this.beaconProvider.getAdvertising().then( res => {
        console.log('beacon is:' + res);
      }).then( () => this.getStatus())
    }, 1000)

  }
  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', async (data) => {
      // update the UI with the beacon list
      this.zone.run(() => {
        this.friendBeacons = [];
        const filteredBeacons = data.beacons.filter( beacon => {
          let count = 0;
          for(let i = 0; i < this.user.friends.length; i++){
            if(Number(beacon.major) === this.user.friends[i].major && Number(beacon.minor) === this.user.friends[i].minor){
              this.user.friends[i].rssi = beacon.rssi;
              return true;
            }
          }
          return false;
        })
        filteredBeacons.forEach((beacon) => {
          let beaconObject = new Beacon(beacon);
          this.friendBeacons.push(beaconObject);
        });
      });
    });
  }

  friendButtonOnClick(friend) {
    this.navCtrl.push(LocateFriendPage, { friend: friend });
  }
}
