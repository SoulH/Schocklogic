import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { store } from '../../../indexeddb';
import { InfoComponent } from '../../popups/info/info.component';
import { WelcomeComponent } from '../../popups/welcome/welcome.component';
import { Page } from '../page';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartPage extends Page implements OnInit {
  public bigScreen: boolean|null = null;
  public mediumScreen: boolean|null = null;
  public smallScreen: boolean|null = null;
  public step: "Shocklogic"|"SignIn"|"SignUp"|null = null;
  
  constructor(router: Router,
              snackbar: MatSnackBar,
              private bp: BreakpointObserver,) {
    super(router, snackbar);
    // Big screen
    this.bp.observe('(min-width: 1160px)').subscribe((state: BreakpointState) => { 
      this.bigScreen = Boolean(state.matches);
      if (this.bigScreen) this.step = null;
      console.log('big screen', this.bigScreen);
    });
    // Medium screen
    this.bp.observe('(min-width: 600px) and (max-width: 1160px)').subscribe((state: BreakpointState) => { 
      this.mediumScreen = Boolean(state.matches);
      if (this.mediumScreen)
        this.step = 'SignIn'; 
      console.log('medium screen', this.mediumScreen);
    });
    // Small screen
    this.bp.observe('(max-width: 600px)').subscribe((state: BreakpointState) => { 
      this.smallScreen = Boolean(state.matches);
      if (this.smallScreen)
        this.step = 'Shocklogic'; 
      console.log('small screen', this.smallScreen);
    });
    store.appEvents('newAccount').subscribe((...args: any[]) => {
      this.snackbar.openFromComponent(InfoComponent, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['white-snackbar'],
        data: 'Your account has been successfully created'
      });
      this.step = 'SignIn';
    });
    store.sessionEvents('userIN').subscribe((...args: any[]) => {
      this.snackbar.openFromComponent(WelcomeComponent, {
        duration: 3000, 
        verticalPosition: 'top', 
        panelClass: ['white-snackbar']
      });
      this.router.navigateByUrl('');
    });
  }

  ngOnInit(): void {
  }

  public showRegister() {
    this.step = "SignUp";
  }

  public showLogin() {
    this.step = "SignIn";
  }

}
