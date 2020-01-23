import { GalleriesActions, GalleriesActionTypes } from './galleries.actions';
import { galleriesInitialState, GalleriesState } from './galleries.state';


export function galleriesReducer(state = galleriesInitialState, action: GalleriesActions): GalleriesState {
  switch (action.type) {

    case GalleriesActionTypes.GALLERIES_QUERY: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case GalleriesActionTypes.GALLERIES_LOADED: {
      return Object.assign({}, state, {
        galleries: action.payload.galleries,
        loading: false,
      });
    }

    case GalleriesActionTypes.GALLERIES_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
