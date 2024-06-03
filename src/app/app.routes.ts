import { Routes } from '@angular/router';
import { BtcBuyComponent } from './btc-buy/btc-buy.component';

export const routes: Routes = [
    {
        path: '**',
        component: BtcBuyComponent,
        title: 'Buy Bitcoin'

    }
];
