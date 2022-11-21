import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EMPTY, from, Observable, ObservableInput, ObservedValueOf, OperatorFunction } from "rxjs";
import { catchError, retry, shareReplay, switchMap } from "rxjs/operators";


export abstract class ApiClient {
    protected http: HttpClient;
    protected url_base: string;
    protected retries: number;

    constructor(url_base: string,
                http: HttpClient,
                retries: number = 0) {
        this.retries = retries;
        this.http = http;
        this.url_base = url_base.endsWith('/') ? url_base.slice(0, -1) : url_base;
    }

    public abstract requestOptions() : Promise<{headers: HttpHeaders}|undefined>;

    protected onError<T>(err: any, caught: Observable<T>): Observable<any> {
        return EMPTY;
    }

    private request<T>(path: string, params: any = {}, method: string = 'get') {
        return from(this.requestOptions()).pipe<T>(switchMap(options => {
            const endpoint = path.startsWith('/') ? this.url_base+path : `${this.url_base}/${path}`;
            switch(method) {
                case 'get': return this.http.get<T>(endpoint, options);
                case 'post': return this.http.post<T>(endpoint, params, options);
                case 'put': return this.http.put<T>(endpoint, params, options);
                case 'delete': return this.http.delete<T>(endpoint, options);
                default: throw new Error('invalid method');
            }
        }));
    }

    public get<T>(path: string, params: any = {}): Observable<T> {
        return this.request<T>(path, params, 'get')
        .pipe(retry(this.retries), shareReplay(), catchError(this.onError));
    }

    public post<T>(path: string, params: any = {}): Observable<T> {
        return this.request<T>(path, params, 'post')
        .pipe(retry(this.retries), shareReplay(), catchError(this.onError));
    }

    public put<T>(path: string, params: any = {}): Observable<T> {
        return this.request<T>(path, params, 'put')
        .pipe(retry(this.retries), shareReplay(), catchError(this.onError));
    }

    public delete<T>(path: string, params: any = {}): Observable<T> {
        return this.request<T>(path, params, 'delete')
        .pipe(retry(this.retries), shareReplay(), catchError(this.onError));
    }
}