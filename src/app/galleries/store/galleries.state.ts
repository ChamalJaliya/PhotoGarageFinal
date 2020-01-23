import { Gallery } from '../models/gallery.model';

export interface GalleriesState {
  galleries: Gallery[] | null;
  loading: boolean;
  error: any;
}

export const galleriesInitialState: GalleriesState = {
  galleries: null,
  loading: false,
  error: null
};
