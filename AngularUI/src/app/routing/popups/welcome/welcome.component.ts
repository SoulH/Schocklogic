import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/indexeddb';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public user: UserModel|null = null;

  constructor() { 
    store.sessions.where('is_logged').equals(1).first().then(usr => {
      this.user = <UserModel>usr;
    });
  }

  ngOnInit(): void {
  }

}
