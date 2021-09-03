import { TestBed } from '@angular/core/testing';

import { CommonPopoverService } from './common-popover.service';

describe('CommonPopoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonPopoverService = TestBed.get(CommonPopoverService);
    expect(service).toBeTruthy();
  });
});
