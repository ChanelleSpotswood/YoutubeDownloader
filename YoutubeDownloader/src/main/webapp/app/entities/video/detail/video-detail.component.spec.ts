import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VideoDetailComponent } from './video-detail.component';

describe('Video Management Detail Component', () => {
  let comp: VideoDetailComponent;
  let fixture: ComponentFixture<VideoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ video: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VideoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VideoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load video on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.video).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
