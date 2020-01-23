import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../../bookings/models/booking.model';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {
  @Input() bookings: Booking[];
  @Output() bookingDeleted = new EventEmitter<Booking>();
  @Output() bookingEdited = new EventEmitter<Booking>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(booking: Booking) {
    this.bookingEdited.emit(booking);
  }

  onDelete(booking: Booking) {
    this.bookingDeleted.emit(booking);
  }

  trackByFn(index: any) {
    return index;
  }
}
