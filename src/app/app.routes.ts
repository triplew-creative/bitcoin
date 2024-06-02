import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BtcBuyComponent } from './btc-buy/btc-buy.component';

export const routes: Routes = [
    {
        path: '**',
        component: BtcBuyComponent,
        title: 'Buy Bitcoin'

    },
    // {
    //     path: '**',
    //     component: BtcBuyComponent,
    //     title: 'Buy Bitcoin'

    // }
];
