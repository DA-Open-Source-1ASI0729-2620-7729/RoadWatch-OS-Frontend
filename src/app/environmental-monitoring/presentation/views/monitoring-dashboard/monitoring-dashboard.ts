import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppNavigation } from '../../../../app-navigation';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { EnvironmentalMonitoringStore } from '../../../application/environmental-monitoring.store';

@Component({ selector: 'app-monitoring-dashboard', imports: [AppShell, RouterLink], templateUrl: './monitoring-dashboard.html', styleUrl: './monitoring-dashboard.scss' })
export class MonitoringDashboard {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(EnvironmentalMonitoringStore);
}
