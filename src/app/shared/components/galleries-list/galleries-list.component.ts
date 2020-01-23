import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Gallery } from '../../../galleries/models/gallery.model';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriesListComponent implements OnInit {
  @Input() galleries: Gallery[];
  @Input() editable = true;
  @Output() galleryDeleted = new EventEmitter<Gallery>();
  @Output() galleryEdited = new EventEmitter<Gallery>();

  constructor() { }

  ngOnInit() {
  }

  onGalleryDelete(gallery: Gallery) {
    this.galleryDeleted.emit(gallery);
  }

  onGalleryEdit(gallery: Gallery) {
    this.galleryEdited.emit(gallery);
  }

  trackByFunction(index: any) {
    return index;
  }

}
