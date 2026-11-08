import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  styleUrl: './app-topbar.css',
  templateUrl: './app-topbar.html',
})
export class AppTopbar {
  readonly breadcrumb = input('Fiscalización');
}
