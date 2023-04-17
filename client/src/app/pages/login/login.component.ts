import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public showPassword = true;
  public loginForm = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  public get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
