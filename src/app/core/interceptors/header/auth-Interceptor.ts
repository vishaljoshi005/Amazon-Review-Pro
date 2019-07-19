import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthService} from '@/core/services/auth/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly AUTH_HEADER = 'Authorization';
  private token ;

  constructor(private authenticationService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (this.authenticationService.currentUserValue) {
      console.log('got here');
      this.token = this.authenticationService.currentUserValue.idConf;
    } else {
      console.log('Got in else bro');
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    req = this.addAuthenticationToken(req);

    console.log(req);
    return next.handle(req);

  }

  private getToken() {
    this.token = this.authenticationService.currentUserValue.idConf;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    if ( !this.authenticationService.currentUserValue) {
      return request;
    }

    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    //   return request;
    // }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, this.token)
    });
  }
}
