import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';

@Component({
  selector: 'project-assignment-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('john');
  password = new FormControl('12345678');
  rememberMe = new FormControl(false);

  constructor(private authFacade: AuthFacade, private route: ActivatedRoute, private router: Router) {}

  login(): void {
    this.authFacade
      .logIn({
        username: this.email.value as string,
        password: this.password.value as string,
        rememberMe: this.rememberMe.value as boolean,
      })
      .subscribe(() => {
        const redirectUrl = this.route.snapshot.queryParamMap.get('redirectTo');
        this.router.navigateByUrl(redirectUrl ?? '/home');
      });
  }
}
