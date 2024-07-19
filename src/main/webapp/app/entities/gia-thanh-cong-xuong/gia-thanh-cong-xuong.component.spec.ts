import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaThanhCongXuongComponent } from './gia-thanh-cong-xuong.component';

describe('GiaThanhCongXuongComponent', () => {
  let component: GiaThanhCongXuongComponent;
  let fixture: ComponentFixture<GiaThanhCongXuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiaThanhCongXuongComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaThanhCongXuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
