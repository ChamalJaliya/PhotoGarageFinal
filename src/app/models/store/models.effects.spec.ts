import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ModelsEffects } from './models.effects';

describe('ModelsEffects', () => {
  let actions$: Observable<any>;
  let effects: ModelsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModelsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ModelsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
