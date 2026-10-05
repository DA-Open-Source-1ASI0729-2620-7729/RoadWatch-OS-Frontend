import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans">
      
      <!-- Sidebar Oscuro -->
      <aside class="w-64 bg-slate-800 text-white flex flex-col justify-between shadow-xl z-10">
        <div>
          <!-- Logo y Título -->
          <div class="p-6 flex items-center gap-3 border-b border-slate-700">
            <div class="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-white">
              S
            </div>
            <div>
              <h2 class="font-bold text-lg leading-tight">RoadWatch OS</h2>
              <p class="text-xs text-slate-400">by VíaNexo</p>
            </div>
          </div>

          <!-- Navegación Mock -->
          <nav class="p-4 space-y-1">
            <p class="text-xs font-semibold text-slate-400 mb-2 mt-4 uppercase tracking-wider">Monitoreo</p>
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <span>Dashboard</span>
            </a>
            
            <p class="text-xs font-semibold text-slate-400 mb-2 mt-6 uppercase tracking-wider">Fiscalización</p>
            <!-- Enlace Real a nuestro módulo -->
            <a routerLink="/incidencias" routerLinkActive="bg-emerald-500 text-white hover:bg-emerald-600" class="flex items-center justify-between px-3 py-2 rounded text-sm text-slate-300 transition-colors">
              <div class="flex items-center gap-3">
                <span>Incidencias</span>
              </div>
              <span class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </a>
          </nav>
        </div>

        <!-- Usuario Footer -->
        <div class="p-4 border-t border-slate-700 m-4 rounded bg-slate-700/50 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">
              GC
            </div>
            <div>
              <p class="text-sm font-medium">Gisela Chávez</p>
              <p class="text-xs text-slate-400">Directora</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Área de Contenido Principal (Inyecta las rutas aquí) -->
      <main class="flex-1 overflow-y-auto relative">
        <router-outlet></router-outlet>
      </main>
      
    </div>
  `
})
export class AppShellComponent {}