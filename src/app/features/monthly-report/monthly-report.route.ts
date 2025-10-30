import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'resume',
    loadComponent: () => import('./pages/resume/resume.component').then((m) => m.ResumeComponent),
  },
  {
    path: 'attendance/:monthly_date',
    loadComponent: () => import('./pages/attendance/attendance.component').then((m) => m.AttendanceComponent),
  },
  {
    path: 'field-service/:monthly_date',
    loadComponent: () => import('./pages/field-service/field-service.component').then((m) => m.FieldServiceComponent),
  },
];
