import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './main/main.component';
import {CarouselComponent} from './carousel/carousel.component'

import {
  NavbarModule,
  DropdownModule,
  CardsModule,
  ButtonsModule,
  IconsModule,
  CarouselModule,
 
} from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    RouterModule,
    DropdownModule.forRoot(),
    CardsModule,
    ButtonsModule,
    CarouselModule,
    SharedModule
  ],
  declarations: [
    CarouselComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
  
  ],
  exports: [
    
    CarouselComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    HomeComponent
  ]
})
export class CoreModule {}
