import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularGridInstance, Column, Filters, Formatter, GridOption, OnEventArgs } from 'angular-slickgrid';

@Component({
  selector: 'jhi-san-pham-xuat-kho',
  templateUrl: './san-pham-xuat-kho.component.html',
  styleUrls: ['./san-pham-xuat-kho.component.scss'],
})
export class SanPhamXuatKhoComponent implements OnInit {
  title = 'Thống kê danh sách các lần xuất kho';
  predicate!: string;
  ascending!: boolean;
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
  constructor(protected activatedRoute: ActivatedRoute) {}

  buttonView: Formatter<any> = (_row, _cell, value) =>
    value
      ? `<button class="btn btn-primary fa fa-eye" style="height: 28px; line-height: 14px" title="Xem chi tiết"></button>`
      : { text: '<i class="fa fa-eye" aria-hidden="true"></i>' };

  buttonEdit: Formatter<any> = (_row, _cell, value) =>
    value
      ? `<button class="btn btn-success fa fa-pencil" style="height: 28px; line-height: 14px; width: 15px">Chỉnh sửa</button>`
      : {
          text: '<button class="btn btn-success fa fa-pencil" style="height: 28px; line-height: 14px" title="Chỉnh sửa"></button>',
        };

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'stt',
        name: 'STT',
        field: 'stt',
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
          // this.idDonBaoHanh = args.dataContext.id;
          // this.donBaoHanh = args.dataContext;
          // this.openPopupInBBTNTest(args.dataContext.id);
          this.openPopupChiTiet;
          // // console.log('id? ', args.dataContext.id);
          // this.angularGrid?.gridService.highlightRow(args.row, 1500);
          // this.angularGrid?.gridService.setSelectedRow(args.row);
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
      autoFitColumnsOnFirstLoad: true,
      asyncEditorLoading: true,
      forceFitColumns: false,
      presets: {
        columns: [
          { columnId: 'stt' },
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
}
