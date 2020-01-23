import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromBookings from '../store/bookings.actions';
import { Booking } from '../models/booking.model';
import { Subscription, Observable } from 'rxjs';
import { getBookings, getIsLoading } from '../store/bookings.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { BookingsModalComponent } from '../../shared/components/bookings-modal/bookings-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  bookings: Booking[] | null;
  modalRef: MDBModalRef;

  bookingsSub: Subscription;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  lastBookingIndex: number;

  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.bookingsSub = this.store.select(getBookings).pipe(
      map( (bookings: Booking[]) => {
        if (this.user && !bookings) {
          this.store.dispatch(new fromBookings.BookingsQuery());
        }
        return bookings;
      })
    )
    .subscribe( (bookings: Booking[]) => {
      if (bookings && bookings.length !== 0) {
        const index: number = Number(bookings[bookings.length - 1].id);
        this.lastBookingIndex = index;
      } else {
        this.lastBookingIndex = 0;
      }

      this.bookings = bookings;
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  onAddBooking() {
    this.modalRef = this.modalService.show(BookingsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new Reservation';
    this.modalRef.content.booking.id = this.lastBookingIndex + 1;

    this.modalRef.content.bookingData.pipe(take(1)).subscribe( (bookingData: Booking) => {
      this.store.dispatch(new fromBookings.BookingsAdded({ booking: bookingData }));
    });
  }

  openEditBookingModal(booking: Booking) {
    this.modalRef = this.modalService.show(BookingsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit booking';
    const bookingCopy = {
      key: booking.key,
      id: booking.id || null,
      name: booking.name || null,
      description: booking.description || null
     };
    this.modalRef.content.booking = bookingCopy;

    this.modalRef.content.bookingData.pipe(take(1)).subscribe( (bookingData: Booking) => {
      this.store.dispatch(new fromBookings.BookingsEdited({ booking: bookingData }));
    });
  }

  openConfirmModal(booking: Booking) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromBookings.BookingsDeleted({ booking }));
      }
    });
  }

  onBookingEdit(booking: Booking) {
    this.openEditBookingModal(booking);
  }

  onBookingDelete(booking: Booking) {
    this.openConfirmModal(booking);
  }

}
