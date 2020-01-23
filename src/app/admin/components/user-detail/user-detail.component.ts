import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { Model } from '../../../models/models/model.model';
import { Gallery } from '../../../galleries/models/gallery.model';
import { Booking } from '../../../bookings/models/booking.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() models: Model[];
  @Input() galleries: Gallery[];
  @Input() bookings: Booking[];
  @Input() userModelsLoading: boolean;
  @Input() userGalleriesLoading: boolean;
  @Input() userBookingsLoading: boolean;
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() modelsLoad = new EventEmitter<any>();
  @Output() galleriesLoad = new EventEmitter<any>();
  @Output() bookingsLoad = new EventEmitter<any>();
  @Output() modelDeleted = new EventEmitter<Model>();
  @Output() galleryDeleted = new EventEmitter<Gallery>();
  @Output() bookingDeleted = new EventEmitter<Booking>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closeDetails() {
    this.detailsClosed.emit();
  }

  loadModels() {
    this.modelsLoad.emit();
  }

  loadGalleries() {
    this.galleriesLoad.emit();
  }


  loadBookings() {
    this.bookingsLoad.emit();
  }

  onModelDelete(model: Model) {
    this.modelDeleted.emit(model);
  }

  onGalleryDelete(gallery: Gallery) {
    this.galleryDeleted.emit(gallery);
  }


  onBookingDelete(booking: Booking) {
    this.bookingDeleted.emit(booking);
  }

  onAddAdmin() {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin() {
    this.removeAdmin.emit(this.user);
  }
}
