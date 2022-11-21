import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SchockClient } from 'src/app/routing/clients/schocklogic.client';
import { EventModel } from '../models/event.model';
import { ParticipantModel } from '../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class EventService extends SchockClient {

  constructor(@Inject(HttpClient) http: HttpClient) { 
    super('events', http);
  }

  public factory(args: any = {}) {
    return {
      name: '', 
      description: '', 
      address: '', 
      files: [],
      start: new Date(),
      end: new Date(),
      ...args
    };
  }

  public list() {
    return this.get<EventModel[]>(this.versioned_path(''));
  }

  public create(data: EventModel) {
    return this.post<EventModel>(this.versioned_path(''), data);
  }

  public update(data: EventModel) {
    return this.put<EventModel>(this.versioned_path(''), data);
  }

  public remove(event_id: number) {
    return this.delete<any>(this.versioned_path(`${event_id}`));
  }

  public getParticipants(event_id: number) {
    return this.get<ParticipantModel[]>(this.versioned_path(`${event_id}/participants`));
  }

  public revokeParticipants(event_id: number, participants: number[]) {
    return this.put(this.versioned_path(`${event_id}/participants/revoke`), participants);
  }

  public subscriptionMetrics(event_id: number, data: { start?: Date; end?: Date; unit: string; }) {
    return this.post<any>(this.versioned_path(`${event_id}/metrics/subscriptions`), data);
  }
}
