import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyAbsencesReportHeaderComponent } from './my-absences-report-header.component';
import { buildTestModuleMetadata } from 'src/spec-helpers';

describe('MyAbsencesReportHeaderComponent', () => {
  let component: MyAbsencesReportHeaderComponent;
  let fixture: ComponentFixture<MyAbsencesReportHeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule(
        buildTestModuleMetadata({
          declarations: [MyAbsencesReportHeaderComponent],
        })
      ).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAbsencesReportHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
