import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { DropDownItem } from '../../models/drop-down-item.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'erz-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() options: ReadonlyArray<DropDownItem> = [];
  @Input() allowEmpty = true;
  @Input() value: Option<number> = null;
  @Output() valueChange = new EventEmitter<Option<number>>();

  options$ = new BehaviorSubject<ReadonlyArray<DropDownItem>>([]);
  rawValue$ = new BehaviorSubject<Option<number>>(null);

  value$ = combineLatest([this.rawValue$, this.options$]).pipe(
    map(
      ([rawValue, options]) =>
        (options && options.find((o) => o.Key === rawValue)) || null
    )
  );

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.rawValue$.next(changes.value.currentValue);
    }
    if (changes.options) {
      this.options$.next(changes.options.currentValue);
    }
  }
}
