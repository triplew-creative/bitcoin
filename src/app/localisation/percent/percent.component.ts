import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-percent',
    standalone: true,
    imports: [],
    templateUrl: './percent.component.html',
    styleUrl: './percent.component.scss'
})
export class PercentComponent
{
    @Input() locale?: string;
}
