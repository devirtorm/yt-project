import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetalleComponent } from './video-detalle.component';

describe('VideoDetalleComponent', () => {
  let component: VideoDetalleComponent;
  let fixture: ComponentFixture<VideoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
