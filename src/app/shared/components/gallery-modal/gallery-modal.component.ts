import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Gallery } from '../../../galleries/models/gallery.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit {
  @ViewChild('galleryForm', { static: true }) galleryForm: NgForm;

  heading: string;

  title: string;
  description: string;
  photoUrl: string;

  galleryData: Subject<Gallery> = new Subject();
  gallery: Gallery = {};

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {
  }

  onSave() {
    if (this.galleryForm.valid) {
      this.galleryData.next(this.gallery);
    this.modalRef.hide();
    } else {
      const controls = this.galleryForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
