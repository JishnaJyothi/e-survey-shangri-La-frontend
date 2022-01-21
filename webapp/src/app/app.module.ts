import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog'
import { ToastrModule } from 'ngx-toastr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlMessagesComponent } from './utils/control-messages/control-messages.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SurveyListComponent } from './views/resident-user/components/survey-list/survey-list.component';
import { DashboardComponent } from './views/council-officer/components/dashboard/dashboard.component';
import { AddEditQuestionsComponent } from './views/council-officer/modals/add-edit-questions/add-edit-questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    SurveyListComponent,
    DashboardComponent,
    AddEditQuestionsComponent,
    PageNotFoundComponent
  ],
  imports: [
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
