import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Model } from '../../../models/models/model.model';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelsListComponent implements OnInit {
  @Input() models: Model[];
  @Input() editable = true;
  @Output() modelDeleted = new EventEmitter<Model>();
  @Output() modelEdited = new EventEmitter<Model>();

  constructor() { }

  ngOnInit() {
  }

  onModelDelete(model: Model) {
    this.modelDeleted.emit(model);
  }

  onModelEdit(model: Model) {
    this.modelEdited.emit(model);
  }

  trackByFunction(index: any) {
    return index;
  }

}
