import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiClient } from "./api.client";
import { store } from '../../indexeddb';
import { environment } from "src/environments/environment";
import { EMPTY, Observable } from "rxjs";


export class SchockClient extends ApiClient {
    protected collection: string;
    protected version: number;

    constructor(collection: string,
                http: HttpClient) {
        super(environment.backend.url_base, http);
        this.collection = collection;
        this.version = environment.backend.version || 1;
    }

    protected path(action: string, collection?: string) {
        return `api/${collection || this.collection}/${action}`;
    }

    protected versioned_path(action: string, collection?: string) {
        return `api/v${this.version}/${collection || this.collection}/${action}`;
    }

    protected override onError<T>(err: any, caught: Observable<T>): Observable<any> {
        if (err.status === 401) {
            store.sessions.where('is_logged').equals(1).delete();
            store.sessionEvents('userOUT').fire();
        } store.appEvents('showError').fire(err.error);
        return EMPTY;
    }

    public async requestOptions(): Promise<{ headers: HttpHeaders; } | undefined> {
        let options: any = {'Content-Type': 'application/json'};
        const usr = await store.sessions.where('is_logged').equals(1).first();
        if (usr) options['Authorization'] = `Bearer ${usr.access_token}`;
        return {headers: new HttpHeaders(options)};
    }
}