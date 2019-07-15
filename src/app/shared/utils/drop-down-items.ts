import { DropDownItem } from '../models/drop-down-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function findDropDownItem$(
  items$: Observable<ReadonlyArray<DropDownItem>>,
  key: number
): Observable<Option<DropDownItem>> {
  return items$.pipe(map(items => items.find(i => i.Key === key) || null));
}
