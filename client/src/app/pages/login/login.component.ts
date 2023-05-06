import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import AuthRepository from '../../repositories/auth-repository/authRepository.service';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public showPassword = false;
  public loading = false;
  public loginForm = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authRepository: AuthRepository, private router: Router) {}

  public get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public onSubmit(): void {
    this.loading = true;
    this.authRepository
      .login(this.loginForm.value)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
