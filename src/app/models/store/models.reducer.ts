import { ModelsActions, ModelsActionTypes } from './models.actions';
import { modelsInitialState, ModelsState } from './models.state';


export function modelsReducer(state = modelsInitialState, action: ModelsActions): ModelsState {
  switch (action.type) {

    case ModelsActionTypes.MODELS_QUERY: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ModelsActionTypes.MODELS_LOADED: {
      return Object.assign({}, state, {
        models: action.payload.models,
        loading: false,
      });
    }

    case ModelsActionTypes.MODELS_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
