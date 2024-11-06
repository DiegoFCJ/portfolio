import { TestBed } from '@angular/core/testing';

import { GithubEasyService } from './github-easy.service';

describe('GithubEasyService', () => {
  let service: GithubEasyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubEasyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
