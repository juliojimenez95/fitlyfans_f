import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterTrainerPage } from './register-trainer.page';

describe('RegisterTrainerPage', () => {
  let component: RegisterTrainerPage;
  let fixture: ComponentFixture<RegisterTrainerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
