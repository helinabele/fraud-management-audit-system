import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobTitleDetailComponent } from './job-title-detail.component';

describe('JobTitle Management Detail Component', () => {
  let comp: JobTitleDetailComponent;
  let fixture: ComponentFixture<JobTitleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTitleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ jobTitle: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(JobTitleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobTitleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load jobTitle on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.jobTitle).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
