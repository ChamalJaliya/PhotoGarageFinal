import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Gallery } from '../../../galleries/models/gallery.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  @Input() gallery: Gallery;
  @Input() editable = true;
  @Output() deleted = new EventEmitter<Gallery>();
  @Output() edited = new EventEmitter<Gallery>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.deleted.emit(this.gallery);
  }

  onEdit() {
    this.edited.emit(this.gallery);
  }

}
