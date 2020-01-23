import { Injectable } from '@angular/core';
import { Gallery } from '../models/gallery.model';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  url = environment.firebase.databaseURL;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(gallery: Gallery, userId: string) {
    const galleries = this.db.list(`galleries/${userId}`);
    return galleries.push(gallery);
  }

  addGalleries(galleries: Gallery[]) {
    const userId = this.userId;
    galleries.forEach( (gallery: Gallery) => {
      this.db.list(`galleries/${userId}`).push(gallery);
    });
  }

  get(userId: string) {
    return this.db.list(`galleries/${userId}`).snapshotChanges();
  }

  update(gallery: Gallery, userId: string) {
    return of(this.db.object(`galleries/${userId}/` + gallery.key)
      .update({
        title: gallery.title,
        description: gallery.description,
        photoUrl: gallery.photoUrl
      }));
  }

  delete(gallery: Gallery, userId: string) {
    return this.db.object(`galleries/${userId}/` + gallery.key).remove();
  }
}
