import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EventModel } from 'src/app/events/models/event.model';
import { UserInfoModel } from 'src/app/security/pages/models/user-info.model';
import { SchockClient } from '../clients/schocklogic.client';
import { SignUpModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SchockClient {

  constructor(@Inject(HttpClient) http: HttpClient) { super('users', http); }

  public signUp(data: SignUpModel) {
    const path = this.versioned_path('signup');
    return this.post<any>(path, data);
  }

  public list() {
    return this.get<UserInfoModel[]>(this.versioned_path(''));
  }

  public myEvents() {
    return this.get<EventModel[]>(this.versioned_path('my/events'));
  }
}
