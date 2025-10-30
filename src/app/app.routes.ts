import { Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';

// import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'publishers',
        loadChildren: () => import('./features/publisher/publisher.route').then((m) => m.routes),
      },
      {
        path: 'monthly-reports',
        loadChildren: () => import('./features/monthly-report/monthly-report.route').then((m) => m.routes),
      }
    ],
    // canActivate: [authGuard],
    // loadComponent: () => import('./features/layout/layout.component').then((m) => m.LayoutComponent),
    // children: [
    //   {
    //     path: 'dashboard',
    //     loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    //   },
    // ],
  },
  //   {
  //   path: 'notfound',
  //   loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  // },
  // { path: '**', redirectTo: '/notfound' },
];
