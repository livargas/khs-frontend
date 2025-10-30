import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { AttendaceService } from '../../services/attendace-service.service';
import { AttendanceTableComponent } from '../../components/attendance-table/attendance-table.component';


@Component({
  selector: 'app-attendance',
  imports: [CommonModule, MatButtonModule, MatIconModule, AttendanceTableComponent],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {

  readonly attendaceService = inject(AttendaceService);
  private _snackBar = inject(MatSnackBar);
  private readonly _activeRoute = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);
  monthlyDate: string | null = null;

  constructor() {
    this.attendaceService.attendanceReportSaved
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this._snackBar.open('Informe de asistencia guardado!', 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
        });
      });
  }

  ngOnInit(): void {
    this.monthlyDate = this._activeRoute.snapshot.paramMap.get('monthly_date');
    this.attendaceService.loadMeetingDays(this.monthlyDate as string);
    
  }

  confirmSave(): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Guardar Informe de asistencia', message: `¿Confirmás que deseas guardar el informe de asistencia?` },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('✅ Acción confirmada');
        this.attendaceService.requestSaveAttendanceReport.next();
      } else {
        console.log('❌ Acción cancelada');
      }
    });
  }
}
