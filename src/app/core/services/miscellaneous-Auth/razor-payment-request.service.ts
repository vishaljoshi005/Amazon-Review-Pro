import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Env} from '@/core/env';
import {RazorStatusModel} from '@/shared/models';

@Injectable({
  providedIn: 'root'
})
export class RazorPaymentRequestService {

  constructor(private http: HttpClient) { }

  private BASE_URL = Env.BASE_URL; // change this later
  private LOGIN_URL = `${this.BASE_URL}/login`;
  private SIGNUP_URL = `${this.BASE_URL}/users/sign-up`;
  private REQUEST_ORDERID_URL = `${this.BASE_URL}/order/neworder`;
  private RESPONSE_PAYMENT_URL = `${this.BASE_URL}/order/verifypayment`;


  private data = {
    credits: 100,
    totalAmount: '7000',
    paymentMethod: 'Razorpay',
    creditRate: 70
  };

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
         console.log('error');
       } else {
       }
      },
      prefill: {
        name: body.customerName,
        email: body.customerEmail,
        phone: body.customerPhone
      },
      notes: {
        address: ''
      },
      theme: {
        color: '#F37254'
      }
    };
  }

  requestRazorOrderId(): Observable<any> {
    console.log(this.data);
    console.log(this.REQUEST_ORDERID_URL);
    return this.http.post<any>(this.REQUEST_ORDERID_URL, this.data )
      .pipe(map(response => {
          console.log('attar');
          console.log(response);
          if (response.success) {
            // console.log(response);
            return response;
            // return {success: true, message: 'Registration Success'};
          } else {
            return {success: false, message: 'Registration Failed 1 '};
          }
        }),
        // catchError (error => of({success: false, message: 'Registration Failed 2'}) )
      );
  }

  razorStatus(responseData: {}): Observable<any> {
    return this.http.post<any>(this.RESPONSE_PAYMENT_URL, responseData )
      .pipe(map(response => {
          console.log(response);
          if (response.success) {
            // console.log(response);
            return response;
            // return {success: true, message: 'Registration Success'};
          } else {
            return {success: false, message: 'Registration Failed 1 '};
          }
        }),
        // catchError (error => of({success: false, message: 'Registration Failed 2'}) )
      );
  }
}

