import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/routing/services/user.service';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListPage implements AfterViewInit {
  public hideInfo: boolean = false;
  public dataSource = new MatTableDataSource<EventModel>();
  public displayedColumns: string[] = ['id', 'name'];
  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;

  constructor(private users: UserService) { }

  ngAfterViewInit(): void {
    this.find();
  }

  private find() {
    this.users.myEvents().subscribe(res => this.loadData(res));
  }

  private loadData(data: EventModel[]) {
    this.dataSource = new MatTableDataSource<EventModel>(data);
    this.dataSource.paginator = this.paginator;
  }
}
