import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UtilitiesService } from '../utilities/utilities.service';
import { DBKeys } from './db-keys';
import { LocalStoreManagerService } from './local-store-manager.service';

interface UserConfiguration {
  language: string;
  version: string;
  homeUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private localStorage: LocalStoreManagerService,
  ) {

    this.loadLocalChanges();
  }

  set language(value: string) {
    this._language = value;
    this.saveToLocalStore(value, DBKeys.LANGUAGE);
  }
  get language(): string {
    return this._language || ConfigurationService.defaultLanguage;
  }

  get culture(): string {
    // let culture = 'pt-BR';

    // if (this.language === 'en')
    //   culture = 'en-US';

    // if (this.language === 'es')
    //   culture = 'es-ES';

    return this.language;
  }

  set version(value: string) {
    this._version = value;
    this.saveToLocalStore(value, DBKeys.VERSION);
  }
  get version(): string {
    return this._version || ConfigurationService.defaultVersion;
  }

  set homeUrl(value: string) {
    this._homeUrl = value;
    this.saveToLocalStore(value, DBKeys.HOME_URL);
  }
  get homeUrl(): string {
    return this._homeUrl || ConfigurationService.defaultHomeUrl;
  }

  public static readonly appVersion: string = '5.0.0';

  // ***Specify default configurations here***
  public static readonly defaultLanguage: string = 'pt';
  public static readonly defaultVersion: string = '1';
  public static readonly defaultHomeUrl: string = '/';

  // public baseUrl = environment.baseUrl || Utilities.baseUrl();
  // public tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
  // public loginUrl = environment.loginUrl;

  // ***End of defaults***

  // tslint:disable-next-line: variable-name
  private _language: string = null;
  // tslint:disable-next-line: variable-name
  private _version: string = null;
  // tslint:disable-next-line: variable-name
  private _homeUrl: string = null;

  private onConfigurationImported: Subject<boolean> = new Subject<boolean>();

  configurationImported$ = this.onConfigurationImported.asObservable();

  private loadLocalChanges(): void {
    if (this.localStorage.exists(DBKeys.LANGUAGE)) {
      this._language = this.localStorage.getDataObject<string>(DBKeys.LANGUAGE);
    } else {
    }

    if (this.localStorage.exists(DBKeys.VERSION)) {
      this._version = this.localStorage.getDataObject<string>(DBKeys.VERSION);
    }

    if (this.localStorage.exists(DBKeys.HOME_URL)) {
      this._homeUrl = this.localStorage.getDataObject<string>(DBKeys.HOME_URL);
    }
  }

  private saveToLocalStore(data: any, key: string): void {
    setTimeout(() => this.localStorage.savePermanentData(data, key));
  }

  public import(jsonValue: string): void {
    this.clearLocalChanges();

    if (jsonValue) {
      const importValue: UserConfiguration = UtilitiesService.JsonTryParse(jsonValue);

      if (importValue.language != null) {
        this.language = importValue.language;
      }

      if (importValue.version != null) {
        this.version = importValue.version;
      }

      if (importValue.homeUrl != null) {
        this.homeUrl = importValue.homeUrl;
      }
    }

    this.onConfigurationImported.next();
  }

  public export(changesOnly = true): string {
    const exportValue: UserConfiguration = {
      language: changesOnly ? this._language : this.language,
      version: changesOnly ? this._version : this.version,
      homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
    };

    return JSON.stringify(exportValue);
  }

  public clearLocalChanges(): void {
    this._language = null;
    this._version = null;
    this._homeUrl = null;

    this.localStorage.deleteData(DBKeys.LANGUAGE);
    this.localStorage.deleteData(DBKeys.VERSION);
    this.localStorage.deleteData(DBKeys.HOME_URL);
  }

}
