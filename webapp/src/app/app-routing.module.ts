import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthMiddleware } from './middleware/auth';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { SurveyListComponent } from './views/resident-user/components/survey-list/survey-list.component';
import { DashboardComponent } from './views/council-officer/components/dashboard/dashboard.component';

import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: RegisterComponent },
    ],
  },
  {
    path: 'resident',
    // canActivate: [AuthMiddleware],
    children: [
      { path: '', redirectTo: 'survey', pathMatch: 'full' },
      { path: 'survey', component: SurveyListComponent },
    ],
  },
  {
    path: 'council',
    // canActivate: [AuthMiddleware],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
