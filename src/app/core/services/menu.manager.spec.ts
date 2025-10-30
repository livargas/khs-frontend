import { TestBed } from '@angular/core/testing';

import { MenuManager } from './menu.manager';

describe('MenuManager', () => {
  let service: MenuManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
