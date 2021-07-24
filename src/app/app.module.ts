import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { WorksheetsFormComponent } from './worksheets-form/worksheets-form.component';
import { WorksheetsDetailsComponent } from './worksheets-details/worksheets-details.component';
import { MastersComponent } from './masters/masters.component';
import { WeeksComponent } from './masters/weeks/weeks.component';
import { ClassSectionsComponent } from './masters/class-sections/class-sections.component';
import { EnrollmentComponent } from './masters/enrollment/enrollment.component';

@NgModule({
  declarations: [
    AppComponent,
    WorksheetsFormComponent,
    WorksheetsDetailsComponent,
    LoginComponent,
    MastersComponent,
    WeeksComponent,
    ClassSectionsComponent,
    EnrollmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
