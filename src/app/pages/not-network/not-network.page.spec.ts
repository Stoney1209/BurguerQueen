import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotNetworkPage } from './not-network.page';

describe('NotNetworkPage', () => {
  let component: NotNetworkPage;
  let fixture: ComponentFixture<NotNetworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotNetworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
