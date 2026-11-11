import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../application/auth.store';

@Component({
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  protected readonly store = inject(AuthStore);
  private readonly router = inject(Router);
  protected readonly email = signal('');
  protected readonly password = signal('');

  protected submit(): void {
    this.store.login(this.email(), this.password()).subscribe((user) => {
      if (!user) return;
      this.router.navigateByUrl(user.role?.type === 'AUDITOR' ? '/reports' : '/projects');
    });
  }
}
