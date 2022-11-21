import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { EventModel } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsGraph implements OnInit {
  public form: FormGroup;
  public chart: any;

  constructor(private events: EventService,
              private dialogRef: MatDialogRef<SubscriptionsGraph>,
              @Inject(MAT_DIALOG_DATA) public formData: EventModel) { 
    this.form = this.formFactory();
  }

  ngOnInit(): void {
    
  }

  private formFactory() {
    return new FormGroup({
      start: new FormControl(this.formData.created_at),
      end: new FormControl(this.formData.start),
      unit: new FormControl('d', Validators.required)
    });
  }

  public onCloseForm(data: any = {}) {
    this.dialogRef.close(data);
  }

  public onSubmit() {
    this.events.subscriptionMetrics(this.formData.id, this.form.value).subscribe(res => {
      this.chart = new Chart("subscriptions", {
        type: "line",
        data: {
          labels: Object.keys(res),
          datasets: [{
            fill: true,
            label: 'subscriptions',
            borderColor: '#ff6e0b',
            backgroundColor: '#ffb6a6',
            data: Object.values(res)
          }]
        }
      });
    });
  }
}
