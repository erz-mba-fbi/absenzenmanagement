import * as t from 'io-ts';
import { Reference, Option } from './common-types';
import { DateFromISOString } from 'io-ts-types/lib/Date/DateFromISOString';

const ApprenticeshipContract = t.type({
  Id: t.number,
  JobTrainerRef: Reference,
  StudentRef: Reference,
  ApprenticeshipManagerId: t.number,
  ApprenticeshipDateFrom: DateFromISOString,
  ApprenticeshipDateTo: DateFromISOString,
  CompanyName: t.string,
  ContractDateFrom: Option(DateFromISOString),
  ContractDateTo: Option(DateFromISOString),
  ContractNumber: t.string,
  ContractTermination: Option(DateFromISOString),
  ContractType: t.number,
  JobCode: t.number,
  JobVersion: t.number,
  Href: t.string
});

type ApprenticeshipContract = t.TypeOf<typeof ApprenticeshipContract>;
export { ApprenticeshipContract };

export type ApprenticeshipContractProps = t.PropsOf<
  typeof ApprenticeshipContract
>;
