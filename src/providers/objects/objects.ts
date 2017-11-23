import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ObjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObjectsProvider {

  constructor(public http: HttpClient) {
  }
}

export class Friend {
  icon: string;
  friendName: string;

  constructor(icon: string, friendName: string) {
    this.icon = icon;
    this.friendName = friendName;
  }
}
