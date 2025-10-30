import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { FieldServiceTableComponent } from '../../components/field-service-table/field-service-table.component';
import { MonthlyService } from '../../services/monthly-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-field-service',
  imports: [CommonModule, FieldServiceTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './field-service.component.html',
  styleUrl: './field-service.component.css',
})
export class FieldServiceComponent implements OnInit {
  readonly monthlyService = inject(MonthlyService);
  private _snackBar = inject(MatSnackBar);
  private readonly _activeRoute = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);
  monthlyDate: string | null = null;

  constructor() {
    this.monthlyService.monthlyReportSaved
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this._snackBar.open('Informe de servicio guardado!', 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
        });
      });
  }

  ngOnInit(): void {
    this.monthlyDate = this._activeRoute.snapshot.paramMap.get('monthly_date');
    this.monthlyService.loadPublishers(this.monthlyDate);
    this.monthlyService.loadGroups();
    this.monthlyService.loadPrivileges();
  }

  confirmSave(): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Guardar Informe mensual', message: `¿Confirmás que deseas guardar el informe mensual?` },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('✅ Acción confirmada');
        this.monthlyService.requestSaveMonthlyReport.next();
      } else {
        console.log('❌ Acción cancelada');
      }
    });
  }
}
