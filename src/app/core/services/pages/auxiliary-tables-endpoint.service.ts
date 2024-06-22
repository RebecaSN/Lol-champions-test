import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { EndpointBaseService } from '../auth/endpoit-base.service';
import { ConfigurationService } from '../configurations/configuration.service';


@Injectable({
  providedIn: 'root'
})
export class AuxiliaryTablesEndpoint extends EndpointBaseService {

  get apiSisContatos(): string {
    return `${this.configurations.apiSisContatos}/${this.culture}/v${this.version}`;
  }

  culture = this.configurations.language;
  version = this.configurations.version;

  constructor(
    private configurations: ConfigurationService,
    http: HttpClient,
    authService: AuthService
  ) {
    super(http, authService);
  }

  /* ------------------------- Busca tipo de registro ------------------------- */
  // getTypeRegistrationEndpoint<T>(id?: number): Observable<T> {
  //   const endpointUrl = `${this.typeRegistrationDataUrlMock}/${id}`;

  //   return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
  //     catchError(error => {
  //       return this.handleError(error, () => this.getTypeRegistrationEndpoint(id));
  //     }));
  // }

  // getTypesRegistrationEndpoint<T>(): Observable<T> {
  //   const endpointUrl = this.typeRegistrationDataUrlMock;

  //   return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
  //     catchError(error => {
  //       return this.handleError(error, () => this.getTypesRegistrationEndpoint());
  //     }));
  // }

  /* ------------------------- Busca tipo de telefone ------------------------- */
  getTypePhoneEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/PhoneType/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTypePhoneEndpoint(id));
      }));
  }

  getTypesPhoneEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/PhoneType`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTypesPhoneEndpoint());
      }));
  }

  /* ------------------------- Busca grupo ------------------------- */
  getGroupsByFilterEndpoint<T>(
    contactType?: number,
    name?: string,
    isDealer?: boolean,
    isEnabled: boolean = true
  ): Observable<T> {
    const headers = this.requestHeaders.headers;

    let params = new HttpParams();

    params = contactType != null ? params.set('ContactType', String(contactType)) : params;
    params = name != null ? params.set('Name', String(name)) : params;
    params = isDealer != null ? params.set('IsDealer', String(isDealer)) : params;
    params = isEnabled != null ? params.set('IsEnabled', String(isEnabled)) : null;

    const httpOptions = {
      params,
      headers
    };

    const endpointUrl = `${this.apiSisContatos}/Group/Filter`;

    return this.http.get<T>(endpointUrl, httpOptions).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getGroupsByFilterEndpoint(
          contactType,
          name,
          isDealer,
          isEnabled
        ));
      }));
  }

  getGroupEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/Group/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getGroupEndpoint(id));
      }));
  }

  getGroupsEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/Group`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getGroupsEndpoint());
      }));
  }

  /* ------------------------- Busca sub grupo ------------------------- */
  getSubGroupsEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/SubGroup`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSubGroupsEndpoint());
      }));
  }

  getSubGroupsByFilterEndpoint<T>(
    groupId?: number,
    name?: string,
    isEmployee?: boolean,
    isEnabled: boolean = true
  ): Observable<T> {
    const headers = this.requestHeaders.headers;

    let params = new HttpParams();

    params = groupId != null ? params.set('GroupId', String(groupId)) : params;
    params = name != null ? params.set('Name', String(name)) : params;
    params = isEmployee != null ? params.set('IsEmployee', String(isEmployee)) : params;
    params = isEnabled != null ? params.set('IsEnabled', String(isEnabled)) : null;

    const httpOptions = {
      params,
      headers
    };

    const endpointUrl = `${this.apiSisContatos}/SubGroup/Filter`;

    return this.http.get<T>(endpointUrl, httpOptions).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getGroupsByFilterEndpoint(
          groupId,
          name,
          isEmployee,
          isEnabled
        ));
      }));
  }

  getSubGroupByIdEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/SubGroup/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSubGroupByIdEndpoint(id));
      }));
  }

  getSubGroupByGroupIdEndpoint<T>(groupId?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/SubGroup/Filter?GroupId=${groupId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSubGroupByGroupIdEndpoint(groupId));
      }));
  }

  /* ------------------------- Busca tipo de empresa ------------------------- */
  getTypeCompanyEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/TypeCompany/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTypeCompanyEndpoint(id));
      }));
  }

  getTypesCompanyEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/TypeCompany`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTypesCompanyEndpoint());
      }));
  }

  /* ------------------------- Busca segmento ------------------------- */
  getSegmentsEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/BusinessSegment`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSegmentsEndpoint());
      }));
  }

  getSegmentByIdEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/BusinessSegment/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSegmentByIdEndpoint(id));
      }));
  }

  getSegmentByGroupIdEndpoint<T>(groupId?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/BusinessSegment/Filter?GroupId=${groupId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSegmentByGroupIdEndpoint(groupId));
      }));
  }

  /* ------------------------- Busca sub segmento ------------------------- */
  getSubSegmentEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/BusinessSubSegment/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSubSegmentEndpoint(id));
      }));
  }

  getSubSegmentBySegmentIdEndpoint<T>(idSegment?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/BusinessSubSegment/Filter?BusinessSegmentId=${idSegment}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSubSegmentBySegmentIdEndpoint(idSegment));
      }));
  }

  getSubSegmentsEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/BusinessSubSegment`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getSubSegmentsEndpoint());
      }));
  }

  getCountriesEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/Country`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCountriesEndpoint());
      }));
  }

  getCountriesByFilterEndpoint<T>(
    name?: string,
    initialsCode?: string,
    bacenCode?: number,
    isEnabled: boolean = true
  ): Observable<T> {
    const headers = this.requestHeaders.headers;

    let params = new HttpParams();

    params = name != null ? params.set('Name', String(name)) : params;
    params = initialsCode != null ? params.set('InitialsCode', String(initialsCode)) : params;
    params = bacenCode != null ? params.set('BacenCode', String(bacenCode)) : params;
    params = isEnabled != null ? params.set('IsEnabled', String(isEnabled)) : null;

    const httpOptions = {
      params,
      headers
    };

    const endpointUrl = `${this.apiSisContatos}/Country/Filter`;

    return this.http.get<T>(endpointUrl, httpOptions).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCountriesByFilterEndpoint(
          name,
          initialsCode,
          bacenCode,
          isEnabled
        ));
      }));
  }

  getCountryByIdEndpoint<T>(id: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/Country/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCountryByIdEndpoint(id));
      }));
  }

  getCountryByInitialsCodeEndpoint<T>(initialCode?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/Country/Filter?InitialsCode=${initialCode}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCountryByInitialsCodeEndpoint(initialCode));
      }));
  }

  getCitiesEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/City?pageSize=30000`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCitiesEndpoint());
      }));
  }

  getCityByIdEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/City/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCityByIdEndpoint(id));
      }));
  }

  getCityByFilterEndpoint<T>(
    stateId?: number,
    name?: string,
    initialCode?: string,
    ibgeCode?: number,
    isEnabled: boolean = true
  ): Observable<T> {
    const headers = this.requestHeaders.headers;

    let params = new HttpParams();

    params = stateId != null ? params.set('StateId', String(stateId)) : params;
    params = name != null ? params.set('Name', String(name)) : params;
    params = initialCode != null ? params.set('InitialCode', String(initialCode)) : params;
    params = ibgeCode != null ? params.set('IbgeCode', String(ibgeCode)) : params;
    params = isEnabled != null ? params.set('IsEnabled', String(isEnabled)) : params;

    const httpOptions = {
      params,
      headers
    };

    const endpointUrl = `${this.apiSisContatos}/City/Filter`;

    return this.http.get<T>(endpointUrl, httpOptions).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCityByFilterEndpoint(
          stateId,
          name,
          initialCode,
          ibgeCode,
          isEnabled
        ));
      }));
  }

  getCityByIbgeCodeEndpoint<T>(ibgeCode?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/City/Filter?IbgeCode=${ibgeCode}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCityByIbgeCodeEndpoint(ibgeCode));
      }));
  }

  getStatesEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/State?pageSize=10000`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getStatesEndpoint());
      }));
  }

  getStateByFilterEndpoint<T>(
    name?: string,
    initialCode?: string,
    ibgeCode?: number,
    countryId?: number,
    isEnabled: boolean = true
  ): Observable<T> {
    const headers = this.requestHeaders.headers;

    let params = new HttpParams();

    params = name != null ? params.set('Name', String(name)) : params;
    params = initialCode != null ? params.set('InitialsCode', String(initialCode)) : params;
    params = ibgeCode != null ? params.set('IbgeCode', String(ibgeCode)) : params;
    params = countryId != null ? params.set('CountryId', String(countryId)) : params;
    params = isEnabled != null ? params.set('IsEnabled', String(isEnabled)) : params;

    const httpOptions = {
      params,
      headers
    };

    const endpointUrl = `${this.apiSisContatos}/State/Filter`;

    return this.http.get<T>(endpointUrl, httpOptions).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getStateByFilterEndpoint(
          name,
          initialCode,
          ibgeCode,
          countryId,
          isEnabled
        ));
      }));
  }

  getStateByIdEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/State/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getStateByIdEndpoint(id));
      }));
  }

  getStateByIbgeCodeEndpoint<T>(ibgeCode?: number): Observable<T> {
    const endpointUrl = `${this.apiSisContatos}/State/Filter?IbgeCode=${ibgeCode}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getStateByIbgeCodeEndpoint(ibgeCode));
      }));
  }
}
