import { Injectable } from '@angular/core';
import { ToastService } from './configurations/toast.service';
import { AppTranslationService } from './app/app-translation.service';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public changesCallback: () => void;

  constructor(
    public router: Router,
    public translationService: AppTranslationService,
    public toastService: ToastService
  ) { }

  gT = (key: string | Array<string>, interpolateParams?: object) =>
    this.translationService.getTranslation(key, interpolateParams)


  public handleError(error, showToast: boolean = true): void {
    let messageArray = [];
    if (showToast) {
      // if (this.checkNoNetwork(error)) {
      //   console.error('LOG || errorHandlerService || handleError || error:', error);
      //   this.toastService.showError(this.gT('alertsMessages.default_erro_0_title'), this.gT('alertsMessages.default_error_0_msg'));
      // }
      // if (this.checkAccessDenied(error)) {
      //   console.error('LOG || errorHandlerService || handleError || error:', error);
      //   this.toastService.showError(this.gT('alertsMessages.default_erro_403_title'), this.gT('alertsMessages.default_error_403_msg'));
      // }
      // if (this.checkInternalServerError(error)) {
      //   console.error('LOG || errorHandlerService || handleError || error:', error);
      //   this.toastService.showError(this.gT('alertsMessages.default_erro_500_title'), this.gT('alertsMessages.default_error_500_msg'));
      // }
      // if (this.checkIsLocalHost(error)) { }
      // if (this.checkNotFound(error)) { }
      // if (this.checkTokenExpired(error)) { }

      if (error.status === 400) {
        if (error.error.hasOwnProperty('errors')) {
          if (
            error.error.errors.hasOwnProperty('BusinessParticipants[0].ContractingCompanyId')
            || error.error.errors.hasOwnProperty('businessParticipants[0].contractingCompanyId')
            || error.error.errors.hasOwnProperty('BusinessParticipants[0].ContractingDecisionContactId')
            || error.error.errors.hasOwnProperty('businessParticipants[0].contractingDecisionContactId')
            || error.error.errors.hasOwnProperty('BusinessParticipants[0].ExecutingCompanyId')
            || error.error.errors.hasOwnProperty('businessParticipants[0].executingCompanyId')
            || error.error.errors.hasOwnProperty('BusinessParticipants[0].ExecutingContactId')
            || error.error.errors.hasOwnProperty('businessParticipants[0].executingContactId')) {
            this.toastService.showError(this.gT('alertsMessages.default_erro_400_title'), this.gT('alertsMessages.business.participantRequired'));
          }

        } else {
          this.toastService.showError(this.gT('alertsMessages.default_erro_400_title'), this.gT('alertsMessages.default_error_400_msg'));
        }

      }// 400 Bad Request
      else if (error.status === 401) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_401_title'),
        error.error.hasOwnProperty("Message") ? (error.error["Message"] === "TOKEN_EXPIRED" ? this.gT('alertsMessages.default_error_token_expired_msg') : error.error["Message"] ) : this.gT('alertsMessages.default_error_401_msg'));
        if (error.error.hasOwnProperty("Message")) {
          if (error.error["Message"] === "TOKEN_EXPIRED") {
            this.router.navigate(['/sign-in']);
          }
        }
      }// 401 Unauthorized
      else if (error.status === 403) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_403_title'),
          error.error.hasOwnProperty("Message") ? `${this.gT('alertsMessages.default_error_403_msg')} <br><br> Retorno API: ${error.error['Message']}`  : this.gT('alertsMessages.default_error_403_msg'));
        // this.toastService.showError(this.gT('alertsMessages.default_erro_403_title'), this.gT('alertsMessages.default_error_403_msg'));
      }// 403 Forbidden
      else if (error.status === 404) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_404_title'), this.gT('alertsMessages.default_error_404_msg'));
      }// 404 Not Found
      else if (error.status === 407) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_407_title'), this.gT('alertsMessages.default_error_407_msg'));
      }// 407 Proxy Authentication Required
      else if (error.status === 408) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_408_title'), this.gT('alertsMessages.default_error_408_msg'));
      }// 408 Request Timeout
      else if (error.status === 500) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_500_title'), this.gT('alertsMessages.default_error_500_msg'));
      }// 500 Internal Server Error
      else if (error.status === 502) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_502_title'), this.gT('alertsMessages.default_error_502_msg'));
      }// 502 Bad Gateway
      else if (error.status === 503) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_503_title'), this.gT('alertsMessages.default_error_503_msg'));
      }// 503 Service Unavailable
      else if (error.status === 504) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_504_title'), this.gT('alertsMessages.default_error_504_msg'));
      }// 504 Gateway Timeout
      else if (error.status === 511) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_511_title'), this.gT('alertsMessages.default_error_511_msg'));
      }// 511 Network Authentication Required
      else if (error.status === 599) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_599_title'), this.gT('alertsMessages.default_error_599_msg'));
      } // 599 Network Connection Timeout Error
      else if (error.status === 0) {
        this.toastService.showError(this.gT('alertsMessages.default_erro_0_title'), this.gT('alertsMessages.default_error_0_msg'));
      }
    }

    if (this.changesCallback) {
      this.changesCallback();
    }
  }

  public getResponseBody(response: HttpResponseBase): any {
    if (response instanceof HttpResponse) {
      return response.body;
    }

    if (response instanceof HttpErrorResponse) {
      return response.error || response.message || response.statusText;
    }
  }

  public checkNoNetwork(response: HttpResponseBase): boolean {
    if (response instanceof HttpResponseBase) {
      return response.status === 0;
    }

    return false;
  }

  public checkTokenExpired(response: HttpResponseBase): boolean {
    if (response instanceof HttpResponseBase) {
      return response.status === 401;
    }

    return false;
  }

  public checkAccessDenied(response: HttpResponseBase): boolean {
    if (response instanceof HttpResponseBase) {
      return response.status === 403;
    }

    return false;
  }

  public checkNotFound(response: HttpResponseBase): boolean {
    if (response instanceof HttpResponseBase) {
      return response.status === 404;
    }

    return false;
  }

  public checkInternalServerError(response: HttpResponseBase): boolean {
    if (response instanceof HttpResponseBase) {
      return response.status === 500;
    }

    return false;
  }

  public checkIsLocalHost(url: string, base?: string): boolean {
    if (url) {
      const location = new URL(url, base);
      return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    }

    return false;
  }
}
