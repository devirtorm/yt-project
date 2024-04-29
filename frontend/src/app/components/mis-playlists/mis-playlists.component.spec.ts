import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPlaylistsComponent } from './mis-playlists.component';

describe('MisPlaylistsComponent', () => {
  let component: MisPlaylistsComponent;
  let fixture: ComponentFixture<MisPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisPlaylistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
