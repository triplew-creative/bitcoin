import { FormControl } from "@angular/forms";
import { IFunds } from "../models/btc.model";

export function amountValidator(availableFunds: IFunds, control: FormControl): { [s: string]: boolean; } | null
{
    if (Number(control.value) > availableFunds.available_aud || availableFunds.available_aud - Number(control.value) < 0)
    {
        return { 'amountExceeded': true };
    }
    return null;
};