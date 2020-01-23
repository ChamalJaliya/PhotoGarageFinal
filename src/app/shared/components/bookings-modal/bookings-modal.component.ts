import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Booking } from '../../../bookings/models/booking.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookings-modal',
  templateUrl: './bookings-modal.component.html',
  styleUrls: ['./bookings-modal.component.scss']
})
export class BookingsModalComponent implements OnInit {
  @ViewChild('bookingForm', { static: true }) bookingForm: NgForm;

  heading: string;
  booking: Booking = {};

  bookingData: Subject<Booking> = new Subject();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  onSave() {
    if (this.bookingForm.valid) {
      this.bookingData.next(this.booking);
    this.modalRef.hide();
    } else {
      const controls = this.bookingForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
