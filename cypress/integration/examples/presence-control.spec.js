/// <reference types="cypress" />
import { format } from 'date-fns';
import {
  buildPresenceType,
  buildLessonPresence,
} from '../../../src/spec-builders';

context('Home', () => {
  beforeEach(() => {
    cy.logout();
    // cy.visit('/')
    // cy.contains('Präsenzkontrolle').click()
  });

  context('not authenticated', () => {
    beforeEach(() => {
      cy.visit('/presence-control');
    });

    it('displays an error', () => {
      cy.get('.alert').contains('Sie sind keine Lehrkraft');
    });
  });

  context('authenticated', () => {
    beforeEach(() => {
      // cy.server()

      // const absent = buildPresenceType(11, true, false);
      // absent.Designation = 'Abwesend';
      // const late = buildPresenceType(12, false, true);
      // cy.route('**/restApi/PresenceTypes/', [absent, late]).as('getPresenceTypes')

      // const turnenFrisch = buildLessonPresence(
      //   1,
      //   new Date(2000, 0, 23, 7, 0),
      //   new Date(2000, 0, 23, 8, 0),
      //   'Turnen',
      //   'Frisch Max'
      // );
      // const deutschEinsteinAbwesend = buildLessonPresence(
      //   2,
      //   new Date(2000, 0, 23, 8, 0),
      //   new Date(2000, 0, 23, 9, 0),
      //   'Deutsch',
      //   'Einstein Albert',
      //   absent.Id
      // );
      // const deutschFrisch = buildLessonPresence(
      //   2,
      //   new Date(2000, 0, 23, 8, 0),
      //   new Date(2000, 0, 23, 9, 0),
      //   'Deutsch',
      //   'Frisch Max'
      // );
      // const mathEinstein1 = buildLessonPresence(
      //   3,
      //   new Date(2000, 0, 23, 9, 0),
      //   new Date(2000, 0, 23, 10, 0),
      //   'Mathematik',
      //   'Einstein Albert',
      //   undefined,
      //   33,
      //   66
      // );
      // const mathEinstein2 = buildLessonPresence(
      //   4,
      //   new Date(2000, 0, 23, 10, 0),
      //   new Date(2000, 0, 23, 11, 0),
      //   'Mathematik',
      //   'Einstein Albert',
      //   undefined,
      //   33,
      //   66
      // );
      // cy.route('**/restApi/LessonPresences/Today', [
      //   turnenFrisch,
      //   deutschEinsteinAbwesend,
      //   deutschFrisch,
      //   mathEinstein1,
      //   mathEinstein2,
      // ]).as('getLessonPresences')

      // localStorage.setItem('CLX.LoginToken', 'login_token_test')
      // localStorage.setItem('CLX.RefreshToken', 'refresh_token_test')
      cy.login();
      cy.visit('/presence-control');

      // cy.wait('@getLessonPresences')
      // cy.wait('@getPresenceTypes')
    });

    it.only('displays the students of the current lesson', () => {
      cy.hash().should(
        'eq',
        `#/presence-control?date=${format(
          new Date(),
          'yyyy-MM-dd'
        )}&viewMode=grid&lesson=1`
      );
      cy.get('.lesson-date input').should(
        'have.value',
        format(new Date(), 'dd.MM.yyyy')
      );
    });
  });
});
