import { TestBed } from '@angular/core/testing';

import { DeGiroService } from './de-giro.service';

describe('DeGiroService', () => {
  let service: DeGiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeGiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
