import { Component, OnInit } from '@angular/core';
import {WindowReferenceService} from '@/core/services/miscellaneous-noAuth/window-reference.service';
import {RazorPaymentRequestService} from '@/core/services/miscellaneous-Auth/razor-payment-request.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  rzp1: any;

  private createRequestObject(body) {
    return {
      key: body.razorpayKeyId,
      amount: body.amount,
      name: body.companyName,
      description: body.description,
      image: '@/favicon.ico',
      order_id: body.razorpayOrderId,
      handler: (response) => {
        if (response.errors) {
          console.log('error'); // Handle this with error payment failed
        } else {
          this.razorService.razorStatus
          // tslint:disable-next-line:max-line-length
          ({razorpayOrderId: response.razorpay_order_id
            , razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature
          })
            .subscribe(
              (data) => {
                console.log(data);
              }
            );
        }
      },
      prefill: {
        name: body.customerName,
        email: body.customerEmail,
        phone_number: body.customerPhone
      },
      notes: {
        address: ''
      },
      theme: {
        color: '#F37254'
      }
    };
  }

  constructor(private windowRef: WindowReferenceService,  private razorService: RazorPaymentRequestService) { }

  ngOnInit() {
  }
  //

  initPay() {
    this.razorService.requestRazorOrderId().subscribe(
      (data) => {

        this.rzp1 = new this.windowRef.nativeWindow.Razorpay(this.createRequestObject(data));
        this.rzp1.open();
      }, (error1 => console.log(error1))
    );
  }
}


  //


