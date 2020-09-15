import { PresenceType } from 'src/app/shared/models/presence-type.model';
import { Settings } from 'src/app/settings';
import { LessonPresence } from 'src/app/shared/models/lesson-presence.model';

export function isPresent(presenceType: Option<PresenceType>): boolean {
  return Boolean(!presenceType);
}

export function isComment(presenceType: Option<PresenceType>): boolean {
  return Boolean(presenceType && presenceType.IsComment);
}

export function isIncident(presenceType: Option<PresenceType>): boolean {
  return Boolean(presenceType && presenceType.IsIncident);
}

export function isAbsent(presenceType: Option<PresenceType>): boolean {
  return Boolean(
    presenceType &&
      (presenceType.IsAbsence ||
        presenceType.IsDispensation ||
        presenceType.IsHalfDay)
  );
}

export function isDefaultAbsence(
  presenceType: Option<PresenceType>,
  settings: Settings
): boolean {
  return Boolean(
    presenceType &&
      settings &&
      presenceType.Id === settings.absencePresenceTypeId
  );
}

export function isCheckableAbsence(
  settings: Settings,
  confirmationStateId: Maybe<number>
): boolean {
  return Boolean(
    settings &&
      confirmationStateId &&
      confirmationStateId === settings.checkableAbsenceStateId
  );
}

export function isLate(
  presenceType: Option<PresenceType>,
  settings: Settings
): boolean {
  return Boolean(
    presenceType && settings && presenceType.Id === settings.latePresenceTypeId
  );
}

export function canChangePresenceType(
  lessonPresence: LessonPresence,
  presenceType: Option<PresenceType>,
  settings: Settings
): boolean {
  if (
    (isPresent(presenceType) && lessonPresence.ConfirmationStateId === null) ||
    isComment(presenceType) ||
    isIncident(presenceType)
  ) {
    return true;
  }
  if (
    isDefaultAbsence(presenceType, settings) &&
    lessonPresence.ConfirmationStateId === settings.unconfirmedAbsenceStateId
  ) {
    return true;
  }
  if (isLate(presenceType, settings)) {
    return true;
  }
  return false;
}

export function getNewConfirmationStateId(
  presenceTypeId: Option<number>,
  settings: Settings
): Option<number> {
  return presenceTypeId === settings.absencePresenceTypeId
    ? settings.unconfirmedAbsenceStateId
    : null;
}
