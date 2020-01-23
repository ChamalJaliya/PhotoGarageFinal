import { modelsReducer } from './models.reducer';
import { modelsInitialState } from './models.state';

describe('Models Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = modelsReducer(modelsInitialState, action);

      expect(result).toBe(modelsInitialState);
    });
  });
});
