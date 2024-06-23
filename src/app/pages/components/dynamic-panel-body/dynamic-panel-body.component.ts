import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-panel-body',
  templateUrl: './dynamic-panel-body.component.html',
  styleUrls: ['./dynamic-panel-body.component.scss']
})
export class DynamicPanelBodyComponent implements OnInit {

  @Input() title: boolean = false;
  @Input() titleLabel: string = '';
  @Input() subTitle: boolean = false;
  @Input() subTitleLabel: string = '';
  @Input() backgroundImage: string;
  @Input() showBackground: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
