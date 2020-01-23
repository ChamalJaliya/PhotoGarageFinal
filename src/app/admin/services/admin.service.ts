import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private db: AngularFireDatabase) { }

  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList() {
    const usersRef = this.db.list('users');
    return usersRef.snapshotChanges();
  }

  getUserModels(uid: string) {
    const modelsRef = this.db.list('models/' + uid);
    return modelsRef.snapshotChanges();
  }

  getUserGalleries(uid: string) {
    const galleriesRef = this.db.list('galleries/' + uid);
    return galleriesRef.snapshotChanges();
  }

  getUserBookings(uid: string) {
    const bookingsRef = this.db.list('bookings/' + uid);
    return bookingsRef.snapshotChanges();
  }

  checkAdminRole(uid: string) {
    return this.db.object('admins/' + uid).valueChanges();
  }

  deleteUserModel(uid: string, modelId: string) {
    return from(this.db.object(`models/${uid}/` + modelId).remove());
  }

  deleteUserGallery(uid: string, galleryId: string) {
    return from(this.db.object(`galleries/${uid}/` + galleryId).remove());
  }

  deleteUserBooking(uid: string, bookingId: string) {
    return from(this.db.object(`bookings/${uid}/` + bookingId).remove());
  }

  addAdminPrivileges(uid: string) {
    const adminsRef = this.db.object('admins/' + uid);
    this.db.object('users/' + uid).update({ isAdmin: true });
    return from(adminsRef.set(true));
  }

  removeAdminPrivileges(uid: string) {
    this.db.object('users/' + uid).update({ isAdmin: false });
    return from(this.db.object('admins/' + uid).remove());
  }
}
