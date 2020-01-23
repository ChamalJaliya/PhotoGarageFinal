import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../app/reducers';

import * as fromAdmin from '../../store/admin.actions';
import { Observable } from 'rxjs';
import {
  getUsersList,
  getUserModels,
  getUserGalleries,
  getSelectedUser,
  getUsersListLoading,
  getUserModelsLoading,
  getUserGalleriesLoading,
  getUserBookings,
  getUserBookingsLoading
} from '../../store/admin.selectors';
import { Model } from '../../../models/models/model.model';
import { Gallery } from '../../../galleries/models/gallery.model';
import { User } from '../../../auth/models/user.model';
import { map, delay, take } from 'rxjs/operators';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Booking } from '../../../bookings/models/booking.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService
  ) {}

  users$: Observable<any>;
  userModels$: Observable<Model[]>;
  userGalleries$: Observable<Gallery[]>;
  userBookings$: Observable<Booking[]>;
  usersListLoading$: Observable<boolean>;
  userModelsLoading$: Observable<boolean>;
  userGalleriesLoading$: Observable<boolean>;
  userBookingsLoading$: Observable<boolean>;
  selectedUser$: Observable<any>;
  selectedUser: any;
  uid: any;

  private modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  ngOnInit() {
    this.users$ = this.store.pipe(
      select(getUsersList),
      delay(0),
      map((users: User[]) => {
        if (!users || (users && users.length === 0)) {
          this.store.dispatch(new fromAdmin.GetUsersList());
        }
        return users;
      })
    );
    this.usersListLoading$ = this.store.select(getUsersListLoading);
    this.userModelsLoading$ = this.store.select(getUserModelsLoading);
    this.userGalleriesLoading$ = this.store.select(getUserGalleriesLoading);
    this.userBookingsLoading$ = this.store.select(getUserBookingsLoading);
  }

  onUserSelect(user: any) {
    this.uid = user.uid;
    this.selectedUser = user;
    this.selectedUser$ = this.store.select(getSelectedUser, user.uid);
    this.userModels$ = this.store.select(getUserModels, user.uid).pipe(
      map(models => {
        if (models && models.length !== 0) {
          return models;
        } else {
          return null;
        }
      })
    );

    this.userGalleries$ = this.store.select(getUserGalleries, user.uid).pipe(
      map(galleries => {
        if (galleries && galleries.length !== 0) {
          return galleries;
        } else {
          return null;
        }
      })
    );


    this.userBookings$ = this.store.select(getUserBookings, user.uid).pipe(
      map(bookings => {
        if (bookings && bookings.length !== 0) {
          return bookings;
        } else {
          return null;
        }
      })
    );
  }

  onModelsLoad() {
    this.store.dispatch(new fromAdmin.GetUserModels({ uid: this.uid }));
  }

  onGalleriesLoad() {
    this.store.dispatch(new fromAdmin.GetUserGalleries({ uid: this.uid }));
  }


  onBookingsLoad() {
    this.store.dispatch(new fromAdmin.GetUserBookings({ uid: this.uid }));
  }

  onDetailsClose() {
    this.selectedUser = null;
  }

  openModelConfirmModal(model: Model) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserModel({
              userId: this.selectedUser.key,
              modelId: model.key
            })
          );
        }
      });
  }

  openGalleryConfirmModal(gallery: Gallery) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserGallery({
              userId: this.selectedUser.key,
              galleryId: gallery.key
            })
          );
        }
      });
  }

  openBookingConfirmModal(booking: Booking) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserBooking({
              userId: this.selectedUser.key,
              bookingId: booking.key
            })
          );
        }
      });
  }

  onBookingDelete(booking: Booking) {
    this.openBookingConfirmModal(booking);
  }

  onModelDelete(model: Model) {
    this.openModelConfirmModal(model);
  }

  onGalleryDelete(gallery: Gallery) {
    this.openGalleryConfirmModal(gallery);
  }

  addAdminPrivileges(user: any) {
    this.store.dispatch(new fromAdmin.AddAdminPrivileges({ userId: user.key }));
  }

  removeAdminPrivileges(user: any) {
    this.store.dispatch(
      new fromAdmin.RemoveAdminPrivileges({ userId: user.key })
    );
  }
}
