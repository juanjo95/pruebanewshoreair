import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllFlightsComponent } from './pages/all-flights/all-flights.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/all', pathMatch: 'full'},
  {path: 'all', component: AllFlightsComponent},
  {path: 'journey', component: JourneyComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
