import { Component, input, computed, ViewChild, effect, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { PublisherData, PublisherServiceData } from '@shared/models/interfaces/publisher';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MonthlyService } from '../../services/monthly-service.service';

@Component({
  selector: 'app-field-service-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './field-service-table.component.html',
  styleUrls: ['./field-service-table.component.scss'],
})
export class FieldServiceTableComponent implements OnInit {
  readonly monthlyService = inject(MonthlyService);

  publishers = this.monthlyService.publishers;
  monthlyDate = this.monthlyService.monthlyDate;

  groups: Record<string, string>[] = [];
  privileges: Record<string, string>[] = [];

  displayedColumns: string[] = [
    'group_id',
    'fullname',
    'participated',
    'courses',
    'serves_as',
    'hours',
    'credited',
    'notes',
  ];

  dataSource = new MatTableDataSource<PublisherData>();
  form!: FormGroup;

  formFilter = new FormGroup({
    search: new FormControl(null),
    group: new FormControl(null),
    privileges: new FormControl([]),
  });

  constructor() {
    effect(() => {
      this.dataSource.data = this.publishers();
      this.groups = this.monthlyService.groups();
      this.privileges = this.monthlyService.privileges();
      this.form = this.generateForm();
    });

    this.formFilter.valueChanges.subscribe((formValues) => {
      this.applyFilter(formValues);
    });

    this.monthlyService.requestSaveMonthlyReport
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.monthlyService.saveMonthlyData(this.form.value);
      });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = JSON.parse(filter);

      const matchName = filters.search
        ? data.firstname.toLowerCase().includes(filters.search.toLowerCase()) ||
          data.lastname.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      const matchGroup =
        filters.group && Array.isArray(filters.group) && filters.group.length
          ? filters.group.includes(data.group_id)
          : true;

      const fieldService = data.field_services[0] ?? [];
      const matchPrivileges =
        fieldService && filters.privileges && Array.isArray(filters.privileges) && filters.privileges.length
          ? filters.privileges.includes(fieldService.serves_as)
          : true;

      return matchName && matchGroup && matchPrivileges;
    };
  }

  private applyFilter(formValues: any) {
    this.dataSource.filter = JSON.stringify(formValues);
  }

  generateForm(): FormGroup {
    const formGroups = this.publishers().map((publisher) => {
      const fs = (publisher.field_services?.[0] || {}) as PublisherServiceData;

      return new FormGroup({
        publisher_id: new FormControl(publisher.id),
        participated: new FormControl(this.hasParticipated(publisher, fs)),
        courses: new FormControl(fs.courses ?? 0),
        serves_as: new FormControl(this.getServesAs(publisher, fs)),
        hours: new FormControl(fs.hours ?? 0),
        credited: new FormControl(fs.credited ?? 0),
        notes: new FormControl(fs.notes ?? ''),
      });
    });

    return new FormGroup({
      date: new FormControl(this.monthlyDate()),
      formFieldService: new FormArray<FormGroup>(formGroups),
    });
  }
  
  getFormGroupFor(publisher: PublisherData): FormGroup {
  return this.formFieldService.controls.find(
    ctrl => ctrl.get('publisher_id')?.value === publisher.id
  ) as FormGroup;
}

  get formFieldService(): FormArray<FormGroup> {
    return this.form.get('formFieldService') as FormArray<FormGroup>;
  }

  private getServesAs(publisher: PublisherData, fs: PublisherServiceData): string {
    if (fs && fs.serves_as) {
      return fs.serves_as;
    }

    if (!publisher.privileges) {
      return 'publisher';
    }

    const regular = publisher.privileges.some((p) => p.tag === 'regular');
    const auxiliary = publisher.privileges.some((p) => p.tag === 'auxiliary');

    return auxiliary ? 'auxiliary' : regular ? 'regular' : 'publisher';
  }

  private handleDataToSave(): any {
    const formValue = this.form.value;
    const dataToSave = formValue.formFieldService.map((fs: any) => ({
      publisher_id: fs.publisher_id,
      participated: fs.participated,
      courses: fs.courses,
      serves_as: fs.auxiliary ? 'auxiliary' : '',
      hours: fs.hours,
      credited: fs.credited,
      notes: fs.notes,
    }));

    return dataToSave;
  }

  private hasParticipated(publisher: PublisherData, fs: PublisherServiceData): boolean {
    if (fs && fs.participated) {
      return true;
    }

    if (fs && ['auxiliary', 'regular'].includes(fs.serves_as)) {
      return true;
    }

    const isPioner = publisher.privileges?.some((p) => ['regular', 'auxiliary'].includes(p.tag));

    return !!isPioner;
  }
}
