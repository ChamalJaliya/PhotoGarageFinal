import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromAdmin from './../store/admin.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { Model } from '../../models/models/model.model';
import { Gallery } from '../../galleries/models/gallery.model';
import { of } from 'rxjs';
import { Booking } from '../../bookings/models/booking.model';


@Injectable()
export class AdminEffects {

  constructor(private actions$: Actions, private adminService: AdminService) {}

  @Effect()
  getUsersList$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USERS_LIST),
    switchMap( () => this.adminService.getUsersList()
      .pipe(
        map( (users: any) => {
          const usersList: any[] = users.map((res: any) => {
            const key = res.payload.key;
            const user: any = res.payload.val();
            return {
              key: key,
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              providerId: user.providerId,
              photoUrl: user.photoUrl,
              isNewUser: user.isNewUser,
              isAdmin: user.isAdmin,
              isOnline: user.isOnline
            };
          });
          return (new fromAdmin.UsersListFetched({ usersList }));
        }),
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect()
  getUserModels$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_MODELS),
    map((action: fromAdmin.GetUserModels) => action.payload),
    mergeMap( (payload: any) => this.adminService.getUserModels(payload.uid)
      .pipe(
        map((data: any) => {
          const modelsData: Model[] = data.map((res: any) => {
            const key = res.payload.key;
            const model: Model = res.payload.val();
            return {
              key: key || null,
              title: model.title || null,
              description: model.description || null,
              photoUrl: model.photoUrl || null
            };
          });
          return (new fromAdmin.UserModelsLoaded({ uid: payload.uid, userModels: modelsData }));
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserModel$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_MODEL),
    map( (action: fromAdmin.DeleteUserModel) => action.payload),
    switchMap( (payload: any) => this.adminService.deleteUserModel(payload.userId, payload.modelId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );


  @Effect()
  getUserGalleries$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_GALLERIES),
    map((action: fromAdmin.GetUserGalleries) => action.payload),
    mergeMap( (payload: any) => this.adminService.getUserGalleries(payload.uid)
      .pipe(
        map((data: any) => {
          const galleriesData: Gallery[] = data.map((res: any) => {
            const key = res.payload.key;
            const gallery: Gallery = res.payload.val();
            return {
              key: key || null,
              title: gallery.title || null,
              description: gallery.description || null,
              photoUrl: gallery.photoUrl || null
            };
          });
          return (new fromAdmin.UserGalleriesLoaded({ uid: payload.uid, userGalleries: galleriesData }));
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserGallery$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_GALLERY),
    map( (action: fromAdmin.DeleteUserGallery) => action.payload),
    switchMap( (payload: any) => this.adminService.deleteUserGallery(payload.userId, payload.galleryId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect()
  getUserBookings$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_BOOKINGS),
    map((action: fromAdmin.GetUserBookings) => action.payload),
    mergeMap( (payload: any) => this.adminService.getUserBookings(payload.uid)
      .pipe(
        map((data: any) => {
          const bookingsData: Booking[] = data.map((res: any) => {
            const key = res.payload.key;
            const booking: Booking = res.payload.val();
            return {
              key: key,
              id: booking.id,
              name: booking.name,
              description: booking.description
            };
          });
          return (new fromAdmin.UserBookingsLoaded({ uid: payload.uid, userBookings: bookingsData }));
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserBooking$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_BOOKING),
    map( (action: fromAdmin.DeleteUserBooking) => action.payload),
    switchMap( (payload: any) => this.adminService.deleteUserBooking(payload.userId, payload.bookingId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  addAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.ADD_ADMIN_PRIVILEGES),
    map( (action: fromAdmin.AddAdminPrivileges) => action.payload),
    switchMap( (payload: any) => this.adminService.addAdminPrivileges(payload.userId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  removeAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.REMOVE_ADMIN_PRIVILEGES),
    map( (action: fromAdmin.RemoveAdminPrivileges) => action.payload),
    switchMap( (payload: any) => this.adminService.removeAdminPrivileges(payload.userId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );
}
