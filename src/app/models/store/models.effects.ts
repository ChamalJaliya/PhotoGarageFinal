import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ModelsActionTypes } from './models.actions';
import { Store, select } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Model } from '../models/model.model';
import { of } from 'rxjs';
import { ModelsService } from '../services/models.service';

import * as fromModels from './models.actions';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class ModelsEffects {

  constructor(
    private actions$: Actions,
    private modelsService: ModelsService,
    private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(ModelsActionTypes.MODELS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => {
      return this.modelsService.get(user.uid)
      .pipe(
        map((data: any) => {
          const modelsData: Model[] = data.map((res: any) => {
            const key = res.payload.key;
            const model: Model = res.payload.val();
            return {
              key: key || null,
              title: model.title || null,
              description: model.description || null,
              photoUrl: model.photoUrl || null
            };
          });
          return (new fromModels.ModelsLoaded({ models: modelsData }));
        }),
        catchError(error => of(new fromModels.ModelsError({ error })))
      );
    }),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(ModelsActionTypes.MODEL_ADDED),
    map((action: fromModels.ModelDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.modelsService.add(payload.model, user.uid))
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(ModelsActionTypes.MODEL_DELETED),
    map((action: fromModels.ModelDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.modelsService.delete(payload.model, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(ModelsActionTypes.MODEL_EDITED),
    map((action: fromModels.ModelEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.modelsService.update(payload.model, user.uid)
    )
  );

}
