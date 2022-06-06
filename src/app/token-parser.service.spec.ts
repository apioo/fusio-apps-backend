import { TestBed } from '@angular/core/testing';

import { TokenParserService } from './token-parser.service';

describe('TokenParserService', () => {
  let service: TokenParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
