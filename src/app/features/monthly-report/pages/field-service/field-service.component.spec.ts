import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldServiceComponent } from './field-service.component';

describe('FieldServiceComponent', () => {
  let component: FieldServiceComponent;
  let fixture: ComponentFixture<FieldServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
