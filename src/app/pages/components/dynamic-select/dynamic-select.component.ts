import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators, } from '@angular/forms';

import { Subject } from 'rxjs';

import * as _ from 'underscore';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicSelectComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicSelectComponent),
      multi: true
    }
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSelectComponent implements OnInit {

  // inputSearch: FormControl;

  @Input() selectFormControl: FormControl;
  @Input() label: string;
  @Input() isLabel: boolean = true;
  @Input() optionsData: any[];
  @Input() optionColumn: string[];
  @Input() isLoading: boolean = false;
  @Input() isSearch: boolean = false;
  @Input() plaseholderInputSearch: string = '';
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() appearance: string = 'outline';
  @Input() isErrorShow: boolean = true;

  @Input() optionColumnSufix: string;

  @ViewChild('searchInput') searchElement: ElementRef;

  inputSearch: any;

  constructor() { }

  ngOnInit(): void {
    if (this.isDisabled)
      this.selectFormControl.disable();
  }

  compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (typeof optionOne === 'string' && typeof optionTwo === 'string') {
      return optionOne === optionTwo;
    } else {
      return (optionOne && optionTwo && optionOne.id === optionTwo.id) || optionOne.id === optionTwo || optionOne?.initialsCode === optionTwo;
    }
  }

  formatTags(tags: string[]): string {
    return tags.join(', ');
  }

  close(): void {
    if (this.isSearch)
      this.inputSearch = '';
  }

  clear($event): void {
    $event.stopPropagation();
    this.inputSearch = '';
    this.searchElement.nativeElement.focus();
  }

  open(): void {
    if (this.isSearch)
      setTimeout(() => { // this will make the execution after the above boolean has changed
        this.searchElement.nativeElement.focus();
      }, 0);
  }
}


