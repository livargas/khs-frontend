import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from 'src/supabase.config';
import { PublisherData } from '@shared/models/interfaces/publisher';
import { PublisherTableComponent } from '../components/publisher-table/publisher-table.component';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    PublisherTableComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  publishers: PublisherData[] = [];

  constructor() {
    this.loadPublishers();
  }

  async loadPublishers() {
    const { data, error } = await supabase
       .rpc('get_publishers_summary');

    if (error) {
      console.error('Error loading publishers:', error);
    } else {
      this.publishers = data as PublisherData[];
      console.log('Publishers loaded:', this.publishers);
    }
  }
}
