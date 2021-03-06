import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  OpenAbsencesService,
  SortCriteria,
  PrimarySortKey,
} from '../../services/open-absences.service';
import { OpenAbsencesEntry } from '../../models/open-absences-entry.model';
import { ScrollPositionService } from 'src/app/shared/services/scroll-position.service';
import { ConfirmAbsencesSelectionService } from 'src/app/shared/services/confirm-absences-selection.service';

@Component({
  selector: 'erz-open-absences-list',
  templateUrl: './open-absences-list.component.html',
  styleUrls: ['./open-absences-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenAbsencesListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    public openAbsencesService: OpenAbsencesService,
    public selectionService: ConfirmAbsencesSelectionService,
    private scrollPosition: ScrollPositionService
  ) {}

  ngOnInit(): void {
    this.openAbsencesService.currentDetail = null;
    this.selectionService.clearNonOpenAbsencesEntries();
  }

  ngAfterViewInit(): void {
    this.scrollPosition.restore();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onCheckboxCellClick(event: Event, checkbox: HTMLInputElement): void {
    if (event.target !== checkbox) {
      checkbox.click();
    }
  }

  getSortDirectionCharacter(
    sortCriteria: SortCriteria,
    sortKey: PrimarySortKey
  ): string {
    if (sortCriteria.primarySortKey !== sortKey) {
      return '';
    }
    return sortCriteria.ascending ? '↓' : '↑';
  }

  getLessonsCountKey(entry: OpenAbsencesEntry): string {
    const suffix = entry.lessonsCount === 1 ? 'singular' : 'plural';
    return `open-absences.list.content.lessonsCount.${suffix}`;
  }
}
