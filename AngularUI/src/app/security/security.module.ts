import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPage } from './pages/users/users.component';
import { RolesPage } from './pages/roles/roles.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: '', redirectTo: '/security/users', pathMatch: 'full'},
  {path: 'users', component: UsersPage},
  {path: 'roles', component: RolesPage}
];

@NgModule({
  declarations: [
    UsersPage,
    RolesPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ]
})
export class SecurityModule { }
