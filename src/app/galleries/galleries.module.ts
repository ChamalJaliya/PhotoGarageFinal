import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriesComponent } from './containers/galleries.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule, InputsModule, CardsModule, WavesModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromGalleries from './store/galleries.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GalleriesEffects } from './store/galleries.effects';
import { FormsModule } from '@angular/forms';
import { GalleriesRoutingModule } from './galleries-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    SharedModule,
    GalleriesRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    WavesModule,
    IconsModule,
    CardsModule,
    StoreModule.forFeature('galleries', fromGalleries.galleriesReducer),
    EffectsModule.forFeature([GalleriesEffects])
  ],
  declarations: [GalleriesComponent],
  exports: [GalleriesComponent],
})
export class GalleriesModule { }
