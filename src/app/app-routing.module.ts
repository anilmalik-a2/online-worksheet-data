import { OnlineClassFormComponent } from './online-class-form/online-class-form.component';
import { ChooseFormComponent } from './choose-form/choose-form.component';
import { MastersComponent } from './masters/masters.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { WorksheetsDetailsComponent } from './worksheets-details/worksheets-details.component';
import { WorksheetsFormComponent } from './worksheets-form/worksheets-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChooseFormComponent,
    data: { title: 'Online Worksheets/Classes Entry' },
    pathMatch: 'full'
  },
  {
    path: 'worksheetform',
    component: WorksheetsFormComponent,
    data: { title: 'Online Worksheets data Entry' },
    pathMatch: 'full'
  },
  {
    path: 'onlineclassform',
    component: OnlineClassFormComponent,
    data: { title: 'Online Classes data Entry' },
    pathMatch: 'full'
  },
  {
    path: 'details',
    component: WorksheetsDetailsComponent,
    data: { title: 'Online Worksheets Details' },
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Online Worksheets Details' },
    pathMatch: 'full'
  },
  {
    path: 'master',
    component: MastersComponent,
    data: { title: 'Online Worksheets Details' },
    pathMatch: 'full',
    // canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
