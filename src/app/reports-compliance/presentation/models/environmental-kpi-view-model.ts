import { EnvironmentalKpi } from '../../domain/model/environmental-kpi';

export interface EnvironmentalKpiViewModel {
  code: string;
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'success' | 'warning' | 'danger' | 'neutral';
}

const displayMetadata: Record<
  EnvironmentalKpi['code'],
  Pick<EnvironmentalKpiViewModel, 'label' | 'detail' | 'icon' | 'tone'>
> = {
  compliance: {
    label: 'Cumplimiento ambiental',
    detail: 'promedio de proyectos supervisados',
    icon: 'verified_user',
    tone: 'success',
  },
  documents: {
    label: 'Documentos obligatorios',
    detail: '4 documentos pendientes',
    icon: 'folder_open',
    tone: 'warning',
  },
  incidents: {
    label: 'Hallazgos abiertos',
    detail: '1 requiere atención inmediata',
    icon: 'fact_check',
    tone: 'danger',
  },
  reports: {
    label: 'Reportes emitidos',
    detail: 'durante septiembre',
    icon: 'description',
    tone: 'neutral',
  },
};

export const toEnvironmentalKpiViewModel = (kpi: EnvironmentalKpi): EnvironmentalKpiViewModel => ({
  code: kpi.code,
  value: kpi.value,
  ...displayMetadata[kpi.code],
});
