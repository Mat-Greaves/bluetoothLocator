import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSelectPage } from './user-select';

@NgModule({
  declarations: [
    UserSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSelectPage),
  ],
})
export class UserSelectPageModule {}
