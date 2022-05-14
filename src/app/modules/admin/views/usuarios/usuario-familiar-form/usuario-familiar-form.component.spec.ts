import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFamiliarFormComponent } from './usuario-familiar-form.component';

describe('UsuarioFamiliarFormComponent', () => {
  let component: UsuarioFamiliarFormComponent;
  let fixture: ComponentFixture<UsuarioFamiliarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFamiliarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFamiliarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
