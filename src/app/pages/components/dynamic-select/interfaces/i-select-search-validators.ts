import { ValidatorFn } from "@angular/forms";
import { ValidatorTypes } from "../enums/validator-types.enum";

export interface ISelectSearchValidators {
  message: string;
  validatorFn: ValidatorFn;
  type: string | ValidatorTypes;
}
