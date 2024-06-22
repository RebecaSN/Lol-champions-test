import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreManagerService {

  private static syncListenerInitialised = false;

  public static readonly DBKEY_USER_DATA = 'user_data';
  private static readonly DBKEY_SYNC_KEYS = 'sync_keys';
  private syncKeys: string[] = [];
  private initEvent = new Subject();

  private reservedKeys: string[] =
    [
      'sync_keys',
      'addToSyncKeys',
      'removeFromSyncKeys',
      'getSessionStorage',
      'setSessionStorage',
      'addToSessionStorage',
      'removeFromSessionStorage',
      'clearAllSessionsStorage'
    ];

  public initialiseStorageSyncListener(): void {
    if (LocalStoreManagerService.syncListenerInitialised === true) {
      return;
    }

    LocalStoreManagerService.syncListenerInitialised = true;
    window.addEventListener('storage', this.sessionStorageTransferHandler, false);
    this.syncSessionStorage();
  }

  public deinitialiseStorageSyncListener(): void {
    window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
    LocalStoreManagerService.syncListenerInitialised = false;
  }

  public clearAllStorage(): void {
    this.clearAllSessionsStorage();
    this.clearLocalStorage();
  }

  public clearAllSessionsStorage(): void {
    this.clearInstanceSessionStorage();
    localStorage.removeItem(LocalStoreManagerService.DBKEY_SYNC_KEYS);

    localStorage.setItem('clearAllSessionsStorage', '_dummy');
    localStorage.removeItem('clearAllSessionsStorage');
  }

  public clearInstanceSessionStorage(): void {
    sessionStorage.clear();
    this.syncKeys = [];
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

  public saveSessionData(data: any, key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    this.removeFromSyncKeys(key);
    localStorage.removeItem(key);
    this.sessionStorageSetItem(key, data);
  }

  public saveSyncedSessionData(data: any, key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    localStorage.removeItem(key);
    this.addToSessionStorage(data, key);
  }

  public savePermanentData(data: any, key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    this.localStorageSetItem(key, data);
  }

  public moveDataToSessionStorage(key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data == null) {
      return;
    }

    this.saveSessionData(data, key);
  }

  public moveDataToSyncedSessionStorage(key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data == null) {
      return;
    }

    this.saveSyncedSessionData(data, key);
  }

  public moveDataToPermanentStorage(key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data == null) {
      return;
    }

    this.savePermanentData(data, key);
  }

  public exists(key = LocalStoreManagerService.DBKEY_USER_DATA): boolean {
    let data = sessionStorage.getItem(key);

    if (data == null) {
      data = localStorage.getItem(key);
    }

    return data != null;
  }

  public getData(key = LocalStoreManagerService.DBKEY_USER_DATA): any {
    this.testForInvalidKeys(key);

    let data = this.sessionStorageGetItem(key);

    if (data == null) {
      data = this.localStorageGetItem(key);
    }

    return data;
  }

  public getDataObject<T>(key = LocalStoreManagerService.DBKEY_USER_DATA, isDateType = false): T {
    let data = this.getData(key);

    if (data != null) {
      if (isDateType) {
        data = new Date(data);
      }
      return data as T;
    } else {
      return null;
    }
  }

  public deleteData(key = LocalStoreManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    localStorage.removeItem(key);
  }

  public getInitEvent(): Observable<{}> {
    return this.initEvent.asObservable();
  }

  private sessionStorageTransferHandler = (event: StorageEvent) => {
    if (!event.newValue) {
      return;
    }

    if (event.key === 'getSessionStorage') {
      if (sessionStorage.length) {
        this.localStorageSetItem('setSessionStorage', sessionStorage);
        localStorage.removeItem('setSessionStorage');
      }
    } else if (event.key === 'setSessionStorage') {

      if (!this.syncKeys.length) {
        this.loadSyncKeys();
      }
      const data = JSON.parse(event.newValue);
      // console.info("Set => Key: Transfer setSessionStorage" + ",  data: " + JSON.stringify(data));

      for (const key in data) {

        if (this.syncKeysContains(key)) {
          this.sessionStorageSetItem(key, JSON.parse(data[key]));
        }
      }

      this.onInit();
    } else if (event.key === 'addToSessionStorage') {

      const data = JSON.parse(event.newValue);

      // console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));

      this.addToSessionStorageHelper(data.data, data.key);
    } else if (event.key === 'removeFromSessionStorage') {

      this.removeFromSessionStorageHelper(event.newValue);
    } else if (event.key === 'clearAllSessionsStorage' && sessionStorage.length) {
      this.clearInstanceSessionStorage();
    } else if (event.key === 'addToSyncKeys') {
      this.addToSyncKeysHelper(event.newValue);
    } else if (event.key === 'removeFromSyncKeys') {
      this.removeFromSyncKeysHelper(event.newValue);
    }
  }

  private syncSessionStorage(): void {
    localStorage.setItem('getSessionStorage', '_dummy');
    localStorage.removeItem('getSessionStorage');
  }

  private addToSessionStorage(data: any, key: string): void {
    this.addToSessionStorageHelper(data, key);
    this.addToSyncKeysBackup(key);

    this.localStorageSetItem('addToSessionStorage', { key, data });
    localStorage.removeItem('addToSessionStorage');
  }

  private addToSessionStorageHelper(data: any, key: string): void {
    this.addToSyncKeysHelper(key);
    this.sessionStorageSetItem(key, data);
  }

  private removeFromSessionStorage(keyToRemove: string): void {
    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);

    localStorage.setItem('removeFromSessionStorage', keyToRemove);
    localStorage.removeItem('removeFromSessionStorage');
  }

  private removeFromSessionStorageHelper(keyToRemove: string): void {

    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }

  private testForInvalidKeys(key: string): void {
    if (!key) {
      throw new Error('key cannot be empty');
    }

    if (this.reservedKeys.some(x => x === key)) {
      throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
    }
  }

  private syncKeysContains(key: string): boolean {
    return this.syncKeys.some(x => x === key);
  }

  private loadSyncKeys(): void {
    if (this.syncKeys.length) {
      return;
    }

    this.syncKeys = this.getSyncKeysFromStorage();
  }

  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    const data = this.localStorageGetItem(LocalStoreManagerService.DBKEY_SYNC_KEYS);

    if (data == null) {
      return defaultValue;
    } else {
      return data as string[];
    }
  }

  private addToSyncKeys(key: string): void {
    this.addToSyncKeysHelper(key);
    this.addToSyncKeysBackup(key);

    localStorage.setItem('addToSyncKeys', key);
    localStorage.removeItem('addToSyncKeys');
  }

  private addToSyncKeysBackup(key: string): void {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    if (!storedSyncKeys.some(x => x === key)) {
      storedSyncKeys.push(key);
      this.localStorageSetItem(LocalStoreManagerService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  private removeFromSyncKeysBackup(key: string): void {
    const storedSyncKeys = this.getSyncKeysFromStorage();
    const index = storedSyncKeys.indexOf(key);

    if (index > -1) {
      storedSyncKeys.splice(index, 1);
      this.localStorageSetItem(LocalStoreManagerService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  private addToSyncKeysHelper(key: string): void {
    if (!this.syncKeysContains(key)) {
      this.syncKeys.push(key);
    }
  }

  private removeFromSyncKeys(key: string): void {
    this.removeFromSyncKeysHelper(key);
    this.removeFromSyncKeysBackup(key);

    localStorage.setItem('removeFromSyncKeys', key);
    localStorage.removeItem('removeFromSyncKeys');
  }

  private removeFromSyncKeysHelper(key: string): void {
    const index = this.syncKeys.indexOf(key);

    if (index > -1) {
      this.syncKeys.splice(index, 1);
    }
  }

  private localStorageSetItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private sessionStorageSetItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  private localStorageGetItem(key: string): any {
    return UtilitiesService.JsonTryParse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string): any {
    return UtilitiesService.JsonTryParse(sessionStorage.getItem(key));
  }

  private onInit(): void {
    setTimeout(() => {
      this.initEvent.next();
      this.initEvent.complete();
    });
  }
}
