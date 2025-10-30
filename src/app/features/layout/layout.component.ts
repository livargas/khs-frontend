import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [SidebarComponent, RouterOutlet, MatSidenavModule],
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
  }
}
