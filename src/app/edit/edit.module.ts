import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: EditComponent },
]

@NgModule({
  declarations: [EditComponent],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class EditModule { }