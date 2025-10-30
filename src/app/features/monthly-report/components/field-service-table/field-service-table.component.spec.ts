import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldServiceTableComponent } from './field-service-table.component';

describe('FieldServiceTableComponent', () => {
  let component: FieldServiceTableComponent;
  let fixture: ComponentFixture<FieldServiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldServiceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
