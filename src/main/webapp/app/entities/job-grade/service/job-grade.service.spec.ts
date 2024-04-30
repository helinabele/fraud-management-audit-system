import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IJobGrade } from '../job-grade.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../job-grade.test-samples';

import { JobGradeService } from './job-grade.service';

const requireRestSample: IJobGrade = {
  ...sampleWithRequiredData,
};

describe('JobGrade Service', () => {
  let service: JobGradeService;
  let httpMock: HttpTestingController;
  let expectedResult: IJobGrade | IJobGrade[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JobGradeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a JobGrade', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jobGrade = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(jobGrade).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobGrade', () => {
      const jobGrade = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(jobGrade).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobGrade', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobGrade', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a JobGrade', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addJobGradeToCollectionIfMissing', () => {
      it('should add a JobGrade to an empty array', () => {
        const jobGrade: IJobGrade = sampleWithRequiredData;
        expectedResult = service.addJobGradeToCollectionIfMissing([], jobGrade);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobGrade);
      });

      it('should not add a JobGrade to an array that contains it', () => {
        const jobGrade: IJobGrade = sampleWithRequiredData;
        const jobGradeCollection: IJobGrade[] = [
          {
            ...jobGrade,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addJobGradeToCollectionIfMissing(jobGradeCollection, jobGrade);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobGrade to an array that doesn't contain it", () => {
        const jobGrade: IJobGrade = sampleWithRequiredData;
        const jobGradeCollection: IJobGrade[] = [sampleWithPartialData];
        expectedResult = service.addJobGradeToCollectionIfMissing(jobGradeCollection, jobGrade);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobGrade);
      });

      it('should add only unique JobGrade to an array', () => {
        const jobGradeArray: IJobGrade[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const jobGradeCollection: IJobGrade[] = [sampleWithRequiredData];
        expectedResult = service.addJobGradeToCollectionIfMissing(jobGradeCollection, ...jobGradeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const jobGrade: IJobGrade = sampleWithRequiredData;
        const jobGrade2: IJobGrade = sampleWithPartialData;
        expectedResult = service.addJobGradeToCollectionIfMissing([], jobGrade, jobGrade2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobGrade);
        expect(expectedResult).toContain(jobGrade2);
      });

      it('should accept null and undefined values', () => {
        const jobGrade: IJobGrade = sampleWithRequiredData;
        expectedResult = service.addJobGradeToCollectionIfMissing([], null, jobGrade, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobGrade);
      });

      it('should return initial array if no JobGrade is added', () => {
        const jobGradeCollection: IJobGrade[] = [sampleWithRequiredData];
        expectedResult = service.addJobGradeToCollectionIfMissing(jobGradeCollection, undefined, null);
        expect(expectedResult).toEqual(jobGradeCollection);
      });
    });

    describe('compareJobGrade', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareJobGrade(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareJobGrade(entity1, entity2);
        const compareResult2 = service.compareJobGrade(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareJobGrade(entity1, entity2);
        const compareResult2 = service.compareJobGrade(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareJobGrade(entity1, entity2);
        const compareResult2 = service.compareJobGrade(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
