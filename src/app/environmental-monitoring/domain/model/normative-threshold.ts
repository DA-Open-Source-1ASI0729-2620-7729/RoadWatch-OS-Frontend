import { IndicatorType } from './indicator-type';

/** Demonstration-only reference. It is not a legal or regulatory limit. */
export interface NormativeThreshold { indicatorType: IndicatorType; indicatorName: string; unit: string; warningLimit: number; maximumLimit: number; referenceLabel: string; }
