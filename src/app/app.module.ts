import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ChildrenOutletContexts } from '@angular/router';


@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [ChildrenOutletContexts]
})
export class AppModule { }
