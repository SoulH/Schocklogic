import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { store } from 'src/app/indexeddb';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-schock-header',
  templateUrl: './schock-header.component.html',
  styleUrls: ['./schock-header.component.scss']
})
export class SchockHeaderComponent implements OnInit {
  public user: UserModel|undefined = undefined;
  @Output() public accountClick = new EventEmitter();

  constructor() {
    store.sessions.where('is_logged').equals(1).first().then(usr => {
      this.user = <UserModel>usr;
    });
  }

  ngOnInit(): void {
  }

}
