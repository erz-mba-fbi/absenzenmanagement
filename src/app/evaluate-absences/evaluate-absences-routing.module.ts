import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluateAbsencesComponent } from './components/evaluate-absences/evaluate-absences.component';
import { EvaluateAbsencesListComponent } from './components/evaluate-absences-list/evaluate-absences-list.component';
import { StudentProfileComponent } from '../shared/components/student-profile/student-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluateAbsencesComponent,
    children: [
      {
        path: '',
        component: EvaluateAbsencesListComponent,
        data: {
          restoreScrollPositionFrom: ['/evaluate-absences/student/:id'],
        },
      },
      {
        path: 'student/:id',
        component: StudentProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluateAbsencesRoutingModule {}
