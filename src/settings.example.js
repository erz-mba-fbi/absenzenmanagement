// Rename this file to settings.js and adjust the settings

window.absenzenmanagement = window.absenzenmanagement || {};

window.absenzenmanagement.settings = {
  // API base URL without trailing slash
  apiUrl: 'https://eventotest.api',

  // Id of the PresenceType that represents an absence without cause
  // (i.e. the default absence that will be used when changing state
  // in the presence control module)
  absencePresenceTypeId: 11,

  // Id of the PresenceType that represents the "late" incident
  latePresenceTypeId: 12,

  // Id of the confirmation state for unconfirmed absences
  unconfirmedAbsenceStateId: 219
};
