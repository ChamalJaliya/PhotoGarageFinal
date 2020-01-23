import { Action } from '@ngrx/store';
import { Model } from '../models/model.model';

export enum ModelsActionTypes {
  MODELS_QUERY = '[Models] Models query',
  MODELS_LOADED = '[Models] Models loaded',

  MODEL_ADDED = '[Models] Model added',

  MODEL_EDITED = '[Models] Model edited',
  MODEL_DELETED = '[Models] Model deleted',

  MODELS_ERROR = '[Models] Models error'
}

export class ModelsQuery implements Action {
  readonly type = ModelsActionTypes.MODELS_QUERY;
}

export class ModelsLoaded implements Action {
  readonly type = ModelsActionTypes.MODELS_LOADED;

  constructor(public payload: { models: Model[] }) {}
}

export class ModelAdded implements Action {
  readonly type = ModelsActionTypes.MODEL_ADDED;

  constructor(public payload: { model: Model}) {}
}

export class ModelEdited implements Action {
  readonly type = ModelsActionTypes.MODEL_EDITED;

  constructor(public payload: { model: Model }) {}
}

export class ModelDeleted implements Action {
  readonly type = ModelsActionTypes.MODEL_DELETED;

  constructor(public payload: { model: Model }) {}
}

export class ModelsError implements Action {
  readonly type = ModelsActionTypes.MODELS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type ModelsActions =
  | ModelsQuery
  | ModelsLoaded
  | ModelAdded
  | ModelEdited
  | ModelDeleted
  | ModelsError;
