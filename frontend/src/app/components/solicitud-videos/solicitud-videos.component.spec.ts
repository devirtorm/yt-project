import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudVideosComponent } from './solicitud-videos.component';

describe('SolicitudVideosComponent', () => {
  let component: SolicitudVideosComponent;
  let fixture: ComponentFixture<SolicitudVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
