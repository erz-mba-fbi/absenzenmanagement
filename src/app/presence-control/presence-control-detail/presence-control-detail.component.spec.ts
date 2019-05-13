import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceControlDetailComponent } from './presence-control-detail.component';

describe('PresenceControlDetailComponent', () => {
  let component: PresenceControlDetailComponent;
  let fixture: ComponentFixture<PresenceControlDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceControlDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceControlDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
