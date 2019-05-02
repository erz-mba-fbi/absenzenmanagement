import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'presence-control',
    loadChildren:
      './presence-control/presence-control.module#PresenceControlModule'
  },
  {
    path: 'open-absences',
    loadChildren: './open-absences/open-absences.module#OpenAbsencesModule'
  },
  {
    path: 'edit-absences',
    loadChildren: './edit-absences/edit-absences.module#EditAbsencesModule'
  },
  {
    path: 'evaluate-absences',
    loadChildren:
      './evaluate-absences/evaluate-absences.module#EvaluateAbsencesModule'
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
