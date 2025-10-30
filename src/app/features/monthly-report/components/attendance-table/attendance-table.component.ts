import { Component, inject, effect } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AttendaceService } from '../../services/attendace-service.service';
import { MeetingDay } from '../../../../shared/models/interfaces/attendance';

@Component({
  selector: 'app-attendance-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.css',
})
export class AttendanceTableComponent {
  readonly attendaceService = inject(AttendaceService);

  meetingDaysData = this.attendaceService.meetingDaysData;

  dataSource = new MatTableDataSource<MeetingDay>();
  form!: FormArray;

  displayedColumns: string[] = ['attendance_at', 'f2f', 'virtual', 'notes'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.meetingDaysData();
      this.form = this.generateForm();
    });

    this.attendaceService.requestSaveAttendanceReport
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.attendaceService.saveAttendanceData(this.form.value);
      });
  }

  generateForm(): FormArray {
    const formGroups = this.meetingDaysData().map((meetingDay: MeetingDay) => {
      return new FormGroup({
        attendance_at: new FormControl(meetingDay.attendance_at),
        f2f: new FormControl(meetingDay.f2f ?? 0),
        virtual: new FormControl(meetingDay.virtual ?? 0),
        notes: new FormControl(meetingDay.notes ?? ''),
      });
    });

    return new FormArray<FormGroup>(formGroups);
  }

  getFormGroupFor(meetingDay: MeetingDay): FormGroup {
    return this.form.controls.find(
      (ctrl) => ctrl.get('attendance_at')?.value === meetingDay.attendance_at,
    ) as FormGroup;
  }

  get attendance(): FormArray<FormGroup> {
    return this.form.get('attendance') as FormArray<FormGroup>;
  }
}
