import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowRotateForward } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularGridInstance, Column, CompoundInputPasswordFilter, Filters, Formatter, GridOption, OnEventArgs } from 'angular-slickgrid';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'jhi-san-pham-xuat-kho',
  templateUrl: './san-pham-xuat-kho.component.html',
  styleUrls: ['./san-pham-xuat-kho.component.scss'],
})
export class SanPhamXuatKhoComponent implements OnInit {
  danhSachXuatKhoUrl = this.applicationConfigService.getEndpointFor('api/danh-sach-nhap-khos');
  chiTietXuatKhoUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-xuat-khos');
  title = 'Thống kê danh sách các lần xuất kho';

  faArrowRotateForward = faArrowRotateForward;

  predicate!: string;
  ascending!: boolean;
  isLoading = false;
  popupThemMoi = false;
  popupChiTiet = false;
  popupEdit = false;
  isModalOpenConfirmDuplicate = false;
  isModalOpenConfirmUploadSuccess = false;

  columnDefinitions: Column[] = [];
  gridOption: GridOption = {};
  angularGrid?: AngularGridInstance;
  gridObj: any;
  dataViewObj: any;
  excelData: any;

  danhSachXuatKho: any[] = [];
  chiTietXuatKho: any[] = [];
  listOfChiTietDanhSachXuatKho: any[] = [];
  danhSachXuatKhoChiTiet: any = {};

  danhSachSanPhamXuatKho: any;

  listOfXuatKho: {
    type: string;
    id: number;
    numberOfUpdate: number;
    timeUpdate: string;
    user: '';
    listOfSanPhamXuatkho: any;
  } = {
    type: '',
    id: 0,
    numberOfUpdate: 0,
    timeUpdate: '',
    user: '',
    listOfSanPhamXuatkho: [],
  };

  dataExcel: {
    id: number;
    month: number;
    year: number;
    idSanPham: number;
    tenSanPham: string;
    nganh: string;
    sanPham: string;
    nhomSanPham: string;
    chungLoai: string;
    nhomSanPhamTheoCongSuat: string;
    maKhachHang: string;
    tenKhachHang: string;
    quantity: number;
    quantityAvailable: number;
    quantityNotAvailable: number;
  }[] = [];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  loadAll(): void {
    this.isLoading = true;
    this.http.get<any>(this.danhSachXuatKhoUrl).subscribe(res => {
      this.danhSachXuatKho = res;
      console.log(res);
    });
  }

  buttonView: Formatter<any> = (_row, _cell, value) =>
    value
      ? `<button ></button>`
      : { text: '<button class=" btn btn-primary fa fa-eye" style="height: 28px; line-height: 14px" title="Xem chi tiết"></button>' };

  buttonEdit: Formatter<any> = (_row, _cell, value) =>
    value
      ? `<button class="btn btn-success fa fa-pencil" style="height: 28px; line-height: 14px; width: 15px">Chỉnh sửa</button>`
      : {
          text: '<button class="btn btn-success fa fa-pencil" style="height: 28px; line-height: 14px" title="Chỉnh sửa"></button>',
        };

  ngOnInit(): void {
    this.http.get<any>(this.danhSachXuatKhoUrl).subscribe(res => {
      this.danhSachXuatKho = res;
      console.log(res);
    });
    this.columnDefinitions = [
      {
        id: 'id',
        name: 'STT',
        field: 'id',
        minWidth: 20,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'month',
        name: 'Tháng',
        field: 'month',
        minWidth: 100,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'year',
        name: 'Năm',
        field: 'year',
        minWidth: 100,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'user',
        name: 'Người cập nhật',
        field: 'user',
        minWidth: 150,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'timeCreate',
        name: 'Thời gian tạo file',
        field: 'timeCreate',
        minWidth: 60,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'timeUpdate',
        name: 'Thời gian cập nhật',
        field: 'timeUpdate',
        minWidth: 120,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'view',
        field: 'view',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        formatter: this.buttonView,
        maxWidth: 55,
        minWidth: 55,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.openPopupChiTiet();
          this.showData(args.dataContext.id);
          this.danhSachXuatKhoChiTiet = args.dataContext;
          this.angularGrid?.gridService.highlightRow(args.row, 1500);
          this.angularGrid?.gridService.setSelectedRow(args.row);
          console.log('check', this.danhSachXuatKhoChiTiet);
        },
      },
    ];
    this.gridOption = {
      enableAutoResize: true,
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      enableAutoSizeColumns: true,
      asyncEditorLoadDelay: 2000,
      enableCellNavigation: true,
      gridHeight: 620,
      gridWidth: '100%',
      // autoFitColumnsOnFirstLoad: true,
      // asyncEditorLoading: true,
      // forceFitColumns: false,
      presets: {
        columns: [
          { columnId: 'id' },
          { columnId: 'month' },
          { columnId: 'year' },
          { columnId: 'user' },
          { columnId: 'timeCreate' },
          { columnId: 'timeUpdate' },
          { columnId: 'view' },
        ],
      },
    };
  }

  openPopupThemMoi(): void {
    this.popupThemMoi = true;
  }

  closePopupThemMoi(): void {
    this.popupThemMoi = false;
  }

  openPopupChiTiet(): void {
    this.popupChiTiet = true;
  }

  closePopupChiTiet(): void {
    this.popupChiTiet = false;
  }

  openPopupEdit(): void {
    this.popupEdit = true;
  }

  closePopupEdit(): void {
    this.popupEdit = false;
  }

  confirmDuplicate(): void {
    this.isModalOpenConfirmDuplicate = false;
  }

  closeModalConfirmDuplicate(): void {
    this.isModalOpenConfirmDuplicate = false;
  }

  confirmCancelUploadSuccess(): void {
    this.isModalOpenConfirmUploadSuccess = false;
  }

  closeModalConfirmUploadSuccess(): void {
    this.isModalOpenConfirmUploadSuccess = false;
  }

  angularGridReady(angularGrid: any): void {
    this.angularGrid = angularGrid;
    // the Angular Grid Instance exposes both Slick Grid & DataView objects
    this.gridObj = angularGrid.slickGrid;
    // setInterval(()=>{
    this.dataViewObj = angularGrid.dataView;
    // console.log('onGridMenuColumnsChanged11111', this.angularGrid);
    // },1000)
  }

  handleOnBeforePaginationChange(e: any): boolean {
    // e.preventDefault();
    // return false;
    return true;
  }

  showData(id: number | undefined): void {
    // this.listOfChiTietDanhSachXuatKho = [];
    this.http.get<any>(`${this.chiTietXuatKhoUrl}/${id as number}`).subscribe(res => {
      this.chiTietXuatKho = res;
      console.log('chi tiet', this.chiTietXuatKho);
    });
  }

  readExcel(event: any): void {
    this.excelData = [];
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = e => {
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]], {
        header: ['maSanPham', 'maKhachHang', 'tenKhachHang', 'quantity', 'quantityAvailable', 'quantityNotAvailable'],
        defval: '',
      });
    };
    setTimeout(() => {
      console.log('check kq', this.excelData);
    }, 1000);
  }

  createForm(type: string): void {
    this.listOfXuatKho.type = type;
    this.listOfXuatKho.id = 1;
    this.listOfXuatKho.numberOfUpdate = 99;
    this.listOfXuatKho.listOfSanPhamXuatkho = this.chiTietXuatKho;
    console.log('chi tiet', this.listOfXuatKho.listOfSanPhamXuatkho);
    setTimeout(() => {
      this.http.post<any>(this.chiTietXuatKhoUrl, this.listOfXuatKho).subscribe(res => {
        if (type === 'insert') {
          console.log('them moi thanh cong', res);
        } else if (type === 'update') {
          console.log('update thanh cong', res);
        }
      });
    }, 2000);
  }

  getExportExcel(): void {
    this.dataExcel = [];
    const item = {
      id: 0,
      month: 0,
      year: 0,
      idSanPham: 0,
      tenSanPham: '',
      nganh: '',
      sanPham: '',
      nhomSanPham: '',
      chungLoai: '',
      nhomSanPhamTheoCongSuat: '',
      maKhachHang: '',
      tenKhachHang: '',
      quantity: 0,
      quantityAvailable: 0,
      quantityNotAvailable: 0,
    };
    this.dataExcel = [item, ...this.dataExcel];
    this.exportExcel();
  }

  exportExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const mergeRange = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 0, c: 1 } },
      { s: { r: 0, c: 2 }, e: { r: 0, c: 2 } },
      { s: { r: 0, c: 3 }, e: { r: 0, c: 3 } },
      { s: { r: 0, c: 4 }, e: { r: 0, c: 4 } },
      { s: { r: 0, c: 5 }, e: { r: 0, c: 5 } },
      { s: { r: 0, c: 6 }, e: { r: 0, c: 6 } },
      { s: { r: 0, c: 7 }, e: { r: 0, c: 7 } },
      { s: { r: 0, c: 8 }, e: { r: 0, c: 8 } },
      { s: { r: 0, c: 9 }, e: { r: 0, c: 9 } },
      { s: { r: 0, c: 10 }, e: { r: 0, c: 10 } },
      { s: { r: 0, c: 11 }, e: { r: 0, c: 11 } },
      { s: { r: 0, c: 12 }, e: { r: 0, c: 12 } },
      { s: { r: 0, c: 13 }, e: { r: 0, c: 13 } },
    ];
    ws['!merges'] = mergeRange;
    ws['A1'] = { t: 's', v: 'STT' };
    ws['B1'] = { t: 's', v: 'Tháng' };
    ws['C1'] = { t: 's', v: 'Năm' };
    ws['D1'] = { t: 's', v: 'Mã hoá hoá' };
    ws['E1'] = { t: 's', v: 'Tên hàng hoá' };
    ws['F1'] = { t: 's', v: 'Ngành' };
    ws['G1'] = { t: 's', v: 'Sản phẩm' };
    ws['H1'] = { t: 's', v: 'Nhóm sản phẩm' };
    ws['I1'] = { t: 's', v: 'Chủng loại' };
    ws['J1'] = { t: 's', v: 'Nhóm SP theo công suất' };
    ws['K1'] = { t: 's', v: 'Mã khách hàng' };
    ws['L1'] = { t: 's', v: 'Tên khách hàng' };
    ws['M1'] = { t: 's', v: 'Tổng số lượng' };
    ws['N1'] = { t: 's', v: 'Số lượng đã lên HĐ + Trả hàng' };
    ws['O1'] = { t: 's', v: 'SL chưa lên' };

    const headerStyle = {
      font: { bold: true },
      aligment: { horizontal: 'center', vertical: 'center' },
    };
    console.log('merge', mergeRange);

    const headers = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1'];
    headers.forEach(header => {
      ws[header].s = headerStyle;
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mẫu báo cáo tổng hợp xuất kho');
    XLSX.writeFile(wb, 'Mẫu báo cáo tổng hợp xuất kho.xlsx');
  }
}
