import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutRoutinePage } from './workout-routine.page';

describe('WorkoutRoutinePage', () => {
  let component: WorkoutRoutinePage;
  let fixture: ComponentFixture<WorkoutRoutinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRoutinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
