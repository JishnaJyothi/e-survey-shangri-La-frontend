import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SurveyListComponent } from './views/resident-user/components/survey-list/survey-list.component';
import { DashboardComponent } from './views/council-officer/components/dashboard/dashboard.component';
import { AddEditQuestionsComponent } from './views/council-officer/modals/add-edit-questions/add-edit-questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    SurveyListComponent,
    DashboardComponent,
    AddEditQuestionsComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }