import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-date',
    standalone: true,
    imports: [],
    templateUrl: './date.component.html',
    styleUrl: './date.component.scss'
})
export class DateComponent
{
    @Input() locale?: string;
}
