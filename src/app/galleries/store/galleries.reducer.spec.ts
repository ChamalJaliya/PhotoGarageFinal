import { galleriesReducer } from './galleries.reducer';
import { galleriesInitialState } from './galleries.state';

describe('Galleries Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = galleriesReducer(galleriesInitialState, action);

      expect(result).toBe(galleriesInitialState);
    });
  });
});
