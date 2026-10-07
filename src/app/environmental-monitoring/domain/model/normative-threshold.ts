import { IndicatorType } from './indicator-type';

export interface NormativeThreshold {
  indicatorType: IndicatorType;
  indicatorName: string;
  unit: string;
  warningLimit: number;
  maximumLimit: number;
  referenceLabel: string;
}
