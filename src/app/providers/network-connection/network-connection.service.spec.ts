import { TestBed } from '@angular/core/testing';

import { NetworkConnectionService } from './network-connection.service';

describe('NetworkConnectionService', () => {
  let service: NetworkConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
