import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { PublisherData } from '@shared/models/interfaces/publisher';
import { supabase } from 'src/supabase.config';

@Injectable({
  providedIn: 'root'
})
export class MonthlyService {

  publishers = signal<PublisherData[]>([]);
  groups = signal<Record<string, string>[]>([]);
  privileges = signal<Record<string, string>[]>([]);
  monthlyDate = signal<string | null>(null);

  requestSaveMonthlyReport: Subject<void> = new Subject<void>();
  monthlyReportSaved: Subject<void> = new Subject<void>();

  constructor() { }

  async loadPublishers(monthlyDate: string | null): Promise<void> {
    const { data, error } = await supabase.rpc('get_publishers_summary', {
      date_from: monthlyDate,
      date_to: monthlyDate,
    });

    if (error) {
      console.error('Error loading publishers:', error);
    } else {
      this.monthlyDate.set(monthlyDate);
      this.publishers.set(data as PublisherData[]);
      console.debug('Publishers loaded:', this.publishers());
    }
  }  

  async loadGroups() {
    const { data, error } = await supabase
       .from('groups').select(`
          id, name
        `);  
    if (error) console.error('Error al obtener listado de grupos');
    else this.groups.set(data);
  }

  async loadPrivileges() {
    const { data, error } = await supabase
       .from('privileges').select(`
          tag, name
        `)
        .order('id', { ascending: true });
    
    if (error) console.error('Error al obtener listado de privilegios');
    else this.privileges.set(data);
  }


  async saveMonthlyData(formData: any): Promise<void> {
    console.debug('Saving monthly data:', formData);
    const { data, error } = await supabase.rpc('upsert_field_services', {
      p_service_at: formData.date,
      p_services: formData.formFieldService,
    });
    
    if (error) {
      console.error('Error saving monthly data:', error);
    } else {
      console.debug('Monthly data saved:', data);
      this.saveMonthlyReport();
    }
  }

  private async saveMonthlyReport(): Promise<void> {
    const { data, error } = await supabase.rpc('update_monthly_report_service', {
      p_month: this.monthlyDate(),
    });
    
    if (error) {
      console.error('Error saving monthly report:', error);
    } else {
      console.debug('Monthly report saved:', data);
      this.monthlyReportSaved.next();
    }
  }
}
