import { Observable, of } from 'rxjs';

export class MockViewportService {
  readonly isMobile$: Observable<boolean> = of(false);

  isMobile(): boolean {
    return false;
  }
}
