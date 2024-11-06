import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { GithubService } from '../../services/github.service';
import { of } from 'rxjs';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubService', ['getSkillsFromReadme']);

    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [{ provide: GithubService, useValue: spy }],
    }).compileComponents();

    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display skills when they are loaded', () => {
    const mockSkills = ['Angular', 'TypeScript'];
    githubServiceSpy.getSkillsFromReadme.and.returnValue(of(mockSkills));

    fixture.detectChanges(); // Trigger change detection

    const skillElements = fixture.nativeElement.querySelectorAll('li');
    expect(skillElements.length).toBe(2);
    expect(skillElements[0].textContent).toContain('Angular');
    expect(skillElements[1].textContent).toContain('TypeScript');
  });

  it('should display loading message when skills are not loaded', () => {
    githubServiceSpy.getSkillsFromReadme.and.returnValue(of([]));

    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('ng-template');
    expect(loadingElement).toBeTruthy();
  });
});
