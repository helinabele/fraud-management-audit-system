import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AssignTaskService } from '../service/assign-task.service';

import { AssignTaskComponent } from './assign-task.component';
import SpyInstance = jest.SpyInstance;

describe('AssignTask Management Component', () => {
  let comp: AssignTaskComponent;
  let fixture: ComponentFixture<AssignTaskComponent>;
  let service: AssignTaskService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'assign-task', component: AssignTaskComponent }]), HttpClientTestingModule],
      declarations: [AssignTaskComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(AssignTaskComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssignTaskComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AssignTaskService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  // it('Should call load all on init', () => {
  //   // WHEN
  //   comp.ngOnInit();

  //   // THEN
  //   expect(service.query).toHaveBeenCalled();
  //   expect(comp.assignTasks?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  // });

  describe('trackId', () => {
    it('Should forward to assignTaskService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getAssignTaskIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAssignTaskIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });

  it('should load a page', () => {
    // WHEN
    comp.navigateToPage(1);

    // THEN
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  // it('should calculate the sort attribute for an id', () => {
  //   // WHEN
  //   comp.ngOnInit();

  //   // THEN
  //   expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
  // });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.navigateToWithComponentValues();

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['name,asc'],
        }),
      })
    );
  });
});
