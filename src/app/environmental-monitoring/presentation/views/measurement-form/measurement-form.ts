import { Component, computed, inject, signal } from '@angular/core';
import { AppNavigation } from '../../../../app-navigation';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AuthStore } from '../../../../identity-access/application/auth.store';
import { EnvironmentalMonitoringStore } from '../../../application/environmental-monitoring.store';
import { IndicatorType } from '../../../domain/model/indicator-type';

@Component({
  selector: 'app-measurement-form',
  imports: [AppShell],
  templateUrl: './measurement-form.html',
  styleUrl: './measurement-form.scss',
})
export class MeasurementForm {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(EnvironmentalMonitoringStore);
  private readonly auth = inject(AuthStore);
  protected readonly monitoringPointId = signal('MP-01');
  protected readonly indicatorName = signal('PM10');
  protected readonly value = signal(0);
  protected readonly measuredAt = signal('2026-10-05T10:00');
  protected readonly saved = signal(false);
  protected readonly readOnly = computed(() => this.auth.user()?.role.type === 'AUDITOR');
  protected readonly reference = computed(() =>
    this.store.thresholds().find((item) => item.indicatorName === this.indicatorName()),
  );

  protected chooseIndicator(name: string): void {
    this.indicatorName.set(name);
    this.saved.set(false);
  }
  protected save(): void {
    const reference = this.reference();
    if (!reference || this.readOnly()) return;
    this.store.registerMeasurement({
      monitoringPointId: this.monitoringPointId(),
      indicatorType: reference.indicatorType as IndicatorType,
      indicatorName: reference.indicatorName,
      value: this.value(),
      unit: reference.unit,
      measuredAt: this.measuredAt(),
    });
    this.saved.set(true);
  }
}
