import { TestBed, inject } from '@angular/core/testing';

import { TripsService } from './trips.service';

describe('TripsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripsService]
    });
  });

  it('should be created', inject([TripsService], (service: TripsService) => {
    expect(service).toBeTruthy();
  }));
});
