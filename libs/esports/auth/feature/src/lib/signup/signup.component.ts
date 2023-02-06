import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';

@Component({
  selector: 'project-assignment-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email = new FormControl('');
  password = new FormControl('');
  repeatPassword = new FormControl('');

  constructor(private authFacade: AuthFacade, private router: Router) {}

  signUp(): void {
    this.authFacade
      .signUp({
        username: this.email.value as string,
        password: this.password.value as string,
        repeatPassword: this.repeatPassword.value as string,
      })
      .subscribe(() => this.router.navigateByUrl('/account/login'));
  }
}
