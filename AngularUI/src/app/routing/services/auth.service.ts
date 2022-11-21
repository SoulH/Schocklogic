import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SchockClient } from '../clients/schocklogic.client';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends SchockClient {

  constructor(@Inject(HttpClient) http: HttpClient) { super('', http); }

  public login(credentials: LoginModel) {
    return this.post<LoginResponseModel>('api/auth/login', credentials);
  }

  public logout() {
    return this.get('api/auth/logout');
  }
}
