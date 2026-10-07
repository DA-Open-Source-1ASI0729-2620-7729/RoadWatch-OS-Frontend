import { Routes } from '@angular/router';
const dashboard = () =>
  import('./presentation/views/monitoring-dashboard/monitoring-dashboard').then(
    (m) => m.MonitoringDashboard,
  );
const measurements = () =>
  import('./presentation/views/measurement-list/measurement-list').then((m) => m.MeasurementList);
const newMeasurement = () =>
  import('./presentation/views/measurement-form/measurement-form').then((m) => m.MeasurementForm);
const history = () =>
  import('./presentation/views/measurement-history/measurement-history').then(
    (m) => m.MeasurementHistory,
  );
const alerts = () =>
  import('./presentation/views/alert-center/alert-center').then((m) => m.AlertCenter);
export const environmentalMonitoringRoutes: Routes = [
  {
    path: 'measurements/new',
    loadComponent: newMeasurement,
    title: 'Registrar medición | RoadWatch OS',
  },
  { path: 'measurements', loadComponent: measurements, title: 'Mediciones | RoadWatch OS' },
  { path: 'history', loadComponent: history, title: 'Historial ambiental | RoadWatch OS' },
  { path: 'alerts', loadComponent: alerts, title: 'Alertas ambientales | RoadWatch OS' },
  { path: '', loadComponent: dashboard, title: 'Monitoreo ambiental | RoadWatch OS' },
];
