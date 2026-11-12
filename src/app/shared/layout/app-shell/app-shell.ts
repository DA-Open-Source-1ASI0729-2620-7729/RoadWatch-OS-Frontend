import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../identity-access/application/auth.store';
import { AppSidebar } from '../../components/app-sidebar/app-sidebar';
import { AppTopbar } from '../../components/app-topbar/app-topbar';
import { NavigationItem } from '../../model/navigation-item';
import { APP_SHELL_PROFILE } from '../../model/app-shell-profile';

@Component({
  selector: 'app-shell',
  imports: [AppSidebar, AppTopbar],
  styleUrl: './app-shell.css',
  templateUrl: './app-shell.html',
})
export class AppShell {
  readonly profile = inject(APP_SHELL_PROFILE);
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);
  readonly navigation = input<NavigationItem[]>([]);
  readonly breadcrumb = input('Fiscalización');

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/auth/login');
  }
}
