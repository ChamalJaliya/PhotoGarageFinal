import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  InputUtilitiesModule,
  IconsModule
} from 'angular-bootstrap-md';
import { BookingsModalComponent } from './components/bookings-modal/bookings-modal.component';
import { ModelModalComponent } from './components/model-modal/model-modal.component';
import { GalleryModalComponent } from './components/gallery-modal/gallery-modal.component';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from './components/model/model.component';
import { ModelsListComponent } from './components/models-list/models-list.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleriesListComponent } from './components/galleries-list/galleries-list.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { TeamComponent } from './components/team/containers/team.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    BookingsModalComponent,
    ModelModalComponent,
    ModelsListComponent,
    ModelComponent,
    BookingsListComponent,
    GalleryModalComponent,
    GalleriesListComponent,
    GalleryComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    FormsModule,
    ButtonsModule,
    CardsModule
  ],
  exports: [ModelsListComponent, ModelComponent, BookingsListComponent,GalleriesListComponent,TeamComponent,GalleryComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    BookingsModalComponent,
    ModelModalComponent,
    GalleryModalComponent
  ]
})
export class SharedModule {}
