import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { ConfigurationService } from './core/services/configurations/configuration.service';
import { LocalStoreManagerService } from './core/services/configurations/local-store-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isUserLoggedIn: boolean;
  newNotificationCount = 0;
  appTitle = 'Portal do Cliente';

  dataLoadingConsecutiveFailures = 0;
  notificationsLoadingSubscription: any;

  constructor(
    storageManager: LocalStoreManagerService,
    public configurations: ConfigurationService,
    public router: Router,
    private adapter: DateAdapter<any>
  ) {
    storageManager.initialiseStorageSyncListener();

    this.adapter.setLocale(configurations.culture);
  }

  ngOnInit(): void {

  }

}

