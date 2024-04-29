import { TestBed } from '@angular/core/testing';

import { PlaylistVideoService } from './playlist-video.service';

describe('PlaylistVideoService', () => {
  let service: PlaylistVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
