import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosAceptadosComponent } from './videos-aceptados.component';

describe('VideosAceptadosComponent', () => {
  let component: VideosAceptadosComponent;
  let fixture: ComponentFixture<VideosAceptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideosAceptadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosAceptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
