import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherCardComponent } from './publisher-card.component';

describe('PublisherCardComponent', () => {
  let component: PublisherCardComponent;
  let fixture: ComponentFixture<PublisherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
