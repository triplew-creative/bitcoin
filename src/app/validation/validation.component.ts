import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-validation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
        FlexModule
    ],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    templateUrl: './validation.component.html',
    styleUrl: './validation.component.scss'
})
export class ValidationComponent
{
    @Input() fGroup?: FormGroup;
    @Input() cName!: string;
}
