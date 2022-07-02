import { NgModule } from '@angular/core';
import { EditComponent } from './edit.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: EditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditModule { }