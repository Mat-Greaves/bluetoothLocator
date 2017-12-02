import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Friend } from '../../providers/objects/objects';
import { Beacon } from '../../providers/objects/objects';
import { Observable } from "rxjs/Observable";
import { NgZone } from '@angular/core'
import { IBeacon } from '@ionic-native/ibeacon';
import { Vibration } from '@ionic-native/Vibration';
import { BeaconProvider } from '../../providers/beacon/beacon';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';
import { Chart } from 'chart.js';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { AndroidPermissions } from '@ionic-native/android-permissions';
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
  currentRSSI: number = -40;
  count: number = 0;
  thing: number;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas1') lineCanvas1;
  lineChart: any;
  lineChart1: any;
  data: number[] = [];
  labels: string[] = [];
  wifiData1: number[] = [];
  wifiData2: number[] = [];
  wifiData3: number[] = [];
  permissions: string[] = ['ACCESS_WIFI_STATE'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone,
  public platform: Platform, public beaconProvider: BeaconProvider, public events: Events,
  private vibration: Vibration, private hotspot: Hotspot, private androidPermissions: AndroidPermissions) {
    this.friend = navParams.get('friend');
    for (let i = 1; i<=100; i++) {
      this.data.push(0);
      this.wifiData1.push(0);
      this.wifiData2.push(0);
      this.wifiData3.push(0);
      this.labels.push(i.toString());
    }
  }

  ionViewDidLoad() {
    this.platform.ready()
    .then(() => {
      this.beaconProvider.initialise().then((isInitialised) => {
        if (isInitialised) {
        this.listenToBeaconEvents();
        }
      });
    })
    .then( () => {
      this.beaconProvider.startAdvertising();
    })
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', async (data) => {
      // update the UI with the beacon list
      this.zone.run(() => {
        if (data.beacons.length > 0 ) {
          this.count = 0;
          this.currentRSSI = this.currentRSSI*0 + 1*data.beacons[0].rssi;
        } else {
          this.count++;
          if ( this.count >5 ) {
            this.currentRSSI = -100;
          }
        }
        this.data.shift();
        this.data.push(this.currentRSSI );
        this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
          console.log(networks);

          this.wifiData1.shift();
          this.wifiData1.push(networks.filter( (network) => network.SSID === "AAAAA")[0].level)
          this.wifiData2.shift();
          this.wifiData2.push(networks.filter( (network) => network.SSID === "David’s Work iPhone")[0].level)
          this.wifiData3.shift();
          this.wifiData3.push(networks.filter( (network) => network.SSID === "Ben’s iPhone")[0].level)
        });
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.data,
                spanGaps: false,
              }
            ]
          }
        });
        this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "AAAAAAA",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(0,255,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,255,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(0,255,0,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.wifiData1,
                spanGaps: false,
              },
              {
                label: "David",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(255,0,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255,0,0,1)",
                pointHoverBorderColor: "rgba(255,0,0,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.wifiData2,
                spanGaps: false,
              },
              {
                label: "Ben",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,0,255,0.4)",
                borderColor: "rgba(0,0,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,0,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(,0,255,1)",
                pointHoverBorderColor: "rgba(0,0,255,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.wifiData3,
                spanGaps: false,
              },
            ]
          }
        });
      });
    });
  }
}
