import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GalleriesActionTypes } from './galleries.actions';
import { Store, select } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Gallery } from '../models/gallery.model';
import { of } from 'rxjs';
import { GalleriesService } from '../services/galleries.service';

import * as fromGalleries from './galleries.actions';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class GalleriesEffects {

  constructor(
    private actions$: Actions,
    private galleriesService: GalleriesService,
    private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(GalleriesActionTypes.GALLERIES_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => {
      return this.galleriesService.get(user.uid)
      .pipe(
        map((data: any) => {
          const galleriesData: Gallery[] = data.map((res: any) => {
            const key = res.payload.key;
            const gallery: Gallery = res.payload.val();
            return {
              key: key || null,
              title: gallery.title || null,
              description: gallery.description || null,
              photoUrl: gallery.photoUrl || null
            };
          });
          return (new fromGalleries.GalleriesLoaded({ galleries: galleriesData }));
        }),
        catchError(error => of(new fromGalleries.GalleriesError({ error })))
      );
    }),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(GalleriesActionTypes.GALLERY_ADDED),
    map((action: fromGalleries.GalleryDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.galleriesService.add(payload.gallery, user.uid))
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(GalleriesActionTypes.GALLERY_DELETED),
    map((action: fromGalleries.GalleryDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.galleriesService.delete(payload.gallery, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(GalleriesActionTypes.GALLERY_EDITED),
    map((action: fromGalleries.GalleryEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.galleriesService.update(payload.gallery, user.uid)
    )
  );

}
