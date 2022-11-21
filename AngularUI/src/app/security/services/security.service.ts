import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SchockClient } from 'src/app/routing/clients/schocklogic.client';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends SchockClient {

  constructor(@Inject(HttpClient) http: HttpClient) { super('security', http); }

  public disableUsers(users: number[]) {
    return this.put<any>(this.versioned_path('users/disable'), users);
  }

  public enableUsers(users: number[]) {
    return this.put<any>(this.versioned_path('users/enable'), users);
  }

  public updateStatusUsers(status: any) {
    return this.put<any>(this.versioned_path('users/status'), status);
  }
}
