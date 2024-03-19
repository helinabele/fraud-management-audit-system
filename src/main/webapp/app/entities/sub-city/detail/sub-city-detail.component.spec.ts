import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubCityDetailComponent } from './sub-city-detail.component';

describe('SubCity Management Detail Component', () => {
  let comp: SubCityDetailComponent;
  let fixture: ComponentFixture<SubCityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ subCity: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(SubCityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubCityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load subCity on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.subCity).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
