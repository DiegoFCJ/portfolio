import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve skills from README content', () => {
    const mockReadmeContent = `## Skills\n- Angular\n- TypeScript\n\n`;
    service.getSkillsFromReadme().subscribe((skills) => {
      expect(skills).toEqual(['Angular', 'TypeScript']);
    });

    const req = httpMock.expectOne(service['githubApiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockReadmeContent);
  });
});
