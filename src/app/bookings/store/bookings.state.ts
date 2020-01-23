import { Booking } from '../models/booking.model';

export interface BookingsState {
    bookings: Booking[] | null;
    isLoading: boolean;
    error: any;
}

export const bookingsInitialState: BookingsState = {
    bookings: null,
    isLoading: true,
    error: null
};
