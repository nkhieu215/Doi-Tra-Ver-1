import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamXuatKhoComponent } from './san-pham-xuat-kho.component';

describe('SanPhamXuatKhoComponent', () => {
  let component: SanPhamXuatKhoComponent;
  let fixture: ComponentFixture<SanPhamXuatKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanPhamXuatKhoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanPhamXuatKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
