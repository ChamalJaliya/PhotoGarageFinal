import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Booking } from '../models/booking.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(booking: Booking, userId: string) {
    const bookings = this.db.list(`bookings/${userId}`);
    return bookings.push(booking);
  }

  addBookings(bookings: Booking[]) {
    const userId = this.userId;

    if (userId) {
      bookings.forEach( (booking: Booking) => {
        this.db.list(`bookings/${userId}`).push(booking);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`bookings/${userId}`).snapshotChanges();
  }

  update(booking: Booking, userId: string) {
    return of(this.db.object(`bookings/${userId}/` + booking.key)
      .update({
        id: booking.id,
        name: booking.name,
        description: booking.description,
      }));
  }

  delete(booking: Booking, userId: string) {
    return this.db.object(`bookings/${userId}/` + booking.key).remove();
  }
}
