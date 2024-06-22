import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BusinessSegment } from '../../models/pages/auxiliary/business-segment';
import { BusinessSubSegment } from '../../models/pages/auxiliary/business-sub-segment';
import { City } from '../../models/pages/auxiliary/city';
import { Country } from '../../models/pages/auxiliary/country';
import { Group } from '../../models/pages/auxiliary/group';
import { State } from '../../models/pages/auxiliary/state';
import { SubGroup } from '../../models/pages/auxiliary/sub-group';
import { TypePhone } from '../../models/pages/auxiliary/type-phone';
import { AuthService } from '../auth/auth.service';
import { AuxiliaryTablesEndpoint } from './auxiliary-tables-endpoint.service';


@Injectable({
  providedIn: 'root'
})
export class AuxiliaryTablesService {

  constructor(
    private authService: AuthService,
    private auxiliaryTablesEndpoint: AuxiliaryTablesEndpoint
  ) { }

  /* ------------------------- Busca Tipo de telefone ------------------------- */
  getTypePhoneById(id?: number): Observable<TypePhone> {
    return this.auxiliaryTablesEndpoint.getTypePhoneEndpoint<TypePhone>(id);
  }

  getTypesPhone(): Observable<TypePhone[]> {
    return this.auxiliaryTablesEndpoint.getTypesPhoneEndpoint<TypePhone[]>();
  }

  /* ------------------------------- Busca Grupo ------------------------------ */
  getGroups(): Observable<Group[]> {
    return this.auxiliaryTablesEndpoint.getGroupsEndpoint<Group[]>();
  }

  getGroupsByFilter(
    contactType?: number,
    name?: string,
    isDealer?: boolean,
    isEnabled: boolean = true
  ): Observable<Group[]> {
    return this.auxiliaryTablesEndpoint.getGroupsByFilterEndpoint<Group[]>(
      contactType,
      name,
      isDealer,
      isEnabled
    );
  }

  getGroupById(id?: number): Observable<Group> {
    return this.auxiliaryTablesEndpoint.getGroupEndpoint<Group>(id);
  }

  /* ---------------------------- Busca  Sub Grupo ---------------------------- */
  getSubGroups(): Observable<SubGroup[]> {
    return this.auxiliaryTablesEndpoint.getSubGroupsEndpoint<SubGroup[]>();
  }

  getSubGroupsByFilter(
    groupId?: number,
    name?: string,
    isEmployee?: boolean,
    isEnabled: boolean = true
  ): Observable<Group[]> {
    return this.auxiliaryTablesEndpoint.getSubGroupsByFilterEndpoint<Group[]>(
      groupId,
      name,
      isEmployee,
      isEnabled
    );
  }

  getSubGroupById(id?: number): Observable<SubGroup> {
    return this.auxiliaryTablesEndpoint.getSubGroupByIdEndpoint<SubGroup>(id);
  }

  getSubGroupsByGroupId(groupId?: number): Observable<SubGroup[]> {
    return this.auxiliaryTablesEndpoint.getSubGroupByGroupIdEndpoint<SubGroup[]>(
      groupId === undefined ? 0 : groupId);
  }

  /* ----------------------------- Busca Segmento ----------------------------- */
  getSegments(): Observable<BusinessSegment[]> {
    return this.auxiliaryTablesEndpoint.getSegmentsEndpoint<BusinessSegment[]>();
  }

  getSegmentById(id?: number): Observable<BusinessSegment> {
    return this.auxiliaryTablesEndpoint.getSegmentByIdEndpoint<BusinessSegment>(id);
  }

  getSegmentByGroupId(groupId?: number): Observable<BusinessSegment[]> {
    return this.auxiliaryTablesEndpoint.getSegmentByGroupIdEndpoint<BusinessSegment[]>(groupId);
  }

  /* --------------------------- Busca Sub Segmento --------------------------- */
  getSubSegments(): Observable<BusinessSubSegment[]> {
    return this.auxiliaryTablesEndpoint.getSubSegmentsEndpoint<BusinessSubSegment[]>();
  }

  getSubSegmentById(id?: number): Observable<BusinessSubSegment> {
    return this.auxiliaryTablesEndpoint.getSubSegmentEndpoint<BusinessSubSegment>(id);
  }

  getSubSegmentsBySegmentId(segmentId?: number): Observable<BusinessSubSegment[]> {
    return this.auxiliaryTablesEndpoint.getSubSegmentBySegmentIdEndpoint<BusinessSubSegment[]>(segmentId);
  }

  getCountries(): Observable<Country[]> {
    return this.auxiliaryTablesEndpoint.getCountriesEndpoint<Country[]>();
  }

  getCountriesByFilter(
    name?: string,
    initialsCode?: string,
    bacenCode?: number,
    isEnabled: boolean = true
  ): Observable<Country[]> {
    return this.auxiliaryTablesEndpoint.getCountriesByFilterEndpoint<Country[]>(
      name,
      initialsCode,
      bacenCode,
      isEnabled
    );
  }

  getCountryById(id?: number): Observable<Country[]> {
    return this.auxiliaryTablesEndpoint.getCountryByIdEndpoint<Country[]>(id);
  }

  getCountryByInitialsCode(id?: number): Observable<Country[]> {
    return this.auxiliaryTablesEndpoint.getCountryByInitialsCodeEndpoint<Country[]>(id);
  }

  getCities(): Observable<City[]> {
    return this.auxiliaryTablesEndpoint.getCitiesEndpoint<City[]>();
  }

  getCityById(id?: number): Observable<City[]> {
    return this.auxiliaryTablesEndpoint.getCityByIdEndpoint<City[]>(id);
  }

  getCityByFilter(
    stateId?: number,
    name?: string,
    initialCode?: string,
    ibgeCode?: number,
    isEnabled: boolean = true
  ): Observable<City[]> {
    return this.auxiliaryTablesEndpoint.getCityByFilterEndpoint<City[]>(
      stateId,
      name,
      initialCode,
      ibgeCode,
      isEnabled
    );
  }

  getCityByIbgeCode(ibgeCode?: number): Observable<City[]> {
    return this.auxiliaryTablesEndpoint.getCityByIbgeCodeEndpoint<City[]>(ibgeCode);
  }

  getStates(): Observable<State[]> {
    return this.auxiliaryTablesEndpoint.getStatesEndpoint<State[]>();
  }

  getStateByFilter(
    name?: string,
    initialCode?: string,
    ibgeCode?: number,
    countryId?: number,
    isEnabled: boolean = true
  ): Observable<State[]> {
    return this.auxiliaryTablesEndpoint.getStateByFilterEndpoint<State[]>(
      name,
      initialCode,
      ibgeCode,
      countryId,
      isEnabled
    );
  }

  getStateById(id?: number): Observable<State[]> {
    return this.auxiliaryTablesEndpoint.getStateByIdEndpoint<State[]>(id);
  }

  getStateByIbgeCode(ibgeCode?: number): Observable<State[]> {
    return this.auxiliaryTablesEndpoint.getStateByIbgeCodeEndpoint<State[]>(ibgeCode);
  }
}
