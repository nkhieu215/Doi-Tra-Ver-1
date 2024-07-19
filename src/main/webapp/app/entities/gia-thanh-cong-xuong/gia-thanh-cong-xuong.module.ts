import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { SharedModule } from 'app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GiaThanhCongXuongComponent } from './gia-thanh-cong-xuong.component';

const giaThanhCongXuongRoute: Routes = [
  {
    path: '',
    component: GiaThanhCongXuongComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(giaThanhCongXuongRoute), NgxPaginationModule, AngularSlickgridModule],
  declarations: [GiaThanhCongXuongComponent],
  exports: [GiaThanhCongXuongComponent],
})
export class GiaThanhCongXuongModule {}
