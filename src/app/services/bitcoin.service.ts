import { Injectable, OnDestroy, inject } from '@angular/core';
import { APIURL, isNullOrEmpty } from '../utils/utils';
import { ISettings } from '../models/settings.model';
import { IBtcBuy, IBtcPrice, IEstimate, IFunds, IPriceTicker, IPriceTickerApi } from '../models/btc.model';
import { BehaviorSubject, Observable, Subscription, map, shareReplay, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BitcoinService implements OnDestroy
{
    private fundsUrl: string = `${APIURL}/funds`;
    private btcPriceTickerUrl: string = `${APIURL}/price-ticker`;
    //Note haven't implemented up POST requests with mock server
    private estimateUrl: string = `${APIURL}/estimate`;
    private buyUrl: string = `${APIURL}/buy`;

    private fundsSubscription?: Subscription;

    private fundsSubject: BehaviorSubject<IFunds>;
    public funds$: Observable<IFunds>;
    private buySubject: BehaviorSubject<IBtcBuy>;
    public buy$: Observable<IBtcBuy>;
    constructor(private http: HttpClient)
    {
        this.fundsSubject = new BehaviorSubject<IFunds>({} as IFunds);
        this.funds$ = this.fundsSubject.asObservable();
        this.buySubject = new BehaviorSubject<IBtcBuy>({} as IBtcBuy);
        this.buy$ = this.buySubject.asObservable();
    }

    public ngOnDestroy(): void
    {
        this.fundsSubscription?.unsubscribe();
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
        this.fundsSubscription = this.http.get<IFunds>(this.fundsUrl).pipe(
            map(x => x),
            shareReplay()
        ).subscribe({
            next: (funds: IFunds) =>
            {
                this.fundsSubject.next(funds);
            }
        });
        return this.funds$;
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

    public updateFunds(amountAvailable: number): Observable<IFunds>
    {
        const funds: IFunds = { available_aud: Number(this.fundsSubject.getValue()?.available_aud) - amountAvailable };
        this.fundsSubject.next(funds);
        return this.funds$;
    }

    public buy(buyObj: IBtcBuy): Observable<IBtcBuy>
    {
        this.buySubject.next(buyObj);
        return this.buy$;
    }
}