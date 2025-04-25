import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTrainerPage } from './home-trainer.page';

describe('HomeTrainerPage', () => {
  let component: HomeTrainerPage;
  let fixture: ComponentFixture<HomeTrainerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
