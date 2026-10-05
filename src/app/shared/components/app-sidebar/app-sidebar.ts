import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../model/navigation-item';

@Component({ selector: 'app-sidebar', imports: [RouterLink, RouterLinkActive], styleUrl: './app-sidebar.scss', templateUrl: './app-sidebar.html' })
export class AppSidebar {
  readonly organization = input('EcoAudit Consultores');
  readonly moduleName = input('Módulo de Fiscalización');
  readonly items = input<NavigationItem[]>([]);
}
