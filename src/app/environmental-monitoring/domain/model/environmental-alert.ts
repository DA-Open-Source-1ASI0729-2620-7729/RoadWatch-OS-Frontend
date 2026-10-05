import { IndicatorType } from './indicator-type';
import { MeasurementStatus } from './measurement-status';

export interface EnvironmentalAlert { id: string; measurementId: string; monitoringPointId: string; indicatorType: IndicatorType; indicatorName: string; status: Extract<MeasurementStatus, 'WARNING' | 'NON_COMPLIANT'>; message: string; createdAt: string; }
