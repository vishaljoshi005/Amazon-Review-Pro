import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerDashboardRoutingModule } from './customer-dashboard.routing.module';
import { SharedModule } from '@/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentGatewayComponent } from './customer-dashboard/payment-gateway/payment-gateway.component';


@NgModule({
  declarations: [CustomerDashboardComponent, PaymentGatewayComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerDashboardRoutingModule,
    FlexLayoutModule
  ]
})
export class CustomerDashboardModule { }
