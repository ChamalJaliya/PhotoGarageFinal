import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './containers/models.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule, InputsModule, CardsModule, WavesModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromModels from './store/models.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ModelsEffects } from './store/models.effects';
import { FormsModule } from '@angular/forms';
import { ModelsRoutingModule } from './models-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    SharedModule,
    ModelsRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    WavesModule,
    IconsModule,
    CardsModule,
    StoreModule.forFeature('models', fromModels.modelsReducer),
    EffectsModule.forFeature([ModelsEffects])
  ],
  declarations: [ModelsComponent],
  exports: [ModelsComponent],
})
export class ModelsModule { }
