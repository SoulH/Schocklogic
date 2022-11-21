import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { store } from 'src/app/indexeddb';
import { UserService } from 'src/app/routing/services/user.service';
import { SecurityService } from '../../services/security.service';
import { UserInfoModel } from '../models/user-info.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersPage implements OnInit {
  public dataSource = new MatTableDataSource<UserInfoModel>();
  public displayedColumns: string[] = ['id', 'first_name',
    'last_name','email', 'birth_date', 'action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;
  public toChange: any = {};

  constructor(private users: UserService,
              private service: SecurityService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.find();
  }

  private find() {
    this.users.list().subscribe(res => this.loadData(res));
  }

  private loadData(data: UserInfoModel[]) {
    this.dataSource = new MatTableDataSource<UserInfoModel>(data);
    this.dataSource.paginator = this.paginator;
  }

  public updateStatus(model: UserInfoModel, e: any) {
    this.toChange[model.id] = e.checked;
  }

  public onSave() {
    this.service.updateStatusUsers(this.toChange).subscribe(res => {
      store.appEvents('showInfo').fire(['Users statuses changed']);
      this.toChange = {};
    });
  }
}
