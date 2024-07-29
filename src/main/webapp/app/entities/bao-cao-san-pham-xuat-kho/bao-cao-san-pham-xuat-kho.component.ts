import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularGridInstance, Column, FieldType, Filters, Formatters, GridOption } from 'angular-slickgrid';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Component({
  selector: 'jhi-bao-cao-san-pham-xuat-kho',
  templateUrl: './bao-cao-san-pham-xuat-kho.component.html',
  styleUrls: ['./bao-cao-san-pham-xuat-kho.component.scss'],
})
export class BaoCaoSanPhamXuatKhoComponent implements OnInit {
  chiTietXuatKhoUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-xuat-khos');
  tongHopUrl = this.applicationConfigService.getEndpointFor('api/tong-hop');
  startDates = '';
  endDates = '';
  dateTimeSearchKey: { startDate: string; endDate: string } = { startDate: '', endDate: '' };
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  angularGrid!: AngularGridInstance;
  gridObj: any;
  dataViewObj: any;
  isLoading = false;
  isModalOpenConfirmLost = false;
  chiTietXuatKho: any[] = [];

  dropdownSettings = {};
  listMonth: any[] = [
    { id: 1, name: 'Tháng 1' },
    { id: 2, name: 'Tháng 2' },
    { id: 3, name: 'Tháng 3' },
    { id: 4, name: 'Tháng 4' },
    { id: 5, name: 'Tháng 5' },
    { id: 6, name: 'Tháng 6' },
    { id: 7, name: 'Tháng 7' },
    { id: 8, name: 'Tháng 8' },
    { id: 9, name: 'Tháng 9' },
    { id: 10, name: 'Tháng 10' },
    { id: 11, name: 'Tháng 11' },
    { id: 12, name: 'Tháng 12' },
  ];
  selectedItems: any[] = [];
  onSelectItemRequest: string[] = [];
  selectedMonths = [];
  selectedYear!: number;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected applicationConfigService: ApplicationConfigService,
    protected http: HttpClient
  ) {}

  loadAll(): void {
    this.isLoading = true;
    this.http.get<any>(this.chiTietXuatKhoUrl).subscribe(res => {
      this.chiTietXuatKho = res;
      console.log(res);
    });
  }

  startDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-01`;
  }
  endDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    const today = new Date();
    this.dateTimeSearchKey.startDate = this.startDate(today);
    this.dateTimeSearchKey.endDate = this.endDate(today);
    this.startDates = this.startDate(today);
    this.endDates = this.endDate(today);
    console.log('date time', this.dateTimeSearchKey);
    console.log('check time', this.dateTimeSearchKey);

    this.loadAll();
    this.dataShow();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any): void {
    console.log('Chọn tháng', item);
  }

  public onDeSelect(item: any): void {
    console.log('On item deselected', item);
  }

  onSelectAll(items: any): void {
    console.log('All item selected', items);
  }

  dataShow(): void {
    this.columnDefinitions = [
      {
        id: 'id',
        field: 'id',
        name: 'STT',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: true,
        minWidth: 40,
        maxWidth: 50,
      },
      {
        id: 'maTiepNhan',
        field: 'maTiepNhan',
        name: 'Mã tiếp nhận',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 140,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'ngayTiepNhan',
        field: 'ngayTiepNhan',
        name: 'Ngày tiếp nhận',
        formatter: Formatters.dateTimeIso,
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 150,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'ngayPhanTich',
        field: 'ngayPhanTich',
        name: 'Ngày phân tích',
        formatter: Formatters.dateTimeIso,
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 150,
        minWidth: 50,
      },
      {
        id: 'nhanVienGiaoHang',
        field: 'nhanVienGiaoHang',
        name: 'Nhân viên giao hàng',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 150,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'tenKhachHang',
        field: 'tenKhachHang',
        name: 'Tên Khách hàng',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 360,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'nhomKhachHang',
        field: 'nhomKhachHang',
        name: 'Nhóm khách hàng',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 360,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'tinhThanh',
        field: 'tinhThanh',
        name: 'Tỉnh thành',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 10,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'tenSanPham',
        field: 'tenSanPham',
        name: 'Tên sản phẩm',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 360,
        minWidth: 150,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'tenNganh',
        field: 'tenNganh',
        name: 'Ngành',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'tenChungLoai',
        field: 'tenChungLoai',
        name: 'Chủng loại',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 200,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'tenNhomSanPham',
        field: 'tenNhomSanPham',
        name: 'Nhóm sản phẩm',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 200,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'soLuongKhachGiao',
        field: 'soLuongKhachGiao',
        name: 'Số lượng khách giao',
        cssClass: 'column-item',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 20,
      },
      {
        id: 'slTiepNhan',
        field: 'slTiepNhan',
        name: 'Số lượng thực nhận',
        cssClass: 'column-item',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'slXuatKho',
        field: 'slXuatKho',
        name: 'Số lượng xuất kho',
        cssClass: 'column-item',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 50,
        sortable: true,
        filterable: true,
        type: FieldType.string,
        filter: {
          placeholder: 'search',
          model: Filters.compoundInputText,
        },
      },
      {
        id: 'thoiGianXuatKho',
        field: 'thoiGianXuatKho',
        name: 'Thời gian xuất kho',
        formatter: Formatters.dateTimeIso,
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 150,
        minWidth: 50,
      },
      {
        id: 'tenNhomLoi',
        field: 'tenNhomLoi',
        name: 'Nhóm lỗi',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 50,
      },
      {
        id: 'tongSoLuong',
        field: 'tongSoLuong',
        name: 'Tổng lỗi',
        cssClass: 'column-item',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 80,
        minWidth: 50,
      },
      {
        id: 'trangThai',
        field: 'trangThai',
        name: 'Trạng thái',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        maxWidth: 100,
        minWidth: 50,
      },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      enableAutoSizeColumns: true,
      asyncEditorLoadDelay: 1000,
      presets: {
        columns: [
          { columnId: 'maTiepNhan' },
          { columnId: 'namSanXuat' },
          { columnId: 'ngayTiepNhan' },
          { columnId: 'ngayPhanTich' },
          { columnId: 'nhanVienGiaoHang' },
          { columnId: 'tenKhachHang' },
          { columnId: 'nhomKhachHang' },
          { columnId: 'tinhThanh' },
          { columnId: 'tenSanPham' },
          { columnId: 'tenNganh' },
          { columnId: 'tenChungLoai' },
          { columnId: 'tenNhomSanPham' },
          { columnId: 'soLuongKhachGiao' },
          { columnId: 'slTiepNhan' },
          { columnId: 'tenNhomLoi' },
          { columnId: 'tongSoLuong' },
          { columnId: 'trangThai' },
        ],
      },
      gridHeight: 620,
      gridWidth: '100%',
      autoHeight: true,
    };
  }

  changeDate(): void {
    let dateTimeSearchKey: { startDate: string; endDate: string } = { startDate: '', endDate: '' };
    document.getElementById('dateForm')?.addEventListener('submit', function (event) {
      event.preventDefault();

      const startDateInp = document.getElementById('startDate') as HTMLInputElement;
      const endDateInp = document.getElementById('endDate') as HTMLInputElement;

      const startDate = startDateInp.value;
      const endDate = endDateInp.value;
      dateTimeSearchKey = { startDate: startDateInp.value, endDate: endDateInp.value };
    });
    setTimeout(() => {
      const result = [];
      this.dateTimeSearchKey = dateTimeSearchKey;
      const startMonth = this.startDates.split('-')[1];
      const startYear = this.startDates.split('-')[0];
      const endMonth = this.endDates.split('-')[1];
      const endYear = this.endDates.split('-')[0];
      if (Number(startYear) === Number(endYear)) {
        for (let i = Number(startMonth); i <= Number(endMonth); i++) {
          result.push(`0${i}-${startYear}`);
        }
      } else {
        for (let i = Number(startYear); i <= Number(endYear); i++) {
          if (i < Number(endYear)) {
            for (let j = Number(startMonth); j <= 12; j++) {
              result.push(`0${j}-${i}`);
            }
          } else if (Number(startYear) < i && i < Number(endYear)) {
            for (let j = 1; j <= 12; j++) {
              result.push(`0${j}-${i}`);
            }
          } else {
            for (let j = 1; j <= Number(endMonth); j++) {
              result.push(`0${j}-${i}`);
            }
          }
        }
      }
      console.log('Date:', result);
    }, 200);
  }

  changeDate2(): void {
    const yearInput = (document.getElementById('yearInput') as HTMLInputElement).value;
    const year = parseInt(yearInput, 10);

    if (isNaN(year)) {
      console.error('Invalid year input');
      return;
    }

    const formattedData = this.selectedItems.map(item => ({
      month: item.id,
      year: year,
    }));

    console.log('Data to send:', formattedData);
  }

  onSearchChange(e: any): void {
    // detail is the args data payload
    const args = e.detail;
    // if (args.columnId === 'maTiepNhan') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.maTiepNhan = '';
    //   } else {
    //     this.dataSearch.maTiepNhan = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'nhanVienGiaoHang') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.nhanVienGiaoHang = '';
    //   } else {
    //     this.dataSearch.nhanVienGiaoHang = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'tenKhachHang') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.tenKhachHang = '';
    //   } else {
    //     this.dataSearch.tenKhachHang = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'nhomKhachHang') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.nhomKhachHang = '';
    //   } else {
    //     this.dataSearch.nhomKhachHang = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'tinhThanh') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.tinhThanh = '';
    //   } else {
    //     this.dataSearch.tinhThanh = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'tenSanPham') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.tenSanPham = '';
    //   } else {
    //     this.dataSearch.tenSanPham = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'tenNganh') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.tenNganh = '';
    //   } else {
    //     this.dataSearch.tenNganh = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'tenChungLoai') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.tenChungLoai = '';
    //   } else {
    //     this.dataSearch.tenChungLoai = args.searchTerms[0];
    //   }
    // }
    // if (args.columnId === 'tenNhomSanPham') {
    //   if (args.searchTerms === undefined) {
    //     this.dataSearch.tenNhomSanPham = '';
    //   } else {
    //     this.dataSearch.tenNhomSanPham = args.searchTerms[0];
    //   }
    // }
    // this.handleSearchCTL();
    // console.log('header search body', this.dataSearch);
    // this.handleSearchCTL();
  }

  angularGridReady(angularGrid: any): void {
    this.angularGrid = angularGrid;

    // the Angular Grid Instance exposes both Slick Grid & DataView objects
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  confirmLost(): void {
    this.isModalOpenConfirmLost = false;
  }

  closeModalConfirmLost(): void {
    this.isModalOpenConfirmLost = false;
  }
}
