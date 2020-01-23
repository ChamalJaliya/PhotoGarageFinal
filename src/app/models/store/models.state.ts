import { Model } from '../models/model.model';

export interface ModelsState {
  models: Model[] | null;
  loading: boolean;
  error: any;
}

export const modelsInitialState: ModelsState = {
  models: null,
  loading: false,
  error: null
};
