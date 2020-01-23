import { Action } from '@ngrx/store';
import { Model } from '../../models/models/model.model';
import { Gallery } from '../../galleries/models/gallery.model';
import { Booking } from '../../bookings/models/booking.model';

export enum AdminActionTypes {
  GET_USERS_LIST = '[Admin] Get Users List',
  USERS_LIST_FETCHED = '[Admin] Users list fetched',

  GET_USER_MODELS = '[Admin] Get user models',
  USERS_MODELS_LOADED = '[Admin] User models loaded',
  DELETE_USER_MODEL = '[Admin] Delete user model',

  GET_USER_GALLERIES = '[Admin] Get user galleries',
  USERS_GALLERIES_LOADED = '[Admin] User galleries loaded',
  DELETE_USER_GALLERY = '[Admin] Delete user gallery',

  GET_USER_BOOKINGS = '[Admin] Get user bookings',
  USERS_BOOKINGS_LOADED = '[Admin] User bookings loaded',
  DELETE_USER_BOOKING = '[Admin] Delete user booking',

  ADD_ADMIN_PRIVILEGES = '[Admin] Add admin privileges',
  REMOVE_ADMIN_PRIVILEGES = '[Admin] Remove admin privileges',

  ADMIN_ERROR = '[Admin] Error'
}

export class GetUsersList implements Action {
  readonly type = AdminActionTypes.GET_USERS_LIST;
}

export class UsersListFetched implements Action {
  readonly type = AdminActionTypes.USERS_LIST_FETCHED;

  constructor(public payload: { usersList: any[] }) {}
}

export class GetUserModels implements Action {
  readonly type = AdminActionTypes.GET_USER_MODELS;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserModel implements Action {
  readonly type = AdminActionTypes.DELETE_USER_MODEL;

  constructor(public payload: { userId: string, modelId: string}) {}
}

export class UserModelsLoaded implements Action {
  readonly type = AdminActionTypes.USERS_MODELS_LOADED;

  constructor(public payload: { uid: string, userModels: Model[] }) {}
}


export class GetUserGalleries implements Action {
  readonly type = AdminActionTypes.GET_USER_GALLERIES;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserGallery implements Action {
  readonly type = AdminActionTypes.DELETE_USER_GALLERY;

  constructor(public payload: { userId: string, galleryId: string}) {}
}

export class UserGalleriesLoaded implements Action {
  readonly type = AdminActionTypes.USERS_GALLERIES_LOADED;

  constructor(public payload: { uid: string, userGalleries: Gallery[] }) {}
}

export class GetUserBookings implements Action {
  readonly type = AdminActionTypes.GET_USER_BOOKINGS;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserBooking implements Action {
  readonly type = AdminActionTypes.DELETE_USER_BOOKING;

  constructor(public payload: { userId: string, bookingId: string}) {}
}

export class UserBookingsLoaded implements Action {
  readonly type = AdminActionTypes.USERS_BOOKINGS_LOADED;

  constructor(public payload: { uid: string, userBookings: Booking[] }) {}
}

export class AddAdminPrivileges implements Action {
  readonly type = AdminActionTypes.ADD_ADMIN_PRIVILEGES;

  constructor(public payload: { userId: string }) {}
}

export class RemoveAdminPrivileges implements Action {
  readonly type = AdminActionTypes.REMOVE_ADMIN_PRIVILEGES;

  constructor(public payload: { userId: string }) {}
}

export class AdminError implements Action {
  readonly type = AdminActionTypes.ADMIN_ERROR;

  constructor(public payload: { error: any }) {}
}

export type AdminActions =
  | GetUsersList
  | UsersListFetched
  | GetUserModels
  | GetUserGalleries
  | UserModelsLoaded
  | UserGalleriesLoaded
  | DeleteUserModel
  | DeleteUserGallery
  | GetUserBookings
  | UserBookingsLoaded
  | DeleteUserBooking
  | AddAdminPrivileges
  | RemoveAdminPrivileges
  | AdminError;
