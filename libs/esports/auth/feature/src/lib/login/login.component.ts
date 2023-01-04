import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';

@Component({
  selector: 'project-assignment-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  rememberMe = new FormControl(false);

  constructor(private authFacade: AuthFacade) {}

  login(): void {
    this.authFacade.logIn({
      username: this.email.value as string,
      password: this.password.value as string,
      rememberMe: this.rememberMe.value as boolean,
    });
  }
}
