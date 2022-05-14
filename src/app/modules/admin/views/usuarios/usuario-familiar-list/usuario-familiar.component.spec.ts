import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFamiliarComponent } from './usuario-familiar.component';

describe('UsuarioFamiliarComponent', () => {
  let component: UsuarioFamiliarComponent;
  let fixture: ComponentFixture<UsuarioFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
