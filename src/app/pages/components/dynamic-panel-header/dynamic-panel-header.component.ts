import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-panel-header',
  templateUrl: './dynamic-panel-header.component.html',
  styleUrls: ['./dynamic-panel-header.component.scss']
})
export class DynamicPanelHeaderComponent implements OnInit {

  @Input() title: boolean = false;
  @Input() titleLabel: string = '';
  @Input() subTitle: boolean = false;
  @Input() subTitleLabel: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
