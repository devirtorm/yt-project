import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionVideosComponent } from './revision-videos.component';

describe('RevisionVideosComponent', () => {
  let component: RevisionVideosComponent;
  let fixture: ComponentFixture<RevisionVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevisionVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevisionVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
