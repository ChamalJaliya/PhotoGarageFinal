import { bookingsInitialState, BookingsState } from './bookings.state';
import { BookingsActions, BookingsActionTypes } from './bookings.actions';

export function bookingsReducer(state = bookingsInitialState, action: BookingsActions): BookingsState {
  switch (action.type) {

    case BookingsActionTypes.BOOKINGS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case BookingsActionTypes.BOOKINGS_LOADED: {
      return Object.assign({}, state, {
        bookings: action.payload.bookings,
        isLoading: false,
      });
    }

    case BookingsActionTypes.BOOKINGS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
