/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutoCompleteService } from './auto-complete.service';

describe('Service: AutoComplete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoCompleteService]
    });
  });

  it('should ...', inject([AutoCompleteService], (service: AutoCompleteService) => {
    expect(service).toBeTruthy();
  }));
});
