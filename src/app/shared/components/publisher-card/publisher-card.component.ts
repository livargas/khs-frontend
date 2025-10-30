import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PublisherServiceData } from '@shared/models/interfaces/publisher';
import dayjs from 'dayjs';

interface MonthService {
  service: PublisherServiceData | null;
  month: string;
}

@Component({
  selector: 'app-publisher-card',
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './publisher-card.component.html',
  styleUrl: './publisher-card.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PublisherCardComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PublisherCardComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly publisher = this.data.publisher;

  monthServices: MonthService[] = [];

  ngOnInit(): void {
    this.loadService();
  }

  private loadService() {
    const months = [];
    const date = dayjs().startOf('month').add(-1, 'month'); // mes actual siempre estará vacio
    for (let i = 0; i < 12; i++) {
      months.push(date.add(i * -1, 'month').format('YYYY-MM-DD'));
    }

    for (const month of months) {
      const service = this.publisher.field_services.find((s: PublisherServiceData) => s.service_at === month);
      this.monthServices.push({
        service: service ?? null,
        month: month,
      });
    }
  }
}
