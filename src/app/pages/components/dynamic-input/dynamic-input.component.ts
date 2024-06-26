import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputType } from 'zlib';
import { CurrencyMaskInputMode } from 'ngx-currency';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {

  @Input() inputAppearance = 'outline';
  @Input() inputFormControl: FormControl;
  @Input() label: string;
  @Input() inputPlaceholder = '';
  @Input() isRequired = false;
  @Input() isReadonly = false;
  @Input() isDisabled = false;
  @Input() isHint = false;
  @Input() hintValue = '';
  @Input() isSuffix = false;
  @Input() suffixValue = '';
  @Input() inputType: InputType = 'text';

  @Input() maskInput = '';
  @Input() customPatterns = '';
  @Input() maxlengthValue = '';
  @Input() minlengthValue = '';

  @Input() isErrorShow = true;

  @Input() isCurrencyMask: boolean = false;
  @Input() currencyMaskOptions: {};

  constructor() {
    this.currencyMaskOptions = {
      align: 'right',
      allowNegative: true,
      allowZero: true,
      decimal: ',',
      precision: 2,
      prefix: '',
      suffix: '',
      thousands: '.',
      nullable: true,
      min: null,
      max: null,
      inputMode: CurrencyMaskInputMode.NATURAL
    };
  }

  ngOnInit(): void {
    if (this.isDisabled)
    this.inputFormControl.disable();
  }

  clearFieldControl(ctrl: FormControl): void {
    ctrl.reset();
    ctrl.markAsUntouched();
  }

}
