import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FlexModule } from '@angular/flex-layout';
import { BtcBuyComponent } from './btc-buy/btc-buy.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        HeaderComponent,
        SidenavListComponent,
        FlexModule,
        BtcBuyComponent,
        CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent
{

}
