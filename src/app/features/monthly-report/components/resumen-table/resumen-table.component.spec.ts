import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTableComponent } from './resumen-table.component';

describe('ResumenTableComponent', () => {
  let component: ResumenTableComponent;
  let fixture: ComponentFixture<ResumenTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
