import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'


const routes: Routes = [
  { path: '', component: DashboardComponent },
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule, 
    InfiniteScrollModule
  ],
  exports: [RouterModule],
})
export class DashboardModule { }
