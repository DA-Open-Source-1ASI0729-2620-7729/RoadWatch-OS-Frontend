import { Component, input } from '@angular/core';
import { AppSidebar } from '../../components/app-sidebar/app-sidebar';
import { AppTopbar } from '../../components/app-topbar/app-topbar';
import { NavigationItem } from '../../model/navigation-item';

@Component({ selector: 'app-shell', imports: [AppSidebar, AppTopbar], styleUrl: './app-shell.scss', templateUrl: './app-shell.html' })
export class AppShell {
  readonly navigation = input<NavigationItem[]>([]);
  readonly breadcrumb = input('Fiscalización');
}
