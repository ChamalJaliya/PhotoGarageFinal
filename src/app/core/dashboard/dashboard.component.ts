import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { ModelsService } from '../../models/services/models.service';
import { GalleriesService } from '../../galleries/services/galleries.service';
import { BookingsService } from '../../bookings/services/bookings.service';
import { getUser } from '../../auth/store/auth.selectors';
import { switchMap, take } from 'rxjs/operators';
import { Booking } from '../../bookings/models/booking.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  modelsSub: Subscription;
  models = [
    {
      title: 'Model 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg'
    },
    {
      title: 'Model 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(98).jpg'
    },
    {
      title: 'Model 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(99).jpg'
    },
    {
      title: 'Model 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(95).jpg'
    }
  ];
  galleriesSub: Subscription;
  galleries = [
    {
      title: 'Gallery 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg'
    },
    {
      title: 'Gallery 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(98).jpg'
    },
    {
      title: 'Gallery 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(99).jpg'
    },
    {
      title: 'Gallery 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(95).jpg'
    }
  ];

  bookingsSub: Subscription;
  bookings: Booking[] = [
    {
      id: 1,
      name: 'Example Reservation 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      name: 'Example Reservation 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      name: 'Example Reservation 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 4,
      name: 'Example Reservation 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 5,
      name: 'Example Reservation 5',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  constructor(
    private store: Store<AppState>,
    private modelsService: ModelsService,
    private galleriesService: GalleriesService,
    private bookingsService: BookingsService
  ) {}

  ngOnInit() {
    this.initModels();
    this.initBookings();
    this.initGalleries();
  }

  ngOnDestroy() {
    if (this.modelsSub) {
      this.modelsSub.unsubscribe();
    }

    if (this.galleriesSub) {
      this.galleriesSub.unsubscribe();
    }

    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  initModels() {
    this.modelsSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.modelsService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(models => {
        if (models.length === 0) {
          this.modelsService.addModels(this.models);
        }
      });
  }

  initGalleries() {
    this.galleriesSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.galleriesService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(galleries => {
        if (galleries.length === 0) {
          this.galleriesService.addGalleries(this.galleries);
        }
      });
  }


  initBookings() {
    this.bookingsSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.bookingsService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(bookings => {
        if (bookings.length === 0) {
          this.bookingsService.addBookings(this.bookings);
        }
      });
  }
}
