import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppErrorStateMatcher } from 'src/app/app.errorstatematcher';
import { store } from '../../../indexeddb';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginForm implements OnInit {
  public passwordVisible: boolean = false;
  public form: FormGroup;
  public matcher = new AppErrorStateMatcher();

  constructor(private auth: AuthService) { 
    this.form = this.formFactory();
  }

  ngOnInit(): void {
  }

  private formFactory() {
    return new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)
      ]))
    });
  }

  public async submit() {
    if (this.form.invalid) return;
    this.auth.login(this.form.value).subscribe(async res => {
      const now = new Date().getTime();
      const { user, access_token } = res;
      const session = {is_logged: 1, last_activity: now, timestamp: now, trusted_device: false};
      const user_session = {...session, ...user, access_token: access_token};
      await store.sessions.toCollection().modify({is_logged: 0});
      const updated = await store.sessions.where('id').equals(user.id).modify(user_session);
      if (!updated) await store.sessions.add(user_session);
      store.sessionEvents('userIN').fire();
    });
  }

}
