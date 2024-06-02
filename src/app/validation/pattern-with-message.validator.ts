import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import { IFunds } from "../models/btc.model";

export const patternWithMessage = (validator: ValidatorFn, message: string): ValidatorFn =>
{

    const delegateFn = validator;
    return control => delegateFn(control) === null ? null : { message };
};