import { Injectable } from '@angular/core';
import { store } from '../../indexeddb';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticated implements CanActivate {

  constructor(private router: Router) { }

  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usr = await store.sessions.where('is_logged').equals(1).first(); 
    if (!usr) 
      return this.router.parseUrl("/start");
    if (usr.is_superuser)// || usr.roles.map(f => f.toLowerCase()).includes('admin'))
      return this.router.parseUrl('/events/list'); 
    return this.router.parseUrl('/events/my/list');
  }
}