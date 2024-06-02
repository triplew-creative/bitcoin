import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NumberComponent } from './number/number.component';
import { PercentComponent } from './percent/percent.component';
import { CurrencyComponent } from './currency/currency.component';
import { DateComponent } from './date/date.component';
import { LocalisationService } from '../services/localisation.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SettingsService } from '../services/settings.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-localisation',
    standalone: true,
    imports: [CommonModule, MatTabsModule, NumberComponent, PercentComponent, CurrencyComponent, DateComponent, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './localisation.component.html',
    styleUrl: './localisation.component.scss'
})
export class LocalisationComponent implements OnInit
{
    protected locales: string[];
    protected form: FormGroup;
    constructor(private localisationService: LocalisationService, private fb: FormBuilder, private settings: SettingsService)
    {

        this.locales = [];

        this.localisationService.getLocaleList().then((locales: string[]) =>
        {
            this.locales = locales;
        });
        this.form = this.fb.group({
            localeName: new FormControl<string>('')
        });
    }
    public ngOnInit(): void
    {
        if (!this.form.get('localeName')?.value)
        {
            this.form.get('localeName')?.setValue(this.settings.getLocale());
        }
    }

}
