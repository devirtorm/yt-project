import { TestBed } from '@angular/core/testing';

import { EditarUsuariosService } from './editar-usuarios.service';

describe('EditarUsuariosService', () => {
  let service: EditarUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
