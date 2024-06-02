import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BitcoinService } from '../services/bitcoin.service';
import { IBtcBuy, IBtcPrice, IEstimate, IFunds, IPriceTicker } from '../models/btc.model';
import { Observable, Subscription, combineLatest, map, switchMap } from 'rxjs';
import { FlexModule } from '@angular/flex-layout';
import { amountValidator } from '../validation/amount.validator';
import { MatCardModule } from '@angular/material/card';
import { patternWithMessage } from '../validation/pattern-with-message.validator';
import { ValidationComponent } from '../validation/validation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-btc-buy',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        FlexModule,
        MatCardModule,
        ValidationComponent,
    ],
    providers: [CurrencyPipe, MatIconRegistry],
    templateUrl: './btc-buy.component.html',
    styleUrl: './btc-buy.component.scss'
})
export class BtcBuyComponent implements OnInit, OnDestroy
{
    protected priceTicker$: Observable<IPriceTicker>;
    protected availableFunds$: Observable<IFunds>;
    // protected estimate$: Observable<IEstimate>;
    protected form: FormGroup;
    private buyOj: IBtcBuy;
    private amountSubscription?: Subscription;
    private get amountControl(): FormControl
    {
        return this.form.get('amount') as FormControl;
    }

    private get estimateControl(): FormControl
    {
        return this.form.get('estimate') as FormControl;
    }

    constructor(private btcService: BitcoinService, private fb: FormBuilder)
    {

        this.form = this.fb.group({
            btcPrice: new FormControl<number | null>(null),
            funds: new FormControl<number | null>(null),
            amount: new FormControl<number | null>(null, [patternWithMessage(Validators.pattern(/\d/), "Please enter positive numbers only")]),
            estimate: new FormControl<number | null>(null, [Validators.required, patternWithMessage(Validators.minLength(1), 'Estimate must be more than 1 character')]),
        });
        this.buyOj = {} as IBtcBuy;
        this.availableFunds$ = this.btcService.getFunds();
        this.priceTicker$ = this.btcService.getBtcPrice();

        // this.estimate$ = this.btcService.getEstimate();

    }
    public ngOnInit(): void
    {
        this.availableFunds$?.subscribe(funds =>
        {
            this.amountControl.setValidators([Validators.required, amountValidator.bind(this, funds), patternWithMessage(Validators.min(10), 'A minimum of 10 is required')]);
            this.amountControl.updateValueAndValidity();
        });
        combineLatest(
            [this.amountControl.valueChanges, this.priceTicker$]
        ).subscribe({
            next: ([amount, priceTicker]) =>
            {
                if (amount && this.amountControl.valid)
                {
                    this.buyOj.asset = priceTicker.asset;
                    const newEstimate: IEstimate = this.btcService.getEstimate(amount, priceTicker.values.buy);
                    console.log('newest', newEstimate);
                    if (newEstimate)
                    {
                        this.estimateControl.setValue(newEstimate.buy_amount_estimated);
                    }
                }
                else
                {
                    this.estimateControl.setValue(null);
                }
            }
        });
    }
    public ngOnDestroy(): void
    {
        this.amountSubscription?.unsubscribe();
    }

    protected onSubmit(): void
    {
        console.log('this.form.valid', this.form.valid);
        if (this.form.valid)
        {
            this.buyOj = {
                ...this.buyOj,
                price: this.estimateControl?.value,
                amount: this.amountControl?.value
            };
            this.btcService.buy(this.buyOj).pipe().subscribe(console.log);
        }

    }

}