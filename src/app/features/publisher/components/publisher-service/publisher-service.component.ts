import { Component, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherServiceData } from '@shared/models/interfaces/publisher';
import dayjs from 'dayjs';

interface MonthService {
  service: PublisherServiceData | null,
  month: string
}

@Component({
  selector: 'app-publisher-service',
  imports: [CommonModule],
  templateUrl: './publisher-service.component.html',
  styleUrl: './publisher-service.component.css',
})
export class PublisherServiceComponent {
  fieldServices = input<PublisherServiceData[]>([]);
  months: string[] = [];
  monthServices: MonthService[] = [];

  constructor() {
    effect(() => {
      this.loadService();
    });
  }

  private loadService() {
    if (!this.months.length) {
      const date = dayjs().startOf('month');
      for (let i = 0; i < 12; i++) {
        this.months.push(date.add(i * -1, 'month').format('YYYY-MM-DD'));
      }
    }

    this.monthServices = [];
    for (const month of this.months) {
      const service = this.fieldServices().find((s) => s.service_at === month);
      this.monthServices.push({
        service: service ?? null,
        month: month,
      });
    }
  }
}
