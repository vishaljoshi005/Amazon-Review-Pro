import { Component, OnInit } from '@angular/core';
import {RazorPaymentRequestService} from '@/core/services/miscellaneous-Auth/razor-payment-request.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private razorService: RazorPaymentRequestService) { }

  ngOnInit() {
  }

  clicked() {
    this.razorService.requestRazorOrderId().subscribe(
      (data) => {
        console.log('from the component');
        console.log(data);
      }
    );
  }
}
