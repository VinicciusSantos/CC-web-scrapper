import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import AuthRepository from '../../repositories/auth-repository/authRepository.service';
import { Router } from '@angular/router';

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

  constructor(private authRepository: AuthRepository, private router: Router) {}

  public get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public onSubmit(): void {
    this.authRepository.login(this.loginForm.value).subscribe((res) => {
      this.router.navigate(['/home']);
    });
  }
}
