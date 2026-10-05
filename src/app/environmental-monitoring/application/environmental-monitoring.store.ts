import { computed, inject, Injectable, signal } from '@angular/core';
import { EnvironmentalMonitoringApi } from '../infrastructure/environmental-monitoring-api';
import { EnvironmentalAlert } from '../domain/model/environmental-alert';
import { EnvironmentalMeasurement, EnvironmentalMeasurementDraft } from '../domain/model/environmental-measurement';
import { NormativeThreshold } from '../domain/model/normative-threshold';
import { MeasurementStatus } from '../domain/model/measurement-status';

@Injectable({ providedIn: 'root' })
export class EnvironmentalMonitoringStore {
  private readonly api = inject(EnvironmentalMonitoringApi);
  readonly measurements = signal<EnvironmentalMeasurement[]>([]);
  readonly thresholds = signal<NormativeThreshold[]>([]);
  readonly alerts = signal<EnvironmentalAlert[]>([]);
  readonly loading = signal(true);
  readonly recentMeasurements = computed(() => this.measurements().slice(0, 5));
  readonly statusCounts = computed(() => ({ COMPLIANT: this.measurements().filter(item => item.status === 'COMPLIANT').length, WARNING: this.measurements().filter(item => item.status === 'WARNING').length, NON_COMPLIANT: this.measurements().filter(item => item.status === 'NON_COMPLIANT').length }));
  constructor() { this.refresh(); }
  refresh(): void { this.loading.set(true); this.api.listMeasurements().subscribe(measurements => this.measurements.set(measurements)); this.api.listThresholds().subscribe(thresholds => this.thresholds.set(thresholds)); this.api.listAlerts().subscribe(alerts => { this.alerts.set(alerts); this.loading.set(false); }); }
  registerMeasurement(draft: EnvironmentalMeasurementDraft): void { this.api.registerMeasurement(draft).subscribe(measurement => { this.measurements.update(items => [measurement, ...items]); if (measurement.status !== 'COMPLIANT') this.api.listAlerts().subscribe(alerts => this.alerts.set(alerts)); }); }
  labelFor(status: MeasurementStatus): string { return status === 'COMPLIANT' ? 'En rango' : status === 'WARNING' ? 'Advertencia' : 'Crítico'; }
}
