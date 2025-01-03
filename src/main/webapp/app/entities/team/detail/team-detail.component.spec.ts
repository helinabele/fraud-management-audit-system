import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamDetailComponent } from './team-detail.component';

describe('Team Management Detail Component', () => {
  let comp: TeamDetailComponent;
  let fixture: ComponentFixture<TeamDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ team: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(TeamDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TeamDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load team on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.team).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
