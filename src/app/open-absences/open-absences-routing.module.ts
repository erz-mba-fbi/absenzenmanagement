import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenAbsencesComponent } from './components/open-absences/open-absences.component';
import { OpenAbsencesListComponent } from './components/open-absences-list/open-absences-list.component';
import { OpenAbsencesDetailComponent } from './components/open-absences-detail/open-absences-detail.component';
import { OpenAbsencesEditComponent } from './components/open-absences-edit/open-absences-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OpenAbsencesComponent,
    children: [
      { path: '', component: OpenAbsencesListComponent },
      {
        path: 'detail/:personId/:date',
        component: OpenAbsencesDetailComponent
      },
      {
        path: 'edit',
        component: OpenAbsencesEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAbsencesRoutingModule {}
