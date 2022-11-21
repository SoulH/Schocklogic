import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { store } from 'src/app/indexeddb';
import { SubscriptionsGraph } from '../../graphs/subscriptions/subscriptions.component';
import { EventModel } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventForm implements OnInit {
  public form: FormGroup;

  constructor(private events: EventService,
              private dialogRef: MatDialogRef<SubscriptionsGraph>,
              @Inject(MAT_DIALOG_DATA) public formData: EventModel) { 
    this.form = this.formFactory();
  }

  ngOnInit(): void {
  }

  private formFactory() {
    return new FormGroup({
      name: new FormControl(this.formData.name || '', Validators.required),
      description: new FormControl(this.formData.description || '', Validators.required),
      start: new FormControl(this.formData.start || '', Validators.required),
      end: new FormControl(this.formData.end || '', Validators.required),
      address: new FormControl(this.formData.address || '', Validators.required),
      image: new FormControl(this.formData.files[0] || '', Validators.required)
    });
  }

  public loadImage() {
    const input = <any>document.getElementById("iconInput");
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.form.get('image')?.setValue(e.target?.result?.toString());
      reader.readAsDataURL(input.files[0]);
    }
  }

  public onCloseForm(data: any = {}) {
    this.dialogRef.close(data);
  }

  public onSaveForm() {
    if (this.form.invalid) return;
    const {image, ...frm} = this.form.value;
    const data = {...this.formData, ...frm, files: [image]};
    const req = data.id ? this.events.update(data) : this.events.create(data);
    req.subscribe(res => {
      store.appEvents('showInfo').fire(data.id ? ['Event updated'] : ['Event created']);
      this.onCloseForm(res);
    });
  }
}
