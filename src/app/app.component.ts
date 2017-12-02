import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { UserSelectPage } from '../pages/user-select/user-select';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserSelectPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth)
        this.rootPage = UserSelectPage; //make this login page
      else
        this.rootPage = UserSelectPage;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
