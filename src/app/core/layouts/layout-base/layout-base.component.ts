import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { groupCollapsed } from 'console';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
  styleUrls: ['./layout-base.component.scss']
})
export class LayoutBaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
