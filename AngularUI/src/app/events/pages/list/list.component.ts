import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantsForm } from '../../forms/participants/participants.component';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/event.model';
import { SubscriptionsGraph } from '../../graphs/subscriptions/subscriptions.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EventForm } from '../../forms/event/event.component';
import { store } from 'src/app/indexeddb';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListPage implements AfterViewInit {
  public hideInfo: boolean = false;
  public dataSource = new MatTableDataSource<EventModel>();
  public displayedColumns: string[] = ['id', 'name', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;

  constructor(private events: EventService,
              private bp: BreakpointObserver,
              private dialog: MatDialog) {
    /*/ Medium screen
    this.bp.observe('(max-width: 1160px)').subscribe((state: BreakpointState) => { 
      this.hideInfo = Boolean(state.matches);
      console.log('hideInfo info', this.hideInfo);
    });
    // Small screen
    this.bp.observe('(max-width: 600px)').subscribe((state: BreakpointState) => { 
      //this.smallScreen = Boolean(state.matches);
      console.log('small screen');
    });
    /*/
  }

  ngAfterViewInit(): void {
    this.find();
  }

  private find() {
    this.events.list().subscribe(res => this.loadData(res));
  }

  private loadData(data: EventModel[]) {
    this.dataSource = new MatTableDataSource<EventModel>(data);
    this.dataSource.paginator = this.paginator;
  }

  public delEvent(e: EventModel) {
    this.events.remove(e.id).subscribe(res => {
      const ds = this.dataSource.data.filter(x => x.id != e.id);
      this.loadData(ds);
      store.appEvents('showInfo').fire(['Event deleted']);
    });
  }

  public openForm(model?: EventModel) {
    if (!model) model = this.events.factory();
    this.dialog.open(EventForm, {data: model, disableClose: true}).afterClosed().subscribe(res => {
      const ds = this.dataSource.data.filter(x => x.id != res.id);
      this.loadData([...ds, res]);
    });
  }

  public openParticipantsForm(model: EventModel) {
    this.dialog.open(ParticipantsForm, {data: model, disableClose: true});
  }

  public openSubscriptionsGraph(model: EventModel) {
    this.dialog.open(SubscriptionsGraph, {data: model, disableClose: true});
  }

}
