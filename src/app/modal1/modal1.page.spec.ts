import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Modal1Page } from './modal1.page';

describe('Modal1Page', () => {
  let component: Modal1Page;
  let fixture: ComponentFixture<Modal1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Modal1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
