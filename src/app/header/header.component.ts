import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        FlexLayoutModule,
        RouterModule,
        MatMenuModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit
{
    @Output() public sidenavToggle: EventEmitter<any>;
    constructor()
    {
        this.sidenavToggle = new EventEmitter();
    }

    public ngOnInit()
    {
    }
    public onToggleSidenav = () =>
    {
        this.sidenavToggle.emit();
    };
}