import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import localept from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { NgxCurrencyModule } from 'ngx-currency';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localept, 'pt');

const maskConfig: Partial<IConfig> = {
  validation: false,
  dropSpecialCharacters: false,
  thousandSeparator: ",",
  // separatorLimit: "10000"
};


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  bgsColor: 'red',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 2,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'rgba(198,198,198,0.6)',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'cube-grid',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 70,
  logoUrl: 'assets/images/logos/Logo-Marko.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40,40,40,0.69)',
  pbColor: '#00adbb',
  pbDirection: 'ltr',
  pbThickness: 4,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    FlexLayoutModule,
    AngularMaterialModule,

    MatMomentDateModule,
    OAuthModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      enableHtml: true,
      timeOut: 17000,
      extendedTimeOut: 17000,
      progressBar: true,
    }),

    NgxMaskModule.forRoot(maskConfig),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    NgxCurrencyModule
  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
