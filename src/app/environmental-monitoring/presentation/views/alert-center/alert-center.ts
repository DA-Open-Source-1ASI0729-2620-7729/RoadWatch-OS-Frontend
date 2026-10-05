import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppNavigation } from '../../../../app-navigation';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { EnvironmentalMonitoringStore } from '../../../application/environmental-monitoring.store';

@Component({ selector: 'app-alert-center', imports: [AppShell, DatePipe], templateUrl: './alert-center.html', styleUrl: './alert-center.scss' })
export class AlertCenter {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(EnvironmentalMonitoringStore);
  protected readonly filter = signal<'ALL' | 'WARNING' | 'NON_COMPLIANT'>('ALL');
  protected readonly visibleAlerts = computed(() => this.filter() === 'ALL' ? this.store.alerts() : this.store.alerts().filter(item => item.status === this.filter()));
}
