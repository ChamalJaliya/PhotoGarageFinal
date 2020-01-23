import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsComponent } from './containers/bookings.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromBookings from './store/bookings.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookingsEffects } from './store/bookings.effects';
import { BookingsRoutingModule } from './bookings-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookingsRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature('bookings', fromBookings.bookingsReducer),
    EffectsModule.forFeature([BookingsEffects])
  ],
  declarations: [BookingsComponent],
  exports: [BookingsComponent],
})
export class BookingsModule { }
