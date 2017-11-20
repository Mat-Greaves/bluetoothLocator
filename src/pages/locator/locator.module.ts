import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocatorPage } from './locator';

@NgModule({
  declarations: [
    LocatorPage,
  ],
  imports: [
    IonicPageModule.forChild(LocatorPage),
  ],
})
export class LocatorPageModule {}
