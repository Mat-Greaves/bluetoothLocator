import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Friend } from '../../providers/objects/objects';
import { Beacon } from '../../providers/objects/objects';
import { Observable } from "rxjs/Observable";
import { NgZone } from '@angular/core'
import { IBeacon } from '@ionic-native/ibeacon';
import { BeaconProvider } from '../../providers/beacon/beacon'
import { Vibration } from '@ionic-native/vibration';
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
  public platform: Platform, public beaconProvider: BeaconProvider, public events: Events, private vibration: Vibration) {
    this.user = navParams.get('user');
    this.beaconRegion = {
      uuid: 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA',
      major: this.user.details.major,
      minor: this.user.details.minor
    }
    for (let friend of this.user.friends ) {
      friend.seen = false;
      friend.counter = 0;
    }
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
      console.log('here');
      // update the UI with the beacon list
      this.zone.run(() => {
        this.friendBeacons = [];
        const filteredBeacons = data.beacons.filter( beacon => {
          let count = 0;
          for(let i = 0; i < this.user.friends.length; i++){
            if(Number(beacon.major) === this.user.friends[i].major && Number(beacon.minor) === this.user.friends[i].minor){
              this.user.friends[i].rssi = beacon.rssi;
              this.user.friends[i].counter = 0;
              this.user.friends[i].seen = true;
              return true;
            }
          }
          return false;
        })
        filteredBeacons.forEach((beacon) => {
          let beaconObject = new Beacon(beacon);
          this.friendBeacons.push(beaconObject);
        });
        let foundClose = false;
        let foundFar = false;
        for (let beacon of filteredBeacons) {
          if(Number(beacon.rssi) >= -80) {
            foundClose = true;
          } else if(beacon.rssi) {
            foundFar = true;
          }
        }
        if(foundClose) {
          this.vibration.vibrate([100,100,100]);
        } else if (foundFar) {
          this.vibration.vibrate(100);
        }
      });
      for(let friend of this.user.friends) {
        if(!friend.seen){
          friend.counter++;
        }
        if(friend.counter>5){
          friend.rssi = undefined
          friend.counter = 0;
        }
        friend.seen = false;
      }
    });
  }

  friendButtonOnClick(friend) {
    this.navCtrl.push(LocateFriendPage, { friend: friend });
  }
}
