import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { AppState } from '../../reducers/index';
import { ModelsState } from './models.state';

export const getModelsState = createFeatureSelector<ModelsState>('models');

export const getModels = createSelector(
  getModelsState,
  models => models.models
);

export const getAllLoaded = createSelector(
  getModelsState,
  models => models.loading
);

export const getError = createSelector(
  getModelsState,
  models => models.error
);
