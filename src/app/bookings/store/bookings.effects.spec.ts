import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookingsEffects } from './bookings.effects';

describe('BookingsEffects', () => {
  let actions$: Observable<any>;
  let effects: BookingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(BookingsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
