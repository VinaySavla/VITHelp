import { TestBed } from '@angular/core/testing';

import { NetworkConnectionService } from './network-connection.service';

describe('NetworkConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkConnectionService = TestBed.get(NetworkConnectionService);
    expect(service).toBeTruthy();
  });
});
