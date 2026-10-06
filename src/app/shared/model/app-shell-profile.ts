import { InjectionToken } from '@angular/core';
import type { Signal } from '@angular/core';

export interface AppShellProfile {
  organization: string;
  moduleName: string;
  name: string;
  role: string;
  initials: string;
}

export type AppShellProfileSource = Signal<AppShellProfile>;
export const APP_SHELL_PROFILE = new InjectionToken<AppShellProfileSource>('APP_SHELL_PROFILE');
