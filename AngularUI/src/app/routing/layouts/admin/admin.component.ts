import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { store } from 'src/app/indexeddb';
import { UserModel } from '../../models/user.model';
import { Page } from '../../pages/page';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminLayout extends Page implements OnInit {
  public sidenavMode: "side"|"over"|"push" = "side";
  
  constructor(router: Router,
              snackbar: MatSnackBar,
              private auth: AuthService) {
    super(router, snackbar);
  }

  ngOnInit(): void {
  }

  public onClick(evn: any) {
    console.log('admin onClick');
  }

  public closeSession() {
    this.auth.logout().subscribe(res => {
      store.appEvents('showInfo').fire(['Logged out']);
      this.router.navigateByUrl('/start');
    });
  }
}
