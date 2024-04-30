import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobGradeDetailComponent } from './job-grade-detail.component';

describe('JobGrade Management Detail Component', () => {
  let comp: JobGradeDetailComponent;
  let fixture: ComponentFixture<JobGradeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobGradeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ jobGrade: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(JobGradeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobGradeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load jobGrade on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.jobGrade).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
