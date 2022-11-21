import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { store } from 'src/app/indexeddb';
import { EventModel } from '../../models/event.model';
import { ParticipantModel } from '../../models/participant.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsForm implements AfterViewInit {
  private toDelete: number[] = [];
  public dataSource = new MatTableDataSource<ParticipantModel>();
  public displayedColumns: string[] = ['participant', 'joined_at', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;

  constructor(private events: EventService,
              private dialogRef: MatDialogRef<ParticipantsForm>,
              @Inject(MAT_DIALOG_DATA) public formData: EventModel) {
    
  }

  ngAfterViewInit(): void {
    this.events.getParticipants(this.formData.id).subscribe(res => {
      this.dataSource = new MatTableDataSource<ParticipantModel>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  public updateParticipation(model: ParticipantModel, e: any) {
    this.toDelete = e.checked ? this.toDelete.filter(x => x != model.id) : [...this.toDelete, model.id];
  }

  public onCloseForm(data: any = {}) {
    this.dialogRef.close(data);
  }

  public onSaveForm(data: any = {}, close: boolean | undefined = false) {
    this.events.revokeParticipants(this.formData.id, this.toDelete).subscribe(res => {
      store.appEvents('showInfo').fire(['Participants updated']);
    });
  }

}
