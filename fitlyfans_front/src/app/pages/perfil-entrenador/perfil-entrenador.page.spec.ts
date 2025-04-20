import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEntrenadorPage } from './perfil-entrenador.page';

describe('PerfilEntrenadorPage', () => {
  let component: PerfilEntrenadorPage;
  let fixture: ComponentFixture<PerfilEntrenadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEntrenadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
