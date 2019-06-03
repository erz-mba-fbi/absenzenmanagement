import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SETTINGS, Settings } from '../../settings';
import { RestService } from './rest.service';
import { decodeArray, decode } from '../utils/decode';
import { Student, StudentProps } from '../models/student.model';
import { LegalRepresentative } from '../models/legal-representative.model';
import { ApprenticeshipContract } from '../models/apprenticeship-contract.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsRestService extends RestService<StudentProps> {
  constructor(http: HttpClient, @Inject(SETTINGS) settings: Settings) {
    super(http, settings, Student, 'Students');
  }

  getLegalRepresentatives(
    studentId: number,
    params?: Dict<string>
  ): Observable<ReadonlyArray<LegalRepresentative>> {
    return this.http
      .get<any[]>(`${this.baseUrl}/${studentId}/LegalRepresentatives`, {
        params
      })
      .pipe(switchMap(decodeArray(LegalRepresentative)));
  }

  getCurrentApprenticeshipContract(
    studentId: number,
    params?: Dict<string>
  ): Observable<ApprenticeshipContract> {
    return this.http
      .get<any>(
        `${this.baseUrl}/${studentId}/ApprenticeshipContracts/Current`,
        {
          params
        }
      )
      .pipe(switchMap(decode(ApprenticeshipContract)));
  }
}
