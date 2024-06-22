import { Component, ElementRef, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/core/services/configurations/configuration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // location: Location;
  mobile_menu_visible = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  expandedState = 'collapsed';

  public isCollapsed = true;

  constructor(
    private route: Router,
    // location: Location,
    private element: ElementRef,
    private router: Router,
    matIconRegistry: MatIconRegistry,
    public configurations: ConfigurationService

  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    // this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      let $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];

    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen(): void {
    const toggleButton = this.toggleButton;
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement;
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement;

    if (window.innerWidth < 991) {
      setTimeout(() => {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle(): void {
    let $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];
    var $layer = document.createElement('div');

    if (this.mobile_menu_visible === 1) {
      html.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(() => {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(() => {
        $toggle.classList.add('toggled');
      }, 430);

      $layer.setAttribute('class', 'close-layer');

      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(() => {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () {
        html.classList.remove('nav-open');
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  }

  public objectComparisonFunction = (option, value): boolean => {
    return option.culture === (value ? value : 0);
  }

}

