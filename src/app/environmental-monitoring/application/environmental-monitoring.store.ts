import { computed, inject, Injectable, signal } from '@angular/core';
import { EnvironmentalMonitoringGateway } from './environmental-monitoring.gateway';
import { EnvironmentalAlert } from '../domain/model/environmental-alert';
import {
  EnvironmentalMeasurement,
  EnvironmentalMeasurementDraft,
} from '../domain/model/environmental-measurement';
import { NormativeThreshold } from '../domain/model/normative-threshold';
import { MeasurementStatus } from '../domain/model/measurement-status';

@Injectable({ providedIn: 'root' })
export class EnvironmentalMonitoringStore {
  private readonly gateway = inject(EnvironmentalMonitoringGateway);
  readonly measurements = signal<EnvironmentalMeasurement[]>([]);
  readonly thresholds = signal<NormativeThreshold[]>([]);
  readonly alerts = signal<EnvironmentalAlert[]>([]);
  readonly loading = signal(true);
  readonly recentMeasurements = computed(() => this.measurements().slice(0, 5));
  readonly statusCounts = computed(() => ({
    COMPLIANT: this.measurements().filter((item) => item.status === 'COMPLIANT').length,
    WARNING: this.measurements().filter((item) => item.status === 'WARNING').length,
    NON_COMPLIANT: this.measurements().filter((item) => item.status === 'NON_COMPLIANT').length,
  }));
  constructor() {
    this.refresh();
  }
  refresh(): void {
    this.loading.set(true);
    this.gateway
      .listMeasurements()
      .subscribe((measurements) => this.measurements.set(measurements));
    this.gateway.listThresholds().subscribe((thresholds) => this.thresholds.set(thresholds));
    this.gateway.listAlerts().subscribe((alerts) => {
      this.alerts.set(alerts);
      this.loading.set(false);
    });
  }
  registerMeasurement(draft: EnvironmentalMeasurementDraft): void {
    this.gateway.registerMeasurement(draft).subscribe((measurement) => {
      this.measurements.update((items) => [measurement, ...items]);
      if (measurement.status !== 'COMPLIANT')
        this.gateway.listAlerts().subscribe((alerts) => this.alerts.set(alerts));
    });
  }
  labelFor(status: MeasurementStatus): string {
    return status === 'COMPLIANT' ? 'En rango' : status === 'WARNING' ? 'Advertencia' : 'Crítico';
  }
}
