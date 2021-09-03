import { TestBed } from '@angular/core/testing';

import { CommonPopoverService } from './common-popover.service';

describe('CommonPopoverService', () => {
  let service: CommonPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
