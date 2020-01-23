import { adminInitialState, AdminState } from './admin.state';
import { AdminActions, AdminActionTypes } from './admin.actions';

export function adminReducer(state = adminInitialState, action: AdminActions): AdminState {
  switch (action.type) {

    case AdminActionTypes.GET_USERS_LIST: {
      return Object.assign({}, state, {
        usersListLoading: true
      });
    }

    case AdminActionTypes.USERS_LIST_FETCHED: {
      return Object.assign({}, state, {
        usersList: action.payload.usersList,
        usersListLoading: false
      });
    }

    case AdminActionTypes.GET_USER_MODELS: {
      return Object.assign({}, state, {
        userModelsLoading: true
      });
    }

    case AdminActionTypes.GET_USER_GALLERIES: {
      return Object.assign({}, state, {
        userGalleriesLoading: true
      });
    }

    case AdminActionTypes.USERS_MODELS_LOADED: {
      return Object.assign({}, state, {
        userModels: {...state.userModels, [action.payload.uid]: action.payload.userModels},
        userModelsLoading: false
      });
    }

    case AdminActionTypes.USERS_GALLERIES_LOADED: {
      return Object.assign({}, state, {
        userGalleries: {...state.userGalleries, [action.payload.uid]: action.payload.userGalleries},
        userGalleriesLoading: false
      });
    }


    case AdminActionTypes.GET_USER_BOOKINGS: {
      return Object.assign({}, state, {
        userBookingsLoading: true
      });
    }

    case AdminActionTypes.USERS_BOOKINGS_LOADED: {
      return Object.assign({}, state, {
        userBookings: {...state.userBookings, [action.payload.uid]: action.payload.userBookings},
        userBookingsLoading: false
      });
    }

    case AdminActionTypes.ADMIN_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
