import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListsFlightsComponent } from './components/lists-flights/lists-flights.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JourneyComponent } from './components/journey/journey.component';

const routes: Routes = [
  {path: '', redirectTo: '/all', pathMatch: 'full'},
  {path: 'all', component: ListsFlightsComponent},
  {path: 'journey', component: JourneyComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
