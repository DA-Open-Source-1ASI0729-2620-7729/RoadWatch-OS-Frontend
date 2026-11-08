import { IndicatorType } from './indicator-type';

export interface NormativeThreshold {
  id: string;
  indicatorType: IndicatorType;
  indicatorName: string;
  unit: string;
  warningLimit: number;
  maximumLimit: number;
  referenceLabel: string;
}
