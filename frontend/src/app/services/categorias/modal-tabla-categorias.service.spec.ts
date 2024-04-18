import { TestBed } from '@angular/core/testing';

import { ModalTablaCategoriasService } from './modal-tabla-categorias.service';

describe('ModalTablaCategoriasService', () => {
  let service: ModalTablaCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalTablaCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
