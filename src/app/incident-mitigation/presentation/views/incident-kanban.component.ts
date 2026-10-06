import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { RouterLink } from '@angular/router';
import { AppNavigation } from '../../../app-navigation';
import { AppShell } from '../../../shared/layout/app-shell/app-shell';
import { IncidentStore } from '../../application/incident.store';
import { EnvironmentalIncident, IncidentStatus } from '../../domain/model/incident.model';

@Component({
  selector: 'app-incident-kanban', standalone: true, imports: [CommonModule, DragDropModule, RouterLink, AppShell],
  template: `<app-shell [navigation]="navigation()" breadcrumb="Operación › Incidencias"><div class="page"><header><div><h1>Incidencias ambientales</h1><p>Organiza el seguimiento y las acciones de mitigación.</p></div><a routerLink="/incidents/list">Incidencias críticas</a></header><p class="scope">Las mediciones y alertas se consultan por referencia. Las evidencias pertenecen a Document & Evidence.</p>@if(store.loading()){<p>Cargando incidencias...</p>}@else{<section class="board" cdkDropListGroup>@for(column of columns;track column.status){<article><div class="column-title"><h2>{{column.label}}</h2><span>{{items(column.status).length}}</span></div><div class="drop" [id]="column.status" cdkDropList [cdkDropListData]="items(column.status)" (cdkDropListDropped)="onDrop($event)">@for(incident of items(column.status);track incident.id){<a class="incident" [routerLink]="['/incidents',incident.id]" cdkDrag><div><small>{{incident.id}}</small><b [class.critical]="incident.severity==='CRITICAL'">{{incident.severity}}</b></div><h3>{{incident.title}}</h3><p>{{incident.monitoringPointLabel}} · {{incident.indicator}}</p><strong>{{incident.observedValue}} {{incident.unit}}</strong><footer><span>{{incident.responsible}}</span><span>{{incident.evidenceCount}} evidencias</span></footer></a>}</div></article>}</section>}</div></app-shell>`,
  styles: [`:host{display:block}.page{max-width:1280px}header{display:flex;justify-content:space-between;align-items:start}h1,h2,h3{color:#1e3844}h1{margin:0;font-size:28px}header p,.scope,.incident p,footer{color:#64748b}.scope{background:#f6f5ee;border-left:4px solid #64748b;padding:10px 13px;font-size:13px}.page>a,header a{background:#23a277;color:#fff;padding:10px 14px;text-decoration:none;border-radius:8px;font-weight:700}.board{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:20px}article{background:#f6f5ee;border:1px solid #e2e8f0;border-radius:12px;padding:13px;min-height:370px}.column-title{display:flex;justify-content:space-between;align-items:center}.column-title h2{font-size:15px;margin:0}.column-title span{background:#dfe7e4;border-radius:20px;padding:3px 8px;font-size:12px}.drop{min-height:280px}.incident{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:9px;padding:13px;margin-top:10px;text-decoration:none;cursor:grab}.incident>div,footer{display:flex;justify-content:space-between;gap:8px}.incident small{color:#64748b}.incident b{font-size:10px;color:#9a6700;background:#fff4d8;padding:3px 6px;border-radius:12px}.incident b.critical{color:#b42318;background:#fde8e7}.incident h3{font-size:14px;margin:10px 0 5px}.incident p{font-size:12px;margin:0}.incident strong{color:#1e3844;font-size:13px;display:block;margin:8px 0}footer{font-size:11px;border-top:1px solid #e2e8f0;padding-top:8px}@media(max-width:900px){.board{grid-template-columns:1fr}header{flex-direction:column;gap:14px}}`]
})
export class IncidentKanbanComponent implements OnInit {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(IncidentStore);
  protected readonly columns = [{ status: IncidentStatus.OPEN, label: 'Abiertas' }, { status: IncidentStatus.IN_PROGRESS, label: 'En revisión' }, { status: IncidentStatus.RESOLVED, label: 'Resueltas' }];
  protected readonly items = (status: IncidentStatus) => this.store.incidents().filter(item => item.status === status);
  ngOnInit(): void { this.store.loadIncidents(); }
  protected onDrop(event: CdkDragDrop<EnvironmentalIncident[]>): void { if (event.previousContainer !== event.container) this.store.updateStatus(event.previousContainer.data[event.previousIndex].id, event.container.id as IncidentStatus); }
}
