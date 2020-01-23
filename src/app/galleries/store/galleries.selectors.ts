import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { AppState } from '../../reducers/index';
import { GalleriesState } from './galleries.state';

export const getGalleriesState = createFeatureSelector<GalleriesState>('galleries');

export const getGalleries = createSelector(
  getGalleriesState,
  galleries => galleries.galleries
);

export const getAllLoaded = createSelector(
  getGalleriesState,
  galleries => galleries.loading
);

export const getError = createSelector(
  getGalleriesState,
  galleries => galleries.error
);
