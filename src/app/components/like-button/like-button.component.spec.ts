import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  let view;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    view = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should display 0 like by default', () => {
    expect(view.innerHTML).toContain('0 Like');
  });

  it('should display 1 like when giving nbLike at 1', () => {
    component.nbLikes = 1;
    fixture.detectChanges();
    expect(view.innerHTML).toContain('1 Like');
  });
});
