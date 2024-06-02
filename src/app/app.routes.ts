import { Routes } from '@angular/router';
import { LocalisationComponent } from './localisation/localisation.component';
import { CurrencyComponent } from './localisation/currency/currency.component';
import { PercentComponent } from './localisation/percent/percent.component';
import { NumberComponent } from './localisation/number/number.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'localisation',
        component: LocalisationComponent,
        title: 'Localisation',
        children: [
            {
                path: 'currency',
                component: CurrencyComponent,
                title: 'Currency pipe'
            },
            {
                path: 'number',
                component: NumberComponent,
                title: 'Number pipe'
            },
            {
                path: 'percent',
                component: PercentComponent,
                title: 'Percent pipe'
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        title: 'Home'

    }
];
