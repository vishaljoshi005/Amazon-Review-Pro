import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User, LoginModel} from '@/shared/models';
import {Env} from '@/core/env';

interface LoginResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public authenticated = false;

  private BASE_URL = Env.BASE_URL; // change this later
  private LOGIN_URL = `${this.BASE_URL}/login`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
      return this.authenticated;
  }

   login(logindata: LoginModel): Observable<any> {
    console.log(logindata);
    return this.http.post<any>(this.LOGIN_URL, logindata, )
      .pipe(map(user => {
        // console.log('USER WHOLE OBJECT');
         console.log(user);

         // console.log(`User Success is ${user.success}`);

        // add check here
         if (user.success) {
           this.authenticated = true;
           console.log(this.isAuthenticated());
           localStorage.setItem('currentUser', JSON.stringify({loginUsername: user.username, idConf: user.token}));
           this.currentUserSubject.next({loginUsername: user.username, idConf: user.token});
           console.log(localStorage.getItem('currentUser'));
           return { success : true, message : 'Authentication Successful'};
         } else {
           return { success : false, message : 'Invalid username or password '};
         }
        //  console.log(user.headers.get('Authorization'));
        //  if (user.headers.get('Authorization')) {
        //   localStorage.setItem('currentUser', JSON.stringify({username: user.body.username, token: user.headers.get('Authorization')}));
        //   this.currentUserSubject.next({username: user.body.username, token: user.headers.get('Authorization')});
        //   console.log(localStorage.getItem('currentUser'));
        //   return { success : true, message : 'Authentication Successful'};
        // } else {
        //   return { success : false, message : 'Invalid username or password'};
        // }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
  logout() {
    // Take token in para and return it to backend for deleting
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
