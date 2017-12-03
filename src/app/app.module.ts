import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocatorPage } from '../pages/locator/locator';
import { AddFriendPage } from '../pages/add-friend/add-friend'
import { UserSelectPage } from '../pages/user-select/user-select';
import { MenuPage } from '../pages/menu/menu';
import { ManagePage } from '../pages/manage/manage';
import { LocateFriendPage } from '../pages/locate-friend/locate-friend';

import { ObjectsProvider } from '../providers/objects/objects';
import { HttpModule } from "@angular/http"
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './app.firebaseconfig';
import { BeaconProvider } from '../providers/beacon/beacon';
import { IBeacon } from '@ionic-native/ibeacon';
import { Vibration } from '@ionic-native/vibration';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocatorPage,
    AddFriendPage,
    UserSelectPage,
    MenuPage,
    ManagePage,
    LocateFriendPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocatorPage,
    AddFriendPage,
    UserSelectPage,
    MenuPage,
    ManagePage,
    LocateFriendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ObjectsProvider,
    BeaconProvider,
    IBeacon,
    Vibration
  ]
})
export class AppModule {}
