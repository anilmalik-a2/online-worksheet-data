import { WorksheetsDetailsComponent } from './worksheets-details/worksheets-details.component';
import { WorksheetsFormComponent } from './worksheets-form/worksheets-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WorksheetsFormComponent,
    data: { title: 'Online Worksheets Entry' },
    pathMatch: 'full'
  },
  {
    path: 'details',
    component: WorksheetsDetailsComponent,
    data: { title: 'Online Worksheets Details' },
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
