import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnvironmentalMonitoringGateway } from '../application/environmental-monitoring.gateway';
import { EnvironmentalAlert } from '../domain/model/environmental-alert';
import { EnvironmentalMeasurement, EnvironmentalMeasurementDraft } from '../domain/model/environmental-measurement';
import { MeasurementStatus } from '../domain/model/measurement-status';
import { NormativeThreshold } from '../domain/model/normative-threshold';

/** Temporary frontend adapter. Values below are mock references, not legal limits. */
@Injectable({ providedIn: 'root' })
export class EnvironmentalMonitoringApi extends EnvironmentalMonitoringGateway {
  private readonly thresholds: NormativeThreshold[] = [
    { indicatorType: 'AIR', indicatorName: 'PM10', unit: 'µg/m³', warningLimit: 70, maximumLimit: 90, referenceLabel: 'Referencia mock de demostración' },
    { indicatorType: 'AIR', indicatorName: 'PM2.5', unit: 'µg/m³', warningLimit: 40, maximumLimit: 55, referenceLabel: 'Referencia mock de demostración' },
    { indicatorType: 'NOISE', indicatorName: 'Ruido', unit: 'dB(A)', warningLimit: 75, maximumLimit: 85, referenceLabel: 'Referencia mock de demostración' },
    { indicatorType: 'WATER', indicatorName: 'Turbidez', unit: 'NTU', warningLimit: 80, maximumLimit: 100, referenceLabel: 'Referencia mock de demostración' },
  ];
  private measurements: EnvironmentalMeasurement[] = [
    { id: 'm-001', monitoringPointId: 'MP-01', indicatorType: 'AIR', indicatorName: 'PM10', value: 63, unit: 'µg/m³', status: 'COMPLIANT', measuredAt: '2026-09-30T10:40:00' },
    { id: 'm-002', monitoringPointId: 'MP-02', indicatorType: 'NOISE', indicatorName: 'Ruido', value: 82, unit: 'dB(A)', status: 'WARNING', measuredAt: '2026-09-30T09:20:00' },
    { id: 'm-003', monitoringPointId: 'MP-03', indicatorType: 'AIR', indicatorName: 'PM2.5', value: 61, unit: 'µg/m³', status: 'NON_COMPLIANT', measuredAt: '2026-09-29T16:00:00' },
    { id: 'm-004', monitoringPointId: 'MP-04', indicatorType: 'WATER', indicatorName: 'Turbidez', value: 47, unit: 'NTU', status: 'COMPLIANT', measuredAt: '2026-09-29T11:30:00' },
    { id: 'm-005', monitoringPointId: 'MP-01', indicatorType: 'AIR', indicatorName: 'PM10', value: 76, unit: 'µg/m³', status: 'WARNING', measuredAt: '2026-09-28T10:10:00' },
  ];
  private alerts: EnvironmentalAlert[] = [
    { id: 'a-001', measurementId: 'm-003', monitoringPointId: 'MP-03', indicatorType: 'AIR', indicatorName: 'PM2.5', status: 'NON_COMPLIANT', message: 'Medición por encima de la referencia mock máxima.', createdAt: '2026-09-29T16:00:00' },
    { id: 'a-002', measurementId: 'm-002', monitoringPointId: 'MP-02', indicatorType: 'NOISE', indicatorName: 'Ruido', status: 'WARNING', message: 'Medición en rango de advertencia según referencia mock.', createdAt: '2026-09-30T09:20:00' },
  ];
  listMeasurements(): Observable<EnvironmentalMeasurement[]> { return of([...this.measurements]); }
  listThresholds(): Observable<NormativeThreshold[]> { return of([...this.thresholds]); }
  listAlerts(): Observable<EnvironmentalAlert[]> { return of([...this.alerts]); }
  registerMeasurement(draft: EnvironmentalMeasurementDraft): Observable<EnvironmentalMeasurement> {
    const threshold = this.thresholds.find(item => item.indicatorName === draft.indicatorName);
    const status = this.evaluate(draft.value, threshold);
    const measurement: EnvironmentalMeasurement = { id: crypto.randomUUID(), ...draft, status };
    this.measurements = [measurement, ...this.measurements];
    if (status !== 'COMPLIANT') this.alerts = [{ id: crypto.randomUUID(), measurementId: measurement.id, monitoringPointId: measurement.monitoringPointId, indicatorType: measurement.indicatorType, indicatorName: measurement.indicatorName, status, message: status === 'WARNING' ? 'Medición en rango de advertencia según referencia mock.' : 'Medición por encima de la referencia mock máxima.', createdAt: measurement.measuredAt }, ...this.alerts];
    return of(measurement);
  }
  private evaluate(value: number, threshold?: NormativeThreshold): MeasurementStatus { if (!threshold || value < threshold.warningLimit) return 'COMPLIANT'; return value < threshold.maximumLimit ? 'WARNING' : 'NON_COMPLIANT'; }
}
