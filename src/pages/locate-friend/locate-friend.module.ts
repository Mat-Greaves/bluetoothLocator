import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocateFriendPage } from './locate-friend';

@NgModule({
  declarations: [
    LocateFriendPage,
  ],
  imports: [
    IonicPageModule.forChild(LocateFriendPage),
  ],
})
export class LocateFriendPageModule {}
