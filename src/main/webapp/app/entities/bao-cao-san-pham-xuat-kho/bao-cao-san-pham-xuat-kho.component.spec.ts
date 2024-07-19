import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoSanPhamXuatKhoComponent } from './bao-cao-san-pham-xuat-kho.component';

describe('BaoCaoSanPhamXuatKhoComponent', () => {
  let component: BaoCaoSanPhamXuatKhoComponent;
  let fixture: ComponentFixture<BaoCaoSanPhamXuatKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaoCaoSanPhamXuatKhoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoSanPhamXuatKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
