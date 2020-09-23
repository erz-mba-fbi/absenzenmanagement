import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  ChangeDetectionStrategy,
  Optional,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import {
  takeUntil,
  filter,
  map,
  finalize,
  shareReplay,
  take,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { notNull } from 'src/app/shared/utils/filter';
import {
  getValidationErrors,
  getControlValidationErrors,
} from 'src/app/shared/utils/form';
import { DropDownItemsRestService } from 'src/app/shared/services/drop-down-items-rest.service';
import { LessonPresencesUpdateRestService } from 'src/app/shared/services/lesson-presences-update-rest.service';
import { SETTINGS, Settings } from 'src/app/settings';
import { findDropDownItem$ } from 'src/app/shared/utils/drop-down-items';
import { PresenceTypesService } from 'src/app/shared/services/presence-types.service';
import { ConfirmAbsencesSelectionService } from '../../services/confirm-absences-selection.service';
import {
  CONFIRM_ABSENCES_SERVICE,
  IConfirmAbsencesService,
} from '../../tokens/confirm-absences-service';
import { LessonPresence } from '../../models/lesson-presence.model';

@Component({
  selector: 'erz-confirm-absences',
  templateUrl: './confirm-absences.component.html',
  styleUrls: ['./confirm-absences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAbsencesComponent implements OnInit, OnDestroy {
  formGroup$ = this.selectionService.selectedWithoutPresenceType$.pipe(
    map(this.createFormGroup.bind(this)),
    shareReplay(1)
  );

  saving$ = new BehaviorSubject(false);
  private submitted$ = new BehaviorSubject(false);

  formErrors$ = combineLatest([
    this.formGroup$.pipe(switchMap(getValidationErrors)),
    this.submitted$,
  ]).pipe(
    filter((v) => v[1]),
    map((v) => v[0]),
    startWith([])
  );

  absenceTypeIdErrors$ = combineLatest([
    this.formGroup$.pipe(
      switchMap(getControlValidationErrors('absenceTypeId'))
    ),
    this.submitted$,
  ]).pipe(
    filter((v) => v[1]),
    map((v) => v[0]),
    startWith([])
  );

  private confirmationStates$ = this.dropDownItemsService
    .getAbsenceConfirmationStates()
    .pipe(shareReplay(1));

  excusedState$ = findDropDownItem$(
    this.confirmationStates$,
    this.settings.excusedAbsenceStateId
  );
  unexcusedState$ = findDropDownItem$(
    this.confirmationStates$,
    this.settings.unexcusedAbsenceStateId
  );

  absenceTypes$ = this.presenceTypesService.confirmationTypes$;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    private selectionService: ConfirmAbsencesSelectionService,
    private dropDownItemsService: DropDownItemsRestService,
    private presenceTypesService: PresenceTypesService,
    private updateService: LessonPresencesUpdateRestService,
    @Inject(SETTINGS) private settings: Settings,
    @Optional()
    @Inject(CONFIRM_ABSENCES_SERVICE)
    private openAbsencesEditService?: IConfirmAbsencesService
  ) {}

  ngOnInit(): void {
    this.selectionService.selectedIds$
      .pipe(take(1))
      .subscribe((selectedIds) => {
        if (selectedIds.length === 0) {
          // Nothing to confirm if no entries are selected
          this.navigateBack();
        }
      });

    this.formGroup$.pipe(take(1)).subscribe((formGroup) => {
      const confirmationValueControl = formGroup.get('confirmationValue');
      const absenceTypeIdControl = formGroup.get('absenceTypeId');
      if (confirmationValueControl) {
        // Disable confirmation value select when unexcused
        confirmationValueControl.valueChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(this.updateAbsenceTypeIdDisabled.bind(this));

        // Disable form when saving
        this.saving$.pipe(takeUntil(this.destroy$)).subscribe((saving) => {
          if (saving) {
            confirmationValueControl.disable();
            absenceTypeIdControl?.disable();
          } else {
            confirmationValueControl.enable();
            this.updateAbsenceTypeIdDisabled(confirmationValueControl.value);
          }
        });

        // Initially select excused state radio button
        this.excusedState$
          .pipe(take(1), filter(notNull))
          .subscribe((excusedState) =>
            confirmationValueControl.setValue(excusedState.Key)
          );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSubmit(): void {
    this.submitted$.next(true);
    this.formGroup$.pipe(take(1)).subscribe((formGroup) => {
      if (formGroup.valid) {
        this.excusedState$
          .pipe(take(1), filter(notNull))
          .subscribe((confirmedState) => {
            const { confirmationValue, absenceTypeId } = formGroup.value;
            this.save(confirmationValue, absenceTypeId);
          });
      }
    });
  }

  cancel(): void {
    this.navigateBack();
  }

  private createFormGroup(
    selectedWithoutPresenceType: ReadonlyArray<LessonPresence>
  ): FormGroup {
    return selectedWithoutPresenceType.length > 0
      ? this.fb.group({
          confirmationValue: [null],
          absenceTypeId: [null, Validators.required],
        })
      : this.fb.group({
          confirmationValue: [null],
        });
  }

  private updateAbsenceTypeIdDisabled(confirmationValue: number): void {
    this.formGroup$.pipe(take(1)).subscribe((formGroup) => {
      const absenceTypeIdControl = formGroup.get('absenceTypeId');
      if (absenceTypeIdControl) {
        this.excusedState$
          .pipe(take(1), filter(notNull))
          .subscribe((excusedState) =>
            confirmationValue === excusedState.Key
              ? absenceTypeIdControl.enable()
              : absenceTypeIdControl.disable()
          );
      }
    });
  }

  private save(confirmationValue: number, absenceTypeId: number): void {
    this.saving$.next(true);

    combineLatest([
      this.selectionService.selectedIds$.pipe(take(1)),
      this.unexcusedState$.pipe(take(1), filter(notNull)),
    ])
      .pipe(
        switchMap(([selectedIds, unexcusedState]) =>
          combineLatest(
            selectedIds.map(({ lessonIds, personId, presenceTypeId }) =>
              this.updateService.confirmLessonPresences(
                lessonIds,
                [personId],
                this.getNewAbsenceTypeId(
                  presenceTypeId,
                  confirmationValue,
                  unexcusedState.Key,
                  absenceTypeId
                ),
                confirmationValue
              )
            )
          )
        ),
        finalize(() => this.saving$.next(false))
      )
      .subscribe(this.onSaveSuccess.bind(this));
  }

  private getNewAbsenceTypeId(
    currentAbsenceTypeId: Option<number>,
    confirmationValue: number,
    unexcusedState: number,
    absenceTypeId: number
  ): number {
    if (!currentAbsenceTypeId) {
      throw new Error('absence type id cannot be null');
    }

    if (confirmationValue === unexcusedState) {
      return this.settings.absencePresenceTypeId;
    }

    return currentAbsenceTypeId === this.settings.absencePresenceTypeId
      ? absenceTypeId
      : currentAbsenceTypeId;
  }

  private onSaveSuccess(): void {
    if (this.openAbsencesEditService?.updateAfterConfirm) {
      this.openAbsencesEditService.updateAfterConfirm();
    }
    this.toastr.success(
      this.translate.instant('open-absences.edit.save-success')
    );
    this.navigateBack();
  }

  private navigateBack(): void {
    this.router.navigate(
      this.openAbsencesEditService?.confirmBackLink || ['..'],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.openAbsencesEditService?.confirmBackLinkParams,
      }
    );
  }
}
