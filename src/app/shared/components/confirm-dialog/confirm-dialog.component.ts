import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>

    <mat-dialog-content>
      <p>{{ message }}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="onConfirm()">Confirmar</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  private data = inject(MAT_DIALOG_DATA);

  title: string;
  message: string;

  constructor() {
    // Asigna directamente los valores desde data
    this.title = this.data?.title ?? 'Confirmación';
    this.message = this.data?.message ?? '¿Estás seguro de continuar?';
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
