import { TestBed } from '@angular/core/testing';

import { FakeapiService } from './fakeapi.service';

describe('FakeapiService', () => {
  let service: FakeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
