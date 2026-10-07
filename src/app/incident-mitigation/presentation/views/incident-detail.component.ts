import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppNavigation } from '../../../app-navigation';
import { AppShell } from '../../../shared/layout/app-shell/app-shell';
import { IncidentStore } from '../../application/incident.store';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [RouterLink, AppShell, DatePipe],
  template: `<app-shell [navigation]="navigation()" breadcrumb="Operación › Incidencias › Detalle"
    ><div class="page">
      <a routerLink="/incidents" class="back">← Volver al tablero</a>
      @if (store.selectedIncident(); as incident) {
        <header>
          <div>
            <span>INCIDENCIA {{ incident.id }}</span>
            <h1>{{ incident.title }}</h1>
            <p>
              {{ incident.monitoringPointLabel }} · {{ incident.indicator }} ·
              {{ incident.observedValue }} {{ incident.unit }}
            </p>
          </div>
          <b>{{ incident.status }}</b>
        </header>
        <div class="grid">
          <section>
            <h2>Descripción y seguimiento</h2>
            <p>{{ incident.description }}</p>
            <dl>
              <div>
                <dt>Responsable</dt>
                <dd>{{ incident.responsible }}</dd>
              </div>
              <div>
                <dt>Fecha límite</dt>
                <dd>{{ incident.dueDate | date: 'dd/MM/yyyy' }}</dd>
              </div>
              <div>
                <dt>Acciones de mitigación</dt>
                <dd>{{ incident.mitigationCount }} registradas</dd>
              </div>
            </dl>
            <button>Registrar acción de mitigación</button>
          </section>
          <aside>
            <h2>Evidencias vinculadas</h2>
            <strong>{{ incident.evidenceCount }} evidencias</strong>
            <p>Las evidencias se administran en Document &amp; Evidence Management.</p>
            <a routerLink="/documents/evidence">Abrir evidencias</a>
          </aside>
        </div>
      } @else {
        <p>Cargando incidencia...</p>
      }
    </div></app-shell
  >`,
  styles: [
    `
      :host {
        display: block;
      }
      .page {
        max-width: 1050px;
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
        gap: 20px;
        margin: 18px 0;
      }
      header span {
        font-size: 12px;
        color: #64748b;
        font-weight: 700;
      }
      h1,
      h2 {
        color: #1e3844;
      }
      h1 {
        margin: 4px 0;
        font-size: 28px;
      }
      header p,
      aside p {
        color: #64748b;
      }
      header b {
        height: max-content;
        padding: 6px 10px;
        background: #fff4d8;
        color: #9a6700;
        border-radius: 20px;
        font-size: 12px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1.4fr 0.8fr;
        gap: 16px;
      }
      section,
      aside {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
      }
      h2 {
        font-size: 18px;
        margin-top: 0;
      }
      section p {
        color: #64748b;
        line-height: 1.5;
      }
      dl div {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
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
      button {
        margin-top: 17px;
        width: 100%;
        padding: 10px;
        border: 0;
        border-radius: 7px;
        background: #23a277;
        color: #fff;
        font-weight: 700;
      }
      aside strong {
        font-size: 28px;
        color: #1e3844;
        display: block;
      }
      @media (max-width: 700px) {
        .grid {
          grid-template-columns: 1fr;
        }
        header {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class IncidentDetailComponent implements OnInit {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(IncidentStore);
  private readonly route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.store.loadIncidentById(this.route.snapshot.paramMap.get('id') ?? '');
  }
}
