import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

import { max, min, retry } from 'rxjs';
import { APIURL } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class LocalisationService
{
    private localeUrl: string = `${APIURL}/locales`;
    constructor(private settings: SettingsService) { }

    public async getLocaleList()
    {
        const data = await fetch(this.localeUrl);
        return await data.json() ?? [];
    }
    public getSeparator(separatorType: any)
    {
        const numberWithGroupAndDecimalSeparator: number = 1000.1;
        const separator: string = Intl?.NumberFormat!(this.settings.getLocale())
            .formatToParts(numberWithGroupAndDecimalSeparator)!
            .find(part => part.type === separatorType)!
            .value;
        return separator;
    }
    public toLocaleCurrency(value: any, minDecimal: number, maxDecimal: number): string
    {
        let opts: any = {};
        if (!value)
        {
            value = 0;
        }
        if (typeof value == 'string')
        {
            value = Number(value);
        }
        opts.style = 'currency';
        opts.currency = this.settings.getCurrencyCode();
        opts = { ...opts, ...this.getDecimalPlaceOpts(value, minDecimal, maxDecimal) };
        var returnValue = value.toLocaleString(this.settings.getLocale(), opts);
        return returnValue;
    }

    public getCurrencySymbol(currency: string | undefined): string
    {
        return (0).toLocaleString(
            this.settings.getLocale(),
            {
                style: 'currency',
                currency: currency ? currency : this.settings.getCurrencyCode(),
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }
        ).replace(/\d/g, '').trim();
    }

    public toLocalePercent(value: any, minDecimal: number, maxDecimal: number): string
    {
        let opts: any = {};
        if (!value)
        {
            value = 0;
        }
        if (typeof value == 'string')
        {
            value = Number(value);
        }
        opts.style = 'percent';
        opts = { ...opts, ...this.getDecimalPlaceOpts(value, minDecimal, maxDecimal) };
        let val = value.toLocaleString(this.settings.getLocale(), opts);
        return val;
    }
    public toLocaleNumber(value: any, minDecimal: number, maxDecimal: number, useGrouping: boolean): string
    {
        let opts: any = {};
        if (!value)
        {
            value = 0;
        }
        if (typeof value === 'string')
        {
            value = Number(value);
        }

        if (useGrouping)
        {
            opts.useGrouping = true;
        }
        opts = { ...opts, ...this.getDecimalPlaceOpts(value, minDecimal, maxDecimal) };

        let val = value.toLocaleString(this.settings.getLocale(), opts);
        return val;
    }



    public toLocaleDate(value: Date, includeTime: boolean = false, options: any = {}): string
    {
        let opts: any = {};
        opts = {
            // weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        opts.timeZone = this.getUserTimezone();
        opts = { ...opts, ...options };
        var returnValue = value.toLocaleString(this.settings.getLocale(), opts);
        if (includeTime)
        {
            returnValue = returnValue + ' ' + this.toLocaleTime(value);
        }
        return returnValue;
    }
    public toLocaleTime(value: Date, options: any = {}): string
    {
        let opts: any = {};
        opts = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: this.getUserTimezone()
        };
        opts = { ...opts, ...options };
        var returnValue = value.toLocaleTimeString(this.settings.getLocale(), opts);
        return returnValue;
    }

    public getMonth(date: Date, options: any = {}): string
    {
        let opts: any = {};
        opts = {
            month: 'short'
        };
        opts = { ...opts, ...options };
        var returnValue = date.toLocaleDateString(this.settings.getLocale(), opts);
        return returnValue;
    }

    public getUserTimezone(): string | undefined
    {
        let timezone = undefined;
        if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function')
        {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        return timezone;
    }

    private getDecimalPlaceOpts(value: any, minDecimal: number, maxDecimal: number): any
    {
        let opts: any = {};

        if (value % 1 === 0)
        {
            opts.minimumFractionDigits = 0;
            opts.maximumFractionDigits = 0;
        }
        else
        {
            if (maxDecimal !== 0)
            {
                opts.minimumFractionDigits = 2;
            }

        }

        if (minDecimal === 2)
        {
            opts.minimumFractionDigits = 2;
        }

        return opts;
    }
}