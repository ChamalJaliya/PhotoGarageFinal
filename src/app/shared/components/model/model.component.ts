import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Model } from '../../../models/models/model.model';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelComponent implements OnInit {
  @Input() model: Model;
  @Input() editable = true;
  @Output() deleted = new EventEmitter<Model>();
  @Output() edited = new EventEmitter<Model>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.deleted.emit(this.model);
  }

  onEdit() {
    this.edited.emit(this.model);
  }

}
