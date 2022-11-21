import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SchockBarComponent } from './components/schock-bar/schock-bar.component';
import { SchockHeaderComponent } from './components/schock-header/schock-header.component';
import { LoginForm } from './forms/login/login.component';
import { SignUpForm } from './forms/signup/signup.component';
import { AdminLayout } from './layouts/admin/admin.component';
import { SideLayout } from './layouts/side/side.component';
import { StartPage } from './pages/start/start.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { IsAuthorized } from './rules/authorized.rule';
import { IsAuthenticated } from './rules/authenticated.rule';
import { WelcomeComponent } from './popups/welcome/welcome.component';
import { ErrorComponent } from './popups/error/error.component';
import { InfoComponent } from './popups/info/info.component';

const routes: Routes = [
  {path: 'events', component: AdminLayout, children: [
    {path: '', loadChildren: () => import('../events/events.module').then(m => m.EventsModule)}
  ], canActivate: [IsAuthorized]},
  {path: 'security', component: AdminLayout, children: [
    {path: '', loadChildren: () => import('../security/security.module').then(m => m.SecurityModule)}
  ], canActivate: [IsAuthorized]},
  {path: 'start', component: StartPage},
  {path: '', component: StartPage, canActivate: [IsAuthenticated]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    BrowserModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  declarations: [
    SideLayout,
    AdminLayout,
    LoginForm,
    SignUpForm,
    SchockBarComponent,
    SchockHeaderComponent,
    StartPage,
    WelcomeComponent,
    ErrorComponent,
    InfoComponent
  ],
  exports: [RouterModule]
})
export class RoutingModule { }