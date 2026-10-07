import { IndicatorType } from './indicator-type';
import { MeasurementStatus } from './measurement-status';

export interface EnvironmentalMeasurement {
  id: string;
  monitoringPointId: string;
  indicatorType: IndicatorType;
  indicatorName: string;
  value: number;
  unit: string;
  status: MeasurementStatus;
  measuredAt: string;
}
export type EnvironmentalMeasurementDraft = Omit<EnvironmentalMeasurement, 'id' | 'status'>;
