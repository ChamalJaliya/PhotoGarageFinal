import { Action } from '@ngrx/store';
import { Booking } from '../models/booking.model';

export enum BookingsActionTypes {
  BOOKINGS_QUERY = '[Bookings] Query',
  BOOKINGS_LOADED = '[Bookings] Fetched',

  BOOKINGS_ADDED = '[Bookings] Added',
  BOOKINGS_EDITED = '[Bookings] Edited',
  BOOKINGS_DELETED = '[Bookings] Deleted',

  BOOKINGS_ERROR = '[Bookings] Error'
}

export class BookingsQuery implements Action {
  readonly type = BookingsActionTypes.BOOKINGS_QUERY;
}

export class BookingsLoaded implements Action {
  readonly type = BookingsActionTypes.BOOKINGS_LOADED;

  constructor(public payload: { bookings: Booking[] }) {}
}

export class BookingsAdded implements Action {
  readonly type = BookingsActionTypes.BOOKINGS_ADDED;

  constructor(public payload: { booking: Booking }) {}
}

export class BookingsEdited implements Action {
  readonly type = BookingsActionTypes.BOOKINGS_EDITED;

  constructor(public payload: { booking: Booking }) {}
}

export class BookingsDeleted implements Action {
  readonly type = BookingsActionTypes.BOOKINGS_DELETED;

  constructor(public payload: { booking: Booking }) {}
}

export class BookingsError implements Action {
  readonly type = BookingsActionTypes.BOOKINGS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type BookingsActions =
  | BookingsQuery
  | BookingsLoaded
  | BookingsAdded
  | BookingsEdited
  | BookingsDeleted
  | BookingsError;
