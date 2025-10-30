import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherServiceComponent } from './publisher-service.component';

describe('PublisherServiceComponent', () => {
  let component: PublisherServiceComponent;
  let fixture: ComponentFixture<PublisherServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
