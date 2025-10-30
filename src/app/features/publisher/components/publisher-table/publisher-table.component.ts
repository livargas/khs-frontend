import { Component, input, computed, ViewChild, effect, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { PublisherData } from '@shared/models/interfaces/publisher';
import { PublisherCardComponent } from '@shared/components/publisher-card/publisher-card.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { supabase } from 'src/supabase.config';

@Component({
  selector: 'app-publisher-table',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeComponent,
  ],
  templateUrl: './publisher-table.component.html',
  styleUrl: './publisher-table.component.css',
})
export class PublisherTableComponent implements OnInit{
  @ViewChild(MatSort) sort!: MatSort;

  publishers = input<PublisherData[]>([]);
  displayedColumns: string[] = ['group_id', 'firstname', 'lastname', 'baptized_at', 'privileges'];
  dataSource = new MatTableDataSource();
  readonly dialog = inject(MatDialog);

  formFilter = new FormGroup({
    search: new FormControl(null),
    group: new FormControl(null),
    privileges: new FormControl([]),
  });

  groups: Record<string, string>[] | null = [];
  privileges: Record<string, string>[] | null = [];

  constructor() {
    effect(() => {
      this.dataSource.data = this.publishers();
      this.dataSource.sort = this.sort;
    });

    this.loadGroups();
    this.loadPrivileges();

    this.formFilter.valueChanges.subscribe(formValues => {
      this.applyFilter(formValues);
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = JSON.parse(filter);

      const matchName = filters.search
        ? data.firstname.toLowerCase().includes(filters.search.toLowerCase()) || data.lastname.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      const matchGroup = filters.group && Array.isArray(filters.group) && filters.group.length
        ? filters.group.includes(data.group_id)
        : true;

      const matchPrivileges = filters.privileges && Array.isArray(filters.privileges) && filters.privileges.length
        ? data.privileges && data.privileges.some((privilege: Record<string, string>) => filters.privileges.includes(privilege['tag']))
        : true;

      return matchName && matchGroup && matchPrivileges;
    };
  }

  private async loadGroups() {
    const { data, error } = await supabase
       .from('groups').select(`
          id, name
        `);  
    if (error) console.error('Error al obtener listado de grupos');

    this.groups = data;
  }

  private async loadPrivileges() {
    const { data, error } = await supabase
       .from('privileges').select(`
          tag, name
        `)
        .order('id', { ascending: true });
    
    if (error) console.error('Error al obtener listado de privilegios');

    this.privileges = data;
  }

  private applyFilter(formValues: any) {
    this.dataSource.filter = JSON.stringify(formValues);
  }

  openPublisherCard(publisher: PublisherData) {
    this.dialog.open(PublisherCardComponent, {
      data: {
        publisher: publisher,
      },
      panelClass: 'fullscreen-dialog',
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
    });
  }
}
