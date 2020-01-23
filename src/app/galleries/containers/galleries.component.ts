import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { Gallery } from '../models/gallery.model';
import { AppState } from '../../reducers/index';
import { Store, select } from '@ngrx/store';
import * as fromGalleries from '../store/galleries.actions';
import { Observable } from 'rxjs';
import { getGalleries, getAllLoaded } from '../store/galleries.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { GalleryModalComponent } from '../../shared/components/gallery-modal/gallery-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  galleries$: Observable<Gallery[] | null>;
  isLoading$: Observable<boolean>;
  modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  constructor(private store: Store<AppState>, private modalService: MDBModalService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getAllLoaded);
    this.galleries$ = this.store.pipe(
      select(getGalleries),
      map( (galleries: Gallery[]) => {
        if (this.user && !galleries) {
          this.store.dispatch(new fromGalleries.GalleriesQuery());
        }
        return galleries;
      })
    );
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  openAddGalleryModal() {
    this.modalRef = this.modalService.show(GalleryModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new gallery';

    this.modalRef.content.galleryData.pipe(take(1)).subscribe( (galleryData: Gallery) => {
      this.store.dispatch(new fromGalleries.GalleryAdded({ gallery: galleryData }));
    });
  }

  openEditGalleryModal(gallery: Gallery) {
    this.modalRef = this.modalService.show(GalleryModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit gallery';
    const galleryCopy = {...gallery };
    this.modalRef.content.gallery = galleryCopy;

    this.modalRef.content.galleryData.pipe(take(1)).subscribe( (galleryData: Gallery) => {
      this.store.dispatch(new fromGalleries.GalleryEdited({ gallery: galleryData }));
    });
  }

  openConfirmModal(gallery: Gallery) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromGalleries.GalleryDeleted({ gallery }));
      }
    });
  }

  onGalleryDelete(gallery: Gallery) {
    this.openConfirmModal(gallery);
  }

  onGalleryEdit(gallery: Gallery) {
    this.openEditGalleryModal(gallery);
  }

}
