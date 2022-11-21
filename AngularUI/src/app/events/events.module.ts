import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPage } from './pages/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IsAuthenticated } from '../routing/rules/authenticated.rule';
import { ParticipantsForm } from './forms/participants/participants.component';
import { EventForm } from './forms/event/event.component';
import { SubscriptionsGraph } from './graphs/subscriptions/subscriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MyListPage } from './pages/my-list/my-list.component';

const routes: Routes = [
  {path: '', component: ListPage, canActivate: [IsAuthenticated]},
  {path: 'list', component: ListPage},
  {path: 'my/list', component: MyListPage}
];

@NgModule({
  declarations: [
    ListPage,
    ParticipantsForm,
    EventForm,
    SubscriptionsGraph,
    MyListPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class EventsModule { }
