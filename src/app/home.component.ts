import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'erz-home',
  template: `
    <ul>
      <li *ngFor="let section of sections">
        <h2>
          <a [routerLink]="'/' + section">
            {{ section + '.title' | translate }}
          </a>
        </h2>
      </li>
    </ul>
  `,
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  sections: ReadonlyArray<string> = [
    'presence-control',
    'offene-absenzen',
    'absenzen-bearbeiten',
    'absenzen-auswerten'
  ];
}
