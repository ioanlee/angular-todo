import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: TaskComponent }
]

@NgModule({
  declarations: [TaskComponent],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ]
})
export class TaskModule { }
