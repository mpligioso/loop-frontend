import { TestBed, inject } from '@angular/core/testing';

import { GMapService } from './gmap.service';

describe('GMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GMapService]
    });
  });

  it('should be created', inject([GMapService], (service: GMapService) => {
    expect(service).toBeTruthy();
  }));
});
