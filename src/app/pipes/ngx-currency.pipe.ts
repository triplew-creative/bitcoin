import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { LocalisationService } from '../services/localisation.service';
@Injectable({ providedIn: 'root' })
@Pipe({
    name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform
{
    constructor(
        private localisationService: LocalisationService)
    {
    }
    transform(value: any, minDecimal: number = 0, maxDecimal: number = 2): string
    {
        if (value != null)
        {
            return this.localisationService.toLocaleCurrency(value, minDecimal, maxDecimal);

        }
        return '';
    }
}
