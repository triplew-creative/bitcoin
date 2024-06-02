import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-sidenav-list',
    standalone: true,
    imports: [
        MatIconModule,
        MatListModule
    ],
    templateUrl: './sidenav-list.component.html',
    styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit
{
    @Output() sidenavClose: EventEmitter<any>;
    constructor()
    {
        this.sidenavClose = new EventEmitter();
    }
    public ngOnInit()
    {
    }
    public onSidenavClose = () =>
    {
        this.sidenavClose.emit();
    };
}