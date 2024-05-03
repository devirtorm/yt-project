import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownVideoComponent } from './dropdown-video.component';

describe('DropdownVideoComponent', () => {
  let component: DropdownVideoComponent;
  let fixture: ComponentFixture<DropdownVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
