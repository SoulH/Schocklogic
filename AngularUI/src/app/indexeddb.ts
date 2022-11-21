import Dexie, { DexieEventSet, Table } from 'dexie';
import { SessionModel } from './routing/models/session.model';

export class AppDB extends Dexie {
  appEvents: DexieEventSet;
  sessionEvents: DexieEventSet;
  sessions!: Table<SessionModel, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      sessions: 'id, is_logged'
    });
    this.on('populate', () => this.populate());
    this.appEvents = Dexie.Events(this);
    this.appEvents.addEventType('showError');
    this.appEvents.addEventType('showInfo');
    this.appEvents.addEventType('newAccount');
    this.sessionEvents = Dexie.Events(this);
    this.sessionEvents.addEventType('userIN');
    this.sessionEvents.addEventType('userOUT');
  }

  async populate() {}
}

export const store = new AppDB();