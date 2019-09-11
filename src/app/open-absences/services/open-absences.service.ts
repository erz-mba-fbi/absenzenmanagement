import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  merge,
  forkJoin
} from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { LessonPresence } from 'src/app/shared/models/lesson-presence.model';
import { LessonPresencesRestService } from 'src/app/shared/services/lesson-presences-rest.service';
import { LoadingService } from 'src/app/shared/services/loading-service';
import { spreadTuple } from 'src/app/shared/utils/function';
import { searchEntries } from 'src/app/shared/utils/search';
import {
  buildOpenAbsencesEntries,
  sortOpenAbsencesEntries,
  removeOpenAbsences,
  mergeUniqueLessonPresences
} from '../utils/open-absences-entries';

export type PrimarySortKey = 'date' | 'name';

export interface SortCriteria {
  primarySortKey: PrimarySortKey;
  ascending: boolean;
}

@Injectable()
export class OpenAbsencesService {
  loading$ = this.loadingService.loading$;
  search$ = new BehaviorSubject<string>('');

  private updateUnconfirmedAbsences$ = new Subject<
    ReadonlyArray<LessonPresence>
  >();
  private unconfirmedAbsences$ = merge(
    this.loadUnconfirmedAbsences(),
    this.updateUnconfirmedAbsences$
  ).pipe(shareReplay(1));
  private entries$ = this.unconfirmedAbsences$.pipe(
    map(buildOpenAbsencesEntries),
    shareReplay(1)
  );

  private sortCriteriaSubject$ = new BehaviorSubject<SortCriteria>({
    primarySortKey: 'date',
    ascending: false
  });

  sortCriteria$ = this.sortCriteriaSubject$.asObservable();
  sortedEntries$ = combineLatest(this.entries$, this.sortCriteria$).pipe(
    map(spreadTuple(sortOpenAbsencesEntries))
  );

  filteredEntries$ = combineLatest(this.sortedEntries$, this.search$).pipe(
    map(spreadTuple(searchEntries)),
    shareReplay(1)
  );

  selected: ReadonlyArray<{
    lessonIds: ReadonlyArray<number>;
    personIds: ReadonlyArray<number>;
  }> = [];

  currentDetail: Option<{ date: string; personId: number }> = null;

  constructor(
    private lessonPresencesService: LessonPresencesRestService,
    private loadingService: LoadingService
  ) {}

  getUnconfirmedAbsences(
    dateString: string,
    studentId: number
  ): Observable<ReadonlyArray<LessonPresence>> {
    return this.entries$.pipe(
      map(entries => {
        const entry = entries.find(
          e => e.dateString === dateString && e.studentId === studentId
        );
        return entry ? entry.absences : [];
      })
    );
  }

  /**
   * Switches primary sort key or toggles sort direction, if already
   * sorted by given key.
   */
  toggleSort(primarySortKey: PrimarySortKey): void {
    this.sortCriteriaSubject$.pipe(take(1)).subscribe(criteria => {
      if (criteria.primarySortKey === primarySortKey) {
        // Change sort direction
        this.sortCriteriaSubject$.next({
          primarySortKey,
          ascending: !criteria.ascending
        });
      } else {
        // Change sort key
        this.sortCriteriaSubject$.next({
          primarySortKey,
          ascending: primarySortKey === 'name'
        });
      }
    });
  }

  /**
   * Removes selected entries from unconfirmed absences and cleans
   * selection.
   */
  removeSelectedEntries(): void {
    this.unconfirmedAbsences$
      .pipe(
        take(1),
        map(unconfirmedAbsences =>
          removeOpenAbsences(unconfirmedAbsences, this.selected)
        )
      )
      .subscribe(unconfirmedAbsences => {
        this.selected = [];
        this.updateUnconfirmedAbsences$.next(unconfirmedAbsences);
      });
  }

  private loadUnconfirmedAbsences(): Observable<ReadonlyArray<LessonPresence>> {
    return this.loadingService.load(
      forkJoin(
        this.lessonPresencesService.getListOfUnconfirmedLessonTeacher(),
        this.lessonPresencesService.getListOfUnconfirmedClassTeacher()
      ).pipe(map(spreadTuple(mergeUniqueLessonPresences)))
    );
  }
}
