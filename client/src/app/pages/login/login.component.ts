import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take, tap } from 'rxjs';
import AuthRepository from 'src/app/repositories/auth-repository/authRepository.service';

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

  constructor(private authRepository: AuthRepository) {}

  public get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public onSubmit(): void {
    this.authRepository.login(this.loginForm.value).pipe(
      take(1),
      tap((a) => console.log(a))
    );
  }
}
