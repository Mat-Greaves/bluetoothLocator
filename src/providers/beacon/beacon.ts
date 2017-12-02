import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeaconProvider {
  delegate: any;
  region: any;
  myRegion: any;
  icyRegion: any;
  blueberryRegion: any;
  mintRegion: any;
  estimoteRegion: any;

  constructor(public platform: Platform, public events: Events, private ibeacon: IBeacon) {
  }

  initialise(): any {
  let promise = new Promise((resolve, reject) => {
  // we need to be running on a device
  if (this.platform.is('cordova')) {

  // Request permission to use location on iOS
  this.ibeacon.requestAlwaysAuthorization();

  //enable bluetooth if it isn't already ANDROID ONLY
  this.ibeacon.isBluetoothEnabled()
  .then( (res) => {
    if (!res) {
      this.ibeacon.enableBluetooth();
    }
  })

  // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
  this.region = this.ibeacon.BeaconRegion('deskBeacon', 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA');
  this.myRegion = this.ibeacon.BeaconRegion('me', 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA', 0, 1, false);
  this.estimoteRegion = this.ibeacon.BeaconRegion('me','b9407f30-f5f8-466e-aff9-25556b57fe6d');
  this.icyRegion = this.ibeacon.BeaconRegion('icyMarshmellow', 'b9407f30-f5f8-466e-aff9-25556b57fe6d', 14381, 15414, false);
  this.blueberryRegion = this.ibeacon.BeaconRegion('blueberryPie', 'b9407f30-f5f8-466e-aff9-25556b57fe6d', 55395, 4865, false);
  this.mintRegion = this.ibeacon.BeaconRegion('mintCocktail', 'b9407f30-f5f8-466e-aff9-25556b57fe6d', 14381, 15414, false);
  // create a new delegate and register it with the native layer
  this.delegate = this.ibeacon.Delegate();

  // Subscribe to some of the delegate’s event handlers
  this.delegate.didRangeBeaconsInRegion()
  .subscribe(
    data => {
      this.events.publish('didRangeBeaconsInRegion', data);
    },
    error => console.error()
  );
  resolve(true);
  //start ranging
  this.ibeacon.startRangingBeaconsInRegion(this.region)
    .then(
      () => {
        resolve(true);
      },
      error => {
        console.error('Failed to begin monitoring: ', error);
        resolve(false);
      });
    } else {
      console.error("This application needs to be running on a device");
      resolve(false);
    }
    });
    return promise;
    }

    startAdvertising(): any {
      let promise = new Promise((resolve, reject) => {
        console.log('start advertising');
        this.ibeacon.startAdvertising(this.myRegion, 100)
          .then(
            () => {
              resolve(true);
            },
            error => {
              console.error('Failed to start advertising ', error);
              resolve(false);
            });
        return promise;
      });
    }

    getAdvertising(): any {
      return this.ibeacon.isAdvertising();
    }
  }
