import { Component, OnInit } from '@angular/core';
import {WindowReferenceService} from '@/core/services/miscellaneous-noAuth/window-reference.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
// tslint:disable-next-line:prefer-const
 rzp1: any;

 options = {
    key: 'rzp_test_9tuucTeE3ESVTX',
    amount: '2500',
    name: 'Merchant Name',
    description: 'Purchase Description',
    image: '/your_logo.png',
   order_id: 'order_CsHAFbjgVu6FLo',
    handler: (response) => {
      alert(response);
      console.log(response);
    },
    prefill: {
      name: 'Harshil Mathur',
      email: 'harshil@razorpay.com'
    },
    notes: {
      address: 'Hello World'
    },
    theme: {
      color: '#F37254'
    }
  };

  constructor(private windowRef: WindowReferenceService) { }

  ngOnInit() {
  }
  //





  initPay() {
    this.rzp1 = new this.windowRef.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }
}


  //


