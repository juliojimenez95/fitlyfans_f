import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreCoachesPage } from './explore-coaches.page';

describe('ExploreCoachesPage', () => {
  let component: ExploreCoachesPage;
  let fixture: ComponentFixture<ExploreCoachesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCoachesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
