import { Injectable, inject } from '@angular/core';
import { APIURL, isNullOrEmpty } from '../utils/utils';
import { ISettings } from '../models/settings.model';
import { IBtcBuy, IBtcPrice, IEstimate, IFunds, IPriceTicker, IPriceTickerApi } from '../models/btc.model';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BitcoinService
{
    private fundsUrl: string = `${APIURL}/funds`;
    private btcPriceTickerUrl: string = `${APIURL}/price-ticker`;
    private estimateUrl: string = `${APIURL}/estimate`;
    private buyUrl: string = `${APIURL}/buy`;
    // private http = inject(HttpClient);
    constructor(private http: HttpClient)
    {
    }

    public getBtcPrice(): Observable<IPriceTicker>
    {
        return this.http.get<IPriceTickerApi>(this.btcPriceTickerUrl).pipe(
            map(x => ({ asset: 'BTC', values: x.BTC } as IPriceTicker)),
            shareReplay()
        );
    }
    public getFunds(): Observable<IFunds>
    {
        return this.http.get<IFunds>(this.fundsUrl).pipe(
            map(x => x),
            shareReplay()
        );;
    }
    public getEstimate(amount: number, btcToAud: number): IEstimate
    {
        const estimate: IEstimate = {
            spending_amount: amount,
            price_estimated: (1 / btcToAud),
            buy_amount_estimated: (amount / btcToAud)
        };
        return estimate;
    }
    public updateFunds(amountAvailable: number): Observable<IBtcBuy>
    {
        return this.http.post<IBtcBuy>(this.buyUrl, amountAvailable);
    }
    public buy(buyObj: IBtcBuy): Observable<IBtcBuy>
    {
        return this.http.post<IBtcBuy>(this.buyUrl, buyObj);
    }
}