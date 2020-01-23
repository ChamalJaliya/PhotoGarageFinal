import { bookingsReducer } from './bookings.reducer';
import { bookingsInitialState } from './bookings.state';

describe('Bookings Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = bookingsReducer(bookingsInitialState, action);

      expect(result).toBe(bookingsInitialState);
    });
  });
});
