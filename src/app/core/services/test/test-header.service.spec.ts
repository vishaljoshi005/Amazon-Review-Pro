import { TestBed } from '@angular/core/testing';

import { TestHeaderService } from './test-header.service';

describe('TestHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestHeaderService = TestBed.get(TestHeaderService);
    expect(service).toBeTruthy();
  });
});
