import { Component, input, computed, ViewChild, effect, inject, signal, untracked, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MonthlyReport } from '@shared/models/interfaces/monthly_report';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-resumen-table',
  imports: [CommonModule, MatTableModule, MatSort, MatSortModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './resumen-table.component.html',
  styleUrl: './resumen-table.component.css',
})
export class ResumenTableComponent {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  monthly_reports = input<MonthlyReport[]>([]);
  displayedColumns: string[] = [
    'monthly_date',
    'attendance',
    'publisher',
    'publisher_reports',
    'publisher_courses',
    'auxiliary_reports',
    'auxiliary_hours',
    'auxiliary_courses',
    'regular_reports',
    'regular_hours',
    'regular_courses',
    'inactive'
  ];
  dataSource = new MatTableDataSource();

  private cdr = inject(ChangeDetectorRef)

  constructor() {
    effect(() => {
      this.dataSource.data = this.monthly_reports();
      this.dataSource.sort = this.sort;
      // const data = this.monthly_reports();
      // untracked(() => {
      //   this.dataSource.data = data;
      //   this.dataSource.sort = this.sort;
      //   this.dataSource._updateChangeSubscription();
      // });
    });
  }
}
