import { Component, ElementRef, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobile_menu_visible = 0;
  expandedState = 'collapsed';

  public isCollapsed = true;

  constructor(
    matIconRegistry: MatIconRegistry,

  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit(): void {
  }


}

