import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookingsService } from '../services/bookings.service';
import { BookingsActionTypes } from './bookings.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Booking } from '../models/booking.model';

import * as fromBookings from './bookings.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class BookingsEffects {

  constructor(private actions$: Actions, private bookingsService: BookingsService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(BookingsActionTypes.BOOKINGS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.bookingsService.get(user.uid)
      .pipe(
        map((data: any) => {
          const bookingsData: Booking[] = data.map((res: any) => {
            const key = res.payload.key;
            const booking: Booking = res.payload.val();
            return {
              key: key,
              id: booking.id,
              name: booking.name,
              description: booking.description
            };
          });
          return (new fromBookings.BookingsLoaded({ bookings: bookingsData }));
        }),
        catchError(error => {
          return of(new fromBookings.BookingsError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(BookingsActionTypes.BOOKINGS_ADDED),
    map((action: fromBookings.BookingsAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.bookingsService.add(payload.booking, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(BookingsActionTypes.BOOKINGS_EDITED),
    map((action: fromBookings.BookingsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.bookingsService.update(payload.booking, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromBookings.BookingsError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(BookingsActionTypes.BOOKINGS_DELETED),
    map((action: fromBookings.BookingsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.bookingsService.delete(payload.booking, user.uid))
  );
}
