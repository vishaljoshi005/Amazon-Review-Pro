import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


import {  NgxUiLoaderConfig,  NgxUiLoaderHttpModule,  NgxUiLoaderModule,  NgxUiLoaderRouterModule,  PB_DIRECTION,
  POSITION,
  SPINNER
} from 'ngx-ui-loader';
import {FlexLayoutModule} from '@angular/flex-layout';


import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent, ForgotPasswordComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';





const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#FF4500',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.squareJellyBox, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule,


    CoreModule,
    SharedModule,



    AppRoutingModule

  ],
  entryComponents: [
    ForgotPasswordComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true, } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
