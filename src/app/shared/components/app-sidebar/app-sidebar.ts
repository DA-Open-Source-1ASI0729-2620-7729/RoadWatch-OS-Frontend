import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../model/navigation-item';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './app-sidebar.css',
  templateUrl: './app-sidebar.html',
})
export class AppSidebar {
  readonly organization = input('EcoAudit Consultores');
  readonly moduleName = input('Módulo de Fiscalización');
  readonly profileName = input('Usuario RoadWatch');
  readonly profileRole = input('Sesión no iniciada');
  readonly profileInitials = input('RW');
  readonly items = input<NavigationItem[]>([]);
  readonly logoutRequested = output<void>();
  readonly sections = computed(() => [
    ...new Set(this.items().map((item) => item.section ?? 'NAVEGACIÓN')),
  ]);
}
