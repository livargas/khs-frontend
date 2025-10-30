import { Component, inject } from '@angular/core';
import { supabase } from 'src/supabase.config';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonthlyReport } from '@shared/models/interfaces/monthly_report';
import { CommonModule } from '@angular/common';
import { ResumenTableComponent } from '../../components/resumen-table/resumen-table.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, ResumenTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  monthly_reports: MonthlyReport[] = [];

  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.getMonthlyReports();
  }

  async getMonthlyReports() {
    const { data, error } = await supabase
      .from('monthly_reports')
      .select(
        `
          monthly_date,
          publisher,
          attendance,
          publisher_reports,
          publisher_courses,
          auxiliary_reports,
          auxiliary_hours,
          auxiliary_courses,
          regular_reports,
          regular_hours,
          regular_courses,
          inactive
        `,
      )
      .order('monthly_date', { ascending: false });

    if (error) {
      console.error('Error loading monthly_reports:', error);
    } else {
      this.monthly_reports = data as MonthlyReport[];
      console.debug('monthly_reports loaded:', this.monthly_reports);
    }
  }

  openConfirmDialog() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Crear reporte mensual', message: '¿Confirmás que deseas crear un nuevo reporte mensual?' },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('✅ Acción confirmada');
        this.addMonthlyReport();
      } else {
        console.log('❌ Acción cancelada');
      }
    });
  }

  private async addMonthlyReport() {
    const { data, error } = await supabase.rpc('create_next_monthly_report');
    if (error) {
      console.error('Error create_next_monthly_report', error);
    } else {
      this._snackBar.open('Nuevo reporte mensual creado!', 'Cerrar', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
      this.getMonthlyReports();
    }
  }
}
