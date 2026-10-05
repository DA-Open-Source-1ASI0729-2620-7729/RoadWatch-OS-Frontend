import { Observable } from 'rxjs';
import { EnvironmentalAlert } from '../domain/model/environmental-alert';
import { EnvironmentalMeasurement, EnvironmentalMeasurementDraft } from '../domain/model/environmental-measurement';
import { NormativeThreshold } from '../domain/model/normative-threshold';

/** Contract to replace with approved backend calls in the future. */
export abstract class EnvironmentalMonitoringGateway {
  abstract listMeasurements(): Observable<EnvironmentalMeasurement[]>;
  abstract listThresholds(): Observable<NormativeThreshold[]>;
  abstract listAlerts(): Observable<EnvironmentalAlert[]>;
  abstract registerMeasurement(draft: EnvironmentalMeasurementDraft): Observable<EnvironmentalMeasurement>;
}
