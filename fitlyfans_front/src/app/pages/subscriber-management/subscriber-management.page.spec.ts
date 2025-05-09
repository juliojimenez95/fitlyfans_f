import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriberManagementPage } from './subscriber-management.page';

describe('SubscriberManagementPage', () => {
  let component: SubscriberManagementPage;
  let fixture: ComponentFixture<SubscriberManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
