import { FormControl } from "@angular/forms";
import { IFunds } from "../models/btc.model";

export function amountValidator(availableFunds: IFunds, control: FormControl): { [s: string]: boolean; } | null
{
    if (parseInt(control.value) > availableFunds.available_aud)
    {
        return { 'amountExceeded': true };
    }
    return null;
};