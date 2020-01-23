import { Action } from '@ngrx/store';
import { Gallery } from '../models/gallery.model';

export enum GalleriesActionTypes {
  GALLERIES_QUERY = '[Galleries] Galleries query',
  GALLERIES_LOADED = '[Galleries] Galleries loaded',

  GALLERY_ADDED = '[Galleries] Gallery added',

  GALLERY_EDITED = '[Galleries] Gallery edited',
  GALLERY_DELETED = '[Galleries] Gallery deleted',

  GALLERIES_ERROR = '[Galleries] Galleries error'
}

export class GalleriesQuery implements Action {
  readonly type = GalleriesActionTypes.GALLERIES_QUERY;
}

export class GalleriesLoaded implements Action {
  readonly type = GalleriesActionTypes.GALLERIES_LOADED;

  constructor(public payload: { galleries: Gallery[] }) {}
}

export class GalleryAdded implements Action {
  readonly type = GalleriesActionTypes.GALLERY_ADDED;

  constructor(public payload: { gallery: Gallery}) {}
}

export class GalleryEdited implements Action {
  readonly type = GalleriesActionTypes.GALLERY_EDITED;

  constructor(public payload: { gallery: Gallery }) {}
}

export class GalleryDeleted implements Action {
  readonly type = GalleriesActionTypes.GALLERY_DELETED;

  constructor(public payload: { gallery: Gallery }) {}
}

export class GalleriesError implements Action {
  readonly type = GalleriesActionTypes.GALLERIES_ERROR;

  constructor(public payload: { error: any }) {}
}

export type GalleriesActions =
  | GalleriesQuery
  | GalleriesLoaded
  | GalleryAdded
  | GalleryEdited
  | GalleryDeleted
  | GalleriesError;
