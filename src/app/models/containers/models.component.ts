import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { Model } from '../models/model.model';
import { AppState } from '../../reducers/index';
import { Store, select } from '@ngrx/store';
import * as fromModels from '../store/models.actions';
import { Observable } from 'rxjs';
import { getModels, getAllLoaded } from '../store/models.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ModelModalComponent } from '../../shared/components/model-modal/model-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  models$: Observable<Model[] | null>;
  isLoading$: Observable<boolean>;
  modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  constructor(private store: Store<AppState>, private modalService: MDBModalService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getAllLoaded);
    this.models$ = this.store.pipe(
      select(getModels),
      map( (models: Model[]) => {
        if (this.user && !models) {
          this.store.dispatch(new fromModels.ModelsQuery());
        }
        return models;
      })
    );
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  openAddModelModal() {
    this.modalRef = this.modalService.show(ModelModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new model';

    this.modalRef.content.modelData.pipe(take(1)).subscribe( (modelData: Model) => {
      this.store.dispatch(new fromModels.ModelAdded({ model: modelData }));
    });
  }

  openEditModelModal(model: Model) {
    this.modalRef = this.modalService.show(ModelModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit model';
    const modelCopy = {...model };
    this.modalRef.content.model = modelCopy;

    this.modalRef.content.modelData.pipe(take(1)).subscribe( (modelData: Model) => {
      this.store.dispatch(new fromModels.ModelEdited({ model: modelData }));
    });
  }

  openConfirmModal(model: Model) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromModels.ModelDeleted({ model }));
      }
    });
  }

  onModelDelete(model: Model) {
    this.openConfirmModal(model);
  }

  onModelEdit(model: Model) {
    this.openEditModelModal(model);
  }

}
