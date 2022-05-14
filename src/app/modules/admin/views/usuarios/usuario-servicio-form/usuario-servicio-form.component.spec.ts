import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioServicioFormComponent } from './usuario-servicio-form.component';

describe('UsuarioServicioFormComponent', () => {
  let component: UsuarioServicioFormComponent;
  let fixture: ComponentFixture<UsuarioServicioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioServicioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioServicioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
