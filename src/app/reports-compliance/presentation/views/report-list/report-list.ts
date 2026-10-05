import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsStore } from '../../../application/reports.store';

@Component({ selector: 'app-report-list', imports: [RouterLink], styleUrl: './report-list.scss', templateUrl: './report-list.html' })
export class ReportList { protected readonly store = inject(ReportsStore); }
