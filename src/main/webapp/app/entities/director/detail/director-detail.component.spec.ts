import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DirectorDetailComponent } from './director-detail.component';

describe('Director Management Detail Component', () => {
  let comp: DirectorDetailComponent;
  let fixture: ComponentFixture<DirectorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ director: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DirectorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DirectorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load director on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.director).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
