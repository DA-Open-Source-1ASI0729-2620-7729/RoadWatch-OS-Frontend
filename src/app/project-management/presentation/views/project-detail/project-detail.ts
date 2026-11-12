import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppNavigation } from '../../../../app-navigation';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { ProjectPortfolioHttpService } from '../../../infrastructure/project-portfolio-http.service';
import { ProjectDashboardViewModel } from '../../model/project-dashboard.vm';

@Component({
  selector: 'app-project-detail',
  imports: [AppShell, RouterLink],
  template: `<app-shell [navigation]="navigation()" breadcrumb="Proyectos › Detalle"
    ><div class="page">
      <a routerLink="/projects" class="back">← Volver al portafolio</a>
      @if (project(); as item) {
        <header>
          <div>
            <span>{{ item.id }}</span>
            <h1>{{ item.nombre }}</h1>
            <p>{{ item.ubicacion }} · {{ item.region }}</p>
          </div>
          <b>{{ item.estado }}</b>
        </header>
        <div class="metrics">
          <article>
            <small>Salud ambiental</small><strong>{{ item.saludAmbiental }}%</strong>
          </article>
          <article>
            <small>Alertas activas</small><strong>{{ item.alertasActivas }}</strong>
          </article>
          <article>
            <small>Incidencias críticas</small><strong>{{ item.incidenciasCriticas }}</strong>
          </article>
        </div>
        <div class="grid">
          <section>
            <h2>Información del proyecto</h2>
            <dl>
              <div>
                <dt>Constructora</dt>
                <dd>{{ item.constructora }}</dd>
              </div>
              <div>
                <dt>Supervisora</dt>
                <dd>{{ item.supervisor }}</dd>
              </div>
              <div>
                <dt>Inicio</dt>
                <dd>{{ item.fechaInicio }}</dd>
              </div>
              <div>
                <dt>Fin estimado</dt>
                <dd>{{ item.fechaFin }}</dd>
              </div>
            </dl>
          </section>
          <section>
            <h2>Responsable asignado</h2>
            <div class="person">
              <strong>{{ item.supervisor }}</strong><span>Responsable del proyecto</span>
            </div>
          </section>
        </div>
        <section class="actions">
          <a [routerLink]="['/projects', item.id, 'monitoring-points']">Ver puntos de monitoreo</a
          ><a routerLink="/incidents">Ver incidencias</a
          ><a routerLink="/documents/normative">Ver documentos</a
          ><a routerLink="/reports">Ver reportes</a>
        </section>
      } @else {
        <p>Cargando proyecto...</p>
      }
    </div></app-shell
  >`,
  styles: [
    `
      :host {
        display: block;
      }
      .page {
        max-width: 1100px;
      }
      .back,
      a {
        color: #23a277;
        text-decoration: none;
        font-weight: 700;
      }
      header {
        display: flex;
        justify-content: space-between;
        margin: 18px 0;
      }
      header span,
      header p,
      small {
        color: #64748b;
      }
      h1,
      h2 {
        color: #1e3844;
      }
      h1 {
        margin: 4px 0;
        font-size: 28px;
      }
      header b {
        height: max-content;
        background: #e8f6f1;
        color: #167a58;
        padding: 6px 10px;
        border-radius: 15px;
        font-size: 12px;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
      }
      .metrics article,
      section {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 17px;
      }
      .metrics strong {
        display: block;
        color: #1e3844;
        font-size: 28px;
        margin-top: 5px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        margin-top: 14px;
      }
      h2 {
        font-size: 18px;
        margin-top: 0;
      }
      dl div {
        display: flex;
        justify-content: space-between;
        padding: 9px 0;
        border-bottom: 1px solid #e2e8f0;
      }
      dt {
        color: #64748b;
      }
      dd {
        margin: 0;
        color: #1e3844;
        font-weight: 700;
      }
      .person {
        padding: 9px 0;
        border-bottom: 1px solid #e2e8f0;
      }
      .person strong,
      .person span,
      .person small {
        display: block;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 14px;
      }
      .actions a {
        padding: 10px 13px;
        background: #f6f5ee;
        border-radius: 7px;
      }
      @media (max-width: 700px) {
        .metrics,
        .grid {
          grid-template-columns: 1fr;
        }
        header {
          flex-direction: column;
          gap: 12px;
        }
      }
    `,
  ],
})
export class ProjectDetail implements OnInit {
  protected readonly navigation = inject(AppNavigation).items;
  private readonly portfolio = inject(ProjectPortfolioHttpService);
  private readonly route = inject(ActivatedRoute);
  protected readonly project = signal<ProjectDashboardViewModel | undefined>(undefined);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.portfolio.load().subscribe((projects) => this.project.set(projects.find((project) => project.id === id)));
  }
}
