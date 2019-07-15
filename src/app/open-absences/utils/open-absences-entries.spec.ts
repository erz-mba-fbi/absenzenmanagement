import { buildLessonPresenceWithIds } from 'src/spec-builders';
import { LessonPresence } from 'src/app/shared/models/lesson-presence.model';
import {
  buildOpenAbsencesEntries,
  flattenOpenAbsencesEntries,
  sortOpenAbsencesEntries
} from './open-absences-entries';
import { OpenAbsencesEntry } from '../models/open-absences-entry.model';

describe('open absences entries utils', () => {
  let presenceA: LessonPresence;
  let presenceB: LessonPresence;
  let presenceC: LessonPresence;
  let presenceD: LessonPresence;

  beforeEach(() => {
    presenceA = buildLessonPresenceWithIds(10, 21, new Date(2000, 0, 23));
    presenceB = buildLessonPresenceWithIds(11, 21, new Date(2000, 0, 23));
    presenceC = buildLessonPresenceWithIds(12, 21, new Date(2000, 0, 24));
    presenceD = buildLessonPresenceWithIds(10, 22, new Date(2000, 0, 23));

    [presenceA, presenceB, presenceC].forEach(
      p => (p.StudentFullName = 'Max Frisch')
    );
    presenceD.StudentFullName = 'Albert Einstein';
  });

  describe('buildOpenAbsencesEntries', () => {
    it('builds open absences entries for given lesson presences (absences)', () => {
      const result = buildOpenAbsencesEntries([
        presenceA,
        presenceB,
        presenceC,
        presenceD
      ])
        .slice()
        .sort(openAbsencesEntriesComparator);
      expect(result.length).toBe(3);
      expect(result[0].absences).toEqual([presenceA, presenceB]);
      expect(result[1].absences).toEqual([presenceD]);
      expect(result[2].absences).toEqual([presenceC]);
    });
  });

  describe('sortOpenAbsencesEntries', () => {
    let openAbsenceEntryA: OpenAbsencesEntry;
    let openAbsenceEntryB: OpenAbsencesEntry;
    let openAbsenceEntryC: OpenAbsencesEntry;
    let entries: ReadonlyArray<OpenAbsencesEntry>;

    beforeEach(() => {
      openAbsenceEntryA = new OpenAbsencesEntry([presenceA, presenceB]);
      openAbsenceEntryB = new OpenAbsencesEntry([presenceC]);
      openAbsenceEntryC = new OpenAbsencesEntry([presenceD]);

      entries = [openAbsenceEntryA, openAbsenceEntryB, openAbsenceEntryC];
    });

    it('sorts open absences entries by student name ascending', () => {
      const result = sortOpenAbsencesEntries(entries, {
        primarySortKey: 'name',
        ascending: true
      });
      expect(result).toEqual([
        openAbsenceEntryC,
        openAbsenceEntryB,
        openAbsenceEntryA
      ]);
    });

    it('sorts open absences entries by student name descending', () => {
      const result = sortOpenAbsencesEntries(entries, {
        primarySortKey: 'name',
        ascending: false
      });
      expect(result).toEqual([
        openAbsenceEntryB,
        openAbsenceEntryA,
        openAbsenceEntryC
      ]);
    });

    it('sorts open absences entries by date ascending', () => {
      const result = sortOpenAbsencesEntries(entries, {
        primarySortKey: 'date',
        ascending: true
      });
      expect(result).toEqual([
        openAbsenceEntryC,
        openAbsenceEntryA,
        openAbsenceEntryB
      ]);
    });

    it('sorts open absences entries by date descending', () => {
      const result = sortOpenAbsencesEntries(entries, {
        primarySortKey: 'date',
        ascending: false
      });
      expect(result).toEqual([
        openAbsenceEntryB,
        openAbsenceEntryC,
        openAbsenceEntryA
      ]);
    });
  });

  describe('flattenOpenAbsencesEntries', () => {
    it('flattens an array of open absences entries to an array of lesson presences (absences)', () => {
      const result = flattenOpenAbsencesEntries([
        new OpenAbsencesEntry([presenceA, presenceB]),
        new OpenAbsencesEntry([presenceC]),
        new OpenAbsencesEntry([presenceD])
      ]);
      expect(result).toEqual([presenceA, presenceB, presenceC, presenceD]);
    });
  });
});

function openAbsencesEntriesComparator(
  a: OpenAbsencesEntry,
  b: OpenAbsencesEntry
): number {
  const dateDiff = a.date.getTime() - b.date.getTime();
  if (dateDiff === 0) {
    return a.studentId - b.studentId;
  }
  return dateDiff;
}