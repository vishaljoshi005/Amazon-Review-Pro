import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from '@/core/guards';

import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import {PaymentGatewayComponent} from '@/feature/customer-dashboard/customer-dashboard/payment-gateway/payment-gateway.component';


const routes: Routes = [
  { path: '', component: CustomerDashboardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'payment', canActivateChild: [AuthGuard], component: PaymentGatewayComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }
