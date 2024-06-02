import { Injectable } from '@angular/core';
import { APIURL, isNullOrEmpty } from '../utils/utils';
import { ISettings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService
{
    public settingsObj?: ISettings;
    private url: string = `${APIURL}/settings`;
    constructor()
    {
    }

    public getSiteSettings(): ISettings | undefined
    {
        return this.settingsObj;
    }

    public async getSettings(): Promise<ISettings | undefined>
    {
        const data = await fetch(this.url);
        return await data.json() ?? {};
    }

    public setLocale(locale: string)
    {
        if (this.settingsObj)
        {
            this.settingsObj.locale = locale;
        }
    }

    public getLocale()
    {
        return this.settingsObj?.locale;
    }

    public getCurrencyCode()
    {
        return this.settingsObj?.currencyCode;
    }
}