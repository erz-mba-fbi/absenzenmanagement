import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject
} from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  take,
  withLatestFrom
} from 'rxjs/operators';
import { LessonPresence } from '../../shared/models/lesson-presence.model';
import { Lesson } from '../../shared/models/lesson.model';
import { PresenceType } from '../../shared/models/presence-type.model';
import { LessonPresencesRestService } from '../../shared/services/lesson-presences-rest.service';
import { LoadingService } from '../../shared/services/loading-service';
import { PresenceTypesRestService } from '../../shared/services/presence-types-rest.service';
import {
  isFirstElement,
  isLastElement,
  nextElement,
  previousElement
} from '../../shared/utils/array';
import { spreadTriplet, spreadTuple } from '../../shared/utils/function';
import {
  extractLessons,
  getCurrentLesson,
  getPresenceControlEntriesForLesson,
  lessonsEqual
} from '../utils/lessons';
import { getCategoryCount } from '../utils/presence-control-entries';
import { updatePresenceTypeForPresences } from '../utils/lesson-presences';
import { PresenceControlEntry } from '../models/presence-control-entry.model';
import { LessonPresenceUpdate } from '../../shared/services/lesson-presences-update.service';

export enum ViewMode {
  Grid = 'grid',
  List = 'list'
}

@Injectable()
export class PresenceControlStateService {
  private selectedDateSubject$ = new BehaviorSubject(new Date());
  private selectLesson$ = new Subject<Option<Lesson>>();
  private viewModeSubject$ = new BehaviorSubject(ViewMode.Grid);

  private updateLessonPresences$ = new Subject<ReadonlyArray<LessonPresence>>();

  private lessonPresences$ = merge(
    this.selectedDateSubject$.pipe(
      switchMap(this.loadLessonPresencesByDate.bind(this))
    ),
    this.updateLessonPresences$
  ).pipe(shareReplay(1));
  private presenceTypes$ = this.loadPresenceTypes().pipe(shareReplay(1));
  private lessons$ = this.lessonPresences$.pipe(
    map(extractLessons),
    shareReplay(1)
  );
  private currentLesson$ = this.lessons$.pipe(map(getCurrentLesson));

  loading$ = this.loadingService.loading$;

  selectedLesson$ = merge(this.currentLesson$, this.selectLesson$).pipe(
    shareReplay(1)
  );
  selectedPresenceControlEntries$ = combineLatest(
    this.selectedLesson$,
    this.lessonPresences$,
    this.presenceTypes$
  ).pipe(map(spreadTriplet(getPresenceControlEntriesForLesson)));

  presentCount$ = this.selectedPresenceControlEntries$.pipe(
    map(getCategoryCount('present'))
  );
  absentCount$ = this.selectedPresenceControlEntries$.pipe(
    map(getCategoryCount('absent'))
  );
  lateCount$ = this.selectedPresenceControlEntries$.pipe(
    map(getCategoryCount('late'))
  );

  isFirstLesson$ = combineLatest(this.selectedLesson$, this.lessons$).pipe(
    map(spreadTuple(isFirstElement(lessonsEqual)))
  );
  isLastLesson$ = combineLatest(this.selectedLesson$, this.lessons$).pipe(
    map(spreadTuple(isLastElement(lessonsEqual)))
  );

  viewMode$ = this.viewModeSubject$.asObservable();
  selectedDate$ = this.selectedDateSubject$.asObservable();

  constructor(
    private lessonPresencesService: LessonPresencesRestService,
    private presenceTypesService: PresenceTypesRestService,
    private loadingService: LoadingService
  ) {}

  setDate(date: Date): void {
    this.selectedDateSubject$.next(date);
  }

  previousLesson(): void {
    this.selectedLesson$
      .pipe(
        take(1),
        withLatestFrom(this.lessons$),
        map(spreadTuple(previousElement(lessonsEqual)))
      )
      .subscribe(lesson => this.selectLesson$.next(lesson));
  }

  nextLesson(): void {
    this.selectedLesson$
      .pipe(
        take(1),
        withLatestFrom(this.lessons$),
        map(spreadTuple(nextElement(lessonsEqual)))
      )
      .subscribe(lesson => this.selectLesson$.next(lesson));
  }

  setViewMode(mode: ViewMode): void {
    this.viewModeSubject$.next(mode);
  }

  updateLessonPresences(updates: ReadonlyArray<LessonPresenceUpdate>): void {
    combineLatest(
      this.lessonPresences$.pipe(take(1)),
      this.presenceTypes$.pipe(take(1))
    )
      .pipe(
        map(([lessonPresences, presenceTypes]) =>
          updatePresenceTypeForPresences(
            lessonPresences,
            updates,
            presenceTypes
          )
        )
      )
      .subscribe(lessonPresences =>
        this.updateLessonPresences$.next(lessonPresences)
      );
  }

  getNextPresenceType(
    entry: PresenceControlEntry
  ): Observable<Option<PresenceType>> {
    return this.presenceTypes$.pipe(
      take(1),
      map(presenceTypes => entry.getNextPresenceType(presenceTypes))
    );
  }

  private loadLessonPresencesByDate(
    date: Date
  ): Observable<ReadonlyArray<LessonPresence>> {
    return this.loadingService.load(
      this.lessonPresencesService.getListByDate(date)
    );
  }

  private loadPresenceTypes(): Observable<ReadonlyArray<PresenceType>> {
    return this.loadingService.load(this.presenceTypesService.getList());
  }
}
