import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { SettingsService } from './services/settings.service';
import { ISettings } from './models/settings.model';
const getSiteSettings = (settingsService: SettingsService) =>
{
    return (): Promise<ISettings | undefined> => settingsService.getSettings();
};
export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        {
            provide: APP_INITIALIZER,
            useFactory: getSiteSettings,
            multi: true,
            deps: [SettingsService],
        },
    ]
};
