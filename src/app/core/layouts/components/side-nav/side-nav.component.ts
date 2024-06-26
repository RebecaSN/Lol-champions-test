import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('expanded', style({
        width: '250px',
      })),
      state('collapsed', style({
        width: '80px',
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ]),
    ]),
    trigger('fadeInOut', [
      state('in', style({
        opacity: 1,
        display: 'block',
      })),
      state('out', style({
        opacity: 0,
        display: 'none',
      })),
      transition('in <=> out', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class SideNavComponent implements OnInit {

  isExpanded: boolean = false;

  constructor(
    matIconRegistry: MatIconRegistry,

  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit(): void {
  }


}
