import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookingsState } from './bookings.state';

export const getBookingsState = createFeatureSelector<BookingsState>('bookings');

export const getBookings = createSelector(
  getBookingsState,
  bookings => bookings.bookings
);

export const getIsLoading = createSelector(
  getBookingsState,
  bookings => bookings.isLoading
);

export const getError = createSelector(
  getBookingsState,
  bookings => bookings.error
);
