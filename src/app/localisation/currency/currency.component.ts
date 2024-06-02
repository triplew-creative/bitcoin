import { Component, Input, OnInit } from '@angular/core';
import { LocalisationService } from '../../services/localisation.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-currency',
    standalone: true,
    imports: [],

    templateUrl: './currency.component.html',
    styleUrl: './currency.component.scss'
})
export class CurrencyComponent implements OnInit
{
    @Input() locale?: string;
    constructor(private localisationService: LocalisationService)
    {
    }
    public ngOnInit(): void
    {

    }
}
