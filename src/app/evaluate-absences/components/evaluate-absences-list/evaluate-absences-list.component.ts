import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import {
  EvaluateAbsencesStateService,
  EvaluateAbsencesFilter,
} from '../../services/evaluate-absences-state.service';
import { LessonPresenceStatistic } from 'src/app/shared/models/lesson-presence-statistic';
import { ScrollPositionService } from 'src/app/shared/services/scroll-position.service';

interface Column {
  key: keyof LessonPresenceStatistic;
  label: string;
}

@Component({
  selector: 'erz-evaluate-absences-list',
  templateUrl: './evaluate-absences-list.component.html',
  styleUrls: ['./evaluate-absences-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvaluateAbsencesListComponent implements OnInit, AfterViewInit {
  columns: ReadonlyArray<Column> = [
    { key: 'StudentFullName', label: 'student' },
    { key: 'TotalAbsences', label: 'total' },
    { key: 'TotalAbsencesValidExcuse', label: 'valid-excuse' },
    { key: 'TotalAbsencesWithoutExcuse', label: 'without-excuse' },
    { key: 'TotalAbsencesUnconfirmed', label: 'unconfirmed' },
    { key: 'TotalIncidents', label: 'late' },
    { key: 'TotalHalfDays', label: 'halfday' },
  ];

  filterFromParams$ = this.route.queryParams.pipe(map(createFilterFromParams));
  profileReturnParams$ = this.state.queryParams$;

  constructor(
    public state: EvaluateAbsencesStateService,
    private scrollPosition: ScrollPositionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filterFromParams$
      .pipe(take(1))
      .subscribe((filterValue) => this.state.setFilter(filterValue));
  }

  ngAfterViewInit(): void {
    this.scrollPosition.restore();
  }

  onScroll(): void {
    this.state.nextPage();
  }

  getSortingChar$(column: Column): Observable<string> {
    return this.state.sorting$.pipe(
      map((sorting) => {
        if (sorting && column.key === sorting.key) {
          return sorting.ascending ? '↓' : '↑';
        }
        return '';
      })
    );
  }
}

function createFilterFromParams(params: Params): EvaluateAbsencesFilter {
  return {
    student: params.student ? Number(params.student) : null,
    educationalEvent: params.educationalEvent
      ? Number(params.educationalEvent)
      : null,
    studyClass: params.studyClass ? Number(params.studyClass) : null,
  };
}
