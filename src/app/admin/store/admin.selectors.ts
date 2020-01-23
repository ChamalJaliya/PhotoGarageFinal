import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers/index';

export const getAdminState = (state: AppState) => state.admin;

export const getUsersList = createSelector(
  getAdminState,
  admin => admin.usersList
);

export const getUsersListLoading = createSelector(
  getAdminState,
  admin => admin.usersListLoading
);

export const getSelectedUser = createSelector(
  getUsersList,
  (usersList: any, uid: string) => usersList.filter( (user: any) => user.uid === uid)[0]
);

export const getUserModels = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userModels.hasOwnProperty(uid)) {
      return admin.userModels[uid];
    } else {
      return null;
    }
  }
);

export const getUserGalleries = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userGalleries.hasOwnProperty(uid)) {
      return admin.userGalleries[uid];
    } else {
      return null;
    }
  }
);


export const getUserBookings = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userBookings.hasOwnProperty(uid)) {
      return admin.userBookings[uid];
    } else {
      return null;
    }
  }
);

export const getUserModelsLoading = createSelector(
  getAdminState,
  admin => admin.userModelsLoading
);

export const getUserGalleriesLoading = createSelector(
  getAdminState,
  admin => admin.userGalleriesLoading
);


export const getUserBookingsLoading = createSelector(
  getAdminState,
  admin => admin.userBookingsLoading
);
