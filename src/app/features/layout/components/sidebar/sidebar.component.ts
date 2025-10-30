import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [MatListModule, RouterLink,  MatIconModule, MatExpansionModule],
})
export class SidebarComponent implements OnInit {
  // public appJson: any = packageJson;

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
