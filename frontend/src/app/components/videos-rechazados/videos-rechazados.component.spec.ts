import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosRechazadosComponent } from './videos-rechazados.component';

describe('VideosRechazadosComponent', () => {
  let component: VideosRechazadosComponent;
  let fixture: ComponentFixture<VideosRechazadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideosRechazadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosRechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
