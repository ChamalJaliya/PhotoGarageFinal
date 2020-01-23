import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GalleriesEffects } from './galleries.effects';

describe('GalleriesEffects', () => {
  let actions$: Observable<any>;
  let effects: GalleriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GalleriesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GalleriesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
