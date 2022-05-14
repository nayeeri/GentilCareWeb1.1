import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorServicioConsultasComponent } from './gestor-servicio-consultas.component';

describe('GestorServicioConsultasComponent', () => {
  let component: GestorServicioConsultasComponent;
  let fixture: ComponentFixture<GestorServicioConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorServicioConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorServicioConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
