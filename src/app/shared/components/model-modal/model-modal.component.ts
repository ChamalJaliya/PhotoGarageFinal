import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Model } from '../../../models/models/model.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-model-modal',
  templateUrl: './model-modal.component.html',
  styleUrls: ['./model-modal.component.scss']
})
export class ModelModalComponent implements OnInit {
  @ViewChild('modelForm', { static: true }) modelForm: NgForm;

  heading: string;

  title: string;
  description: string;
  photoUrl: string;

  modelData: Subject<Model> = new Subject();
  model: Model = {};

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {
  }

  onSave() {
    if (this.modelForm.valid) {
      this.modelData.next(this.model);
    this.modalRef.hide();
    } else {
      const controls = this.modelForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
