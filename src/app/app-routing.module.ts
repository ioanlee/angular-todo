import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task/:id', component: TaskComponent, loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
  { path: 'edit', component: EditComponent, loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
  { path: 'edit/:id', component: EditComponent, loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
  { path: '**', redirectTo: '/dashboard' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
