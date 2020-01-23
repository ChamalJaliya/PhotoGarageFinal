import { Injectable } from '@angular/core';
import { Model } from '../models/model.model';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  url = environment.firebase.databaseURL;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(model: Model, userId: string) {
    const models = this.db.list(`models/${userId}`);
    return models.push(model);
  }

  addModels(models: Model[]) {
    const userId = this.userId;
    models.forEach( (model: Model) => {
      this.db.list(`models/${userId}`).push(model);
    });
  }

  get(userId: string) {
    return this.db.list(`models/${userId}`).snapshotChanges();
  }

  update(model: Model, userId: string) {
    return of(this.db.object(`models/${userId}/` + model.key)
      .update({
        title: model.title,
        description: model.description,
        photoUrl: model.photoUrl
      }));
  }

  delete(model: Model, userId: string) {
    return this.db.object(`models/${userId}/` + model.key).remove();
  }
}
