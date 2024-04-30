import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobGradeFormService } from './job-grade-form.service';
import { JobGradeService } from '../service/job-grade.service';
import { IJobGrade } from '../job-grade.model';

import { JobGradeUpdateComponent } from './job-grade-update.component';

describe('JobGrade Management Update Component', () => {
  let comp: JobGradeUpdateComponent;
  let fixture: ComponentFixture<JobGradeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobGradeFormService: JobGradeFormService;
  let jobGradeService: JobGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobGradeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(JobGradeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobGradeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobGradeFormService = TestBed.inject(JobGradeFormService);
    jobGradeService = TestBed.inject(JobGradeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const jobGrade: IJobGrade = { id: 'CBA' };

      activatedRoute.data = of({ jobGrade });
      comp.ngOnInit();

      expect(comp.jobGrade).toEqual(jobGrade);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobGrade>>();
      const jobGrade = { id: 'ABC' };
      jest.spyOn(jobGradeFormService, 'getJobGrade').mockReturnValue(jobGrade);
      jest.spyOn(jobGradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobGrade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobGrade }));
      saveSubject.complete();

      // THEN
      expect(jobGradeFormService.getJobGrade).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobGradeService.update).toHaveBeenCalledWith(expect.objectContaining(jobGrade));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobGrade>>();
      const jobGrade = { id: 'ABC' };
      jest.spyOn(jobGradeFormService, 'getJobGrade').mockReturnValue({ id: null });
      jest.spyOn(jobGradeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobGrade: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobGrade }));
      saveSubject.complete();

      // THEN
      expect(jobGradeFormService.getJobGrade).toHaveBeenCalled();
      expect(jobGradeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobGrade>>();
      const jobGrade = { id: 'ABC' };
      jest.spyOn(jobGradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobGrade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobGradeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
