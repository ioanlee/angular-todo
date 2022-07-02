import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ServiceWorkerModule } from '@angular/service-worker';
import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component'


import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    DashboardComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
