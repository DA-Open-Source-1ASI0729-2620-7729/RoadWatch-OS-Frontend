import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { EnvironmentalMonitoringGateway } from '../application/environmental-monitoring.gateway';
import { EnvironmentalAlert } from '../domain/model/environmental-alert';
import {
  EnvironmentalMeasurement,
  EnvironmentalMeasurementDraft,
} from '../domain/model/environmental-measurement';
import { IndicatorType } from '../domain/model/indicator-type';
import { MeasurementStatus } from '../domain/model/measurement-status';
import { NormativeThreshold } from '../domain/model/normative-threshold';

interface EnvironmentalMeasurementResponse {
  id: number;
  monitoringPointId: number;
  indicatorType: IndicatorType;
  value: number;
  measuredAt: string;
  status: MeasurementStatus;
}

interface NormativeThresholdResponse {
  id: number;
  indicatorType: IndicatorType;
  unit: string;
  warningLimit: number;
  maximumLimit: number;
}

interface EnvironmentalAlertResponse {
  id: number;
  measurementId: number;
  message: string;
  createdAt: string;
  acknowledged: boolean;
}

@Injectable({ providedIn: 'root' })
export class EnvironmentalMonitoringHttpAdapter extends EnvironmentalMonitoringGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  listMeasurements(): Observable<EnvironmentalMeasurement[]> {
    return forkJoin({
      measurements: this.http.get<EnvironmentalMeasurementResponse[]>(
        `${this.apiUrl}/environmental-measurements`,
      ),
      thresholds: this.getThresholdResponses(),
    }).pipe(
      map(({ measurements, thresholds }) =>
        measurements.map((measurement) => this.toMeasurement(measurement, thresholds)),
      ),
    );
  }

  listThresholds(): Observable<NormativeThreshold[]> {
    return this.getThresholdResponses().pipe(
      map((thresholds) => thresholds.map((threshold) => this.toThreshold(threshold))),
    );
  }

  listAlerts(): Observable<EnvironmentalAlert[]> {
    return forkJoin({
      alerts: this.http.get<EnvironmentalAlertResponse[]>(`${this.apiUrl}/environmental-alerts`),
      measurements: this.http.get<EnvironmentalMeasurementResponse[]>(
        `${this.apiUrl}/environmental-measurements`,
      ),
    }).pipe(
      map(({ alerts, measurements }) =>
        alerts.map((alert) => this.toAlert(alert, measurements.find((item) => item.id === alert.measurementId))),
      ),
    );
  }

  registerMeasurement(draft: EnvironmentalMeasurementDraft): Observable<EnvironmentalMeasurement> {
    return this.http
      .post<EnvironmentalMeasurementResponse>(`${this.apiUrl}/environmental-measurements`, {
        monitoringPointId: Number(draft.monitoringPointId),
        indicatorType: draft.indicatorType,
        value: draft.value,
        measuredAt: draft.measuredAt,
      })
      .pipe(
        switchMap((measurement) =>
          this.getThresholdResponses().pipe(
            map((thresholds) => this.toMeasurement(measurement, thresholds)),
          ),
        ),
      );
  }

  private getThresholdResponses(): Observable<NormativeThresholdResponse[]> {
    return this.http.get<NormativeThresholdResponse[]>(`${this.apiUrl}/normative-thresholds`);
  }

  private toMeasurement(
    response: EnvironmentalMeasurementResponse,
    thresholds: NormativeThresholdResponse[],
  ): EnvironmentalMeasurement {
    const threshold = thresholds.find((item) => item.indicatorType === response.indicatorType);
    return {
      id: String(response.id),
      monitoringPointId: String(response.monitoringPointId),
      indicatorType: response.indicatorType,
      indicatorName: this.indicatorName(response.indicatorType),
      value: response.value,
      unit: threshold?.unit ?? '',
      status: response.status,
      measuredAt: response.measuredAt,
    };
  }

  private toThreshold(response: NormativeThresholdResponse): NormativeThreshold {
    return {
      id: String(response.id),
      indicatorType: response.indicatorType,
      indicatorName: this.indicatorName(response.indicatorType),
      unit: response.unit,
      warningLimit: response.warningLimit,
      maximumLimit: response.maximumLimit,
      referenceLabel: 'Parámetros de evaluación ambiental',
    };
  }

  private toAlert(
    response: EnvironmentalAlertResponse,
    measurement?: EnvironmentalMeasurementResponse,
  ): EnvironmentalAlert {
    const status = measurement?.status === 'NON_COMPLIANT' ? 'NON_COMPLIANT' : 'WARNING';
    return {
      id: String(response.id),
      measurementId: String(response.measurementId),
      monitoringPointId: measurement ? String(measurement.monitoringPointId) : '—',
      indicatorType: measurement?.indicatorType ?? 'AIR',
      indicatorName: measurement ? this.indicatorName(measurement.indicatorType) : 'Medición',
      status,
      message: response.message,
      createdAt: response.createdAt,
      acknowledged: response.acknowledged,
    };
  }

  private indicatorName(indicatorType: IndicatorType): string {
    return indicatorType === 'AIR' ? 'Aire' : indicatorType === 'NOISE' ? 'Ruido' : 'Agua';
  }
}
