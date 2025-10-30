import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { MeetingDay } from '@shared/models/interfaces/attendance';
import { supabase } from 'src/supabase.config';

import dayjs from 'dayjs';


@Injectable({
  providedIn: 'root',
})
export class AttendaceService {
  private readonly meetingDays = environment.meetingDays;

  requestSaveAttendanceReport: Subject<void> = new Subject<void>();
  attendanceReportSaved: Subject<void> = new Subject<void>();

  meetingDaysData = signal<MeetingDay[]>([]);
  monthlyDate = signal<string | null>(null);

  async loadMeetingDays(startDate: string): Promise<void> {
    const { data, error } = await supabase.rpc('get_attendance_by_days', {
      month_year: dayjs(startDate).format('YYYY-MM')
    });

    if (error) {
      console.error('Error loading meetingdays:', error);
    } else {
      this.monthlyDate.set(startDate);
      console.log('startDate', startDate)
      if (!data || !data.length) {
        this.generateMeetingDays(startDate);
      } else {
        this.meetingDaysData.set(data as MeetingDay[]);
      }
    }
  }

  private generateMeetingDays(startDate: string): void {
    const result: MeetingDay[] = [];

    const startOfMonth = dayjs(startDate).startOf('month');
    const endOfMonth = startOfMonth.endOf('month');
    const month = startOfMonth.month();

    // Iteramos desde el primer día del mes
    let current = startOfMonth.startOf('week'); // comienza desde el domingo anterior o igual

    while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, 'day')) {
      let week = current.day(this.meetingDays.week);
      let weekend = current.day(this.meetingDays.weekend);

      if (week.month() === month) {
        result.push({
          attendance_at: week.format('YYYY-MM-DD'), 
          f2f: 0,
          virtual: 0,
          notes: null
        });
      }

      if (weekend.month() === month) {
        result.push({
          attendance_at: weekend.format('YYYY-MM-DD'), 
          f2f: 0,
          virtual: 0,
          notes: null
        });
      }

      // Avanza a la siguiente semana
      current = current.add(1, 'week');
    }

    this.meetingDaysData.set(result);
  }

  async saveAttendanceData(formData: any): Promise<void> {
    const { data, error } = await supabase.rpc('upsert_attendances', {
      data: formData,
    });
    
    if (error) {
      console.error('Error saving Attendance data:', error);
    } else {
      console.debug('Attendance data saved:', data);
      this.saveMonthlyReport();
    }
  }
  

  private async saveMonthlyReport(): Promise<void> {
    const { data, error } = await supabase.rpc('update_monthly_report_attendance', {
      p_month: this.monthlyDate(),
    });
    
    if (error) {
      console.error('Error saving monthly report:', error);
    } else {
      console.debug('Monthly report saved:', data);
      this.attendanceReportSaved.next();
    }
  }
}
