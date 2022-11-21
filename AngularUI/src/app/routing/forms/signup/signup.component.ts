import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppErrorStateMatcher } from 'src/app/app.errorstatematcher';
import { store } from 'src/app/indexeddb';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpForm implements OnInit {
  public passwordVisible: boolean = false;
  public form: FormGroup;
  public unfillRequiredFields: boolean = false;
  matcher = new AppErrorStateMatcher();

  constructor(private users: UserService) { 
    this.form = this.formFactory();
  }

  ngOnInit(): void {
  }

  private formFactory() {
    return new FormGroup({
      first_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])),
      last_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(32), 
        Validators.pattern(/[A-Z]/), // uppercase letters
        Validators.pattern(/[a-z]/), // lower case letters
        Validators.pattern(/\d/) //numbers
      ])),
      birth_date: new FormControl(null)
    });
  }

  public submit() {
    if (this.form.invalid) {
      const {birth_date, ...requireds} = this.form.value;
      this.unfillRequiredFields = Object.values(requireds).filter(x => !x).length > 0;
    } else this.users.signUp({...this.form.value}).subscribe(res => {
        store.appEvents('newAccount').fire();
        this.form = this.formFactory();
    });
  }
}
