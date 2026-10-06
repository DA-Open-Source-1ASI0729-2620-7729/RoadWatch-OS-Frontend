import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppNavigation } from '../../../../app-navigation';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { EnvironmentalMonitoringStore } from '../../../application/environmental-monitoring.store';
import { MeasurementStatus } from '../../../domain/model/measurement-status';

@Component({ selector: 'app-measurement-list', imports: [AppShell, RouterLink, DatePipe], templateUrl: './measurement-list.html', styleUrl: './measurement-list.scss' })
export class MeasurementList {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(EnvironmentalMonitoringStore);
  protected readonly filter = signal<MeasurementStatus | 'ALL'>('ALL');
  protected readonly filtered = computed(() => this.filter() === 'ALL' ? this.store.measurements() : this.store.measurements().filter(item => item.status === this.filter()));
}
