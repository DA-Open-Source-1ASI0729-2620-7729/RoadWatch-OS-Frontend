import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppNavigation } from '../../../../app-navigation';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { EnvironmentalMonitoringStore } from '../../../application/environmental-monitoring.store';
import { IndicatorType } from '../../../domain/model/indicator-type';

@Component({
  selector: 'app-measurement-history',
  imports: [AppShell, DatePipe],
  templateUrl: './measurement-history.html',
  styleUrl: './measurement-history.scss',
})
export class MeasurementHistory {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(EnvironmentalMonitoringStore);
  protected readonly type = signal<IndicatorType | 'ALL'>('ALL');
  protected readonly history = computed(() =>
    this.type() === 'ALL'
      ? [...this.store.measurements()].reverse()
      : this.store
          .measurements()
          .filter((item) => item.indicatorType === this.type())
          .reverse(),
  );
  protected readonly average = computed(() => {
    const values = this.history();
    return values.length
      ? Math.round(values.reduce((sum, item) => sum + item.value, 0) / values.length)
      : 0;
  });
}
