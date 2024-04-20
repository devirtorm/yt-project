import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVideosComponent } from './mis-videos.component';

describe('MisVideosComponent', () => {
  let component: MisVideosComponent;
  let fixture: ComponentFixture<MisVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
